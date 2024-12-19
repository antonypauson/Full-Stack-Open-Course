import { useState } from "react"
import { useEffect } from "react"
import noteService from './services/persons'

const Notification = ({message}) => {
  const errorStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message == null) {
    return null
  }

  return (
    <div className="error" style={errorStyle}>
      {message}
    </div>
  )
}

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
  const [errorMessage, setError] = useState('error comes here')

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(response => {
        console.log('promise fullfilled')
        setPersons(response)
        setFilteredNames(response)
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
    const isDuplicate2 = persons.find((person => person.name == newName))
    if (!isDuplicate) {
      const newPerson = {
        name: newName,
        number: newNum,
      }
      noteService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setFilteredNames(persons.concat(response))
        })
      
    } else {
      if (window.confirm(`${newName} is already added! Do you want to replace?`)) {
        const id = isDuplicate2.id
        const person = persons.find(n => n.id === id)
        const newPerson = {...person, number: newNum}
        noteService
          .update(id,newPerson)
          .then(response => {
            const updatedPersons = persons.map(person => person.id === id ? response : person)
            setPersons(updatedPersons)
            setFilteredNames(updatedPersons)
          })
      }
    }
    setError(
      `Added ${newName}`
    )
    setTimeout(() => {
      setError(null)
    }, 5000)
    setNewName('')
    setNewNum('')
  }

  const deleteName = (id) => {
    console.log(`${id} will be deleted?`)
    noteService
      .deletes(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        setFilteredNames(persons.filter(person => person.id !== id))
      })
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage}/>
      <div>
        <Filter onChange={handleSearch}/>
      </div>

      <h1>add a new</h1>

      <PersonForm onSubmit={addName} value1={newName} value2={newNum} onChange1={handleChange} onChange2={handleChange2}/>

 
      <h1>Numbers</h1>
      {filteredNames.map(person => 
      <div key={person.id}>
        <p>{person.name} {person.number} 
        <button onClick={() => deleteName(person.id)}>Click</button>
        </p>
        
      </div>
      
      )}
    </div>
  )
}

export default App