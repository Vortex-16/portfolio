<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Portfolio Project Instructions

This is a modern React portfolio website built with:

## Tech Stack
- **React** (JSX only, no TypeScript)
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Three.js** for 3D background effects
- **Vite** for development and building

## Key Features
- Dark/light mode theme switching with custom gradients
- Animated components using Framer Motion
- 3D particle background with Three.js
- Responsive design with Beanto Grid system
- GitHub API integration for project showcase
- Interactive UI components (Dock navigation, Carousel, etc.)

## Theme System
- **Light Mode**: Royal Emerald gradient (`emerald-400` → `emerald-600` → `emerald-800`)
- **Dark Mode**: Midnight Plum gradient (`#1e1e2f` → `#4c2a59` → `#9e4bba`)
- Theme preference stored in localStorage
- Smooth transitions between themes

## Component Architecture
- `src/components/` - Main page sections (Homepage, Projects, About, Contact)
- `src/components/ui/` - Reusable UI components (Dock, Carousel, ThemeToggle, etc.)
- `src/hooks/` - Custom React hooks (useTheme)
- `src/utils/` - Utility functions (GitHub API integration)

## Development Guidelines
- Use functional components with hooks
- Follow React best practices
- Maintain responsive design across all screen sizes
- Ensure smooth animations and transitions
- Keep accessibility in mind
- Use semantic HTML elements

## Portfolio Sections
1. **Homepage**: Hero section with animated text and CTA
2. **Projects**: GitHub projects showcase with carousel
3. **About**: Personal information and skills
4. **Contact**: Contact form and social links

When working on this project, prioritize user experience, smooth animations, and modern web development practices.
