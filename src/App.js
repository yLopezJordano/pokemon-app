import { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { isBrowser, isMobile } from 'react-device-detect';
import './App.css';

function App() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  const [open, setOpen] = useState(false)
  const [view, setView] = useState('grid')
  const [pokemon, setPokemon] = useState({sprites: {front_default: ''},species: {name: ''}})
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(20)
  const [page, setPage] = useState('https://pokeapi.co/api/v2/pokemon?offset='+offset.toString()+'&limit='+limit.toString())
  const [nextPage, setNextPage] = useState(null)
  const [prevPage, setPrevPage] = useState(null)
  const [list, setList] = useState([])
  const handleClose = () => setOpen(false)
  const fetchList = () => {
      fetch(page)
        .then(async response => {
          const data = await response.json();
          if (data.next) {
            setNextPage(data.next)
          } else {
            setNextPage(null)
          }
          if (data.previous) {
            setPrevPage(data.previous)
          } else {
            setPrevPage(null)
          }
          populateList(data)
        })
  }
  function populateList (data) {
    let array = []
    for (let i in data.results) {
      array.push(<li onClick={ function() {fetchPokemonInfo(data.results[i].url)} } key={data.results[i].name}>
        {parseInt(offset) + parseInt(i) + 1}.{data.results[i].name}
      </li>)
    }
    setList(array)
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
    if (direction === "next") {
      setOffset(parseInt(nextPage.split('=')[1]))
    } else if (direction === "previous") {
      setOffset(parseInt(prevPage.split('=')[1]))
    }
  }
  function changeView (view) {
    setView(view)
  }
  useEffect(() => {
    fetchList()
  }, [page] )
  useEffect(() => {
    setPage('https://pokeapi.co/api/v2/pokemon?offset='+offset.toString()+'&limit='+limit.toString())
  }, [offset] )
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
        <div className="viewSelector">
          <span>Select view type</span>
          <span>
            <Button disabled={view==='list'} onClick={ function () {changeView('list')}}>
              List
            </Button>
            <Button disabled={view==='grid'} onClick={ function () {changeView('grid')}}>
              Grid
            </Button>
          </span>
        </div>
        <ul className={view}>
          {list}
        </ul>
        Showing from {offset + 1} to {offset+limit}
        <div className="navButtons">
            <Button disabled={!prevPage} onClick={ function() {changePage('previous')}}>
              Prev
            </Button>
            <Button disabled={!nextPage} onClick={ function() {changePage('next')}}>
              Next
            </Button>
        </div>
      </header>
    </div>
  );
}

export default App;
