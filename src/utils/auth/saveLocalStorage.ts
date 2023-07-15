export const saveLocalStorage = (data: {}) => {
  localStorage.setItem(
    "@NURA-AUTH-REGISTER-INFO",
    JSON.stringify(data)
  );
};
