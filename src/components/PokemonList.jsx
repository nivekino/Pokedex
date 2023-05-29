import React, { useContext } from 'react';
import CardPokemon from './CardPokemon';
import { Loader } from './Loader';
import { PokemonContext } from '../context/PokemonContext';

const PokemonList = () => {
	const { allPokemons, loading, filteredPokemons } =
		useContext(PokemonContext);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<div className='card-list-pokemon container'>
					{filteredPokemons.length ? (
						<>
							{filteredPokemons.map(pokemon => (
								<CardPokemon pokemon={pokemon} key={pokemon.id} />
							))}
						</>
					) : (
						<>
							{allPokemons.map(pokemon => (
								<CardPokemon pokemon={pokemon} key={pokemon.id} />
							))}
						</>
					)}
				</div>
			)}
		</>
	);
};

export default PokemonList;