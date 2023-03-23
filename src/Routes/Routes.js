import { Route, Routes, Navigate } from "react-router-dom";
import PokemonDetail from "../pokemonList/pokemonDetail/pokemonDetail";
import PokemonList from "../pokemonList/pokemonList";

function RoutesList() {
    return (
        <Routes>
            <Route path='/' element={<PokemonList/>}></Route>
            <Route path='/pokemon-detail/:name' element={<PokemonDetail/>}></Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
export default RoutesList;