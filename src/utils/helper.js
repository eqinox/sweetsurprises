const SUCCESS = "SUCCESS";
const CLEAR = "CLEAR";

export const actionCreator = {
    success: (type, payload) => action(type.SUCCESS, { payload }),
    clear: (type) => action(type.CLEAR),
};

export const createRequestTypes = (base) => {
    return [SUCCESS, CLEAR].reduce((acc, type) => {
        acc[type] = `${base}_${type}`;
        return acc;
    }, {});
};

export const action = (type, payload = {}) => {
    return { type, ...payload };
};

// Determine the base URL for images based on the environment or any specific logic
export const imageUrlBase = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_DB_HOST // Use Strapi host in development
  : ''; // In production, the image URL from Strapi should be the full S3 URL