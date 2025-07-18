const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'https://agrotechsafra-api-fjckebcmetdwh5am.brazilsouth-01.azurewebsites.net',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default API_CONFIG;