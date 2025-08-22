import { useState, useEffect, useCallback } from 'react';
import { getSortFromUrl, updateUrlWithSort, isValidSortParam } from '../utils/sortDeepLink';

export const useSortDeepLink = (defaultSort: string = "releaseNewest") => {
  const [sortBy, setSortBy] = useState<string>(() => {
    const urlSort = getSortFromUrl();
    return isValidSortParam(urlSort) ? urlSort : defaultSort;
  });

  const updateSort = useCallback((newSort: string) => {
    if (isValidSortParam(newSort) && newSort !== sortBy) {
      setSortBy(newSort);
      updateUrlWithSort(newSort);
    }
  }, [sortBy]);

  useEffect(() => {
    const handlePopState = () => {
      const urlSort = getSortFromUrl();
      if (isValidSortParam(urlSort) && urlSort !== sortBy) {
        setSortBy(urlSort);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [sortBy]);

  useEffect(() => {
    const urlSort = getSortFromUrl();
    if (isValidSortParam(urlSort) && urlSort !== sortBy) {
      updateUrlWithSort(sortBy);
    }
  }, [sortBy]);

  return {
    sortBy,
    updateSort,
  };
}; 