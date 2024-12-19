const Countries = ({ countries,handleShow }) => {
    const emoji = {
        fontSize: 250,
        marginTop: 1,
        paddingTop: 1
    }

    const getDetails = (country) => {
        
        
    }

    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    } else if (countries.length > 1) {
        return (
            <div>
                <ul>
                    {countries.map(c => 
                        <li>{c.name.official}
                        <button onClick={() => handleShow(c.name.common)}>show</button>
                        </li>
                    )}
                </ul>
            </div>
        )
    } else if (countries.length === 1){
        const country = countries[0]
        const languages = []
        Object.values(country.languages).forEach(value =>
                languages.push(value)
        )

        return (
            <div>
                <h1>{country.name.official}</h1>
                <h4>Capital: {country.capital[0]}</h4>
                <h4>Population: {country.population}</h4>
                
                <h4>languages:</h4>
                <ul>
                    {languages.map(lang =>
                        <li key={Math.random()}>{lang}</li>
                    )}
                </ul>
                <p style={emoji}>{country.flag}</p>
            </div>
            
        )
    }
    
}

export default Countries