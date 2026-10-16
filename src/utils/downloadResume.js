/**
 * Cross-platform resume download helper.
 * Triggers direct native browser link click for the latest PDF resume.
 */
export const handleResumeDownload = () => {
  const a = document.createElement('a');
  a.href = '/Vikash%20Kr%20Gupta-%20Software%20Dev.pdf';
  a.download = 'Vikash_Kr_Gupta_Software_Dev.pdf';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

