export const SECTION_MAPPING: Record<string, string> = {
  'featured': 'featured',
  'accelerators': 'accelerators',
  'differentiators': 'differentiators',
  'how-it-works': 'how-it-works',
  'success-stories': 'customer-trust'
};

export const REVERSE_SECTION_MAPPING: Record<string, string> = {
  'featured': 'featured',
  'accelerators': 'accelerators',
  'differentiators': 'differentiators',
  'how-it-works': 'how-it-works',
  'customer-trust': 'success-stories'
};

export const getSectionFromId = (sectionId: string): string => {
  return REVERSE_SECTION_MAPPING[sectionId] || sectionId;
};

export const getSectionIdFromSection = (section: string): string => {
  return SECTION_MAPPING[section] || section;
}; 