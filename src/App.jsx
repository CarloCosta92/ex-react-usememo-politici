import { useState, useEffect, useMemo } from 'react'
import './App.css'

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
            <div className="col-12 col-lg-3 mb-4 p-3" key={el.id}>
              <div className="card h-100 shadow">
                <img src={el.image} className="card-img-top" alt={el.name} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{el.name}</h5>
                  <p className="card-text">{el.position}</p>
                  <p className="card-text small text-muted">{el.biography}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


    </>
  )
}

export default App
