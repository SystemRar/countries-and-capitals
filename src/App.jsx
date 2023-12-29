import './App.css';

import { useState } from 'react';

import countriesAndCapitalsDB from './database/country-and-capitals-db.json';
import deleteCorrectlySelectedPair from './utils/deleteCorrectlySelectedPair.js';
import shuffleArrayElements from './utils/shuffleCountriesAndCapitals.js';

const countries = Object.keys(countriesAndCapitalsDB);
const capitals = Object.values(countriesAndCapitalsDB);

function App() {
  const [firstSelection, setFirstSelection] = useState(undefined);
  const [secondSelection, setSecondSelection] = useState(undefined);
  const [shuffledCountriesAndCapitals, setShuffledCountriesAndCapitals] = useState(() => shuffleArrayElements([...countries, ...capitals]));
  const [isWrongSelected, setIsWrongSelected] = useState(false);

  function handleClick(index) {
    const isFirstSelected = firstSelection !== undefined;
    const isSecondSelected = secondSelection !== undefined;
    const isBothSelected = isFirstSelected && isSecondSelected;

    const selected = shuffledCountriesAndCapitals[index];

    if (!isFirstSelected) {
      setFirstSelection(selected);
      return;
    }

    if (isFirstSelected && !isSecondSelected) {
      if (selected === firstSelection) {
        return;
      }

      setSecondSelection(selected);
      setIsWrongSelected(!isWrongSelected);

      setShuffledCountriesAndCapitals((prev) => deleteCorrectlySelectedPair(firstSelection, selected, prev));
      return;
    }

    if (isBothSelected) {
      setFirstSelection(selected);
      setSecondSelection(undefined);
      setIsWrongSelected(!isWrongSelected);
    }
  }

  console.log(isWrongSelected);

  function handleReloadPage() {
    window.location.reload();
  }

  const isEndGame = shuffledCountriesAndCapitals.length === 0;
  if (isEndGame) {
    return (
      <div className="game-wrapper end-game">
        <h1>You won!</h1>
        <button onClick={handleReloadPage}>Start again</button>
      </div>
    );
  }

  return (
    <div className="game-wrapper">
      {shuffledCountriesAndCapitals.map((item, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className="country-or-capital"
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default App;
