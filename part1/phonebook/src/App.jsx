import { useState } from "react"
import { useEffect } from "react"
import axios from 'axios'

const Filter = ({onChange}) => {
  return (
    <div>
      filter shown with <input onChange={onChange}/>
    </div>
  )
}

const PersonForm = ({onSubmit, value1, value2, onChange1, onChange2}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={value1} onChange={onChange1}/>
        </div>
        <div>
          number: <input value={value2} onChange={onChange2}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filteredNames, setFilteredNames] = useState(persons)

  useEffect(() => {
    console.log('effect')
    axios 
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fullfilled')
        setPersons(response.data)
        setFilteredNames(response.data)
      })
  }, [])

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
      }

      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setFilteredNames(persons.concat(response.data))
        })
      
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
        <Filter onChange={handleSearch}/>
      </div>

      <h1>add a new</h1>

      <PersonForm onSubmit={addName} value1={newName} value2={newNum} onChange1={handleChange} onChange2={handleChange2}/>

 
      <h1>Numbers</h1>
      {filteredNames.map(person => 
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App