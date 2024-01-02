import countriesAndCapitalsDB from '../database/country-and-capitals-db';

function isCorrectSelectionOfPair(firstSelection: string, selected: string): boolean {
  return countriesAndCapitalsDB[firstSelection] === selected || countriesAndCapitalsDB[selected] === firstSelection;
}

export default isCorrectSelectionOfPair;
