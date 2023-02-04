export async function run(request) {
  const buyBox = document.querySelector('[data-buy-box]');

  if (!buyBox) return;

  const src = chrome.runtime.getURL('src/modal.js');
  const api = await import(src);

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

    api.displayModal(request, payload);
  });
}
