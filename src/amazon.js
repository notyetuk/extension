export function run(post) {
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

    post(payload);
  });

};
