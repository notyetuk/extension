export function run(request) {
  const buyBox = document.querySelector('#desktop_qualifiedBuyBox');

  if (!buyBox) return;

  const itemTitle = document.querySelector('#productTitle').innerText;
  const itemPrice = document.querySelector('#corePrice_feature_div').children[0].innerText.split('\n')[0];
  const imageElement = document.querySelector('[data-a-image-name="landingImage"]');
  const itemImage = imageElement.currentSrc;
  const itemUrl = imageElement.baseURI;

  const addToNotYet = document.createElement('a');

  addToNotYet.text = 'Add to NotYet.uk';
  addToNotYet.classList.add('notyet-amazon-button');
  buyBox.insertBefore(addToNotYet, buyBox.firstChild);

  addToNotYet.addEventListener('click', () => {
    const payload = {
      title: itemTitle,
      price: itemPrice.slice(1, itemPrice.length),
      image: itemImage,
      url: itemUrl,
    };

    displayModal(request, payload);
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
  modalListSelect.id = 'not-yet-list';
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
    const list = document.querySelector('#not-yet-list').value;
    if (list === '') return;

    const p = { ...payload };
    p.list = list;

    request('/api/item', 'post', p);
    removeModal();
  });
}
