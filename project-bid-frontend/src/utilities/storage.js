const storageKey = 'AD';

export function setApplicationStorage(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export function getApplicationStorage() {
  const storedData = localStorage.getItem(storageKey);
  return JSON.parse(storedData);
}

export function clearApplicationStorage() {
  localStorage.removeItem(storageKey);
}