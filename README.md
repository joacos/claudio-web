# Claudio Gallardo Arquitectura - Portfolio

A modern, minimalist architectural portfolio for Claudio Gallardo, designed to showcase high-end residential and commercial projects.

## 🚀 Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, and JavaScript (ES6+).
- **Bundler**: [Vite](https://vitejs.dev/) for fast development and optimized builds.
- **CMS**: [Sanity.io](https://www.sanity.io/) for content management.
- **Deployment**: Configured for automated deployment (GitHub Actions).

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the local development server:
```bash
npm run dev
```

### Production Build

Create an optimized bundle:
```bash
npm run build
```

The output will be in the `dist` folder.

## 📁 Project Structure

- `index.html`: Entry point.
- `main.js`: Core logic for fetching projects from Sanity and handling the UI.
- `style.css`: Modern, mobile-first design system.
- `studio/`: Sanity Studio configuration and schemas.

## 📝 Content Management

Project data is managed through Sanity Studio. To access the local studio:
1. Navigate to the `studio` folder: `cd studio`
2. Run `npm install` (first time only)
3. Run `npm run dev`
4. Visit `localhost:3333`

---
Managed by [todovirtual](https://todovirtual.cl)
