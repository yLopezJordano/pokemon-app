import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [limit, setLimit] = useState('20')
  const [pagination, setPagination] = useState({
    current: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit'+ '=' +{limit},
    next: null,
    previous: null
  })
  let [lista, setLista] = useState([])
  function fetchList () {
      fetch(pagination.current)
        .then(async response => {
          const data = await response.json();
          console.log(data.next)
          if (data.next) {
            pagination.next = data.next.split('=').slice(0,2).join('=')
          } else {
            pagination.next = null
          }
          if (data.previous) {
            pagination.previous = data.previous.split('=').slice(0,2).join('=')
          } else {
            pagination.previous = null
          }
          let array = []
          for (let pokemon in data.results) {
            array.push(<li onClick={ function() {console.log(data.results[pokemon].url)} } key={data.results[pokemon].name}>{data.results[pokemon].name}</li>)
          }
          setLista(array)
        })
  }
  function changePage (direction) {
    setIsLoading(true)
    if (direction === "next") {
      pagination.current = pagination.next
      fetchList()
    } else if (direction === "previous") {
      pagination.current = pagination.previous
      fetchList()
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      fetchList()
    }
    fetchData()
  }, [] )
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {lista}
        </ul>
        <button disabled={!pagination.next} onClick={ function() {changePage('next')}}>Next</button>
        <button disabled={!pagination.previous} onClick={ function() {changePage('previous')}}>Previous</button>
      </header>
    </div>
  );
}

export default App;
