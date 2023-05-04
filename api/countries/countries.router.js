import Router from 'express';
import countries from './countries.js';

function getRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min) + min);
  return randomNumber;
}

const router = Router();

router.get('/all', (req, res) => {
  res.json(countries);
});

router.get('/all/length', (req, res) => {
  res.json(countries.length);
});

router.get('/all/random', (req, res) => {
  const randonCountry = getRandomNumber(0, countries.length - 1);
  res.json(countries[randonCountry]);
});

// router.get('/all/filterZ', (req, res) => {
//   const filteredCountries = countries.filter((country) => country.name.common[0] === 'Z');
//   res.json(filteredCountries[0]);
// });

router.get(/\/all\/filter./i, (req, res) => {
  const countryStartWithLetter = req.url.at(-1).toLocaleUpperCase();
  // Aquí habrá que llamar a la API de los países con fetch y quitar la llamada directa desde cliente
  const filteredCountries = countries.filter((country) => country.name.common[0] === countryStartWithLetter);
  res.json(filteredCountries);
  console.log(filteredCountries);
});

router.get('/number/:number', (req, res) => {
  const { number } = req.params;
  res.json(countries[number]);
});

// Imprime nombres de variables y valores usando Array.forEach
// Object.getOwnPropertyNames(obj).forEach(function(val, idx, array) {
//   print(val + " -> " + obj[val]);
// });
// imprime
// 0 -> a
// 1 -> b
// 2 -> c

router.get('/language/:language', (req, res) => {
  const { language } = req.params;
  const filteredCountries = countries.filter(country => {
    const listOfLanguages = Object.values(country.languages);
    return listOfLanguages.includes(language);
  });
  const filteredCountryNames = filteredCountries.map(country => country.name.common);
  res.json(filteredCountryNames)
});

router.get('/filter', (req, res) => {

  let key = Object.keys(req.query);
  key[0] = key[0].toLowerCase();
  let value = Object.values(req.query);
  value[0] = value[0].toLowerCase();

  const filteredCountries = countries.filter((country) => {
    // console.log(country[key].toString());
    return (key in country) && (country[key].toString().toLowerCase() === value[0]);
  });
  // console.log(filteredCountries);
  const filteredCountryNames = filteredCountries.map(country => country.name.common);
  res.json(filteredCountryNames);
  // res.json(filteredCountries);
});

export default router;
