function onPopUpOpen() {
  const input = document.querySelector('#api-key');
  const button = document.querySelector('#save-api-key');

  button.addEventListener('click', () => saveApiKey(input.value));
  loadApiKey(input);
}

document.addEventListener('DOMContentLoaded', onPopUpOpen);

async function saveApiKey(key) {
  const src = chrome.runtime.getURL('src/request.js');
  const { storagePut } = await import(src);

  await storagePut('apiKey', key);
}

async function loadApiKey(input) {
  const src = chrome.runtime.getURL('src/request.js');
  const { storageGet } = await import(src);

  input.value = await storageGet('apiKey');
}
