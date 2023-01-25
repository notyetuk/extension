export function post(payload) {
  fetch('http://localhost:8081/api/item', {
    method: 'post',
    headers: {
      'authorization': '<api-key>',
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload),
  }).then(() => alert('item added to notyet.uk'));
}