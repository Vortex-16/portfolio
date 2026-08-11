/**
 * Cross-platform resume download handler.
 *
 * The actual fix for mobile ".html" downloads was in vercel.json:
 * the SPA catch-all rewrite "/(.*)" → "/index.html" was intercepting
 * /Resume.pdf before Vercel could serve the static file. Now the
 * catch-all excludes static asset extensions, and explicit headers
 * set Content-Type: application/pdf + Content-Disposition: attachment.
 *
 * This helper simply triggers a direct <a> click to the real PDF URL.
 */
export const handleResumeDownload = () => {
  const link = document.createElement('a');
  link.href = '/Resume.pdf';
  link.download = 'Vikash_Gupta_Resume.pdf';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

