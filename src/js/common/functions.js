export  function renderMarkup(parent, markup) {
  parent.insertAdjacentHTML('beforeend', markup);
}

export  function clearMarkup (parent) {
  parent.innerHTML = '';
}
