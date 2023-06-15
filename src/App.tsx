import './App.css';
import { useState } from 'react';
import { data } from './assets/data';

const formattedPrice = (price: number) => `${price.toFixed(0)}€`;

function App() {
  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
  );

  const [total, setTotal] = useState(0);

  const changeState = (index: number) => {
    const updatedCheckedState = checkedState.map((state, i) =>
      i === index ? !state : state
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + data[index].price;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };

  return (
    <>
      <p>What would you like to include in your budget?</p>

      {data.map(({ text }, index) => {
        return (
          <p key={index}>
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              checked={checkedState[index]}
              onChange={() => changeState(index)}
            />
            <label>{text}</label>
          </p>
        );
      })}

      <p>Total: {formattedPrice(total)}</p>
    </>
  );
}

export default App;
