import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/Pokemon.css';

// Import Components
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import SearchFilter from './components/SearchFilter';
import PokemonCard from './components/PokemonCard';
import PokemonDetail from './components/PokemonDetail';

const App = () => {
  // State Management
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(20);

  // Fetch Pokemon Data dari API
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        
        // Fetch list Pokemon pertama (150 Pokemon)
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await response.json();
        
        // Fetch detail setiap Pokemon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            return await detailResponse.json();
          })
        );
        
        setPokemonList(pokemonDetails);
        setFilteredPokemon(pokemonDetails);
        
        // Extract unique types untuk filter
        const allTypes = pokemonDetails.flatMap(p => 
          p.types.map(t => t.type.name)
        );
        setTypes([...new Set(allTypes)].sort());
        
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  // Filter Pokemon berdasarkan search dan type
  useEffect(() => {
    let filtered = pokemonList;

    // Filter berdasarkan search term
    if (searchTerm) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.id.toString().includes(searchTerm)
      );
    }

    // Filter berdasarkan type
    if (selectedType) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.some(type => type.type.name === selectedType)
      );
    }

    setFilteredPokemon(filtered);
    setCurrentPage(1); // Reset ke halaman pertama saat filter
  }, [searchTerm, selectedType, pokemonList]);

  // Event Handlers
  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleBackToList = () => {
    setSelectedPokemon(null);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    setSelectedPokemon(null);
    setSearchTerm('');
    setSelectedType('');
  };

  // Pagination Logic
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render Pokemon Detail Page
  if (selectedPokemon) {
    return (
      <>
        <Navbar onHomeClick={handleHomeClick} />
        <PokemonDetail pokemon={selectedPokemon} onBack={handleBackToList} />
      </>
    );
  }

  // Render Main Pokemon List Page
  return (
    <>
      <Navbar onHomeClick={handleHomeClick} />
      <div className="container py-4">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4">Pokemon Collection</h1>
            
            {/* Search and Filter Section */}
            <SearchFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              types={types}
            />

            {/* Loading State */}
            {loading ? (
              <Loading />
            ) : (
              <>
                {/* Pokemon Cards Grid */}
                <div className="pokemon-grid">
                  {currentPokemon.map(pokemon => (
                    <PokemonCard
                      key={pokemon.id}
                      pokemon={pokemon}
                      onClick={handlePokemonClick}
                    />
                  ))}
                </div>

                {/* No Results Message */}
                {filteredPokemon.length === 0 && !loading && (
                  <div className="text-center py-5">
                    <h5>Tidak ada Pokemon ditemukan</h5>
                    <p>Coba ubah pencarian atau filter Anda</p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-4">
                    <nav aria-label="Pokemon pagination">
                      <ul className="pagination mb-0">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                          >
                            Previous
                          </button>
                        </li>
                        {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                          const pageNumber = currentPage <= 3 ? index + 1 : currentPage - 2 + index;
                          if (pageNumber > totalPages) return null;
                          return (
                            <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                              <button
                                className="page-link"
                                onClick={() => paginate(pageNumber)}
                                aria-label={`Go to page ${pageNumber}`}
                              >
                                {pageNumber}
                              </button>
                            </li>
                          );
                        })}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}

                {/* Results Info */}
                <div className="text-center mt-3">
                  <small className="text-muted">
                    Menampilkan {indexOfFirstPokemon + 1}-{Math.min(indexOfLastPokemon, filteredPokemon.length)} dari {filteredPokemon.length} Pokemon
                  </small>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;