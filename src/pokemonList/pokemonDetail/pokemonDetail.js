import { Typography, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../../loadingSpinner/loadingSpinner';

import './pokemonDetail.css'

function PokemonDetail() {
    const navigate = useNavigate()
    const { name } = useParams()
    const [pokemon, setPokemon] = useState({sprites: {front_default: ''},species: {name: ''}})
    const [isLoading, setLoadoing] = useState(false)
    function fetchPokemonInfo () {
      setLoadoing(true)
      fetch('https://pokeapi.co/api/v2/pokemon/'+name)
        .then(async response => {
          const pokemon = await response.json();
          setPokemon(pokemon)
          setLoadoing(false)
        }).catch(() => {
          console.log('Error getting the pokemon info')
          setLoadoing(false)
        })
    }
    useEffect(() => {
        fetchPokemonInfo()
      }, [] )
    return (
        <div>
            { isLoading ?
            <LoadingSpinner/> :
                <div className="pokemonDetail">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {pokemon.species.name}
                    </Typography>
                    <img src={pokemon.sprites.front_default}></img>
                    <Button onClick={ function() {navigate('/')}}>Back</Button>
                </div>
            }
        </div>
    )
}

export default PokemonDetail;