
const saveLocalData = (key, value) => {
  if (key && value) {
    localStorage.setItem(key, value);
  }
};

const getLocalData = (key) => {
  if (key) {
    const data = localStorage.getItem(key);
    return data;
  }
};

export { getLocalData, saveLocalData };
