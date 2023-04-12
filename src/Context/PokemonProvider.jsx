import { useState, useEffect } from "react";
import { PokemonContext } from "./PokemonContext";
import { useForm } from "../Hook/useForm";

export const PokemonProvider = ({ children }) => {
  const [offset, setOffset] = useState(0);
  const [allPokemons, setAllPokemons] = useState([]);
  const [globalPokemons, setGlobalPokemons] = useState([]);

  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(false);

  const {valueSearch, onImputChange, onResetForm} = useForm({
    valueSearch: "",
  });

  const getAllPokemons = async (limit = 20) => {
		const baseURL = 'https://pokeapi.co/api/v2/';

		const res = await fetch(
			`${baseURL}pokemon?limit=${limit}&offset=${offset}`
		);
		const data = await res.json();

		const promises = data.results.map(async pokemon => {
			const res = await fetch(pokemon.url);
			const data = await res.json();
			return data;
		});
		const results = await Promise.all(promises);

		setAllPokemons([...allPokemons, ...results]);
		setLoading(false);
	};

  const getGlobalPokemons = async () => {
    const baseUrl = `https://pokeapi.co/api/v2/`;
    const res = await fetch(`${baseUrl}pokemon?limit=100000&offset=0`);

    const data = await res.json();

    const promise = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const data = await res.json();
      return data;
    });

    const results = await Promise.all(promise);

    setGlobalPokemons(results);
    setLoading(false);
  };

  const getPokemonById = async (id) => {
    const baseUrl = `https://pokeapi.co/api/v2/`;
    const res = await fetch(`${baseUrl}pokemon/${id}`);

    const data = await res.json();

    return data;
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  useEffect(() => {
    getGlobalPokemons();
  }, []);

  return (
    <PokemonContext.Provider value={{
        valueSearch,
        onImputChange,
        onResetForm,
        allPokemons,
        globalPokemons,
        getPokemonById
     }}>
      {children}
    </PokemonContext.Provider>
  );
};
