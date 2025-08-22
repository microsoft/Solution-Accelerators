import { useState, useEffect, useCallback } from 'react';
import { 
  getKeywordFromUrl, 
  updateUrlWithKeyword, 
  isValidKeyword
} from '../utils/sortDeepLink';

export const useSearchDeepLink = (defaultKeyword: string = "") => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    const urlKeyword = getKeywordFromUrl();
    return isValidKeyword(urlKeyword) ? urlKeyword : defaultKeyword;
  });

  const updateSearch = useCallback((newKeyword: string) => {
    if (!isValidKeyword(newKeyword)) {
      return;
    }

    setSearchQuery(newKeyword);
    updateUrlWithKeyword(newKeyword);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    updateUrlWithKeyword("");
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const urlKeyword = getKeywordFromUrl();
      if (isValidKeyword(urlKeyword) && urlKeyword !== searchQuery) {
        setSearchQuery(urlKeyword);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [searchQuery]);

  return {
    searchQuery,
    updateSearch,
    clearSearch,
  };
}; 