const baseUrl = import.meta.env.VITE_API_URL;

export const apiRequest = async (
  endpoint,
  { method = 'GET', data = null } = {}
) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };

  const options = {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) })
  };

  try {
    const res = await fetch(`${baseUrl}/${endpoint}`, options);
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`❌ ${res.status} - ${msg}`);
    }

    if (res.status === 204) return null; // No Content
    return await res.json();
  } catch (err) {
    console.error('❌ Error en apiRequest:', err);
    throw err;
  }
};
