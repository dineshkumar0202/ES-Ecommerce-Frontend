# Ecommerce Server

This is the backend server for the E-commerce frontend.

## Setup

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file (already created) with:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/freelance
    FREEPIK_API_KEY=FPSX9eeb26f1be1427e9773dfd2d7e3f4447
    ```

## Running

1.  Start the server:
    ```bash
    npm run dev
    ```

## Admin Credentials
- **Email:** `admin@atoz.com`
- **Password:** `admin pannel`

## API Endpoints

-   `GET /api/posts`: Get all freelancer posts.
-   `POST /api/posts`: Create a new post.
-   `POST /api/posts/generate-image`: Generate an image using Freepik AI.
