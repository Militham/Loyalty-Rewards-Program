import type { BasicOffer, Offer } from '../types';

// This function now calls a WordPress backend endpoint instead of Google Gemini directly.
// The WordPress backend will securely handle the API key and the call to the Gemini API.

export const generateOfferDescriptions = async (baseOffers: BasicOffer[]): Promise<Offer[]> => {
  const apiConfig = (window as any).brewRewardsData?.api;

  if (!apiConfig || !apiConfig.root) {
    throw new Error("WordPress API configuration is missing from window.brewRewardsData.");
  }
  
  const endpoint = `${apiConfig.root}generate-offers`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // A nonce is crucial for securing and authenticating requests in WordPress
        'X-WP-Nonce': apiConfig.nonce || '', 
      },
      body: JSON.stringify({ offers: baseOffers }),
    });

    if (!response.ok) {
      // Try to parse error message from backend, otherwise use status text
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`WordPress API error: ${errorData.message || 'Unknown error'}`);
    }

    const data: { offers: Offer[] } = await response.json();

    if (!data.offers || !Array.isArray(data.offers)) {
      throw new Error("Invalid response format from the WordPress API.");
    }

    // Ensure all original offers are present in the response as a fallback
    const enhancedOffers = baseOffers.map(baseOffer => {
        const found = data.offers.find(o => o.id === baseOffer.id);
        return found || { ...baseOffer, description: 'A special offer just for you!' };
    });

    return enhancedOffers;
    
  } catch (error) {
    console.error("Error calling WordPress backend:", error);
    throw new Error("Failed to generate offer descriptions via the WordPress backend.");
  }
};