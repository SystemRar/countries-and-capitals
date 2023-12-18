import isCorrectSelectionOfPair from "./isCorrectSelectionOfPair.js";

function deleteCorrectlySelectedPair(firstSelection, selected, prev) {
    if (isCorrectSelectionOfPair(firstSelection, selected)) {
        return prev.filter(countryOrCapital => countryOrCapital !== firstSelection && countryOrCapital !== selected);
    }

    return prev;
}

export default deleteCorrectlySelectedPair;
