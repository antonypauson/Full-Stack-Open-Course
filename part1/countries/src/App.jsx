import { useState } from "react"
import Countries from "./components/Countries"
import { useEffect } from "react"
import axios from 'axios'

const App = () => {

  const [newEntry, setEntry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (newEntry != '') {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          const list = response.data.filter(c => c.name.official.toLowerCase().includes(newEntry.toLowerCase()) || c.name.official.toLowerCase().startsWith(newEntry.toLowerCase()))
          setCountries(list)
        })
        }
  },[newEntry])

  console.log('country', countries)

  const handleSearch = (event) => {
    setEntry(event.target.value)
  }

  const handleShow = (country) => {
    const selected = countries.find(c => c.name.common === country)
    if (selected) {
      setCountries([selected])
    }
  }

  
  return (
    <div>
      find countries: 
      <input value={newEntry} onChange={handleSearch}/>

      <Countries countries={countries} handleShow={handleShow}/>
    </div>
  )
}

export default App