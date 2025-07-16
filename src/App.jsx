import { useState, useEffect, useMemo } from 'react'
import './App.css'
import CardPolitici from './componenti.jsx/CardPolitici'

function App() {

  const endpoint = "http://localhost:3333/politicians"

  const [politici, setPolitici] = useState([])

  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Errore nella richiesta: ' + response.status);
        }
        return response.json();

      })
      .then(data => {

        setPolitici(data)

        console.log(data);
      })
      .catch(error => {

        console.error('Errore:', error);
      })
  }, [])

  // filtro di ricerca
  const politiciFiltrati = useMemo(() => {
    const term = search.toLowerCase()
    return politici.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.biography.toLowerCase().includes(term)
    )
  }, [politici, search])




  return (
    <>
      <h1 className="text-center my-4">Lista dei politici</h1>

      <div className="container mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Cerca"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="container">
        <div className="row">
          {politiciFiltrati.map((el) => (
            <CardPolitici key={el.id} politico={el} />
          ))}
        </div>
      </div>


    </>
  )
}

export default App
