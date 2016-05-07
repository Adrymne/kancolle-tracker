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
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
};
