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
  },
  {
    name: 'Ubuntu',
    src: `${GITHUB_PROFILE_CDN}/Ubuntu.png`,
    label: 'First Linux',
  },
  {
    name: 'Pop!_OS',
    src: `${GITHUB_PROFILE_CDN}/PopOS.png`,
    label: 'Dev focused',
  },
  {
    name: 'EndeavourOS',
    src: `${GITHUB_PROFILE_CDN}/EndevourOS.png`,
    label: 'Daily driver',
  },
  {
    name: 'Arch Linux',
    src: `${GITHUB_PROFILE_CDN}/ArchLinux.jpeg`,
    label: 'Pure Arch',
  },
  {
    name: 'ArchCraft',
    src: `${GITHUB_PROFILE_CDN}/ArchCraft.png`,
    label: 'End game',
  },
];

/** Standalone CDN URL for the EndeavourOS logo (used in the bento card) */
export const ENDEAVOUR_OS_IMG = `${GITHUB_PROFILE_CDN}/EndevourOS.png`;
