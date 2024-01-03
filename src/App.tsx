import { useState } from 'react';
import {
  country_or_capital,
  country_or_capital__incorrectly_selected,
  country_or_capital__selected,
  end_game,
  game_wrapper,
} from './App.module.css';

import countriesAndCapitalsDB from './database/country-and-capitals-db';
import deleteCorrectlySelectedPair from './utils/deleteCorrectlySelectedPair';
import shuffleArrayElements from './utils/shuffleCountriesAndCapitals';

const countries = Object.keys(countriesAndCapitalsDB);
const capitals = Object.values(countriesAndCapitalsDB);

function App() {
  const [firstSelection, setFirstSelection] = useState<string | undefined>(undefined);
  const [secondSelection, setSecondSelection] = useState<string | undefined>(undefined);
  const [shuffledCountriesAndCapitals, setShuffledCountriesAndCapitals] = useState(() => shuffleArrayElements([...countries, ...capitals]));
  const [isWrongSelected, setIsWrongSelected] = useState(false);

  function handleClick(index: number) {
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
        setFirstSelection(undefined);
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

  function handleReloadPage() {
    setFirstSelection(undefined);
    setSecondSelection(undefined);
    setIsWrongSelected(false);
    setShuffledCountriesAndCapitals(shuffleArrayElements([...countries, ...capitals]));
  }

  const isEndGame = shuffledCountriesAndCapitals.length === 0;
  if (isEndGame) {
    return (
      <div className={`${game_wrapper} ${end_game}`}>
        <h1>You won!</h1>
        <button onClick={handleReloadPage}>Start again</button>
      </div>
    );
  }

  return (
    <div className={game_wrapper}>
      {shuffledCountriesAndCapitals.map((countryOrCapital, index) => {
        const isFirstSelected = firstSelection === countryOrCapital;
        const isSecondSelected = secondSelection === countryOrCapital;

        const isWrong = (isFirstSelected || isSecondSelected) && isWrongSelected;
        return (
          <div
            key={countryOrCapital}
            onClick={() => handleClick(index)}
            className={`${country_or_capital} ${isFirstSelected ? `${country_or_capital__selected}` : ''} ${isWrong ? `${country_or_capital__incorrectly_selected}` : ''}`}
          >
            {countryOrCapital}
          </div>
        );
      })}
    </div>
  );
}

export default App;
