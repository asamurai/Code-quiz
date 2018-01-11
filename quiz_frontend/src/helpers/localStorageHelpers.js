const setAuthDataIntoStorage = authData => localStorage.setItem('authData', JSON.stringify(authData));

const getAuthDataFromStorage = () => localStorage.getItem('authData');

const removeAuthDataFromStorage = () => localStorage.removeItem('authData');

export default {
    setAuthDataIntoStorage,
    getAuthDataFromStorage,
    removeAuthDataFromStorage
};
