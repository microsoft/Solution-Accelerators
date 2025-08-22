const fileTypeIconMap: Record<string, string | null> = {
  pptx: "/csa-sas-ext-landingpage/icons/PowerPoint.svg",
  ppt: "/csa-sas-ext-landingpage/icons/PowerPoint.svg",
  xlsx: "/csa-sas-ext-landingpage/icons/Excel.svg",
  xls: "/csa-sas-ext-landingpage/icons/Excel.svg",
  docx: "/csa-sas-ext-landingpage/icons/Word.svg",
  doc: "/csa-sas-ext-landingpage/icons/Word.svg",
  pdf: "/csa-sas-ext-landingpage/icons/pdf.svg",
  default: null,
};

export const getLinkIcon = (href: string, fileType?: string): string | null => {
  try {
    if (fileType && fileTypeIconMap[fileType.toLowerCase()]) {
      return fileTypeIconMap[fileType.toLowerCase()];
    }

    // Check for service-specific icons
    try {
      const urlObj = new URL(href);
      const hostname = urlObj.hostname.toLowerCase();

      if (hostname.includes('github.com')) return '/csa-sas-ext-landingpage/icons/github.svg';
      if (hostname.includes('figma.com')) return '/csa-sas-ext-landingpage/icons/figma.svg';
      if (hostname.includes('youtube.com')) return '/csa-sas-ext-landingpage/icons/youtube.svg';
      if (hostname.includes('docs.microsoft.com')) return '/csa-sas-ext-landingpage/icons/docs.svg';
      if (hostname.includes('learn.microsoft.com')) return '/csa-sas-ext-landingpage/icons/learn.svg';
    } catch {
      // Ignore URL parsing errors
    }

    // Check file extension
    const extMatch = href.match(/\.(pptx?|xlsx?|docx?|pdf)$/i);
    if (extMatch) {
      const ext = extMatch[1].toLowerCase();
      return fileTypeIconMap[ext] || null;
    }

    return null;
  } catch {
    return null;
  }
}; 