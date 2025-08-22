import { useState, useEffect, useCallback } from 'react';
import { 
  getFiltersFromUrl, 
  updateUrlWithFilters
} from '../utils/sortDeepLink';

export const useFilterDeepLink = (dynamicFilterOptions: Record<string, string[]>) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(() => {
    const urlFilters = getFiltersFromUrl();
    const initialFilters: Record<string, boolean> = {};
    
    Object.entries(urlFilters).forEach(([, values]) => {
      values.forEach(value => {
        const itemId = value.toLowerCase().replace(/\s+/g, "_");
        initialFilters[itemId] = true;
      });
    });
    
    return initialFilters;
  });

  const updateFilter = useCallback((itemId: string, isChecked: boolean, category: string) => {
    setSelectedItems(prev => {
      const newSelectedItems = { ...prev };
      if (isChecked) {
        newSelectedItems[itemId] = true;
      } else {
        delete newSelectedItems[itemId];
      }
      
      const originalValue = itemId.replace(/_/g, " ");
      const currentFilters = getFiltersFromUrl();
      
      if (isChecked) {
        if (!currentFilters[category]) {
          currentFilters[category] = [];
        }
        if (!currentFilters[category].includes(originalValue)) {
          currentFilters[category].push(originalValue);
        }
      } else {
        if (currentFilters[category]) {
          currentFilters[category] = currentFilters[category].filter(v => v !== originalValue);
          if (currentFilters[category].length === 0) {
            delete currentFilters[category];
          }
        }
      }
      
      updateUrlWithFilters(currentFilters);
      
      return newSelectedItems;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedItems({});
    updateUrlWithFilters({});
  }, []);

  const clearCategoryFilters = useCallback((category: string) => {
    setSelectedItems(prev => {
      const newSelectedItems = { ...prev };
      Object.keys(newSelectedItems).forEach(itemId => {
        if (itemId.startsWith(category.toLowerCase().replace(/\s+/g, "_"))) {
          delete newSelectedItems[itemId];
        }
      });
      
      const filters = convertSelectedItemsToFilters(newSelectedItems, dynamicFilterOptions);
      updateUrlWithFilters(filters);
      
      return newSelectedItems;
    });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const urlFilters = getFiltersFromUrl();
      const newSelectedItems: Record<string, boolean> = {};
      
      Object.entries(urlFilters).forEach(([, values]) => {
        values.forEach(value => {
          const itemId = value.toLowerCase().replace(/\s+/g, "_");
          newSelectedItems[itemId] = true;
        });
      });
      
      if (JSON.stringify(newSelectedItems) !== JSON.stringify(selectedItems)) {
        setSelectedItems(newSelectedItems);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [selectedItems]);

  return {
    selectedItems,
    updateFilter,
    clearFilters,
    clearCategoryFilters,
  };
};

const convertSelectedItemsToFilters = (selectedItems: Record<string, boolean>, dynamicFilterOptions: Record<string, string[]>): Record<string, string[]> => {
  const filters: Record<string, string[]> = {
    productsAndServices: [],
    industries: [],
    programmingLanguages: [],
  };

  Object.entries(selectedItems).forEach(([itemId, isSelected]) => {
    if (isSelected) {
      const originalValue = itemId.replace(/_/g, " ");
      
      Object.entries(dynamicFilterOptions).forEach(([category, items]) => {
        if (items.includes(originalValue)) {
          filters[category].push(originalValue);
        }
      });
    }
  });

  return filters;
}; 