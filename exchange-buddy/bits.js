(function() {
  function replaceIcon(element, value) {
    element.forEach(function(tag) {
      tag.outerHTML = value;
    });
  }

  const link = document.createElement('link');
  link.href = 'https://bits.name/font/style.css';
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(link);

  document.addEventListener('DOMContentLoaded', function() {
    const spanMap = {
      'i.Bits-Symbol': `<span class="icon-Bits-Symbol"></span>`,
      'i.Bits-Symbol_noLine': `<span class="icon-Bits-Symbol_noLine"></span>`,
      'i.Bits-Symbol_tilt': `<span class="icon-Bits-Symbol_tilt"></span>`,
      'i.Bits-Symbol_tilt_noLine': `<span class="icon-Bits-Symbol_tilt_noLine"></span>`,

      'i.Bits-Symbol-Coin': `<span class="icon-Bits-Symbol-Coin"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span></span>`,
      'i.Bits-Symbol-Coin_tilt': `<span class="icon-Bits-Symbol-Coin_tilt"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span></span>`,
      'i.Bits-Symbol-Coin_noLine': `<span class="icon-Bits-Symbol-Coin_noLine"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span></span>`,
      'i.Bits-Symbol-Coin_tilt_noLine': `<span class="icon-Bits-Symbol-Coin_tilt_noLine"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span></span>`,
    }

    for (const [key, value] of Object.entries(spanMap)) {
      const elements = document.querySelectorAll(key);
      replaceIcon(elements, value);
    }
  });
})();
