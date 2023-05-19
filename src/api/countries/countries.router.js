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

    function getAllFinalProperties(object) {
      let properties = [];
      for (let property in object) {
        if ((typeof object[property] === 'object') && !Array.isArray(object[property])) {
          let nestedProperties = getAllFinalProperties(object[property]);
          properties = properties.concat(nestedProperties.map(np => `${property}.${np}`));
        } else {
          properties.push(property);
        }
      }
      return properties;
    }

    let countryProperties = getAllFinalProperties(country);
    const z = countryProperties.filter((property) => {
      property === true;
    });
    console.log('con propiedad: '+z);
    return (key in country) && (country[key].toString().toLowerCase() === value[0]);
  });

  // const filteredCountryNames = filteredCountries.map(country => country.name.common);
  // res.json(filteredCountryNames);
  res.json(filteredCountries);

});

router.post('/', (req, res) => {
  const country = req.body;
  countries.push(country);
  res.json(country);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const newCountry = req.body;
  const index = countries.findIndex((country) => country.id?.toString() === id.toString());
  countries[index] = newCountry;
  res.json(countries[index]);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const newProps = req.body;
  const index = countries.findIndex((country) => country.id?.toString() === id.toString());
  countries[index] = { ...countries[index], ...newProps };
  res.json(countries[index]);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = countries.findIndex((country) => country.id?.toString() === id.toString());
  countries.splice(index, 1);
  res.json(countries);
});

export default router;
