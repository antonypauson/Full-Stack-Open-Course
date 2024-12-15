import { useState } from "react"

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filteredNames, setFilteredNames] = useState(persons)

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleChange2 = (event) => {
    setNewNum(event.target.value)
  }

  const handleSearch = (event) => {
    const searchValue = event.target.value
    if (searchValue === '') {
      setFilteredNames(persons)
    } else {
      const filteredNames = persons.filter(person => 
        person.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredNames(filteredNames)
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const isDuplicate = persons.find((person => person.name == newName)) !== undefined

    if (!isDuplicate) {
      const newPerson = {
        name: newName,
        number: newNum,
        id: persons.length + 1
      }
      setPersons(persons.concat(newPerson))
      setFilteredNames(persons.concat(newPerson))
    } else {
      alert(`${newName} is already added!`)
    }
    setNewName('')
    setNewNum('')
    
    
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        filter shown with <input onChange={handleSearch}/>
      </div>

      <h1>add a new</h1>
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
      {filteredNames.map(person => 
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App