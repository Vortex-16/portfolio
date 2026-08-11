/**
 * Cross-platform resume download handler.
 *
 * Uses fetch + blob with explicit application/pdf MIME type to guarantee
 * the browser saves a real PDF file, not the SPA index.html fallback.
 * This works identically on desktop and mobile, local dev and production.
 */
export const handleResumeDownload = async () => {
  const pdfUrl = '/Resume.pdf';
  const saveName = 'Vikash_Gupta_Resume.pdf';

  try {
    const response = await fetch(pdfUrl);

    // Guard: if the server returned HTML (SPA fallback) instead of a PDF,
    // the content-type will contain "text/html". Detect and fall back.
    const contentType = response.headers.get('content-type') || '';
    if (!response.ok || contentType.includes('text/html')) {
      // SPA catch-all intercepted the request — open raw URL in new tab
      window.open(pdfUrl, '_blank');
      return;
    }

    const blob = await response.blob();
    // Force the correct MIME regardless of what the server sent
    const pdfBlob = new Blob([blob], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(pdfBlob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = saveName;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();

    // Cleanup after a short delay to let the download start
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    }, 500);
  } catch {
    // Network error — open in new tab as last resort
    window.open(pdfUrl, '_blank');
  }
};

