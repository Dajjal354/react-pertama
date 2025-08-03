import React from 'react';

const PokemonDetail = ({ pokemon, onBack }) => (
  <div className="container py-4">
    <button className="btn btn-secondary mb-4" onClick={onBack}>
      ← Kembali ke Daftar
    </button>
    
    <div className="row">
      <div className="col-md-4 text-center">
        <img
          src={pokemon.sprites?.front_default}
          alt={pokemon.name}
          className="img-fluid mb-3"
          style={{maxWidth: '200px'}}
        />
        <div className="d-flex justify-content-center gap-2 mb-3">
          {pokemon.sprites?.front_shiny && (
            <img
              src={pokemon.sprites.front_shiny}
              alt={`${pokemon.name} shiny`}
              style={{width: '80px', height: '80px'}}
              className="border rounded"
            />
          )}
          {pokemon.sprites?.back_default && (
            <img
              src={pokemon.sprites.back_default}
              alt={`${pokemon.name} back`}
              style={{width: '80px', height: '80px'}}
              className="border rounded"
            />
          )}
        </div>
      </div>
      
      <div className="col-md-8">
        <h1 className="text-capitalize mb-3">{pokemon.name}</h1>
        <p className="text-muted mb-4">#{pokemon.id.toString().padStart(3, '0')}</p>
        
        <div className="row mb-4">
          <div className="col-sm-6">
            <h5>Informasi Dasar</h5>
            <p><strong>Tinggi:</strong> {pokemon.height / 10} m</p>
            <p><strong>Berat:</strong> {pokemon.weight / 10} kg</p>
            <p><strong>Pengalaman Dasar:</strong> {pokemon.base_experience}</p>
          </div>
          <div className="col-sm-6">
            <h5>Tipe</h5>
            <div className="d-flex flex-wrap">
              {pokemon.types?.map(type => (
                <span
                  key={type.type.name}
                  className={`badge type-badge type-${type.type.name} text-white me-2 mb-2`}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h5>Kemampuan</h5>
          <div className="d-flex flex-wrap gap-2">
            {pokemon.abilities?.map(ability => (
              <span key={ability.ability.name} className="badge bg-info text-capitalize">
                {ability.ability.name.replace('-', ' ')}
                {ability.is_hidden && ' (Hidden)'}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h5>Statistik</h5>
          {pokemon.stats?.map(stat => (
            <div key={stat.stat.name} className="mb-2">
              <div className="d-flex justify-content-between">
                <span className="text-capitalize">
                  {stat.stat.name.replace('-', ' ')}
                </span>
                <span>{stat.base_stat}</span>
              </div>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{width: `${Math.min(stat.base_stat / 2, 100)}%`}}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default PokemonDetail;