# How to Publish Your Website (For Free)

## Option 1: Netlify (Free Starter Plan)
Netlify **IS free** for personal projects, but they may try to upsell you. Look for the "Starter" or "Free" plan.

1.  Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2.  Drag and drop your `WEB-AQUA` folder.
3.  If it asks for payment, **skip it** or look for a "Skip" / "Continue with Free" link. You do NOT need to pay for a simple website.

## Option 2: GitHub Pages (Completely Free & Standard)
This is the standard way for developers and is **always free** for public projects.

### Step 1: Create a Repository
1.  Log in to [GitHub.com](https://github.com/).
2.  Click the **+** icon (top right) -> **New repository**.
3.  Name it `aquabiotics-website`.
4.  Make sure it is **Public**.
5.  Click **Create repository**.

### Step 2: Upload Your Files
**If you have Git installed (Recommended):**
1.  Open your terminal in this folder (`c:\Users\VN\WEB-AQUA`).
2.  Run these commands one by one:
    ```bash
    git init
    git add .
    git commit -m "My website ready"
    git branch -M main
    git remote add origin https://github.com/<YOUR-USERNAME>/aquabiotics-website.git
    git push -u origin main
    ```
    *(Replace `<YOUR-USERNAME>` with your actual GitHub username)*

**If you prefer "Upload files" on the web:**
1.  On your new GitHub repository page, click **uploading an existing file**.
2.  Drag all your files (`index.html`, `logo.png`, etc.) there.
3.  Click **Commit changes**.

### Step 3: Activate Pages
1.  Go to your repository **Settings** tab.
2.  On the left sidebar, click **Pages**.
3.  Under **Branch**, select `main` and click **Save**.
4.  Wait about 1-2 minutes. Your URL will appear at the top (e.g., `https://<your-username>.github.io/aquabiotics-website/`).

## How to Link Your Own Domain (e.g., www.aquabiotics.com)
If you already own a domain, follow these two steps:

### 1. Configure GitHub
1.  Go back to your repository **Settings > Pages**.
2.  Scroll down to **Custom domain**.
3.  Type your domain (e.g., `www.aquabiotics.com`) and click **Save**.
4.  Check the box **Enforce HTTPS** (it might take a few minutes to become clickable).

### 2. Configure Your Domain Provider (GoDaddy, Namecheap, etc.)
Log in to where you bought your domain and find the **DNS Settings**. Add these two records:

**A. CNAME Record (For 'www')**
-   **Type:** `CNAME`
-   **Name/Host:** `www`
-   **Value/Target:** `<your-username>.github.io` (e.g., `pepito.github.io`)

**B. A Records (For the root domain without 'www')**
Create **4 separate A records** pointing to GitHub's IPs:
-   **Type:** `A` | **Name:** `@` | **Value:** `185.199.108.153`
-   **Type:** `A` | **Name:** `@` | **Value:** `185.199.109.153`
-   **Type:** `A` | **Name:** `@` | **Value:** `185.199.110.153`
-   **Type:** `A` | **Name:** `@` | **Value:** `185.199.111.153`

*Note: DNS changes can take up to 24 hours to propagate, but usually work in minutes.*
