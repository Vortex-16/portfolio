// ─────────────────────────────────────────────────────────────────────────────
// OS Journey Constants
// Used by src/components/pages/OSJourney.jsx
// ─────────────────────────────────────────────────────────────────────────────

import { GITHUB_PROFILE_CDN } from './github';

/**
 * Ordered list of operating systems in the learning progression.
 * Each entry has:
 *   name  – display name
 *   src   – fully-qualified CDN image URL
 *   label – short tagline shown beneath the logo
 */
export const OS_PROGRESSION = [
  {
    name: 'Windows',
    src: `${GITHUB_PROFILE_CDN}/Windows.png`,
    label: 'Started here',
    url: 'https://www.microsoft.com/windows',
  },
  {
    name: 'Ubuntu',
    src: `${GITHUB_PROFILE_CDN}/Ubuntu.png`,
    label: 'First Linux',
    url: 'https://ubuntu.com/',
  },
  {
    name: 'Pop!_OS',
    src: `${GITHUB_PROFILE_CDN}/PopOS.png`,
    label: 'Dev focused',
    url: 'https://pop.system76.com/',
  },
  {
    name: 'EndeavourOS',
    src: `${GITHUB_PROFILE_CDN}/EndevourOS.png`,
    label: 'Daily driver',
    url: 'https://endeavouros.com/',
  },
  {
    name: 'Arch Linux',
    src: `${GITHUB_PROFILE_CDN}/ArchLinux.jpeg`,
    label: 'Pure Arch',
    url: 'https://archlinux.org/',
  },
  {
    name: 'ArchCraft',
    src: `${GITHUB_PROFILE_CDN}/ArchCraft.png`,
    label: 'End game',
    url: 'https://archcraft.io/',
  },
];

/** Standalone CDN URL for the EndeavourOS logo (used in the bento card) */
export const ENDEAVOUR_OS_IMG = `${GITHUB_PROFILE_CDN}/EndevourOS.png`;

