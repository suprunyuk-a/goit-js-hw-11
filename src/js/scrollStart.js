function scrollStart() {
  const { height: formHeight } = document
    .querySelector('.search-form')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: formHeight * 1.2,
    behavior: 'smooth',
  });
}
export { scrollStart };
