import { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState({
    current: 'https://pokeapi.co/api/v2/pokemon',
    next: null,
    previous: null
  })
  let [lista, setLista] = useState([])
  function fetchList () {
      fetch(pagination.current)
        .then(async response => {
          const data = await response.json();
          console.log('data.next')
          console.log(data.next)
          pagination.next = data.next
          setPagination({pagination})
          setPagination({...pagination, previous: data.previous})
          let array = []
          for (let pokemon in data.results) {
            array.push(<li onClick={ function() {console.log(data.results[pokemon].url)} } key={data.results[pokemon].name}>{data.results[pokemon].name}</li>)
          }
          setLista(array)
        })
  }
  function changePage (direction) {
    if (direction === "next") {
      pagination.current = pagination.next
      fetchList()
    } else if (direction === "previous") {
      pagination.current = pagination.previous
      fetchList()
    } else {
      alert('unexpected change')
    }
    setIsLoading(true)
  }
  useEffect(() => {
    fetchList()
  }, [isLoading] )
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {lista}
        </ul>
        <button onClick={ function() {changePage('next')}}>Next</button>
        <button onClick={ function() {changePage('previous')}}>Previous</button>
      </header>
    </div>
  );
}

export default App;
