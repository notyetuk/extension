// TODO: extract all duplicated code

export function run(request) {
  const buyBox = document.querySelector('[data-buy-box]');

  if (!buyBox) return;

  const title = document.querySelector('[data-buy-box-listing-title]').innerText;
  const priceEl = Array.from(buyBox.querySelectorAll('[data-buy-box-region="price"]'))
    .filter(el => el.innerText && el.innerText.includes('£'));

  const price = priceEl[0].innerText.match(/[0-9.]+/g)[0];
  const image = document.querySelector('[data-carousel-first-image]');
  const url = window.location.href;

  const addToNotYet = document.createElement('a');

  addToNotYet.text = 'Add to NotYet.uk';
  addToNotYet.classList.add('notyet-amazon-button');
  buyBox.insertBefore(addToNotYet, buyBox.firstChild);

  addToNotYet.addEventListener('click', () => {
    const payload = {
      title: title,
      price: price,
      image: image.src,
      url: url,
    };

    void displayModal(request, payload);
  });
}

async function displayModal(request, payload) {
  const closeModal = new Event('close-modal');

  let lists = await request('/api/lists', 'get');
  lists = await lists.json();

  const modalWrapper = document.createElement('div');
  modalWrapper.classList.add('notyet-modal-wrapper');
  modalWrapper.id = 'notyet-modal-wrapper';

  const modal = document.createElement('div');
  modal.classList.add('modal');

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

