export async function displayModal(request, payload) {
  const closeModal = new Event('close-modal');

  let lists = await request('/api/lists', 'get');
  lists = await lists.json();

  const modalWrapper = document.createElement('div');
  modalWrapper.classList.add('notyet-modal-wrapper');
  modalWrapper.id = 'notyet-modal-wrapper';
  modalWrapper.addEventListener('click', (e) => {
    if (e.target.id === 'notyet-modal-wrapper') {
      document.dispatchEvent(closeModal);
    }
  });

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const src = chrome.runtime.getURL('src/request.js');
  const { storageGet } = await import(src);

  if (!storageGet('apiKey')) {
    alert('no api key was set');
    return;
  }

  const modalTitle = document.createElement('h3');
  modalTitle.textContent = 'Select a List';

  const modalListSelect = document.createElement('select');
  modalListSelect.id = 'notyet-list';
  if (lists.length) {
    for (let list of lists) {
      const option = document.createElement('option');
      option.value = list['_id'];
      option.textContent = list.title;
      modalListSelect.appendChild(option);
    }
  }

  const modalButton = document.createElement('button');
  modalButton.id = 'notyet-modal-add-button';
  modalButton.textContent = 'Add';

  modal.appendChild(modalTitle);
  modal.appendChild(modalListSelect);
  modal.appendChild(modalButton);

  modalWrapper.appendChild(modal);
  document.body.appendChild(modalWrapper);
  document.body.style.overflow = 'hidden';

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.dispatchEvent(closeModal);
    }
  });

  const removeModal = () => {
    document.body.removeChild(modalWrapper);
    document.body.style.overflow = 'scroll';
    document.removeEventListener('close-modal', removeModal);
  }

  document.addEventListener('close-modal', removeModal);
  document.querySelector('#notyet-modal-add-button').addEventListener('click', () => {
    const list = document.querySelector('#notyet-list').value;
    if (list === '') return;

    const p = { ...payload };
    p.list = list;

    request('/api/item', 'post', p);
    removeModal();
  });
}
