import isCorrectSelectionOfPair from './isCorrectSelectionOfPair';

function deleteCorrectlySelectedPair(firstSelection: string, selected: string, prev: Array<string>) {
  if (isCorrectSelectionOfPair(firstSelection, selected)) {
    return prev.filter((countryOrCapital) => countryOrCapital !== firstSelection && countryOrCapital !== selected);
  }

  return prev;
}

export default deleteCorrectlySelectedPair;
