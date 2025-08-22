export const sortParamMapping: Record<string, string> = {
  releaseNewest: "newest",
  releaseOldest: "oldest",
  accelerator: "az",
  acceleratorDesc: "za",
};

export const reverseSortParamMapping: Record<string, string> = {
  newest: "releaseNewest",
  oldest: "releaseOldest",
  az: "accelerator",
  za: "acceleratorDesc",
};

export const getSortFromUrl = (): string => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1));
  const sortParam = params.get("sort");
  
  if (!sortParam) return "releaseNewest";
  
  const sortValue = reverseSortParamMapping[sortParam];
  return isValidSortParam(sortValue) ? sortValue : "releaseNewest";
};

export const getUrlFromSort = (sortValue: string): string => {
  const sortParam = sortParamMapping[sortValue];
  if (!sortParam) return "";
  
  const currentHash = window.location.hash;
  const params = new URLSearchParams(currentHash.substring(1));
  params.set("sort", sortParam);
  
  return `#${params.toString()}`;
};

export const isValidSortParam = (sortValue: string | undefined): boolean => {
  return sortValue ? Object.keys(sortParamMapping).includes(sortValue) : false;
};

export const updateUrlWithSort = (sortValue: string): void => {
  const newHash = getUrlFromSort(sortValue);
  if (newHash && newHash !== window.location.hash) {
    window.history.pushState(null, "", newHash);
  }
};

export const getKeywordFromUrl = (): string => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1));
  const keywordParam = params.get("keyword");
  
  if (!keywordParam) return "";
  
  try {
    return decodeURIComponent(keywordParam);
  } catch {
    return "";
  }
};

export const getUrlWithKeyword = (keyword: string): string => {
  const currentHash = window.location.hash;
  const params = new URLSearchParams(currentHash.substring(1));
  
  if (keyword && keyword.trim()) {
    params.set("keyword", encodeURIComponent(keyword.trim()));
  } else {
    params.delete("keyword");
  }
  
  const result = params.toString();
  return result ? `#${result}` : "";
};

export const isValidKeyword = (keyword: string): boolean => {
  return typeof keyword === "string" && keyword.length >= 0;
};

export const updateUrlWithKeyword = (keyword: string): void => {
  const newHash = getUrlWithKeyword(keyword);
  
  if (newHash !== window.location.hash) {
    const newUrl = newHash ? window.location.pathname + newHash : window.location.pathname;
    window.history.pushState(null, "", newUrl);
  }
};

export const combineUrlParams = (sortValue: string, keyword: string): string => {
  const params = new URLSearchParams();
  
  if (sortValue && sortParamMapping[sortValue]) {
    params.set("sort", sortParamMapping[sortValue]);
  }
  
  if (keyword.trim()) {
    params.set("keyword", encodeURIComponent(keyword.trim()));
  }
  
  return `#${params.toString()}`;
};

export const updateUrlWithParams = (sortValue: string, keyword: string): void => {
  const newHash = combineUrlParams(sortValue, keyword);
  if (newHash !== window.location.hash) {
    window.history.pushState(null, "", newHash);
  }
};

export const filterParamMapping: Record<string, string> = {
  productsAndServices: "productsAndServices",
  industries: "industries",
  programmingLanguages: "languages",
};

export const getFiltersFromUrl = (): Record<string, string[]> => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1));
  const filters: Record<string, string[]> = {};
  
  Object.entries(filterParamMapping).forEach(([internalKey, urlKey]) => {
    const paramValue = params.get(urlKey);
    if (paramValue) {
      try {
        const decodedValue = decodeURIComponent(paramValue);
        filters[internalKey] = decodedValue.split(',').map(v => v.trim()).filter(v => v);
      } catch {
        filters[internalKey] = [];
      }
    }
  });
  
  return filters;
};

export const getUrlWithFilters = (filters: Record<string, string[]>): string => {
  const currentHash = window.location.hash;
  const params = new URLSearchParams(currentHash.substring(1));
  
  Object.entries(filterParamMapping).forEach(([internalKey, urlKey]) => {
    const filterValues = filters[internalKey];
    if (filterValues && filterValues.length > 0) {
      const encodedValues = filterValues.map(v => encodeURIComponent(v.trim())).join(',');
      params.set(urlKey, encodedValues);
    } else {
      params.delete(urlKey);
    }
  });
  
  const result = params.toString();
  return result ? `#${result}` : "";
};

