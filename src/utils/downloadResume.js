/**
 * Cross-platform resume download handler.
 *
 * Uses fetch + blob with explicit application/pdf MIME type to guarantee
 * the browser saves a real PDF file, not the SPA index.html fallback.
 * This works identically on desktop and mobile, local dev and production.
 */
/**
 * Cross-platform resume download handler.
 * Fetches the verified raw PDF directly from GitHub CDN to bypass host SPA routing issues completely.
 */
export const handleResumeDownload = async () => {
  const githubRawPdfUrl = 'https://raw.githubusercontent.com/Vortex-16/portfolio/main/public/Resume.pdf';
  const localPdfUrl = '/Resume.pdf';
  const saveName = 'Vikash_Gupta_Resume.pdf';

  try {
    // 1. Fetch directly from GitHub Raw CDN (guaranteed pure binary application/pdf)
    let res = await fetch(githubRawPdfUrl);
    if (!res.ok) {
      // Fallback to local path if GitHub CDN is unreachable
      res = await fetch(localPdfUrl);
    }

    const contentType = res.headers.get('content-type') || '';
    if (!res.ok || contentType.includes('text/html')) {
      // Direct opening as fallback
      window.open(githubRawPdfUrl, '_blank');
      return;
    }

    const blob = await res.blob();
    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(pdfBlob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = saveName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    }, 500);
  } catch {
    window.open(githubRawPdfUrl, '_blank');
  }
};

