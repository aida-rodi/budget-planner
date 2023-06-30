import { FC, /* useEffect,  */useState } from "react";

interface Budget {
  name: string;
  client: string;
  checked: boolean[];
  total: number;
  date: Date;
}

interface SaveBudgetProps {
  checkedState: boolean[];
  total: number;
  setShowSaveBudgetPopup:Function
}

const SaveBudget:FC<SaveBudgetProps> = ({checkedState, total, setShowSaveBudgetPopup}) => {
  
  const [budgetName, setBudgetName] = useState('')
  const [clientName, setClientName] = useState('')

  const handleBudgetNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target.value);
    setBudgetName(value);
  };
  
  const handleClientNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target.value);
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

  function emptyLocalStorage() {
    localStorage.setItem("budgetName", JSON.stringify(''));
    localStorage.setItem("clientName", JSON.stringify(''));
    localStorage.setItem("checkedState", JSON.stringify([false, false, false]));
    localStorage.setItem("numPages", JSON.stringify(1));
    localStorage.setItem("numLanguages", JSON.stringify(1));
    localStorage.setItem("budgetName", JSON.stringify(''));
    localStorage.setItem("clientName", JSON.stringify(''));
  };
  
  function createNewBudget() {
    /* const numPages = localStorage.getItem("numPages");
    const numLanguages = localStorage.getItem("numLanguages");
    const checkedState = localStorage.getItem("checkedState");
    const total = localStorage.getItem("totalPrice"); */

    const budget: Budget = {
      name: budgetName,
      client: clientName,
      checked: checkedState,
      /* pages: numPages,
      languages: numLanguages, */
      total: total,
      date: new Date(),
    };

    setSavedBudgets([...savedBudgets, budget]);
    console.log('log1', savedBudgets);

    emptyLocalStorage();
    setShowSaveBudgetPopup(false);
  }

  return (
    <>
      <div>
        <p>Choose a name for your budget</p>
        <input
          type="text"
          className="saveBudgetInput"
          value={budgetName}
          onChange={handleBudgetNameChange}
         />
      </div>
      <div>
        <p>Write your name</p>
        <input 
          type="text"
          className="saveBudgetInput"
          value={clientName}
          onChange={handleClientNameChange}
        />
      </div>
      <div>
        <button className="saveBudgetButton" onClick={() => setShowSaveBudgetPopup(false)}>
          Back
        </button>
        <button className="saveBudgetButton" onClick={createNewBudget}>Save</button>
      </div>
    </>
  )
}

export default SaveBudget