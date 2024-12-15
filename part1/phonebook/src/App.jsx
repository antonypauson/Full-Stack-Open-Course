import { useState } from "react"

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const isDuplicate = persons.find((person => person.name == newName)) !== undefined
    console.log(isDuplicate)

    if (!isDuplicate) {
      const newPerson = {
        name: newName
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
    } else {
      alert(`${newName} is already added!`)
      setNewName('')
    }
    
    
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
          <br/>
          debug: {newName}
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h1>Numbers</h1>
      {persons.map(person => 
        <p key={person.name}>{person.name}</p>
      )}
    </div>
  )
}

export default App