#!/bin/bash

# Google Cloud Run deployment script for BTC Loan Calculator
# Make sure you have gcloud CLI installed and authenticated

set -e

# Configuration
PROJECT_ID="your-gcp-project-id"
SERVICE_NAME="btc-loan-calculator"
REGION="europe-west1"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "🚀 Deploying BTC Loan Calculator to Google Cloud Run"
echo "Project ID: ${PROJECT_ID}"
echo "Service Name: ${SERVICE_NAME}"
echo "Region: ${REGION}"

# Build and push Docker image
echo "📦 Building Docker image..."
docker build -t ${IMAGE_NAME} .

echo "📤 Pushing image to Google Container Registry..."
docker push ${IMAGE_NAME}

# Deploy to Cloud Run
echo "🌐 Deploying to Cloud Run..."
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_NAME} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10 \
  --port 8080 \
  --project ${PROJECT_ID}

echo "✅ Deployment completed!"
echo "🔗 Your app should be available at:"
gcloud run services describe ${SERVICE_NAME} --region=${REGION} --project=${PROJECT_ID} --format='value(status.url)' 