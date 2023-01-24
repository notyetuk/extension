setTimeout(runExtension, 500);

function runExtension() {
  const buyBox = document.querySelector('#desktop_qualifiedBuyBox');

  if (!buyBox) return;

  const itemTitle = document.querySelector('#productTitle').innerText;
  const itemPrice = document.querySelector('#corePrice_feature_div').children[0].innerText.split('\n')[0];
  const imageElement = document.querySelector('[data-a-image-name="landingImage"]');
  const itemImage = imageElement.currentSrc;
  const itemUrl = imageElement.baseURI;

  const addToNotYet = document.createElement('a');
  addToNotYet.text = "Add to NotYet.uk";
  addToNotYet.style.width = "100%";
  addToNotYet.style.height = "30px";
  addToNotYet.style.background = "red";
  addToNotYet.style.padding = "10px 10px";
  addToNotYet.style.color = "white";
  buyBox.insertBefore(addToNotYet, buyBox.firstChild);

  addToNotYet.addEventListener('click', () => {
    const payload = {
      title: itemTitle,
      price: itemPrice.slice(1, itemPrice.length),
      image: itemImage,
      url: itemUrl,
    };

    // TODO: update the api url with production like
    fetch('http://localhost:8081/api/item', {
      method: 'post',
      headers: {
        'authorization': '<api-key>',
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload),
    }).then(() => alert('item added to notyet.uk'));
  });
}
