const { default: refs } = require('./refs');

refs.searchQuery.addEventListener('input', event => {
  console.log(event.target.value);
});
