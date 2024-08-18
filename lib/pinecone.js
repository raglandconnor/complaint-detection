"use server";
import { Pinecone } from "@pinecone-database/pinecone";
import { v4 as uuidv4 } from "uuid";
import { OpenAIEmbeddings } from "@langchain/openai";

const EMBED_MODEL = "text-embedding-3-large";
const INDEX_NAME = "complaints-detection";
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});
const pineconeIndex = pc.index(INDEX_NAME);

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
  model: EMBED_MODEL,
});

export async function feedModel(complaintObjects) {
  try {
    // await pineconeIndex.deleteAll({ deleteAll: true, namespace: "default" });
    for (const complaint of complaintObjects) {
      const stringComplaint = `category: ${complaint.category} insight: ${complaint.insight}`;
      const embedding = await embeddings.embedQuery(stringComplaint);
      await pineconeIndex.upsert([
        {
          id: uuidv4(),
          values: embedding,
          metadata: {
            category: complaint.category,
            insight: complaint.insight,
          },
        },
      ]);
    }
  } catch (error) {
    console.log("Error feeding model:", error);
    throw error;
  }
}

// async function getTextSplitter(texts) {
//   const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
//   const textToSplit = texts;
//   const docs = await textSplitter.splitDocuments(textToSplit);
//   return docs;
// }
