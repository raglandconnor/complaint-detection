# Use an appropriate base image
FROM python:3.9-slim

# Set environment variables
ENV FLASK_APP=run:app
ENV FLASK_DEBUG=1

# Set working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port Flask will run on
EXPOSE 5000

# Command to run the application
CMD ["flask", "run", "--host=0.0.0.0"]

