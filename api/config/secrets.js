const productionSecrets = {
  GOOGLE_API_KEY: 'AIzaSyBDInyj7t14FPxIG_TTCtErBPo25nE60G8',
  GOOGLE_CLIENT_ID: '210769895584-4fbq6vdkp7jhnh3k930kamb67sahi447.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'yJ-VzcziBz4n33WHp-uJ7zRr',
  SESSION_SECRET: 'yw8kzqEKGtBFChBxKxbl',
  GOOGLE_CALLBACK_URL: 'http://finance.increscent.org/auth/google/callback'
};

export const getSecrets = () => {
  const environment = process.env.NODE_ENV;
  switch (environment) {
    case 'development':
      return {
        ...productionSecrets,
        GOOGLE_CALLBACK_URL: 'http://localhost:45678/auth/google/callback'
      };
    default:
      return productionSecrets;
  }
};
