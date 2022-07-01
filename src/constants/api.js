const getApiLinkByEnv = (localUrl, deployUrl) => {
    if (process.env.NODE_ENV === 'production') {
        return localUrl;
    }
    return localUrl;
};

export const API_ENDPOINT = getApiLinkByEnv('http://localhost:2412/api/');
export const DOMAIN = getApiLinkByEnv('http://localhost:2412/');
