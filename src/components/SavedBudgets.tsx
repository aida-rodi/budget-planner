export function SavedBudgets(props) {
  return (
    <div className="savedBudgetsDiv">
      <p className="savedBudgetsTitle">Saved budgets:</p>
      <div>
        {props.savedBudgets.map((budget, index) => (
          <ul key={index}>
            <li>Budget: {budget.name}</li>
            <li>Client: {budget.client}</li>
            <li>Services: {budget.checked.toString()}</li>
            <li>Total: {budget.total}€</li>
            <li>Date: {budget.date.toDateString()}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}
