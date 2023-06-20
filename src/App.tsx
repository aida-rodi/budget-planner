import './App.css';
import { useEffect, useState } from 'react';
import { data } from './assets/data';

const formattedPrice = (price: number) => `${price.toFixed(0)}€`;

function App() {
  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
  );
  const [total, setTotal] = useState(0);
  const [numPages, setNumPages] = useState(1);
  const [numLanguages, setNumLanguages] = useState(1);

  useEffect(() => {
    calculateTotal();
  }, [checkedState, numPages, numLanguages]);

  const calculateTotal = ()=> {
    let totalPrice = checkedState.reduce(
      (sum, currentState, index) => {
        if (currentState) {
          return sum + data[index].price;
        }
        return sum;
      }, 0 
    );

    if (checkedState[0]) {
      totalPrice += numPages * numLanguages * 30;
    };
    
    setTotal(totalPrice);
  };

  const changeState = (index: number) => {
    const updatedCheckedState = checkedState.map((state, i) =>
      i === index ? !state : state
    );

    setCheckedState(updatedCheckedState);

  };

  const handleNumPagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setNumPages(value || 1);
  };

  const handleNumLanguagesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    setNumLanguages(value || 1);
  };

  const increasePages = () => {
    setNumPages(numPages + 1)
  }

  const decreasePages = () => {
    if (numPages === 1) {
      setNumPages(numPages)
    } else {setNumPages(numPages - 1)}
  }

  const increaseLanguages = () => {
    setNumLanguages(numLanguages + 1)
  }

  const decreaseLanguages = () => {
    if (numLanguages === 1) {
      setNumLanguages(numLanguages)
    } else {setNumLanguages(numLanguages - 1)}
  }

  return (
    <>
      <p>What would you like to include in your budget?</p>

      {data.map(({ text }, index) => {
        return (
          <div>
            <p key={index}>
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={checkedState[index]}
                onChange={() => changeState(index)}
              />
              <label>{text}</label>
            </p>

            {index === 0 && checkedState[index] && (
              <div className='inputDiv'>
                <p>
                  <label>Number of pages</label>
                  <button 
                    className='inputButton'
                    onClick={decreasePages}
                  >-</button>
                  <input
                    type="text"
                    className='numInput'
                    id={`numPages_${index}`}
                    value={numPages}
                    onChange={handleNumPagesChange}
                  />
                  <button 
                    className='inputButton'
                    onClick={increasePages}
                  >+</button>
                </p>
                <p>
                  <label>Number of languages</label>
                  <button 
                    className='inputButton'
                    onClick={decreaseLanguages}
                  >-</button>
                  <input
                    type="text"
                    className='numInput'
                    id={`numLanguages_${index}`}
                    value={numLanguages}
                    onChange={handleNumLanguagesChange}
                  />
                  <button 
                    className='inputButton'
                    onClick={increaseLanguages}
                  >+</button>
                </p>
              </div>
            )}
            
          </div>
          
        );
      })}

      <p>Total: {formattedPrice(total)}</p>
    </>
  );
}

export default App;
