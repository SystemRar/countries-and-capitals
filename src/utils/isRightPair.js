import countriesAndCapitalsDB from '../database/country-and-capitals-db';

const countries = Object.keys(countriesAndCapitalsDB);
const capitals = Object.values(countriesAndCapitalsDB);

function isRightPair(firstSelection, secondSelection, shuffledCountriesAndCapitals) {
    const isCountry = countries.filter(country => country === firstSelection).length === 0 ? secondSelection : firstSelection;
    const isCapital = capitals.filter(capital => capital === firstSelection).length === 0 ? secondSelection : firstSelection;
    const isCorrect = countriesAndCapitalsDB[isCountry] === isCapital;

    if (isCorrect) {
        return shuffledCountriesAndCapitals.filter(countryOrCapital => countryOrCapital !== isCountry && countryOrCapital !== isCapital);
    }

    return shuffledCountriesAndCapitals;
}

export default isRightPair;
