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
  scientific_classification: Record<string, unknown>;
}

const API_URL = 'http://localhost:8083/api/Aquariums';

export const getPredictions = async (data: PredictionRequest): Promise<FishPrediction[]> => {
  console.log('Sending prediction request:', data);
  console.log('API URL:', `${API_URL}/predict`);
  
  const token = AuthService.getToken();
  console.log('Auth token available:', !!token);
  
  // Wrap the data in the expected structure
  const requestBody = {
    predictionRequest: data
  };
  
  console.log('Wrapped request body:', requestBody);
  console.log('JSON stringified body:', JSON.stringify(requestBody));
  
  let response: Response;
  
  try {
    // First, let's try a simple POST to see if that works better
    console.log('Attempting POST request first...');
    response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(requestBody),
    });
    
    console.log('POST Response status:', response.status);
    
    // If POST fails, try XMLHttpRequest GET
    if (!response.ok && response.status !== 200) {
      console.log('POST failed, trying XMLHttpRequest GET...');
      response = await new Promise<Response>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${API_URL}/predict`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('accept', '*/*');
        
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }
        
        xhr.onload = function() {
          console.log('XMLHttpRequest status:', xhr.status);
          console.log('XMLHttpRequest response headers:', xhr.getAllResponseHeaders());
          console.log('XMLHttpRequest response text:', xhr.responseText);
          resolve(new Response(xhr.responseText, {
            status: xhr.status,
            statusText: xhr.statusText,
            headers: new Headers(xhr.getAllResponseHeaders().split('\r\n').reduce((acc, line) => {
              const parts = line.split(': ');
              if (parts.length === 2) {
                acc[parts[0]] = parts[1];
              }
              return acc;
            }, {} as Record<string, string>))
          }));
        };
        
        xhr.onerror = function() {
          console.error('XMLHttpRequest network error');
          reject(new Error('XMLHttpRequest network error'));
        };
        
        xhr.ontimeout = function() {
          console.error('XMLHttpRequest timeout');
          reject(new Error('XMLHttpRequest timeout'));
        };
        
        // Set timeout to 30 seconds
        xhr.timeout = 30000;
        
        const bodyString = JSON.stringify(requestBody);
        console.log('Sending XMLHttpRequest with wrapped body:', bodyString);
        console.log('Body length:', bodyString.length);
        xhr.send(bodyString);
      });
    }
  } catch (error) {
    console.error('Both POST and XMLHttpRequest failed, trying query parameters fallback:', error);
    
    // Final fallback: Try as query parameters
    const queryParams = new URLSearchParams();
    
    // Try flattening the structure for query params
    queryParams.append('predictionRequest.model', data.model);
    queryParams.append('predictionRequest.temp', data.temp.toString());
    queryParams.append('predictionRequest.ph', data.ph.toString());
    queryParams.append('predictionRequest.gh', data.gh.toString());
    queryParams.append('predictionRequest.kh', data.kh.toString());
    queryParams.append('predictionRequest.nitrate', data.nitrate.toString());
    
    console.log('Trying GET with nested query parameters:', queryParams.toString());
    response = await fetch(`${API_URL}/predict?${queryParams}`, {
      method: 'GET',
      headers: {
        'accept': '*/*',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    });
    
    console.log('Query params response status:', response.status);
  }

  console.log('Final response status:', response.status);
  console.log('Final response headers:', response.headers);

  if (!response.ok) {
    let errorMessage = 'Failed to get predictions';
    let responseText = '';
    
    try {
      // Try to get the response text first
      responseText = await response.text();
      console.error('Error response text:', responseText);
      
      // Try to parse as JSON if possible
      if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
        const errorData = JSON.parse(responseText);
        console.error('Server error response (parsed):', errorData);
        errorMessage = errorData.message || errorData.error || errorData.title || errorMessage;
      } else {
        errorMessage = responseText || errorMessage;
      }
    } catch (parseError) {
      console.error('Could not parse error response:', parseError);
      errorMessage = responseText || `HTTP ${response.status}: ${response.statusText}`;
    }
    
    throw new Error(errorMessage);
  }

  let responseText: string;
  try {
    responseText = await response.text();
    console.log('Success response text:', responseText);
  } catch (error) {
    console.error('Failed to read response text:', error);
    throw new Error('Failed to read server response');
  }

  let result: FishPrediction[];
  try {
    result = JSON.parse(responseText);
    console.log('Parsed prediction response:', result);
  } catch (error) {
    console.error('Failed to parse JSON response:', error);
    console.error('Raw response was:', responseText);
    throw new Error('Invalid JSON response from server');
  }
  
  // Return the array of fish predictions
  return Array.isArray(result) ? result : [];
};
