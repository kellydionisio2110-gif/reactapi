
import s from './App.module.css'
import logo from '/goku.jpeg'
import { api } from './constants/api'
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([])
  const [page, setPage] = useState()
  const [inputPage, setInputPage] = useState("1")

  useEffect(() => {
    const carrega = async () => {
      try {
        const response = await api.get(`/character?page=${page}`)
        setData(response.data.results)
      } catch {
        console.error("Não foi possível buscar personagens")

      }
    }
    carrega()

    return () => {

    }
  }, [])



  return (
    <>

      <div className={s.wrapImg}>
        <img src={logo} alt="logo" className={s.logo} />
      </div>
      <div className={s.wrapInputs}>
        <label>Digitie uma página de 1/42</label>
        <input type="number" min={1} max={42} placeholder='1/42' value={inputPage} onChange={(e) => setInputPage(e.target.value)} />
        <button onClick={() => setPage(Number(inputPage))}>BUSCAR</button>
      </div>

      <main>
        {data.map(item => {
          return (
            <div key={item.id} className={s.card}>
              <img src={item.image} alt={item.name}/>
              <div className={s.wraptexts}>
                <h2>{item.name}</h2>
                <p>{item.status}</p>
                <p>{item.species}</p>
                <p>{item.gender}</p>
                <p>{item.location.name}</p>
              </div>
            </div>
          )
        })}

      </main>

    </>





  )
}

export default App
