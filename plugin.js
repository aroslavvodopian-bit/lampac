(function () {
  var LOCAL = 'http://192.168.1.112:9118';
  var REMOTE = 'https://lampac-box.tail6dbb0d.ts.net';

  function load(url) {
    var s = document.createElement('script');
    s.src = url + '/online.js';
    s.async = true;
    document.head.appendChild(s);
  }

  // В HTTPS PWA (iPhone) HTTP-адреса запрещены браузером
  if (window.location.protocol === 'https:') {
    load(REMOTE);
    return;
  }

  // На ТВ/ПК/HTTP пробуем сначала локальную сеть (таймаут 1.5 сек)
  var xhr = new XMLHttpRequest();
  xhr.open('GET', LOCAL + '/version', true);
  xhr.timeout = 1500;
  xhr.onload = function () {
    load(xhr.status === 200 ? LOCAL : REMOTE);
  };
  xhr.onerror = xhr.ontimeout = function () {
    load(REMOTE);
  };
  xhr.send();
})();