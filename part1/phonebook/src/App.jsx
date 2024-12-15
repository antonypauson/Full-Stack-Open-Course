import { useState } from "react"

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleChange2 = (event) => {
    setNewNum(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const isDuplicate = persons.find((person => person.name == newName)) !== undefined
    console.log(isDuplicate)

    if (!isDuplicate) {
      const newPerson = {
        name: newName,
        number: newNum
      }
      setPersons(persons.concat(newPerson))
    } else {
      alert(`${newName} is already added!`)
    }
    setNewName('')
    setNewNum('')
    
    
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
          <br/>
        </div>

        <div>
          number: <input value={newNum} onChange={handleChange2}/>
        </div>

        <div>
          <button type="submit">add</button>
        </div>

      </form>
      <h1>Numbers</h1>
      {persons.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App