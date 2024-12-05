const Header = (props) => {

  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
    </>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercise}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}

const App = () => {

  const course = 'Half Stack application development'

  // const part1 = 'Fundamentals of react'

  // const exercises1 = 10

  // const part2 = 'Using props to pass data'

  // const exercises2 = 7

  // const part3 = 'State of a component'

  // const exercises3 = 14

  const parts = [
    {
      name: 'Fundamentals of react',
      exercise: 10
    },
    {
      name: 'Using props to pass data',
      exercise: 7
    },
    {
      name: 'State of a component',
      exercise: 14
    }
  ]

  return (
    <>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total total={parts[0].exercise + parts[1].exercise + parts[2].exercise}/>
    </>
  )
}

export default App