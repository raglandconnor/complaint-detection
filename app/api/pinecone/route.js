import { feedModel } from "@/lib/pinecone";
import { NextResponse } from "next/server";
import OpenAI from "openai";
const { OpenAIEmbeddings } = require("@langchain/openai");
const { Pinecone } = require("@pinecone-database/pinecone");

const EMBED_MODEL = "text-embedding-3-large";
const INDEX_NAME = "complaints-detection";
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const pineconeIndex = pc.index(INDEX_NAME);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  model: EMBED_MODEL,
});

const SYSTEM_PROMPT = `
You are an AI assistant specializing in analyzing and categorizing customer complaints. Your task is to process a new complaint and compare it to existing complaints in the database. Follow these steps:

1. Analyze the provided query complaint, which includes a category and an insight summary.

2. Compare this new complaint to existing complaints in the database.

3. If the new complaint is similar to an existing one:
   - Combine the insights, merging relevant information into a new, comprehensive summary.
   - Keep the original category.

4. If the new complaint is unique:
   - Create a new category.
   - Use the original insight summary as is.

5. Return a JSON object with the following structure:
    {
        "category": "string",
        "insight": "string"
    }


Requirements:
- Category and insight must be strings.
- Ensure categories are concise and descriptive.
- For similar complaints, create a new combined summary that incorporates information from both the existing and new complaints and keep the original category.
- For unique complaints, use the original summary without changes.
- Maintain clarity and comprehensiveness in the insight summaries.

Your goal is to create a well-organized, non-redundant list of customer complaints that accurately represents the issues reported, either preserving original insights or creating more comprehensive combined insights as appropriate.`;

export async function POST(req) {
  // await pineconeIndex.deleteAll({ deleteAll: true, namespace: "default" });
  const complaints = await req.json();

  let similarCategories = [];

  for (const query of complaints) {
    // Convert the array of objects into a single string
    const queryString = `category: ${query.category} insight: ${query.insight}`;

    const queryEmbedding = await embeddings.embedQuery(queryString);

    const queryResponse = await pineconeIndex.query({
      vector: queryEmbedding,
      topK: 5,
      includeMetadata: true,
    });

    const context = queryResponse.matches
      .map((match, index) => {
        return `[${index + 1}] ${match.metadata.insight} (${
          match.metadata.category
        })`;
      })
      .join("\n\n");

    const prompt = `
        Top 5 relevant complaints by category:
          <complaints>
          ${context}
          </complaints>

        Query: ${queryString}
        Response: `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
      response_format: { type: "json_object" },
    });
    const response = completion.choices[0].message.content;
    similarCategories.push(JSON.parse(response));
  }

  // Retrieve complaints from database
  for (const complaint of similarCategories) {
    const dbComplaints = await getComplaintsByCategory(complaint.category);
    // If length is 0, then it's a unique complaint, so add it to the database
    if (dbComplaints.length === 0) {
      await feedModel([complaint]);
      await storeComplaints([complaint]);
    } else {
      // Combine the new complaint with the existing one
      const combinedComplaint = await combineDbComplaint(
        complaint,
        dbComplaints[0]
      );
      // Store the combined complaint to Postgres

      // Store the combined complaint to Pinecone
      await feedModel([combinedComplaint]);
    }
  }

  // await feedModel(combinedSummaries);

  return NextResponse.json({ message: "Hello" });
}

export async function getRequest(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    throw error;
  }
}

export async function getComplaints() {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/complaints`;
  try {
    const data = await getRequest(url);
    return data;
  } catch (error) {
    console.error("Error getting complaints:", error);
    throw error;
  }
}

export async function getComplaintsByCategory(category) {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/complaints/${category}`;
  try {
    const data = await getRequest(url);
    return data;
  } catch (error) {
    console.error("Error getting complaints by category:", error);
    throw error;
  }
}

export async function combineDbComplaint(queryComplaint, dbComplaint) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful AI assistant that combines two complaints into a single comprehensive summary. Return a JSON object following the format: { 'category': 'string', 'insight': 'string' }",
      },
      {
        role: "user",
        content: `Combine the following insights: "${dbComplaint.insight}" and "${queryComplaint.insight}"`,
      },
    ],
    response_format: { type: "json_object" },
  });
  const response = completion.choices[0].message.content;
  return JSON.parse(response);
}

export async function storeComplaints(complaints) {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/complaints`;
  try {
    const data = await postRequest(url, complaints);
    console.log(data);
  } catch (error) {
    console.error("Error storing complaints:", error);
    throw error;
  }
}
