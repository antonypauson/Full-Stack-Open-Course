import { useState } from "react"

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({text, value}) => {
  return (
    <>
      <p>{text} {value}</p>
    </>
  )
}
const App = () => {

  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)

  const total = good + bad + neutral
  const average = total > 0 ? (good * 1 + neutral * 0 + bad * -1) / total : 0
  const positive = total > 0 ? (good / total) * 100 : 0

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGood(good + 1)}/>
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' handleClick={() => setBad(bad + 1)}/>
      <h1>statistics</h1>
      <Statistics text='good' value={good}/>
      <Statistics text='neutral' value={neutral}/>
      <Statistics text='bad' value={bad}/>
      <Statistics text='all' value={total}/>
      <Statistics text='average' value={average}/>
      <Statistics text='positive' value={positive+'%'}/>
    </div>
  )
}

export default App