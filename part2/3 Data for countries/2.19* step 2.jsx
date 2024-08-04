import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchItem, setSearchItem] = useState("")
  const [selectedCountry, setSelectedCountry]= useState(null)

  useEffect(() => {
    if (searchItem.trim()==='') {
      setCountries([])
      return
    }

    const fetchCountry = async() => {
      try {
        const url =  `https://restcountries.com/v3.1/name/${searchItem}`
        const response=await axios.get(url)
        console.log(response.data)
        setCountries(response.data)
      } catch (error) {
        console.error("Error fetching data: ", error.data)
      }
    }
    fetchCountry()
  },[searchItem])

  const renderLanguage = (languages) => {
    if(Array.isArray(languages)) {
      return languages.join(", ")
    } else if (typeof languages === "object") {
      return Object.values(languages).join(", ")
    } else {
      return "Unknown"
    }
  }

  const handleCountryButton = (country) => setSelectedCountry(country)

  

  return (
    <div>
      <h1>Country Information App</h1>
      <label>Search for a country: 
        <input type="text" value={searchItem} onChange={(e) => setSearchItem(e.target.value)}></input>
      </label>

      {countries.length > 10 && (<p>Too many countries, please make your entry specific</p>)}

      {countries.length <= 10 && countries.length > 1 && (
        <div>
          <h3>Matching Countries:</h3>
          <ul>
            {countries.map((country) => (
              <li key={country.name.common}>{country.name.common} <button onClick={() => handleCountryButton(country)}>Show Country Data</button></li>
            ))}
          </ul>
        </div>
      )}

      {selectedCountry && (
        <div>
          <h3>{selectedCountry.name.common}</h3>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Area: {selectedCountry.area}</p>
          <p>Language(s): {selectedCountry.languages && renderLanguage(selectedCountry.languages)}</p>
          <p>Flag:</p>
          {<img src={selectedCountry.flags.png} alt={`${selectedCountry.name.common}'s flag`}></img>}
          <p>Coat fo Arms</p>
          {
            <img
              src={selectedCountry.coatOfArms.svg}
              alt={`${selectedCountry.name.common}'s Coat Of Arms`}
              width="300px"
              height="250px"
              ></img>
          }
        </div>
      )}
    </div>
  )
}

export default App