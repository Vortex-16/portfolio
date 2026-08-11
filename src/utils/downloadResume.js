/**
 * Robust cross-platform helper to handle downloading PDF files cleanly across
 * desktop browsers and mobile webviews (iOS Safari, Android Chrome, etc.).
 */
export const handleResumeDownload = () => {
  const fileUrl = '/Resume.pdf';
  const fileName = 'Vikash_Gupta_Resume.pdf';

  // Detect mobile device (Android, iOS, iPad OS, Mobile WebViews)
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isMobile) {
    // On mobile devices (both Android Chrome and iOS Safari), blob URL downloads frequently break
    // or produce corrupt / unreadable HTML fallbacks.
    // Opening the direct PDF URL in a new tab or triggering direct location load lets the mobile OS PDF viewer
    // render the PDF natively with 100% full resolution and a working Save/Download option.
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // Desktop handling: fetch & create Blob for direct silent download
  fetch(fileUrl)
    .then((res) => res.blob())
    .then((blob) => {
      const pdfBlob = new Blob([blob], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 300);
    })
    .catch(() => {
      window.open(fileUrl, '_blank');
    });
};
