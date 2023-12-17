import './App.css';
import countriesAndCapitalsDB from './database/country-and-capitals-db.json';
import shuffleCountriesAndCapitals from "./utils/shuffleCountriesAndCapitals.js";

const countries = Object.keys(countriesAndCapitalsDB);
const capitals = Object.values(countriesAndCapitalsDB);
const shuffledCountriesAndCapitals = shuffleCountriesAndCapitals([...countries, ...capitals]);

function App() {
    return (
        <div className={'game-wrapper'}>
            {shuffledCountriesAndCapitals.map((countryOrCapital, index) => {
                return (
                    <div key={index}
                         className={'country-or-capital'}
                    >
                        {countryOrCapital}
                    </div>
                )
            })}
        </div>
    )
}

export default App
