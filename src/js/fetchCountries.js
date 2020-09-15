import refs from './refs';
import './serchQuery';

const name = 'Ukraine';

export default function fetchCountries(searchQuery) {
  fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(data => data.json())
    .then(countries => console.table(countries));
}
