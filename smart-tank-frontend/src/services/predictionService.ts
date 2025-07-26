import AuthService from './authService';

export interface PredictionRequest {
  model: string;
  temp: number;
  ph: number;
  gh: number;
  kh: number;
  nitrate: number;
}

export interface FishPrediction {
  binomial_name: string;
  image_url: string;
  name: string;
  percentage: number;
  scientific_classification?: Record<string, unknown>;
}

const API_URL = 'http://localhost:8083/api/Aquariums';

export const getPredictions = async (data: PredictionRequest): Promise<FishPrediction[]> => {
  console.log('Sending prediction request:', data);
  console.log('API URL:', `${API_URL}/predict`);
  
  const token = AuthService.getToken();
  console.log('Auth token available:', !!token);
  
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    if (!response.ok) {
      let errorMessage = 'Failed to get predictions';
      
      try {
        const errorText = await response.text();
        console.error('Error response text:', errorText);
        
        if (errorText.trim().startsWith('{') || errorText.trim().startsWith('[')) {
          const errorData = JSON.parse(errorText);
          console.error('Server error response:', errorData);
          errorMessage = errorData.message || errorData.error || errorData.title || errorMessage;
        } else {
          errorMessage = errorText || `HTTP ${response.status}: ${response.statusText}`;
        }
      } catch (parseError) {
        console.error('Could not parse error response:', parseError);
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      
      throw new Error(errorMessage);
    }

    const responseText = await response.text();
    console.log('Success response text:', responseText);
    
    const result = JSON.parse(responseText);
    console.log('Parsed prediction response:', result);
    
    // Return the array of fish predictions
    return Array.isArray(result) ? result : [];
    
  } catch (error) {
    console.error('Prediction API error:', error);
    
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Failed to get fish predictions. Please try again.');
    }
  }
};
