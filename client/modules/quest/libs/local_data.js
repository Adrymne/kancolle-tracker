const STORAGE_KEY = 'questCompletion';

export const save = (data) => {
  if (!localStorage) {
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const load = () => {
  if (!localStorage) {
    return {};
  }
  const data = localStorage.getItem(STORAGE_KEY);
  if (data === 'undefined') {
    return {};
  }
  return JSON.parse(data);
};
