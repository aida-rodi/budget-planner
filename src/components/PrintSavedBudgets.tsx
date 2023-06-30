import { FC } from "react"

interface Props {
  savedBudgets: object[]
}

const PrintSavedBudgets:FC<Props> = ({savedBudgets}) => {
  return (
    <div>
          <h2>Presupuestos guardados:</h2>
          <ul>
            {savedBudgets.map((budget, index) => (
              <li key={index}>
                <strong>Nombre:</strong> {budget.name}
                <br />
                <strong>Cliente:</strong> {budget.client}
                <br />
                <strong>Servicio:</strong> {budget.service}
                <br />
                <strong>Total:</strong> {budget.total}
                <br />
                <strong>Fecha:</strong> {budget.date.toString()}
              </li>
            ))}
          </ul>
        </div>
  )
}

export default PrintSavedBudgets