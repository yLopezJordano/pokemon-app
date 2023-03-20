import { useState, useEffect } from 'react';
import './App.css';

function App() {
  let [lista, setLista] = useState([])
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20')
      .then(async response => {
        const data = await response.json();
        let array = []
        for (let pokemon in data.results) {
          array.push(<li key={data.results[pokemon].name}>{data.results[pokemon].name}</li>)
        }
        setLista(array)
      })
  }, [] )
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {lista}
        </ul>
      </header>
    </div>
  );
}

export default App;
