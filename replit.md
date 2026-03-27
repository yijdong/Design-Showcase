# Design Showcase

A Chinese-language design portfolio showcase website built with Node.js and Express.

## Stack

- **Runtime**: Node.js 20
- **Server**: Express 5
- **Frontend**: Vanilla HTML/CSS (served as static files from `public/`)
- **Port**: 5000

## Project Structure

```
├── server.js          # Express server, serves static files on port 5000
├── public/
│   └── index.html     # Single-page design showcase frontend
├── package.json
└── replit.md
```

## Running the App

```bash
npm start
```

The app runs on `0.0.0.0:5000`.

## Features

- Hero section with gradient typography
- Portfolio/works grid with 6 showcase cards
- Skills section with progress bars
- About/stats section
- Sticky navigation with blur backdrop
- Dark theme with floating blob animations
- Fully responsive layout

## Deployment

Configured for autoscale deployment with `node server.js`.
