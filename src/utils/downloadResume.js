/**
 * Robust cross-platform helper to handle downloading PDF files cleanly across
 * desktop browsers and mobile webviews (iOS Safari, Android Chrome, etc.).
 */
export const handleResumeDownload = async () => {
  const fileUrl = '/Resume.pdf';
  const fileName = 'Vikash_Gupta_Resume.pdf';

  // Detect iOS / iPadOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isIOS) {
    // iOS Safari does not support the 'download' attribute on Blob URLs properly.
    // Opening directly in a new window triggers native iOS PDF preview with quick download / save to files option.
    window.open(fileUrl, '_blank');
    return;
  }

  try {
    const res = await fetch(fileUrl);
    if (!res.ok) throw new Error('Failed to fetch file');
    
    // Explicitly enforce application/pdf content type blob
    const rawBlob = await res.blob();
    const pdfBlob = new Blob([rawBlob], { type: 'application/pdf' });
    
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.setAttribute('type', 'application/pdf');
    
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 200);
  } catch (e) {
    // Fallback: direct window open for PDF viewer
    window.open(fileUrl, '_blank');
  }
};
