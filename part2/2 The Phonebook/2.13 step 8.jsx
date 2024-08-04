import { useState, useEffect } from 'react'
// import axios from "axios"
import { Names } from "./Components/Names"
import name from "./service/name"

const Filter=({ searchPerson, handleSearchPerson })=>{
return (
  <div>
    filter shown with: <input value={searchPerson} onChange={handleSearchPerson} />       
  </div>
)
}

const PersonForm=({addName, newName, handleNameChange, newNumber, handleNumberChange})=>{
  return(
    <div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />       
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />       
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> 
    </div>
  )
}

const Persons = ({ filteredPerson }) => {
  return (
    <div>
      {filteredPerson.map((person) => {
        return <Names key={person.id} person={person} />
      })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchPerson, setSearchPerson] = useState("")
  const [filteredPerson, setFilteredPerson] = useState([])

  const hook = () => {
    // () => {
    console.log("effect")
    name.getAll().then((initialPerson) => {
        console.log("promise fulfiled!")
        setPersons(initialPerson)
        setFilteredPerson(initialPerson)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
      })
    }
  //}
  useEffect(hook, [])
  console.log("render", persons.length, "persons")

const addName = (event) => {
  event.preventDefault()
  console.log(event.target)

  const nameExists = persons.some((person) => person.name === newName)

  if (nameExists) {
    alert(`${newName} is already added to phonebook`)
    setNewName("")
    return
  }

  const nameObject = {
    id: persons.length + 1,
    name: newName,
    number: newNumber,
  }

  name.create(nameObject).then(returnedPerson => {
    console.log(returnedPerson)
    setPersons(persons.concat(returnedPerson))
    setFilteredPerson(filteredPerson.concat(returnedPerson))
    setNewName("")
    setNewNumber("")
  })

}

const handleNameChange = (event) => {
  console.log(event.target.value)
  setNewName(event.target.value)
}

const handleNumberChange = (event) => {
  console.log(event.target.value)
  setNewNumber(event.target.value)
}

const handleSearchPerson = (event) => {
  console.log(event.target.value)
  setSearchPerson(event.target.value)

  const filterItems = persons.filter((person) =>
    person.name.toLowerCase().includes(event.target.value.toLowerCase())
  )
  setFilteredPerson(filterItems)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson} handleSearchPerson={handleSearchPerson}/>
      <h3>Add a new</h3>
      <PersonForm 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <persons filteredPerson={filteredPerson}/>
    </div>
  )
}

export default App