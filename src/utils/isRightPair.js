import countriesAndCapitalsDB from '../database/country-and-capitals-db';

const countries = Object.keys(countriesAndCapitalsDB);
const capitals = Object.values(countriesAndCapitalsDB);

function deleteCorrectlySelectedPair(firstSelection, secondSelection, shuffledCountriesAndCapitals) {
    const correctCountry = countries.filter(country => country === firstSelection).length === 0 ? secondSelection : firstSelection;
    const correctCapital = capitals.filter(capital => capital === firstSelection).length === 0 ? secondSelection : firstSelection;
    const isCorrect = countriesAndCapitalsDB[correctCountry] === correctCapital;

    if (isCorrect) {
        return shuffledCountriesAndCapitals.filter(countryOrCapital => countryOrCapital !== correctCountry && countryOrCapital !== correctCapital);
    }

    return shuffledCountriesAndCapitals;
}

export default deleteCorrectlySelectedPair;
