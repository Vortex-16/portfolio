export const filters = [
    "All",
    "Personal",
    "Group",
    "Hackathon",
    "Client Work",
    "Assignment",
    "YouTube"
];

// ─────────────────────────────────────────────────────────────────────────────
// ADD / EDIT YOUR PROJECTS HERE
// Each project needs: id, title, description, image, category, techStack,
//   demo (or null), github (or null), featured (bool)
// ─────────────────────────────────────────────────────────────────────────────
export const projects = [

    // ── CLIENT WORK ──────────────────────────────────────────────────────────

    {
        id: "client-1",
        title: "AIMS",
        description: "Attendance and information management system built for academic institutions. Features role-based dashboards and real-time data tracking.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        category: "Client Work",
        techStack: ["HTML", "CSS", "JavaScript"],
        demo: "https://vortex-16.github.io/aims/",
        github: "https://github.com/Vortex-16/aims-2-0",
        featured: true
    },
    {
        id: "client-2",
        title: "AIMS 2.0",
        description: "Upgraded version of the AIMS platform with improved UI, faster queries, and enhanced analytics for institutional management.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        category: "Client Work",
        techStack: ["TypeScript", "Next.js", "Tailwind"],
        demo: "https://aims-2-0.vercel.app/",
        github: "https://github.com/Vortex-16/aims",
        featured: true
    },
    {
        id: "client-3",
        title: "Birthday Wish Web",
        description: "A personalized, animated birthday wish website with custom visuals and interactive confetti effects.",
        image: "https://images.unsplash.com/photo-1513151241214-ca2a1f5903d3?q=80&w=2070&auto=format&fit=crop",
        category: "Client Work",
        techStack: ["HTML", "CSS", "JavaScript"],
        demo: null,
        github: "https://github.com/Vortex-16/Arman1",
        featured: false
    },
    {
        id: "client-4",
        title: "Maa-Janki Hospital",
        description: "Hospital management and information website for Dr. Amrit's clinic, featuring appointment booking and department listings.",
        image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2028&auto=format&fit=crop",
        category: "Client Work",
        techStack: ["React", "Tailwind CSS"],
        demo: "https://maa-janki-hospital-dr-amrit.vercel.app/",
        github: "https://github.com/Vortex-16/Maa-Janki-Hospital-Dr.-Amrit-",
        featured: false
    },
    {
        id: "client-5",
        title: "CosyTouch",
        description: "Elegant brand and product showcase website for an interior design / soft-furnishings client.",
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop",
        category: "Client Work",
        techStack: ["HTML", "CSS", "JavaScript"],
        demo: "https://cosytouch.onrender.com",
        github: "https://github.com/Vortex-16/cosytouch",
        featured: false
    },
    {
        id: "client-6",
        title: "Soumen — Portfolio",
        description: "Personal portfolio website for a client, featuring smooth scroll transitions and a modern dark aesthetic.",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop",
        category: "Client Work",
        techStack: ["React", "Framer Motion"],
        demo: null,
        github: "https://github.com/Vortex-16/Soumen-Portfolio",
        featured: false
    },
    {
        id: "client-7",
        title: "SpiceNPaste",
        description: "Restaurant splash and ordering page with rich food photography, menu highlights, and a contact form.",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
        category: "Client Work",
        techStack: ["HTML", "CSS", "JavaScript"],
        demo: "https://spicenpaste.com",
        github: "https://github.com/Vortex-16/SpiceNPaste",
        featured: false
    },
    {
        id: "client-8",
        title: "",
        description: "",
        image: "",
        category: "Client Work",
        techStack: [""],
        demo: "",
        github: "",
        featured: false
    },

    // ── GROUP / HACKATHON ─────────────────────────────────────────────────────

    {
        id: "grp-1",
        title: "College Coding Club Website",
        description: "Official website for the college coding club featuring event listings, leaderboard, and member profiles.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
        category: "Group",
        techStack: ["React", "Tailwind CSS"],
        demo: "https://stcet-coding-cell.onrender.com",
        github: "https://github.com/Vortex-16/College-Coding-Club-Website",
        featured: true
    },
    {
        id: "grp-2",
        title: "Arynox LLM",
        description: "ARYNOX is a cutting-edge education platform designed to provide students with 24/7 academic support through a Socratic AI Tutoring system. Instead of simply giving answers, ARYNOX guides students through their course materials using hints and inquiry-based learning, ensuring academic integrity and deeper understanding.",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop",
        category: "Hackathon",
        techStack: ["React", "Node.js"],
        demo: "https://arynox-llm.onrender.com/",
        github: "https://github.com/Vortex-16/arynox.llm",
        featured: true
    },
    {
        id: "grp-3",
        title: "Punarchakra",
        description: "Punarchakra (E-BIN) is a smart web-based platform that transforms e-waste into value using AI-assisted classification and reward-driven recycling.",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop",
        category: "Group/Hackathon",
        techStack: ["React", "Node.js"],
        demo: "https://punarchakra.vercel.app/",
        github: "https://github.com/Vortex-16/punarchakra",
        featured: true
    },
    {
        id: "grp-4",
        title: "ChainTorque",
        description: "Revolutionary D2C Cad Service: Featuring Web3 Marketplace, In-browser CAD editor & CAD Completion AI Copilot",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop",
        category: "Hackathon",
        techStack: ["React", "Node.js"],
        demo: "https://chaintorque-landing.onrender.com/",
        github: "https://github.com/Dealer-09/Chain-Torque",
        featured: false
    },
    {
        id: "grp-5",
        title: "Codigo",
        description: "Competitive coding event management platform supporting live judging, leaderboards, and team registration.",
        image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop",
        category: "Group",
        techStack: ["React", "MongoDB"],
        demo: "https://codigo-94nz.onrender.com/",
        github: "https://github.com/Vortex-16/codigo",
        featured: true
    },
    {
        id: "grp-6",
        title: "PragatiPath",
        description: "PragatiPath leverages AI to create personalized learning journeys, interactive content, and progress tracking for farmers of all levels.",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070&auto=format&fit=crop",
        category: "Hackathon",
        techStack: ["React", "Node.js"],
        demo: "https://pragatipath.onrender.com/",
        github: "https://github.com/Vortex-16/PragatiPath",
        featured: true
    },
    {
        id: "grp-7",
        title: "NEP Path",
        description: "Career guidance platform aligned with the National Education Policy, helping students navigate learning paths.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
        category: "Group",
        techStack: ["React", "Firebase"],
        demo: "https://nep-path.vercel.app/",
        github: "https://github.com/Vortex-16/nep_path",
        featured: false
    },
    {
        id: "grp-8",
        title: "TrustED",
        description: "Hackathon project focused on blood bank availability and real-time donor–recipient matching in emergencies.",
        image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=2083&auto=format&fit=crop",
        category: "Group",
        techStack: ["React", "Node.js", "MongoDB"],
        demo: "https://trust-ed-eight.vercel.app/",
        github: "https://github.com/Vortex-16/truered",
        featured: false
    },
    {
        id: "grp-9",
        title: "VerdeScan",
        description: "AI-powered plant disease detection app that scans leaf photos and recommends treatment using a CNN model.",
        image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2070&auto=format&fit=crop",
        category: "Hackathon",
        techStack: ["Python", "React"],
        demo: null,
        github: "https://github.com/Vortex-16/verdescan",
        featured: false
    },
    {
        id: "grp-10",
        title: "AeroVista",
        description: "Drone fleet management dashboard showing live telemetry, geofencing, and flight path planning on an interactive map.",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070&auto=format&fit=crop",
        category: "Group",
        techStack: ["React", "Leaflet.js", "WebSocket"],
        demo: null,
        github: "https://github.com/Vortex-16/aerovista",
        featured: false
    },
    {
        id: "grp-11",
        title: "Prashikashan",
        description: "E-learning portal for government exam preparation with mock tests, progress tracking, and video lessons.",
        image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop",
        category: "Hackathon",
        techStack: ["Next.js", "PostgreSQL", "Tailwind"],
        demo: null,
        github: "https://github.com/Vortex-16/prashikashan",
        featured: false
    },
    {
        id: "grp-12",
        title: "DocuSage",
        description: "RAG-powered document assistant that lets you chat with any PDF, summarise long reports, and extract key insights.",
        image: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?q=80&w=2070&auto=format&fit=crop",
        category: "Hackathon",
        techStack: ["Python", "LangChain", "React", "ChromaDB"],
        demo: null,
        github: "https://github.com/Vortex-16/docusage",
        featured: false
    },
    {
        id: "grp-13",
        title: "CodeBattle Arena",
        description: "Real-time 1v1 competitive coding platform with a live code editor, test case runner, and Elo ranking system.",
        image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=2070&auto=format&fit=crop",
        category: "Group",
        techStack: ["React", "Socket.io", "Node.js"],
        demo: null,
        github: "https://github.com/Vortex-16/codebattle-arena",
        featured: false
    },
    // {
    //     id: "grp-11",
    //     title: "GDG Leaderboard",
    //     description: "Live event leaderboard website for GDG (Google Developer Groups) coding events with real-time score updates.",
    //     image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop",
    //     category: "Group/Hackathon",
    //     techStack: ["React", "Firebase"],
    //     demo: null,
    //     github: "https://github.com/Vortex-16/gdg-leaderboard-website",
    //     featured: false
    // },

    // ── PERSONAL ──────────────────────────────────────────────────────────────

    {
        id: "personal-1",
        title: "This Portfolio",
        description: "My personal developer portfolio built with React, GSAP, and Framer Motion — featuring a custom OS-inspired UI.",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop",
        category: "Personal",
        techStack: ["React", "GSAP", "Framer Motion", "Tailwind"],
        demo: "https://vikash.is-a.dev",
        github: "https://github.com/Vortex-16/portfolio",
        featured: true
    },
    {
        id: "personal-2",
        title: "Arch Portfolio",
        description: "Portfolio website for an Linux Lover(Arch), Works on Alt instead Of Super",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop",
        category: "Personal",
        techStack: ["HTML", "CSS", "JavaScript"],
        demo: "https://vikashos.netlify.app",
        github: "https://github.com/Vortex-16/personal-portfolio",
        featured: true
    },
    {
        id: "personal-3",
        title: "Divi",
        description: "This project is a web-based platform designed for [Fun & Voice Gentared Search.",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop",
        category: "Personal",
        techStack: ["HTML", "CSS", "JavaScript"],
        demo: "https://vortex-16.github.io/DIVI/",
        github: "https://github.com/Vortex-16/DIVI",
        featured: false
    },
    {
        id: "personal-4",
        title: "AI-Tutor Server Performance Analysis Tool",
        description: "A comprehensive bash script for analyzing server performance statistics on Linux systems.",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop",
        category: "Personal",
        techStack: ["Bash"],
        demo: null,
        github: "https://github.com/Vortex-16/AI-Tutor-Server-Performance-Analysis-Tool",
        featured: false
    },
    {
        id: "personal-5",
        title: "3D-Slider",
        description: "",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop",
        category: "Personal",
        techStack: ["HTML", "CSS", "JavaScript"],
        demo: "https://vortex-16.github.io/3d_flowers_slider",
        github: "https://github.com/Vortex-16/3d_flowers_slider",
        featured: false
    },
    {
        id: "personal-6",
        title: "Calculator",
        description: "",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop",
        category: "Personal",
        techStack: ["HTML", "CSS", "JavaScript"],
        demo: "https://vortex-16.github.io/calculator",
        github: "https://github.com/Vortex-16/calculator",
        featured: false
    },
    {
        id: "personal-7",
        title: "Periodic_Table",
        description: "",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop",
        category: "Personal",
        techStack: ["HTML", "CSS", "JavaScript"],
        demo: "https://vortex-16.github.io/Periodic_Table",
        github: "https://github.com/Vortex-16/Periodic_Table",
        featured: false
    },
    {
        id: "personal-8",
        title: "DAV",
        description: "",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop",
        category: "Personal",
        techStack: ["HTML", "CSS", "JavaScript"],
        demo: "https://vikashvirtualassistant.netlify.app/",
        github: "https://github.com/Vortex-16/DAV",
        featured: false
    },
    {
        id: "personal-9",
        title: "qr-code",
        description: "",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2064&auto=format&fit=crop",
        category: "Personal",
        techStack: ["HTML", "CSS", "JavaScript"],
        demo: "https://vortex-16.github.io/qr-code",
        github: "https://github.com/Vortex-16/qr-code",
        featured: false
    },


    // ── ASSIGNMENT ────────────────────────────────────────────────────────────

    {
        id: "assign-1",
        title: "Python Calculator",
        description: "A feature-rich terminal calculator built in Python supporting arithmetic, algebra, and history logging.",
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=2187&auto=format&fit=crop",
        category: "Assignment",
        techStack: ["Python"],
        demo: null,
        github: "https://github.com/Vortex-16/python-calculator",
        featured: false
    },
    {
        id: "assign-2",
        title: "Student Data Management",
        description: "Python CLI application for managing student records with CRUD operations, search, and CSV export.",
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2132&auto=format&fit=crop",
        category: "Assignment",
        techStack: ["Python"],
        demo: null,
        github: "https://github.com/Vortex-16/student-data-management-python",
        featured: false
    },
    {
        id: "assign-3",
        title: "Innovation Lab",
        description: "College innovation lab project showcase platform with submission portal and faculty review workflow.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
        category: "Assignment",
        techStack: ["HTML", "CSS", "JavaScript"],
        demo: null,
        github: "https://github.com/Vortex-16/innovationlab",
        featured: false
    },
    {
        id: "assign-4",
        title: "KTJ Assignment-1",
        description: "Technical assignment submitted for Kshitij (KTJ), IIT Kharagpur's annual techno-management fest.",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
        category: "Assignment",
        techStack: ["HTML", "CSS"],
        demo: null,
        github: "https://github.com/Vortex-16/ktj-ass",
        featured: false
    },
    {
        id: "assign-5",
        title: "KTJ Assignment-2",
        description: "Technical assignment submitted for Kshitij (KTJ), IIT Kharagpur's annual techno-management fest.",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
        category: "Assignment",
        techStack: ["HTML", "CSS", "JavaScript"],
        demo: null,
        github: "https://github.com/Vortex-16/ktj-ass",
        featured: false
    },
    {
        id: "assign-6",
        title: "KTJ Assignment-3",
        description: "Technical assignment submitted for Kshitij (KTJ), IIT Kharagpur's annual techno-management fest.",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
        category: "Assignment",
        techStack: ["React"],
        demo: null,
        github: "https://github.com/Vortex-16/ktj-ass",
        featured: false
    },
    {
        id: "assign-7",
        title: "KTJ Assignment-4",
        description: "Technical assignment submitted for Kshitij (KTJ), IIT Kharagpur's annual techno-management fest.",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop",
        category: "Assignment",
        techStack: ["API", "React", "Tailwind"],
        demo: null,
        github: "https://github.com/Vortex-16/ktj-ass",
        featured: false
    },

    // ── YOUTUBE ───────────────────────────────────────────────────────────────

    {
        id: "yt-1",
        title: "DSA in C & Python",
        description: "Code repository for my YouTube series on Data Structures & Algorithms — covers arrays, trees, graphs, and dynamic programming.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
        category: "YouTube",
        techStack: ["C", "Python"],
        demo: null,
        github: "https://github.com/Vortex-16/c-and-python-shardha-maam-dsa",
        featured: false
    }

];
