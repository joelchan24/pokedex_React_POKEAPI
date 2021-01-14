import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPOkemonType] = useState("");

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    getPokemon();

  };
  const getPokemon = async () => {
    const toArray = [];
    try {


      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      console.log(res.data)
      toArray.push(res.data);
      setPOkemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
      //console.log(res);
    } catch (e) {

      console.log(e);
    }
  };

 





  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" 
          onChange={handleChange}
           placeholder="Enter Pokemon Name" />
        </label>
      </form>
      {pokemonData.map((data) => {
        return (
          <div className="container">
            <img src={data.sprites["front_default"]} />
            <div className="divTable" >
              <div className="divTableBody" >
                <div className="divTableRow">
                  <div className="divTableCell">Type </div>
                  <div className="divTableCell">{pokemonType} </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Height </div>
                  <div className="divTableCell">
                  {" "}
                  {Math.round(data.height * 3.9)}"
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Weight </div>
                  <div className="divTableCell">{" "}
                  {Math.round(data.weight/4.3)} lbs   
                 </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Number of Battles </div>
                  <div className="divTableCell">
                  {data.game_indices.length} 
                 
                 </div>
                </div>
              </div>
            </div>

          </div>

        )
      })}
    </div>
  );
}

export default App;
