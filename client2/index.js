
async function getCountries() {
  const response = await fetch('https://restcountries.com/v3.1/independent?status=true');
  const data = await response.json();
  return data;
}

function getRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min) + min);
  return randomNumber;
}

async function initApp() {

  let playing = true;
  let countries;
  let country = [];
  let clues = [];
  let clueCounter = 0;

  function validateCountryName() {

    if (nameInput.value !== '') {

      congratulationsContainer.style.visibility = 'visible';

      if ((nameInput.value.toLowerCase() === englishCountryNameToGuess.toLowerCase()) || (nameInput.value.toLowerCase() === spanishCountryNameToGuess.toLowerCase())) {

        congratulationsImage.setAttribute('src', 'images/fuegos-artificiales.gif');
        congratulationsText.textContent = 'Enhorabuena. ¡¡¡ Acertaste !!!';

      } else {

        congratulationsImage.setAttribute('src', 'images/ahorcado.gif');
        congratulationsText.textContent = 'Lo siento. ¡¡¡ No acertaste !!!';

      }

      nameInput.disabled = true;
      buttonValidate.disabled = true;
      clueButton.disabled = true;
      playing = false;
    }

  }

  function validateCountryNameButton() {
    validateCountryName();
  }

  function checkTypedText(event) {

    if (event.key === 'Enter') {

      validateCountryName();

    }

  }

  function getClue() {
    let clueStringInfo = '';
    if (clueCounter === clues.length) {
      clueInfoText.textContent = 'No hay mas pistas';
      clueCounter = 0;
    } else {
      clueInfoText.style.visibility = 'visible';
      for (let i = 0; i <= clueCounter; i++) {
        clueStringInfo += `${clues[i]}<br>`;
      }
      clueInfoText.innerHTML = clueStringInfo;
      clueCounter++;
    }

  }

  async function getBorderName(border) {
    const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${border}`);
    const data = await response.json();
    return data;
  }

  async function getSpanishName(name) {

    const response = await fetch(`https://api.mymemory.translated.net/get?q=${name}&langpair=en|es`);
    const data = await response.json();
    return data.responseData.translatedText;

  }

  async function getCluesList(country) {

    const clues = [];
    let borderPromise = [];
    const borderPromises = [];

    clues.push(`Número de habitantes: ${country.population}`);
    clues.push(`Continente: ${await getSpanishName(country.continents[0])}`);
    clues.push(`Moneda: ${await getSpanishName(Object.values(country.currencies)[0].name)}`);

    if (country.borders) {

      country.borders.forEach((border) => {

        try {

          borderPromise = getBorderName(border);
          borderPromises.push(borderPromise);

        } catch (error) {

          console.error('Error al obtener la información de países.');

        }

      });

      const borderCountries = await Promise.all(borderPromises);

      const borderNames = [];
      borderCountries.forEach((country) => {
        borderNames.push(country[0].translations.spa.common);
      });

      clues.push(`Tiene frontera con: ${borderNames}`);

    } else {

      clues.push('Este país no tiene fronteras con ninguno otro.');

    }

    clues.push(`Capital: ${await getSpanishName(country.capital[0])}`);

    return clues;

  }

  function resetGame() {

    // congratulationsContainer.style.visibility = 'hidden';
    congratulationsContainer.style.display = 'none';
    gameTitle.style.display = 'none';
    mainPageContainer.style.display = 'none';
    nameInput.innerText = '';
    nameInput.disabled = false;
    buttonValidate.disabled = false;
    clueButton.disabled = false;
    initApp();

  }

  const root = document.getElementById('root');

  const gameTitle = document.createElement('div');
  gameTitle.setAttribute('class', 'gameTitle');
  gameTitle.textContent = 'Juguemos a adivinar banderas del mundo';
  root.appendChild(gameTitle);

  const mainPageContainer = document.createElement('div');
  mainPageContainer.setAttribute('class', 'mainPageContainer');
  root.appendChild(mainPageContainer);

  const gameflagContainer = document.createElement('div');
  gameflagContainer.setAttribute('class', 'gameflagContainer');
  const gameflag = document.createElement('img');
  gameflagContainer.appendChild(gameflag);
  mainPageContainer.appendChild(gameflagContainer);

  const countryInputtext = document.createElement('div');
  countryInputtext.setAttribute('class', 'countryInputtext');
  countryInputtext.textContent = '¿Sabes de qué país se trata?';
  mainPageContainer.appendChild(countryInputtext);

  const clueContainer = document.createElement('div');
  clueContainer.setAttribute('class', 'clueContainer');

  const clueButtonContainer = document.createElement('div');
  clueButtonContainer.setAttribute('class', 'clueButtonContainer');
  clueContainer.appendChild(clueButtonContainer);

  const clueButton = document.createElement('input');
  clueButton.setAttribute('type', 'submit');
  clueButton.setAttribute('value', '¿Quieres una pista');
  clueButton.addEventListener('click', getClue);
  clueButtonContainer.appendChild(clueButton);

  const clueInfoText = document.createElement('div');
  clueInfoText.setAttribute('class', 'clueInfoText');
  clueInfoText.style.visibility = 'hidden';
  clueContainer.appendChild(clueInfoText);

  const nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('name', 'name');
  nameInput.addEventListener('keypress', checkTypedText);
  nameInput.setAttribute('placeholder', 'Spain o España');

  const buttonValidate = document.createElement('input');
  buttonValidate.setAttribute('type', 'submit');
  buttonValidate.setAttribute('value', 'Validar');
  buttonValidate.addEventListener('click', validateCountryNameButton);

  mainPageContainer.appendChild(clueContainer);
  countryInputtext.appendChild(nameInput);
  countryInputtext.appendChild(buttonValidate);

  const congratulationsContainer = document.createElement('div');
  congratulationsContainer.setAttribute('class', 'congratulationsContainer');
  congratulationsContainer.style.visibility = 'hidden';
  root.appendChild(congratulationsContainer);

  const congratulationsImage = document.createElement('img');
  congratulationsImage.setAttribute('class', 'congratulationsImage');
  congratulationsContainer.appendChild(congratulationsImage);

  const congratulationsText = document.createElement('div');
  congratulationsText.setAttribute('class', 'congratulationsText');
  congratulationsContainer.appendChild(congratulationsText);

  const gameInfo = document.createElement('div');

  const resetGameButton = document.createElement('button');
  resetGameButton.setAttribute('class', 'button');
  resetGameButton.innerHTML = 'Reiniciar juego';
  resetGameButton.addEventListener('click', resetGame);
  gameInfo.appendChild(resetGameButton);

  congratulationsContainer.appendChild(gameInfo);

  nameInput.focus();

  try {

    countries = await getCountries();

  } catch (error) {

    console.error('Error al obtener la información de países.');

  }

  country = countries[getRandomNumber(0, countries.length)];
  const englishCountryNameToGuess = country.name.common;
  const spanishCountryNameToGuess = country.translations.spa.common;
  // console.log(englishCountryNameToGuess);
  console.log(spanishCountryNameToGuess);

  gameflag.setAttribute('src', `${country.flags.png}`);

  clues = await getCluesList(country);
  console.log(clues);

}

initApp();
