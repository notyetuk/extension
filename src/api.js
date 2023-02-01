function onPopUpOpen() {
  const input = document.querySelector('#api-key');
  const button = document.querySelector('#save-api-key');
  const showButton = document.querySelector('#notyet-show-button');

  button.addEventListener('click', () => saveApiKey(input.value));
  showButton.addEventListener('click', () => toggleApiKey(input));

  void loadApiKey(input);
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

function toggleApiKey(input) {
  input.type === 'text' ? input.type = 'password' : input.type = 'text';
}
