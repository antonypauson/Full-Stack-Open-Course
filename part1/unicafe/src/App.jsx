import { useState } from "react"

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const total = good + bad + neutral

  if (total === 0) {
    return (
      <p>No feedbacks given</p>
    )
  }
  const average = total > 0 ? (good * 1 + neutral * 0 + bad * -1) / total : 0
  const positive = total > 0 ? (good / total) * 100 : 0

  return (
    <>
      <h1>statistics</h1>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='total' value={total}/>
      <StatisticLine text='average' value={average}/>
      <StatisticLine text='positive' value={positive + '%'}/>
    </>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <>
    <table>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </table>
    </>
  )
}
const App = () => {

  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGood(good + 1)}/>
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' handleClick={() => setBad(bad + 1)}/>

      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App