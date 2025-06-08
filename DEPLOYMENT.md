# BTC Loan Calculator - Deployment Guide

## Google Cloud Run Deployment

This guide explains how to deploy the BTC Loan Calculator to Google Cloud Run.

### Prerequisites

1. **Google Cloud CLI** - Install from [cloud.google.com/sdk](https://cloud.google.com/sdk)
2. **Docker** - Install from [docker.com](https://www.docker.com/)
3. **Google Cloud Project** - Create or select a project with billing enabled

### Setup

1. **Authenticate with Google Cloud:**
   ```bash
   gcloud auth login
   gcloud config set project YOUR_PROJECT_ID
   ```

2. **Enable required APIs:**
   ```bash
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

3. **Configure Docker for GCR:**
   ```bash
   gcloud auth configure-docker
   ```

### Deployment Options

#### Option 1: Using the deployment script (Recommended)

1. **Edit the deployment script:**
   ```bash
   nano deploy-gcp.sh
   ```
   Update `PROJECT_ID` with your Google Cloud project ID.

2. **Run the deployment:**
   ```bash
   ./deploy-gcp.sh
   ```

#### Option 2: Manual deployment

1. **Build the Docker image:**
   ```bash
   docker build -t gcr.io/YOUR_PROJECT_ID/btc-loan-calculator .
   ```

2. **Push to Google Container Registry:**
   ```bash
   docker push gcr.io/YOUR_PROJECT_ID/btc-loan-calculator
   ```

3. **Deploy to Cloud Run:**
   ```bash
   gcloud run deploy btc-loan-calculator \
     --image gcr.io/YOUR_PROJECT_ID/btc-loan-calculator \
     --platform managed \
     --region europe-west1 \
     --allow-unauthenticated \
     --memory 512Mi \
     --cpu 1 \
     --max-instances 10 \
     --port 8080
   ```

### Local Testing

To test the Docker image locally:

```bash
# Build the image
docker build -t btc-loan-calculator .

# Run locally on port 8080
docker run -p 8080:8080 -e PORT=8080 btc-loan-calculator

# Access at http://localhost:8080
```

### Configuration

The application uses the following environment variables:

- `PORT` (required by Cloud Run) - Port to serve the application on
- Default: 8080

### Cost Optimization

The deployment is configured for cost efficiency:

- **Memory**: 512Mi (minimum recommended for React apps)
- **CPU**: 1 (minimum)
- **Max instances**: 10 (adjust based on expected traffic)
- **Min instances**: 0 (scales to zero when not used)

### Monitoring

After deployment, you can:

1. **View logs:**
   ```bash
   gcloud run logs tail btc-loan-calculator --region=europe-west1
   ```

2. **Monitor metrics:**
   - Go to Google Cloud Console > Cloud Run > Your Service
   - View request count, latency, and error rates

### Custom Domain (Optional)

To use a custom domain:

1. **Map domain:**
   ```bash
   gcloud run domain-mappings create --service=btc-loan-calculator --domain=your-domain.com --region=europe-west1
   ```

2. **Update DNS records** as instructed by the command output.

### Security Notes

- The service is deployed with `--allow-unauthenticated` for public access
- Consider adding authentication if needed for sensitive data
- The app runs with minimal privileges in the container

### Troubleshooting

**Build issues:**
- Ensure all dependencies are in package.json
- Check that the build process completes successfully locally

**Runtime issues:**
- Check Cloud Run logs for errors
- Verify PORT environment variable is being used correctly
- Ensure nginx configuration is valid

**Performance issues:**
- Consider increasing memory allocation
- Add Cloud CDN for better static asset delivery
- Monitor and adjust max instances based on traffic

### Support

For issues specific to this deployment:
1. Check the application logs
2. Verify Docker image builds and runs locally
3. Ensure Google Cloud permissions are correct 