export const isValidFilterParam = (filterValues: string[]): boolean => {
  return Array.isArray(filterValues) && filterValues.every(v => typeof v === "string" && v.trim().length > 0);
};

export const updateUrlWithFilters = (filters: Record<string, string[]>): void => {
  const newHash = getUrlWithFilters(filters);
  
  if (newHash !== window.location.hash) {
    const newUrl = newHash ? window.location.pathname + newHash : window.location.pathname;
    window.history.pushState(null, "", newUrl);
  }
};

export const combineAllUrlParams = (sortValue: string, keyword: string, filters: Record<string, string[]>): string => {
  const params = new URLSearchParams();
  
  if (sortValue && sortParamMapping[sortValue]) {
    params.set("sort", sortParamMapping[sortValue]);
  }
  
  if (keyword && keyword.trim()) {
    params.set("keyword", encodeURIComponent(keyword.trim()));
  }
  
  Object.entries(filterParamMapping).forEach(([internalKey, urlKey]) => {
    const filterValues = filters[internalKey];
    if (filterValues && filterValues.length > 0) {
      const encodedValues = filterValues.map(v => encodeURIComponent(v.trim())).join(',');
      params.set(urlKey, encodedValues);
    }
  });
  
  return `#${params.toString()}`;
};

export const updateUrlWithAllParams = (sortValue: string, keyword: string, filters: Record<string, string[]>): void => {
  const newHash = combineAllUrlParams(sortValue, keyword, filters);
  if (newHash !== window.location.hash) {
    const newUrl = newHash ? window.location.pathname + newHash : window.location.pathname;
    window.history.pushState(null, "", newUrl);
  }
};

export const getSectionFromUrl = (): string => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1));
  const sectionParam = params.get("section");
  
  if (sectionParam) {
    try {
      return decodeURIComponent(sectionParam);
    } catch {
      return "";
    }
  }
  
  // Fallback for simple section URLs like #accelerators, #featured, etc.
  const simpleSection = hash.substring(1);
  if (simpleSection && !simpleSection.includes('=')) {
    // Handle legacy #all URLs by redirecting to #accelerators
    if (simpleSection === 'all') {
      window.location.hash = 'accelerators';
      return 'accelerators';
    }
    return simpleSection;
  }
  
  return "";
};

export const getUrlWithSection = (section: string): string => {
  const currentHash = window.location.hash;
  const params = new URLSearchParams(currentHash.substring(1));
  
  if (section && section.trim()) {
    params.set("section", encodeURIComponent(section.trim()));
  } else {
    params.delete("section");
  }
  
  const result = params.toString();
  return result ? `#${result}` : "";
};

export const isValidSectionParam = (section: string): boolean => {
  return typeof section === "string" && section.trim().length > 0;
};

export const updateUrlWithSection = (section: string): void => {
  const newHash = getUrlWithSection(section);
  
  if (newHash !== window.location.hash) {
    const newUrl = newHash ? window.location.pathname + newHash : window.location.pathname;
    window.history.pushState(null, "", newUrl);
  }
};

export const combineUrlWithSection = (section: string, sortValue: string, keyword: string, filters: Record<string, string[]>): string => {
  const params = new URLSearchParams();
  
  if (section && section.trim()) {
    params.set("section", encodeURIComponent(section.trim()));
  }
  
  if (sortValue && sortParamMapping[sortValue]) {
    params.set("sort", sortParamMapping[sortValue]);
  }
  
  if (keyword && keyword.trim()) {
    params.set("keyword", encodeURIComponent(keyword.trim()));
  }
  
  Object.entries(filterParamMapping).forEach(([internalKey, urlKey]) => {
    const filterValues = filters[internalKey];
    if (filterValues && filterValues.length > 0) {
      const encodedValues = filterValues.map(v => encodeURIComponent(v.trim())).join(',');
      params.set(urlKey, encodedValues);
    }
  });
  
  return `#${params.toString()}`;
};

export const updateUrlWithAllParamsAndSection = (section: string, sortValue: string, keyword: string, filters: Record<string, string[]>): void => {
  const newHash = combineUrlWithSection(section, sortValue, keyword, filters);
  if (newHash !== window.location.hash) {
    const newUrl = newHash ? window.location.pathname + newHash : window.location.pathname;
    window.history.pushState(null, "", newUrl);
  }
}; 