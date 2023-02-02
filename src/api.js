function onPopUpOpen() {
  const input = document.querySelector('#api-key');
  const button = document.querySelector('#save-api-key');
  const showButton = document.querySelector('#notyet-show-button');

  const eye = document.querySelector('#notyet-eye');
  // src="eye-open.svg" by default because it will also be type="password" by default
  if (input.type === 'text') {
    eye.src = 'eye-closed.svg'
  }

  button.addEventListener('click', () => saveApiKey(input.value));
  showButton.addEventListener('click', () => toggleApiKey(input, eye));

  void loadApiKey(input);
}

document.addEventListener('DOMContentLoaded', onPopUpOpen);

async function saveApiKey(key) {
  const src = chrome.runtime.getURL('src/request.js');
  const { storagePut } = await import(src);

  await storagePut('apiKey', key);

  const successMessage = document.querySelector('#notyet-success');
  successMessage.style.display = 'block';
  setTimeout(() => successMessage.style.display = 'none', 5000);
}

async function loadApiKey(input) {
  const src = chrome.runtime.getURL('src/request.js');
  const { storageGet } = await import(src);

  input.value = await storageGet('apiKey');
}

function toggleApiKey(input, eye) {
  if (input.type === 'text') {
    input.type = 'password';
    eye.src = 'eye-open.svg'
  } else {
    input.type = 'text';
    eye.src = 'eye-closed.svg';
  }
}
