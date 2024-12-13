const Courses = ({courses}) => {
  return (
    <div>
      {courses.map(course => 
        <Course course={course}/>
      )}
    </div>
  )
}



const Course = ({course}) => {
  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Total = ({parts}) => {
  return (
    <div>
      <h1>total of {parts.reduce((accumulator, sum) =>
         accumulator + sum.exercises
      , 0)} exercises</h1>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => 
        <Part part={part} key={part.id}/>
      )}
    </>
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <Courses courses={courses}/>
    </>
  )
}

export default App