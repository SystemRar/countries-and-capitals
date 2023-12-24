import './App.css';

import countriesAndCapitalsDB from './database/country-and-capitals-db.json';

import shuffleArrayElements from "./utils/shuffleCountriesAndCapitals.js";
import isCorrectSelectionOfPair from "./utils/isCorrectSelectionOfPair.js";
import deleteCorrectlySelectedPair from "./utils/deleteCorrectlySelectedPair.js";

import {useState} from "react";

const countries = Object.keys(countriesAndCapitalsDB);
const capitals = Object.values(countriesAndCapitalsDB);

function App() {
    const [firstSelection, setFirstSelection] = useState();
    const [secondSelection, setSecondSelection] = useState();
    const [shuffledCountriesAndCapitals, setShuffledCountriesAndCapitals] = useState(() => shuffleArrayElements([...countries, ...capitals]))
    const [selectedCountryOrCapital, setSelectedCountryOrCapital] = useState([]);
    const [wrongSelections, setWrongSelections] = useState([]);

    function handleClick(index) {
        const isFirstSelected = firstSelection !== undefined;
        const isSecondSelected = secondSelection !== undefined;
        const isBothSelected = isFirstSelected && isSecondSelected;

        const selected = shuffledCountriesAndCapitals[index];

        const isSelected = selectedCountryOrCapital.includes(index);
        if (isSelected) {
            setSelectedCountryOrCapital(selectedCountryOrCapital.filter(countryOrCapital => countryOrCapital !== index));
        }

        if (selectedCountryOrCapital.length < 2) {
            setSelectedCountryOrCapital([...selectedCountryOrCapital, index]);
        }

        if (selectedCountryOrCapital.length === 1) {
            const [firstIndex] = selectedCountryOrCapital;
            const [firstItem, secondItem] = [shuffledCountriesAndCapitals[firstIndex], shuffledCountriesAndCapitals[index]];

            if (firstIndex === index) {
                setSelectedCountryOrCapital([]);
                setWrongSelections([]);
                return;
            }


            if (isCorrectSelectionOfPair(firstItem, secondItem)) {
                const updatedListOfCountriesAndCapitals = shuffledCountriesAndCapitals.filter((_, indexOfCountyOrCapital) => {
                    const remainingCountriesAndCapitals = indexOfCountyOrCapital !== firstIndex && indexOfCountyOrCapital !== index;
                    return remainingCountriesAndCapitals;
                });

                setShuffledCountriesAndCapitals(updatedListOfCountriesAndCapitals);
                setSelectedCountryOrCapital([]);
                setWrongSelections([]);
            } else {
                setWrongSelections([firstIndex, index]);
            }
        }

        if (!isFirstSelected) {
            setFirstSelection(selected);
            return;
        }

        if (isFirstSelected && !isSecondSelected) {
            setSecondSelection(selected);

            setShuffledCountriesAndCapitals(prev => deleteCorrectlySelectedPair(firstSelection, selected, prev));
            return;
        }

        if (isBothSelected) {
            setFirstSelection(selected);
            setSecondSelection(undefined);
            setWrongSelections([]);
            setSelectedCountryOrCapital([index]);
        }
    }

    function handleReloadPage() {
        window.location.reload();
    }

    if (shuffledCountriesAndCapitals.length === 0) {
        return (
            <div className={'game-wrapper end-game'}>
                <h1>You won!</h1>
                <button onClick={handleReloadPage}>Start again</button>
            </div>
        )
    }

    return (
        <div className={'game-wrapper'}>
            {shuffledCountriesAndCapitals.map((item, index) => {
                const selectedClass = wrongSelections.includes(index) ? 'country-or-capital--incorrectly-selected' : 'country-or-capital--selected'

                return (
                    <div
                        key={index}
                        onClick={() => handleClick(index)}
                        className={`country-or-capital ${selectedCountryOrCapital.includes(index) ? selectedClass : ''}`}
                    >
                        {item}
                    </div>
                )
            })}
        </div>
    )
}

export default App
