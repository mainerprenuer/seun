# Connecting Seuninsight.com.ng to Vercel

Follow these steps to link your custom domain to your hosted project.

## Step 1: Vercel Dashboard Configuration
1. Open your project on the [Vercel Dashboard](https://vercel.com/dashboard).
2. Navigate to **Settings** > **Domains**.
3. In the input field, type `Seuninsight.com.ng` and click **Add**.
4. Vercel will ask if you want to add `www.Seuninsight.com.ng` as well. **Select the recommended option** to add both (redirecting `www` to the root).

## Step 2: DNS Configuration (at your Domain Registrar)
Vercel will now show a "Validating" status with specific DNS records. You need to log in to your domain registrar (e.g., GoDaddy, Namecheap, etc.) and add these:

### For the Root Domain (`Seuninsight.com.ng`):
- **Type**: `A` Record
- **Name**: `@`
- **Value**: `76.76.21.21`

### For the WWW subdomain (`www.Seuninsight.com.ng`):
- **Type**: `CNAME` Record
- **Name**: `www`
- **Value**: `cname.vercel-dns.com`

## Step 3: Production Environment Variables
Don't forget to update your **Environment Variables** on Vercel so your authentication work correctly:
1. Go to **Settings** > **Environment Variables**.
2. Add or Update:
   - `NEXTAUTH_URL`: `https://Seuninsight.com.ng`
   - `DATABASE_URL`: (Your MongoDB connection string)
   - `CLOUDINARY_*`: (Your Cloudinary credentials)

## Step 4: Verification
Once the DNS records propagate (this can take from a few minutes to 24 hours), the status on Vercel will turn **Green (Valid)**. Your site will then be live at **https://Seuninsight.com.ng**! 🚀🔥✨
