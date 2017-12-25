export const setAuthDataIntoStorage = authData => localStorage.setItem('authData', JSON.stringify(authData));

export const getAuthDataFromStorage = () => localStorage.getItem('authData');

export const removeAuthDataFromStorage = () => localStorage.removeItem('authData');
