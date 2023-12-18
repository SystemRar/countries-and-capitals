import getTheAnswerOfTheSelectedPair from "./getTheAnswerOfTheSelectedPair.js";

function deleteCorrectlySelectedPair(firstSelection, selected, prev) {
    if (getTheAnswerOfTheSelectedPair(firstSelection, selected)) {
        return prev.filter(countryOrCapital => countryOrCapital !== firstSelection && countryOrCapital !== selected);
    }

    return prev;
}

export default deleteCorrectlySelectedPair;
