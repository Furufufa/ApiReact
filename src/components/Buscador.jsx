import React, { useState } from 'react';

const Buscador = ({ cocktails, setCocktails }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
   
    const filteredCocktails = cocktails.filter(cocktail =>
      cocktail.strDrink.toLowerCase().includes(term.toLowerCase())
    );
    
    setCocktails(filteredCocktails);
  };

  return (
    <form className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar cóctel..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Buscador;
