# Deployment Guide

This guide explains how to deploy the Employee & Task Management System. We will deploy the **Backend** to **Render** and the **Frontend** to **Netlify** (or Vercel).

## 1. Backend Deployment (Render)

Render is a cloud platform that offers a free tier for Node.js services.

### Steps:
1.  **Push your code to GitHub**:
    *   Create a new repository on GitHub.
    *   Push this entire project (`prou` folder) to the repository.

2.  **Create a Web Service on Render**:
    *   Go to [dashboard.render.com](https://dashboard.render.com/).
    *   Click **New +** -> **Web Service**.
    *   Connect your GitHub repository.
    *   **Root Directory**: `backend` (Important!)
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
    *   **Environment Variables**:
        *   Add a key `NODE_ENV` with value `production`.
    *   Click **Create Web Service**.

3.  **Get your Backend URL**:
    *   Once deployed, Render will give you a URL (e.g., `https://my-backend.onrender.com`).
    *   **Copy this URL**.

*Note: On the free tier, the database (SQLite) is ephemeral. This means if the server restarts (which happens on free tier), your data will be reset. For a persistent database, you would typically use PostgreSQL (Render offers a managed Postgres), but for this assignment, the ephemeral SQLite is likely acceptable as a demo.*

---

## 2. Frontend Deployment (Netlify)

Netlify is excellent for deploying static React sites.

### Steps:
1.  **Create a New Site on Netlify**:
    *   Go to [app.netlify.com](https://app.netlify.com/).
    *   Click **Add new site** -> **Import from existing project**.
    *   Connect your GitHub repository.

2.  **Configure Build Settings**:
    *   **Base directory**: `frontend`
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`

3.  **Set Environment Variables**:
    *   Click on **Show advanced** or go to **Site settings > Environment variables** after creation.
    *   Add a new variable:
        *   Key: `VITE_API_URL`
        *   Value: `https://my-backend.onrender.com` (The URL you got from Render in Step 1).
    *   *Important: Make sure there is NO trailing slash at the end of the URL.*

4.  **Deploy**:
    *   Click **Deploy Site**.

---

## 3. Verification

1.  Open your Netlify URL (e.g., `https://my-app.netlify.app`).
2.  The frontend should load.
3.  It will try to fetch data from your Render backend.
    *   *Note: The first request might take 30-60 seconds because Render puts free services to sleep. Be patient!*
4.  Once loaded, you should see your data.

## Alternative: Railway (Easier All-in-One)

If you prefer a single platform, **Railway** is very easy:

1.  Go to [railway.app](https://railway.app/).
2.  Start a new project from your GitHub repo.
3.  Railway will detect both folders.
4.  For the Backend service, add a **Volume** mounted at `/app/backend` to persist the SQLite database file! This solves the data loss issue.
5.  Set the `VITE_API_URL` variable in the Frontend service to point to the Backend service's domain.