// ─────────────────────────────────────────────────────────────────────────────
// OS_JOURNEY — the chronological story, rendered as an animated GSAP carousel.
// Each milestone:
//   id       – stable key
//   period   – short time label (badge)
//   title    – headline of this chapter
//   phase    – 'windows' | 'linux-first' | 'transition' | 'linux' | 'struggle' | 'now'
//   accent   – hex accent colour driving the card's theme
//   platform – the OS/environment in play
//   icon     – key resolved to a react-icon inside the component
//   osImg    – optional logo URL (CDN distro logo or local asset)
//   desc     – the narrative for this chapter
//   tech     – tools/skills tags
// ─────────────────────────────────────────────────────────────────────────────
export const OS_JOURNEY = [
  {
    id: 'java-bluej',
    period: 'Class 10 · School',
    title: 'The First Line',
    phase: 'windows',
    accent: '#3b82f6',
    platform: 'Windows',
    icon: 'java',
    osImg: '/java.png',
    desc: 'It all began in the school computer lab — writing my very first programs in Java using BlueJ on Windows. The spark that started everything.',
    tech: ['Java', 'BlueJ', 'Windows'],
  },
  {
    id: 'first-laptop',
    period: 'Class 11',
    title: 'First Laptop & Arduino',
    phase: 'windows',
    accent: '#14b8a6',
    platform: 'Windows',
    icon: 'arduino',
    desc: 'Got my first personal laptop and reached beyond the screen — picking up Arduino electronics alongside my Java & BlueJ work. My first taste of software talking to hardware.',
    tech: ['Java', 'BlueJ', 'Arduino'],
  },
  {
    id: 'bluej-arduino',
    period: 'Class 12 · till Feb 2024',
    title: 'Wrapping Up BlueJ',
    phase: 'windows',
    accent: '#3b82f6',
    platform: 'Windows',
    icon: 'java',
    osImg: '/java.png',
    desc: 'Closed out the BlueJ & Java chapter while still tinkering with Arduino — coding on Windows all the way through to February 2024.',
    tech: ['Java', 'BlueJ', 'Arduino'],
  },
  {
    id: 'vscode',
    period: 'May 2024',
    title: 'Enter VS Code',
    phase: 'windows',
    accent: '#0ea5e9',
    platform: 'Windows',
    icon: 'code',
    desc: 'Graduated from BlueJ to VS Code on Windows and went full-stack-curious — C, C++, and the web trio: HTML, CSS, JavaScript.',
    tech: ['VS Code', 'C / C++', 'HTML / CSS / JS'],
  },
  {
    id: 'linux-first',
    period: '2025 · College, 2nd Sem',
    title: 'First Taste of Linux',
    phase: 'linux-first',
    accent: '#06b6d4',
    platform: 'Windows → College Server',
    icon: 'terminal',
    desc: 'Still on Windows, but using WinSCP to reach the college server — and there, in a real shell, I met vi, cat, ls and mkdir. My first true Linux experience.',
    tech: ['WinSCP', 'vi', 'bash', 'ls · cat · mkdir'],
  },
  {
    id: 'overheat',
    period: 'The Trigger',
    title: 'Heat & Curiosity',
    phase: 'transition',
    accent: '#f59e0b',
    platform: 'Windows (struggling)',
    icon: 'fire',
    desc: 'At home the laptop guzzled RAM and ran hot — constant overheating. That frustration became the push I needed to look beyond Windows and explore operating systems.',
    tech: ['High RAM', 'Overheating', 'Curiosity'],
  },
  {
    id: 'dual-boot',
    period: 'Crossing Over',
    title: 'The Dual-Boot Leap',
    phase: 'transition',
    accent: '#f59e0b',
    platform: 'Windows + Linux',
    icon: 'dualboot',
    desc: 'I set up a dual boot — keeping Windows for the trackpad gestures I loved — and re-lit an old dream: to build my own OS one day and join Samsung.',
    tech: ['Dual Boot', 'GRUB', 'The Dream'],
  },
  {
    id: 'endeavouros',
    period: 'Total Control',
    title: 'EndeavourOS on a Pentium',
    phase: 'linux',
    accent: '#7c3aed',
    platform: 'EndeavourOS',
    icon: 'endeavour',
    osImg: `${GITHUB_PROFILE_CDN}/EndevourOS.png`,
    desc: 'EndeavourOS opened my eyes — deep customization even on low-end hardware. I installed it on an old dual-core Pentium PC and made it mine. (RIP — that machine is gone now.)',
    tech: ['EndeavourOS', 'Ricing', 'Low-end PC'],
  },
  {
    id: 'popos',
    period: 'Chasing Trends',
    title: 'Pop!_OS — Too Quiet',
    phase: 'linux',
    accent: '#48b9c7',
    platform: 'Pop!_OS',
    icon: 'pop',
    osImg: `${GITHUB_PROFILE_CDN}/PopOS.png`,
    desc: 'Following the YouTube hype, I tried Pop!_OS on the laptop. Clean — but it felt boring. I wanted something I could shape from the ground up.',
    tech: ['Pop!_OS', 'GNOME', 'Exploration'],
  },
  {
    id: 'arch',
    period: 'The Hard Way',
    title: 'Arch Linux (the real one)',
    phase: 'linux',
    accent: '#1793d1',
    platform: 'Arch Linux',
    icon: 'arch',
    osImg: `${GITHUB_PROFILE_CDN}/ArchLinux.jpeg`,
    desc: 'After real effort, I dual-booted into pure Arch Linux. Building the system piece by piece taught me more than any tutorial ever could.',
    tech: ['Arch Linux', 'pacman', 'X11'],
  },
  {
    id: 'arch-wayland',
    period: 'Going Modern',
    title: 'Arch on Wayland',
    phase: 'linux',
    accent: '#1793d1',
    platform: 'Arch · Wayland',
    icon: 'arch',
    osImg: `${GITHUB_PROFILE_CDN}/ArchLinux.jpeg`,
    desc: 'Migrated my Arch setup to Wayland — smoother, modern, and a fresh canvas for a fully customized desktop.',
    tech: ['Wayland', 'Hyprland', 'Ricing'],
  },
  {
    id: 'grub-battle',
    period: 'The Battle',
    title: 'Hardware vs GRUB',
    phase: 'struggle',
    accent: '#ef4444',
    platform: 'Windows / Arch (HDD)',
    icon: 'power',
    desc: 'A laptop hardware fault — battery or related — kept killing Windows mid-work. Each "Windows ran into a problem" wiped my GRUB, with Arch living on the HDD. Booting off the old drive grew painfully slow.',
    tech: ['GRUB wipe', 'HDD boot', 'Hardware fault'],
  },
  {
    id: 'archcraft',
    period: 'Rebuild',
    title: 'Archcraft Era',
    phase: 'struggle',
    accent: '#a855f7',
    platform: 'Archcraft',
    icon: 'archcraft',
    osImg: `${GITHUB_PROFILE_CDN}/ArchCraft.png`,
    desc: 'I switched to Archcraft — lean, fast, beautiful out of the box. For a while it was perfect… until the same hardware gremlin came knocking again.',
    tech: ['Archcraft', 'Openbox', 'Minimal'],
  },
  {
    id: 'now',
    period: 'Now',
    title: 'Regrouping on Windows',
    phase: 'now',
    accent: '#10b981',
    platform: 'Windows (temporary)',
    icon: 'now',
    osImg: `${GITHUB_PROFILE_CDN}/Windows.png`,
    desc: 'Currently back on Windows. The plan: fix the hardware after exams, then restore Archcraft + GRUB and keep building toward my own OS. The journey continues.',
    tech: ['Windows', 'Next: fix hardware', 'Then: Archcraft + GRUB'],
  },
  {
    id: 'fullstack',
    period: 'Today',
    title: 'Full-Stack & Vibe Engineer',
    phase: 'now',
    accent: '#22c55e',
    platform: 'MERN · Flutter · Cloud',
    icon: 'rocket',
    desc: 'Today I build end-to-end: full-stack MERN apps and cross-platform mobile with Flutter, React Native & Expo, shipping on GCP & Firebase. I live in the terminal — ssh, tmux, nano, git and scripting — and engineer secure applications as a pro "vibe coder", while leveling up on HLD & LLD system design. Still chasing the dream: my own OS, and Samsung.',
    tech: ['MERN', 'Flutter', 'React Native', 'Expo', 'GCP', 'Firebase', 'ssh · tmux · nano', 'git · scripting', 'Secure Apps', 'HLD & LLD'],
  },
];

