
---

🚀 Vikash Gupta - Portfolio Website

A modern, responsive portfolio website built with React and Tailwind CSS, featuring dark/light themes, smooth animations, interactive 3D backgrounds, and real-time GitHub project integration.


---

✨ Features

💻 Responsive Design: Mobile-first layout for all devices

🌗 Dark/Light Mode:

Light: 🌿 Royal Emerald gradient

Dark: 🌌 Midnight Plum gradient


🎞️ Smooth Animations: Using Framer Motion

📡 GitHub Integration: Real-time project fetch via GitHub API

🧩 Modern UI: Dock navigation, animated text, carousels

📈 SEO Optimized: Semantic HTML and meta tags



---

🛠️ Tech Stack

Category	Tech Used

Frontend	React 19 (JSX only)
Styling	Tailwind CSS
Animation	Framer Motion
3D Graphics	Three.js
Build Tool	Vite
Icons	React Icons
SEO	React Helmet Async



---

📦 Installation

# 1. Clone the repository
git clone https://github.com/Vortex-16/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

Then, open your browser at: http://localhost:5173


---

🏗️ Build for Production

npm run build

Built files will be output to the /dist folder.


---

<details>
<summary>📁 Project Structure</summary>

  src/
├── components/ # Main sections
│ ├── Homepage.jsx # Hero section
│ ├── Projects.jsx # GitHub project showcase
│ ├── About.jsx # About section
│ └── Contact.jsx # Contact form

├── components/ui/ # Reusable UI components
│ ├── HyperspeedBackground.jsx
│ ├── VariableProximity.jsx
│ ├── Dock.jsx
│ ├── Carousel.jsx
│ └── ThemeToggle.jsx

├── hooks/
│ └── useTheme.jsx # Theme management logic

├── utils/
│ └── github.js # GitHub API integration

├── App.jsx # Root component
├── main.jsx # Application entry point
└── index.css # Global styles

</details>


---

🎨 Customization

🎭 Themes

Modify gradients in:

tailwind.config.js

src/index.css

src/hooks/useTheme.jsx



🔄 GitHub Integration

Update your username in src/utils/github.js:

const GITHUB_USERNAME = 'your-github-username';

👤 Personal Info

Update content in:

Homepage.jsx → Introduction

About.jsx → Bio

Contact.jsx → Email, social links



---

🌟 Highlighted Components

Component	Description

HyperspeedBackground	3D particle system using Three.js
VariableProximity	Text animation reacting to cursor
Dock Navigation	Mac-style nav with magnification
ThemeToggle	Persistent dark/light toggle with smooth transitions



---

📱 Responsive Design

Responsive via Tailwind breakpoints:

sm: 640px+

md: 768px+

lg: 1024px+

xl: 1280px+



---

🧪 Development Scripts

npm run dev       # Development server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint

🔐 Environment Variables

.env file for API rate limit increases:

VITE_GITHUB_TOKEN=your_github_token


---

🚀 Deployment Options

📦 Vercel

npm install -g vercel
vercel

🌍 Netlify

npm run build
# Upload /dist folder to Netlify

🐙 GitHub Pages

npm install -g gh-pages
npm run build
gh-pages -d dist


---

🤝 Contributing

1. Fork this repo


2. Create your feature branch: git checkout -b feature-name


3. Commit changes: git commit -m 'Add feature'


4. Push to the branch: git push origin feature-name


5. Open a pull request




---

📄 License

Licensed under the MIT License.


---

👤 Author

Vikash Gupta

GitHub: @Vortex-16

LinkedIn: Vikash Gupta



---

🙏 Acknowledgments

Inspired by modern developer portfolio trends

React & Tailwind community

Framer Motion for stunning animations

Three.js for 3D magic



---

Made with ❤️ using Vite + React


---

