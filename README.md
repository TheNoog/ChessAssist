# ChessAssist - AI Powered Chess Analysis

ChessAssist is an interactive, web-based chess tool designed for players of all levels who want to analyze chess positions, set up custom scenarios, and get insights from an AI chess engine. Built with Next.js, React, ShadCN UI components, Tailwind CSS, and Genkit for AI, this application provides a modern and responsive interface for all your chess analysis needs.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [How to Use ChessAssist](#how-to-use-chessassist)
  - [1. Understanding the Interface](#1-understanding-the-interface)
  - [2. Setting Up the Board](#2-setting-up-the-board)
  - [3. Controlling Board State](#3-controlling-board-state)
  - [4. Selecting Player to Move](#4-selecting-player-to-move)
  - [5. Analyzing the Position](#5-analyzing-the-position)
  - [6. Interpreting Analysis Results](#6-interpreting-analysis-results)
  - [7. Tips for Effective Use](#7-tips-for-effective-use)
- [Deployment](#deployment)
  - [Vercel](#vercel)
  - [Netlify](#netlify)
  - [Firebase Hosting](#firebase-hosting)
  - [General Build Steps](#general-build-steps)
- [Contributing](#contributing)
- [License](#license)

## Features

*   **Interactive Board Editor:** Easily set up any chess position by dragging pieces or using the piece selector to place pieces on the board.
*   **FEN Support:** The board state is represented by Forsyth-Edwards Notation (FEN), allowing for easy import/export of positions.
*   **AI-Powered Analysis:** Leverage Google's Gemini model via Genkit to get the top 3 move suggestions for any given position, along with evaluation scores.
*   **Player to Move Selector:** Specify whether it's White's or Black's turn to move before analyzing the position.
*   **Visual Move Highlights:** Suggested moves from the AI are visually highlighted on the board with numbered indicators.
*   **Responsive Design:** Optimized for use on both desktop and mobile devices.
*   **Modern UI:** Clean and intuitive user interface built with ShadCN UI components and Tailwind CSS.
*   **Help & Guidance:** In-app tooltips and usage guide.

## Tech Stack

*   **Frontend:** Next.js (App Router), React, TypeScript
*   **UI Components:** ShadCN UI
*   **Styling:** Tailwind CSS
*   **AI Integration:** Genkit, Google Gemini
*   **State Management:** React Hooks (useState, useEffect, useCallback)
*   **Chess Logic:** Custom utility functions for FEN conversion and board manipulation.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/FirebaseExtended/genkit-samples.git
    cd genkit-samples/nextjs-shadcn-chess
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project (copy `.env.example` if it exists, or create it manually).
    You'll need a Google AI API key for Genkit to function:
    ```env
    GOOGLE_API_KEY=YOUR_GOOGLE_AI_API_KEY
    ```
    You can obtain a Google AI API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running Locally

1.  **Start the Genkit development server (for AI flows):**
    Open a terminal and run:
    ```bash
    npm run genkit:dev
    # or
    yarn genkit:dev
    ```
    This will typically start the Genkit developer UI on `http://localhost:4000`.

2.  **Start the Next.js development server:**
    Open another terminal and run:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This will start the Next.js application, usually on `http://localhost:9002` (as per `package.json`).

Open your browser and navigate to `http://localhost:9002` (or the port specified in your terminal) to see the application.

## How to Use ChessAssist

ChessAssist is designed to be intuitive, but here's a detailed guide to help you get the most out of its features:

### 1. Understanding the Interface

The main page is divided into a few key sections:

*   **Header:** Contains the application title ("ChessAssist") and links to the GitHub repository and a help/usage guide.
*   **Board Editor (Left/Top):** This is where the interactive chessboard is displayed. You can also find controls here to select pieces for placement and manage the board state (clear/reset).
*   **Move Analysis Panel (Right/Bottom):** This panel allows you to select whose turn it is to move ("Player to Move") and initiate the AI analysis. The results of the analysis (suggested moves and scores) will also appear here.
*   **Footer:** Provides a brief description of the tool and its technologies.

### 2. Setting Up the Board

There are several ways to set up a specific chess position:

*   **Dragging Pieces:** If pieces are already on the board, you can click and drag them to new squares. This is useful for making moves or rearranging an existing position.
*   **Using the Piece Selector:**
    1.  In the "Board Editor" section, locate the "Select Piece" panel.
    2.  Click on the desired piece (e.g., White King, Black Pawn, or the Eraser). The selected piece will be highlighted.
    3.  Click on any square on the chessboard to place the selected piece there. If you selected the Eraser, clicking a square will remove any piece on it.
    4.  To stop placing pieces, click the selected piece in the "Select Piece" panel again to deselect it, or select another piece.
*   **Initial Position:** The board loads with the standard starting chess position by default.

### 3. Controlling Board State

*   **Clear Board:** Click the "Clear Board" button (with the trash icon) in the "Board Editor" section to remove all pieces from the chessboard, resulting in an empty board.
*   **Reset Board:** Click the "Reset Board" button (with the rotate icon) in the "Board Editor" section to return the board to the standard chess starting position. This will also set the player to move to White.

The FEN (Forsyth-Edwards Notation) string representing the current board position is updated automatically as you make changes. While not directly editable in the UI, this FEN is used internally for analysis.

### 4. Selecting Player to Move

Before running an analysis, it's crucial to specify whose turn it is:

1.  Locate the "Position Analysis" panel.
2.  Under "Player to Move," select either "White" or "Black" using the radio buttons.
    This selection will be reflected in the FEN string sent to the AI for analysis.

### 5. Analyzing the Position

Once the board is set up to your desired position and you've selected the correct player to move:

1.  Click the "Analyse Position" button (with the brain icon) in the "Position Analysis" panel.
2.  The button will show a loading state ("Analysing position...") while the AI processes the request. This may take a few seconds.

### 6. Interpreting Analysis Results

After the AI completes its analysis:

*   **Suggested Moves:** The top 3 suggested moves will be displayed in the "Position Analysis" panel. Each move is listed with its algebraic notation (e.g., "e2e4", "Nf3d4") and a corresponding evaluation score.
*   **Evaluation Score:**
    *   A positive score (e.g., `+0.5`, `+2.1`) indicates an advantage for White.
    *   A negative score (e.g., `-0.3`, `-1.8`) indicates an advantage for Black.
    *   A score around `0.0` suggests an equal position.
    *   The magnitude of the score indicates the size of the advantage. For example, `+1.0` is roughly equivalent to being up one pawn.
*   **Board Highlights:** The suggested moves are also visualized on the chessboard:
    *   The starting square of a move is highlighted with a semi-transparent color.
    *   The destination square of a move is highlighted with a more opaque color and displays a number (1, 2, or 3) corresponding to its rank in the suggested move list.

If the AI doesn't suggest any specific moves or if the board is in a terminal state (like checkmate or stalemate), a message will indicate this.

### 7. Tips for Effective Use

*   **Experiment with Puzzles:** Set up tactical puzzles or endgame scenarios to see how the AI approaches them.
*   **Analyze Your Games:** Recreate positions from your own games to understand critical moments and missed opportunities.
*   **Double-Check Setup:** Before analyzing, always ensure the board position and player to move are correctly set.
*   **Understand AI Limitations:** While powerful, AI suggestions are based on its training data and algorithms. They provide strong guidance but might not always align with every human strategic nuance or long-term plan. Use them as a learning tool.
*   **Use the Help Button:** If you're unsure how a feature works, click the "Help" icon (question mark) in the header for a quick usage guide toast notification.

## Deployment

You can deploy this Next.js application to various platforms. Here are a few common options:

### Vercel

Vercel is the platform built by the creators of Next.js and offers seamless deployment.

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Go to [Vercel](https://vercel.com) and sign up or log in.
3.  Click "Add New..." -> "Project".
4.  Import your Git repository.
5.  Vercel will automatically detect that it's a Next.js project and configure the build settings.
6.  **Environment Variables:** You'll need to add your `GOOGLE_API_KEY` as an environment variable in the Vercel project settings.
    *   Go to your project settings -> Environment Variables.
    *   Add `GOOGLE_API_KEY` with its value.
7.  Click "Deploy".

### Netlify

Netlify is another popular platform for deploying static sites and serverless functions.

1.  Push your code to a Git repository.
2.  Go to [Netlify](https://netlify.com) and sign up or log in.
3.  Click "Add new site" -> "Import an existing project".
4.  Connect to your Git provider and select your repository.
5.  Netlify should detect Next.js. Build command is typically `npm run build` or `yarn build`. The publish directory is usually `.next`.
6.  **Environment Variables:** Add `GOOGLE_API_KEY` in your site settings under "Build & deploy" -> "Environment".
7.  Click "Deploy site".
    *Note: For Next.js features like API Routes (which Genkit might rely on indirectly if you expand its usage) or Image Optimization, you might need to install the Netlify Next.js plugin (`@netlify/plugin-nextjs`) or ensure it's automatically handled by Netlify.*

### Firebase Hosting

If you're already in the Firebase ecosystem, Firebase Hosting is a great option.

1.  **Install Firebase CLI:**
    ```bash
    npm install -g firebase-tools
    ```
2.  **Login to Firebase:**
    ```bash
    firebase login
    ```
3.  **Initialize Firebase in your project:**
    ```bash
    firebase init hosting
    ```
    *   Select an existing Firebase project or create a new one.
    *   Set your public directory to: `out` (if exporting a static site) or configure for SSR/Next.js. For a full Next.js app with server-side features, you'll typically deploy to Cloud Functions or Cloud Run and use Hosting to serve static assets and rewrite traffic.
    *   **For a full Next.js app (recommended):**
        *   During `firebase init hosting`, when asked "Configure as a single-page app (rewrite all urls to /index.html)?", choose **No**.
        *   You'll need to set up Firebase to work with a Node.js backend for Next.js. This often involves Cloud Functions for Firebase.
        *   Modify `firebase.json` to rewrite all requests to your Next.js SSR function:
            ```json
            {
              "hosting": {
                "public": ".next", // Or 'public' if you have a static export
                "ignore": [
                  "firebase.json",
                  "**/.*",
                  "**/node_modules/**"
                ],
                "rewrites": [
                  {
                    "source": "**",
                    "function": "nextServer" // Or your Cloud Function name
                  }
                ]
              }
              // ... other firebase configs like functions
            }
            ```
        *   You will need to define a Firebase Function (e.g., `nextServer`) that serves your Next.js app. This typically involves an `index.js` in your functions directory. Consult Firebase documentation for the latest best practices on deploying Next.js apps.
4.  **Set Environment Variables for Functions (if using SSR):**
    If you're deploying the Next.js app via Firebase Functions (for SSR), you'll need to set your `GOOGLE_API_KEY` for the function:
    ```bash
    firebase functions:config:set genkit.google_api_key="YOUR_GOOGLE_AI_API_KEY"
    # Or use a different naming convention if preferred, then access in your function
    ```
    Access it in your function code (e.g., `functions.config().genkit.google_api_key`). Ensure your Genkit initialization in the cloud function environment can access this.
5.  **Build your Next.js app:**
    ```bash
    npm run build
    ```
6.  **Deploy to Firebase Hosting:**
    ```bash
    firebase deploy --only hosting
    # If deploying functions as well:
    # firebase deploy
    ```

### General Build Steps

Regardless of the platform, the general process involves:

1.  **Building the Next.js app:**
    ```bash
    npm run build
    ```
    This creates an optimized production build in the `.next` directory.
2.  **Setting Environment Variables:** Ensure `GOOGLE_API_KEY` is available to your deployment environment. How you set this varies by hosting provider (see platform-specific instructions above).

## Contributing

Contributions are welcome! If you have suggestions for improvements or find any bugs, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourAmazingFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some YourAmazingFeature'`).
5.  Push to the branch (`git push origin feature/YourAmazingFeature`).
6.  Open a Pull Request.

Please ensure your code adheres to the existing style and that all tests pass.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE.md](LICENSE.md) file for details (assuming one exists in the main Genkit samples repository, otherwise default to Apache 2.0).
```