# YouTube Clone

A responsive YouTube clone built with React and Vite. The project recreates the core YouTube browsing experience, including video search, recommendations, video playback, and sharing.

## Live Demo

https://youtube-project-react.netlify.app/

## Features

* Responsive YouTube-style interface
* Search videos using the YouTube Data API
* Browse video results
* Watch videos through an embedded player
* Display recommended videos
* Show video metadata such as views and upload time
* Share videos using a share modal
* Copy video links to the clipboard
* Client-side routing with React Router
* Responsive layouts for different screen sizes

## Tech Stack

* React
* Vite
* JavaScript
* Tailwind CSS
* React Router
* YouTube Data API

## Project Structure

The application is divided into reusable React components and utility functions.

```text
src/
├── components/
├── pages/
├── utils/
├── App.jsx
└── main.jsx
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your API key

Create a `.env` file in the project root:

```env
VITE_YOUTUBE_API_KEY=your_api_key_here
```

You can obtain a YouTube Data API key through Google Cloud.

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL shown by Vite.

## Build for Production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## What I Learned

This project helped me practice:

* Building reusable React components
* Managing state with React hooks
* Fetching and handling data from an external REST API
* Working with React Router
* Creating responsive layouts with Tailwind CSS
* Handling asynchronous operations
* Working with environment variables in Vite
* Designing layouts that adapt to different screen sizes
* Structuring a React application into reusable components

## Disclaimer

This project is created for educational and portfolio purposes. It is not affiliated with or endorsed by YouTube or Google.
