/**
 * Cross-platform resume download helper.
 * Triggers direct native browser link click for /Resume.pdf.
 */
export const handleResumeDownload = () => {
  const a = document.createElement('a');
  a.href = '/Resume.pdf';
  a.download = 'Vikash_Gupta_Resume.pdf';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

