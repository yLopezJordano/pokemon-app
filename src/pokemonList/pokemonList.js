import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import { Button } from '@mui/material';
import {
  useRecoilState,
} from 'recoil';

import { currentView, currentPage } from '../atoms';

import './pokemonList.css'

function PokemonList() {
    const [isLoading, setLoadoing] = useState(false)
    const theme = createTheme({
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              "&.Mui-disabled": {
                color: "white"
              }
            }
          }
        }
      }
    });
    const navigate = useNavigate()
    const [view, setView] = useRecoilState(currentView)
    const [offset, setOffset] = useRecoilState(currentPage)
    const [limit] = useState(20)
    const [page, setPage] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
    const [nextPage, setNextPage] = useState(null)
    const [prevPage, setPrevPage] = useState(null)
    const [list, setList] = useState([])
    const fetchList = () => {
        setLoadoing(true)
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
            setLoadoing(false)
          }).catch(() => {
            console.log('Error getting the pokemon list')
            setLoadoing(false)
          })
    }
    function populateList (data) {
      let array = []
      for (let i in data.results) {
        array.push(<li onClick={ function() {navigate('/pokemon-detail/' + data.results[i].name)} } key={data.results[i].name}>
          {parseInt(offset) + parseInt(i) + 1}.{data.results[i].name}
        </li>)
      }
      setList(array)
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
          <div>
              { isLoading ?
              <LoadingSpinner/> :
              <ThemeProvider theme={theme}>
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
              </ThemeProvider>
              }
          </div>
    )
}

export default PokemonList