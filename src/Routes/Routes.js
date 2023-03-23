import { Route, Routes } from "react-router-dom";
import PokemonDetail from "../pokemonList/pokemonDetail/pokemonDetail";
import PokemonList from "../pokemonList/pokemonList";

function RoutesList() {
    return (
        <Routes>
            <Route path='/' element={<PokemonList/>}></Route>
            <Route path='/pokemon-detail/:name' element={<PokemonDetail/>}></Route>
        </Routes>
    )
}
export default RoutesList;