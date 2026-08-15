# How to Connect Custom Domain on GitHub Pages

This project is fully configured for GitHub Pages with Custom Domain support. Follow these steps to host this website on your custom domain (e.g. `usareviewstore.com`).

---

## Step 1: Set Your Custom Domain in `public/CNAME`

Open the `/public/CNAME` file in this repository and replace `usareviewstore.com` with your actual custom domain (e.g., `yourdomain.com` or `www.yourdomain.com`).

```text
yourdomain.com
```

---

## Step 2: Configure Your Domain DNS Records

Log in to your Domain Registrar (Namecheap, Cloudflare, GoDaddy, Porkbun, etc.) and add the following DNS records for your domain:

### For Apex / Root Domain (e.g., `yourdomain.com`):
Add **4 A-Records** pointing `@` to GitHub's official IP addresses:

| Type | Host | Points To / Value |
| ---- | ---- | ----------------- |
| A    | @    | `185.199.108.153` |
| A    | @    | `185.199.109.153` |
| A    | @    | `185.199.110.153` |
| A    | @    | `185.199.111.153` |

### For `www` Subdomain (e.g., `www.yourdomain.com`):
Add a **CNAME Record**:

| Type  | Host | Points To / Value          |
| ----- | ---- | -------------------------- |
| CNAME | www  | `<your-github-username>.github.io` |

---

## Step 3: Build & Push to GitHub

1. Run the static build command:
   ```bash
   npm run build:static
   ```
2. Commit and push all project files (including `public/CNAME` and `public/.nojekyll`) to your GitHub Repository:
   ```bash
   git add .
   git commit -m "Configure custom domain and professional UI update"
   git push origin main
   ```

---

## Step 4: Enable Custom Domain in GitHub Repository Settings

1. Go to your GitHub Repository on `github.com`.
2. Click **Settings** -> **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - Source: Select **Deploy from a branch** (or select GitHub Actions if using automated actions).
   - Branch: Select `main` (or `gh-pages`) and folder `/root` or `/dist`.
4. Under **Custom domain**:
   - Enter your domain name (e.g. `yourdomain.com`).
   - Click **Save**.
5. Check the box **Enforce HTTPS** (GitHub will issue a free SSL certificate automatically within a few minutes).

Done! Your professional website is now ready and live on your custom domain.
