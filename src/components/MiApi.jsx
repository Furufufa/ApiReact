import React, { useState, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const MiApi = () => {
  const [cocktails, setCocktails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        setCocktails(data.drinks || []);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    fetchCocktails();
  }, [searchTerm]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);

    const sortedCocktails = [...cocktails];
    
    sortedCocktails.sort((a, b) => {
      if (value === 'asc') {
        return a.strDrink.localeCompare(b.strDrink);
      } else {
        return b.strDrink.localeCompare(a.strDrink);
      }
    });
    
    setCocktails(sortedCocktails);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cócteles</h2>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Buscar por nombre de cóctel..."
          aria-label="Buscar por nombre de cóctel..."
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={handleSortChange}>
            Ordenar {sortOrder === 'asc' ? 'ascendentemente' : 'descendentemente'}
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <Form.Group controlId="sortOrderSelect">
        <Form.Label>Ordenar</Form.Label>
        <Form.Control
          as="select"
          value={sortOrder}
          onChange={handleSortChange}
          custom // Agrega la clase .custom-select al select
        >
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </Form.Control>
      </Form.Group>
      <div className="row">
        {cocktails.map(cocktail => (
          <div key={cocktail.idDrink} className="col-md-4 mb-4">
            <div className="card">
              <img src={cocktail.strDrinkThumb} className="card-img-top" alt={cocktail.strDrink} />
              <div className="card-body">
                <h5 className="card-title">{cocktail.strDrink}</h5>
                <p className="card-text">Ingredientes: {cocktail.strIngredient1}, {cocktail.strIngredient2}, ...</p>
                <p className="card-text">Alcohólico: {cocktail.strAlcoholic === 'Alcoholic' ? 'Sí' : 'No'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiApi;

