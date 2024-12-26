import { FormData } from '../components/yoga/type';

const API_BASE_URL = 'http://localhost:7000';

export async function fetchYogaRecommendations(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/api/yoga/recommendations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      age: parseInt(formData.age),
      conditions: formData.conditions,
      experience: formData.experience
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recommendations');
  }

  return response.json();
}