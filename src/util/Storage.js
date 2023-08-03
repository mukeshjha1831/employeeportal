export const getItem = () => {
  const dataFromStorage = JSON.parse(localStorage.getItem("formData"));
  return dataFromStorage ? dataFromStorage : [];
};

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
