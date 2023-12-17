import './App.css';

import countriesAndCapitalsDB from './database/country-and-capitals-db.json';
import shuffleCountriesAndCapitals from "./utils/shuffleCountriesAndCapitals.js";

import {useState} from "react";

const countries = Object.keys(countriesAndCapitalsDB);
const capitals = Object.values(countriesAndCapitalsDB);
const shuffledCountriesAndCapitals = shuffleCountriesAndCapitals([...countries, ...capitals]);

function App() {
    const [firstSelection, setFirstSelection] = useState();
    const [secondSelection, setSecondSelection] = useState();

    function handleClick(index) {
        const isHasFirstSelection = firstSelection === undefined;
        const isHasSecondSelection = secondSelection === undefined;
        const isHasBothSelected = !isHasFirstSelection && !isHasSecondSelection;

        if (isHasBothSelected) {
            setSecondSelection(undefined);
            setFirstSelection(undefined);
        }

        if (!isHasFirstSelection) {
            setSecondSelection(shuffledCountriesAndCapitals[index]);
        } else {
            setFirstSelection(shuffledCountriesAndCapitals[index]);
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
