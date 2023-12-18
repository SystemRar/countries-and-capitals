import './App.css';

import countriesAndCapitalsDB from './database/country-and-capitals-db.json';

import shuffleArrayElements from "./utils/shuffleCountriesAndCapitals.js";
import getTheAnswerOfTheSelectedPair from "./utils/getTheAnswerOfTheSelectedPair.js";
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

            if (getTheAnswerOfTheSelectedPair(firstItem, secondItem)) {
                const updatedList = shuffledCountriesAndCapitals.filter((_, i) => i !== firstIndex && i !== index);
                setShuffledCountriesAndCapitals(updatedList);
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
        }
    }


    return (
        <div className={'game-wrapper'}>
            {shuffledCountriesAndCapitals.map((item, index) => (
                <div
                    key={index}
                    onClick={() => handleClick(index)}
                    className={'country-or-capital'}
                    style={{
                        backgroundColor: selectedCountryOrCapital.includes(index)
                            ? wrongSelections.includes(index)
                                ? '#b04040'
                                : '#9d9c3b'
                            : 'inherit',
                    }}
                >
                    {item}
                </div>
            ))}
        </div>
    )
}

export default App
