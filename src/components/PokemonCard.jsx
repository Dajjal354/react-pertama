import React from 'react';

const PokemonCard = ({ pokemon, onClick }) => (
  <div className="pokemon-card-wrapper">
    <div className="card pokemon-card h-100" onClick={() => onClick(pokemon)}>
      <div className="card-body text-center">
        <img
          src={pokemon.sprites?.front_default || 'https://via.placeholder.com/120'}
          alt={pokemon.name}
          className="pokemon-image mb-3"
        />
        <h5 className="card-title text-capitalize">{pokemon.name}</h5>
        <p className="card-text">
          <small className="text-muted">#{pokemon.id.toString().padStart(3, '0')}</small>
        </p>
        <div className="d-flex flex-wrap justify-content-center">
          {pokemon.types?.map(type => (
            <span
              key={type.type.name}
              className={`badge type-badge type-${type.type.name} text-white`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default PokemonCard;