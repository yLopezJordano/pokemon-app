import { useState, useEffect } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { isBrowser, isMobile } from 'react-device-detect';
import './App.css';

function App() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [pokemon, setPokemon] = useState({sprites: {front_default: ''},species: {name: ''}})
  const [isLoading, setIsLoading] = useState(true)
  const [limit, setLimit] = useState('20')
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
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
            array.push(<li onClick={ function() {fetchPokemonInfo(data.results[pokemon].url)} } key={data.results[pokemon].name}>{data.results[pokemon].name}</li>)
          }
          setLista(array)
        })
  }
  function fetchPokemonInfo (pokemon_url) {
    fetch(pokemon_url)
      .then(async response => {
        const pokemon = await response.json();
        setPokemon(pokemon)
      })
    setOpen(true)
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
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {pokemon.species.name}
            </Typography>
            <img src={pokemon.sprites.front_default}></img>
          </Box>
        </Modal>
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
