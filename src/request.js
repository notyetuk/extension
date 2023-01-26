export async function request(url, method, payload) {
  const apiKey = await storageGet('apiKey');

  const options = {};
  options.method = method ?? 'get';
  options.headers = {
    'authorization': apiKey,
    'content-type': 'application/json'
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  return fetch(`http://localhost:8081${url}`, options);
}

export function storagePut(key, value) {
  return new Promise((resolve, reject) => {
    const obj = {};
    obj[key] = value;

    chrome.storage.sync.set(obj, (error) => {
      if (error) reject(error);
      resolve();
    });
  });
}

export function storageGet(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, (items) => {
      if (items.hasOwnProperty(key)) {
        return resolve(items[key])
      }
      reject('key does not exist.');
    });
  })
}
