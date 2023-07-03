import { data } from '../assets/data';
import { useEffect, useState } from 'react';
import HelpButton from '../components/HelpButton';
import { SavedBudgets } from '../components/SavedBudgets';

function Budget() {
  const formattedPrice = (totalPrice: number) => `${totalPrice.toFixed(0)}€`;

  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [numPages, setNumPages] = useState(1);
  const [numLanguages, setNumLanguages] = useState(1);

  // ================= LOCAL STORAGE =================
  useEffect(() => {
    const savedCheckedState = window.localStorage.getItem('checkedState');
    const savedNumPages = window.localStorage.getItem('numPages');
    const savedNumLanguages = window.localStorage.getItem('numLanguages');
    const savedTotalPrice = window.localStorage.getItem('totalPrice');

    if (savedCheckedState !== null)
      setCheckedState(JSON.parse(savedCheckedState));
    if (savedNumPages !== null) setNumPages(JSON.parse(savedNumPages));
    if (savedNumLanguages !== null)
      setNumLanguages(JSON.parse(savedNumLanguages));
    if (savedTotalPrice !== null) setTotalPrice(JSON.parse(savedTotalPrice));
  }, []);

  useEffect(() => {
    localStorage.setItem('checkedState', JSON.stringify(checkedState));
    localStorage.setItem('numPages', JSON.stringify(numPages));
    localStorage.setItem('numLanguages', JSON.stringify(numLanguages));
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));

    calculateTotal();
  }, [checkedState, numPages, numLanguages, totalPrice]);
  // ===================================================

  const calculateTotal = () => {
    let calculatedTotal = checkedState.reduce((sum, currentState, index) => {
      if (currentState) {
        return sum + data[index].price;
      }
      return sum;
    }, 0);

    if (checkedState[0]) {
      calculatedTotal += numPages * numLanguages * 30;
    }

    setTotalPrice(calculatedTotal);
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
    setNumPages(numPages + 1);
  };

  const decreasePages = () => {
    if (numPages === 1) {
      setNumPages(numPages);
    } else {
      setNumPages(numPages - 1);
    }
  };

  const increaseLanguages = () => {
    setNumLanguages(numLanguages + 1);
  };

  const decreaseLanguages = () => {
    if (numLanguages === 1) {
      setNumLanguages(numLanguages);
    } else {
      setNumLanguages(numLanguages - 1);
    }
  };

  // ========================== SAVE BUDGET LOGIC ========================

  const [savedBudgets, setSavedBudgets] = useState<Budget[]>([]);
  const [budgetName, setBudgetName] = useState('');
  const [clientName, setClientName] = useState('');

  const handleBudgetNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setBudgetName(value);
  };

  const handleClientNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setClientName(value);
  };

  // ================= LOCAL STORAGE =================
  /*  useEffect(() => {
    const storedBudgetName = window.localStorage.getItem("budgetName");
    const storedClientName = window.localStorage.getItem("clientName");
    const storedSavedBudgets = window.localStorage.getItem("savedBudgets");
    
    if (storedBudgetName !== null) setBudgetName(JSON.parse(storedBudgetName));
    if (storedClientName !== null) setClientName(JSON.parse(storedClientName));
    if (storedSavedBudgets !== null) setSavedBudgets(JSON.parse(storedSavedBudgets));
  }, []);
  
  useEffect(() => {
    localStorage.setItem("budgetName", JSON.stringify(budgetName));
    localStorage.setItem("clientName", JSON.stringify(clientName));
    localStorage.setItem("savedBudgets", JSON.stringify(savedBudgets));
  }, [budgetName, clientName, savedBudgets]); */
  // ===================================================

  /* function emptyLocalStorage() {
    localStorage.setItem("budgetName", JSON.stringify(''));
    localStorage.setItem("clientName", JSON.stringify(''));
    localStorage.setItem("checkedState", JSON.stringify([false, false, false]));
    localStorage.setItem("numPages", JSON.stringify(1));
    localStorage.setItem("numLanguages", JSON.stringify(1));
    localStorage.setItem("budgetName", JSON.stringify(''));
    localStorage.setItem("clientName", JSON.stringify(''));
  }; */

  interface Budget {
    name: string;
    client: string;
    checked: boolean[];
    pages: number;
    languages: number;
    total: number;
    date: Date;
  }

  const handleSaveBudget = () => {
    const budget = {
      name: budgetName,
      client: clientName,
      checked: checkedState,
      pages: numPages,
      languages: numLanguages,
      total: totalPrice,
      date: new Date(),
    };

    setSavedBudgets([...savedBudgets, budget]);

    /* emptyLocalStorage(); */
  };
  // =========================================================================

  return (
    <div className="budgetDiv">
      <div>
        <p className="budgetTitle">
          What would you like to include in your budget?
        </p>

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
                <div className="inputDiv">
                  <p>
                    <label className="inputText1">Number of pages</label>
                    <button className="inputButton" onClick={decreasePages}>
                      -
                    </button>
                    <input
                      type="text"
                      className="numInput"
                      id={`numPages_${index}`}
                      value={numPages}
                      onChange={handleNumPagesChange}
                    />
                    <button className="inputButton" onClick={increasePages}>
                      +
                    </button>
                    <HelpButton pagesPopup={true} languagesPopup={false} />
                  </p>
                  <p>
                    <label className="inputText2">Number of languages</label>
                    <button className="inputButton" onClick={decreaseLanguages}>
                      -
                    </button>
                    <input
                      type="text"
                      className="numInput"
                      id={`numLanguages_${index}`}
                      value={numLanguages}
                      onChange={handleNumLanguagesChange}
                    />
                    <button className="inputButton" onClick={increaseLanguages}>
                      +
                    </button>
                    <HelpButton languagesPopup={true} pagesPopup={false} />
                  </p>
                </div>
              )}
            </div>
          );
        })}

        <p className="totalText">Total: {formattedPrice(totalPrice)}</p>

        <div className="saveBudgetDiv">
          <p className="saveBudgetTitle">Would you like to save your budget?</p>
          <div>
            <p>Choose a name for your budget</p>
            <input
              type="text"
              className="saveBudgetInput"
              placeholder="Budget 1"
              value={budgetName}
              onChange={handleBudgetNameChange}
            />
          </div>
          <div>
            <p>Write your name</p>
            <input
              type="text"
              className="saveBudgetInput"
              placeholder="Your name"
              value={clientName}
              onChange={handleClientNameChange}
            />
          </div>
          <div>
            <button className="saveBudgetButton" onClick={handleSaveBudget}>
              Save
            </button>
          </div>
        </div>
      </div>
      <SavedBudgets savedBudgets={savedBudgets}></SavedBudgets>
    </div>
  );
}

export default Budget;
