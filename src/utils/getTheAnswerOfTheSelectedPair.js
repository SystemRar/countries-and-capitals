import countriesAndCapitalsDB from '../database/country-and-capitals-db.json';

function getTheAnswerOfTheSelectedPair(firstSelection, selected) {
    return countriesAndCapitalsDB[firstSelection] === selected || countriesAndCapitalsDB[selected] === firstSelection;
}

export default getTheAnswerOfTheSelectedPair;