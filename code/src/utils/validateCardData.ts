type CardData = {
  accelerator: string;
  solutionPlays: string[];
  solutionAreas: string[];
  productsAndServices: string[];
  assets?: { label: string; href: string }[];
};

export const validateCardData = (data: CardData) => {
  // Validate required fields
  if (!data.accelerator) {
    throw new Error('Card data missing required field: accelerator');
  }
  if (!Array.isArray(data.solutionPlays)) {
    throw new Error('Card data missing required field: solutionPlays (must be array)');
  }
  if (!Array.isArray(data.solutionAreas)) {
    throw new Error('Card data missing required field: solutionAreas (must be array)');
  }
  if (!Array.isArray(data.productsAndServices)) {
    throw new Error('Card data missing required field: productsAndServices (must be array)');
  }

  // Validate assets if present
  if (data.assets) {
    if (!Array.isArray(data.assets)) {
      throw new Error('Card data assets must be an array');
    }
    data.assets.forEach((asset, index) => {
      if (!asset.label) {
        throw new Error(`Asset at index ${index} missing required field: label`);
      }
      if (!asset.href) {
        throw new Error(`Asset at index ${index} missing required field: href`);
      }
      try {
        new URL(asset.href);
      } catch {
        throw new Error(`Asset at index ${index} has invalid href: ${asset.href}`);
      }
    });
  }

  // Validate array contents
  data.solutionPlays.forEach((item, index) => {
    if (typeof item !== 'string') {
      throw new Error(`Solution play at index ${index} must be a string`);
    }
  });

  data.solutionAreas.forEach((item, index) => {
    if (typeof item !== 'string') {
      throw new Error(`Solution area at index ${index} must be a string`);
    }
  });

  data.productsAndServices.forEach((item, index) => {
    if (typeof item !== 'string') {
      throw new Error(`Product/service at index ${index} must be a string`);
    }
  });
}; 