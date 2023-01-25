export async function post(payload) {
  const apiKey = await storageGet('apiKey');

  fetch('http://localhost:8081/api/item', {
    method: 'post',
    headers: {
      'authorization': apiKey,
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload),
  }).then(() => alert('item added to notyet.uk'));
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
