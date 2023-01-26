const stores = {
  amazon: 'src/amazon.js',
  etsy: 'src/etsy.js',
}

async function run() {
  const url = window.location.href;
  let store;

  if(url.includes('amazon')) {
    store = 'amazon';
  } else if (url.includes('etsy')) {
    store = 'etsy';
  }

  if (!store)
    return console.log('%c[NotYet.uk]: %cNot a valid or supported store.', 'color: red; font-weight: bold; font-size: 16px;', 'color: white; font-weight: bold; font-size: 16px;');

  const src = chrome.runtime.getURL(stores[store]);
  const runner = await import(src);

  const requestSrc = chrome.runtime.getURL('src/request.js');
  const { request } = await import(requestSrc);

  runner.run(request);
}

setTimeout(run, 250);
