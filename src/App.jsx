import './App.css';

import countriesAndCapitalsDB from './database/country-and-capitals-db.json';
import shuffleCountriesAndCapitals from "./utils/shuffleCountriesAndCapitals.js";

import {useState} from "react";
import isRightPair from "./utils/isRightPair";

const countries = Object.keys(countriesAndCapitalsDB);
const capitals = Object.values(countriesAndCapitalsDB);
let shuffledCountriesAndCapitals = shuffleCountriesAndCapitals([...countries, ...capitals]);

function App() {
    const [firstSelection, setFirstSelection] = useState();
    const [secondSelection, setSecondSelection] = useState();

    function handleClick(index) {
        const isFirstSelected = firstSelection === undefined;
        const isSecondSelected = secondSelection === undefined;
        const isBothSelected = isFirstSelected && isSecondSelected;

        if (!isBothSelected) {
            setFirstSelection(shuffledCountriesAndCapitals[index]);
            setSecondSelection(undefined);
        }

        if (isFirstSelected) {
            return setFirstSelection(shuffledCountriesAndCapitals[index]);
        }

        if (isSecondSelected) {
            shuffledCountriesAndCapitals = [...isRightPair(firstSelection, shuffledCountriesAndCapitals[index], shuffledCountriesAndCapitals)];
            return setSecondSelection(shuffledCountriesAndCapitals[index]);
        }
    }

    return (
        <div className={'game-wrapper'}>
            {shuffledCountriesAndCapitals.map((countryOrCapital, index) => {
                return (
                    <div key={index}
                         className={`country-or-capital`}
                         onClick={() => handleClick(index)}
                    >
                        {countryOrCapital}
                    </div>
                )
            })}
        </div>
    )
}

export default App
