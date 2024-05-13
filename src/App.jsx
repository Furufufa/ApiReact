import { useState, useEffect } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import MiApi from './components/MiApi';
import Buscador from './components/Buscador';

const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

const App = () => {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await fetch(apiUrl + 'search.php?s=margarita');
        const data = await response.json();
        setCocktails(data.drinks || []);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    fetchCocktails();
  }, []);

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="#">Mi Bar de Cócteles</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Inicio <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Sobre Nosotros</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contacto">Contacto</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      
      <div className="container mt-5">
        {}
        <Buscador cocktails={cocktails} setCocktails={setCocktails} />

        <div className="row">
          {}
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

      <footer id='contacto' className="bg-dark text-white py-3 text-center">
        <div className="container">
          <p>Dirección: Avenida Italia 369, Ñuñoa, Chile</p>
          <p>Teléfono: +56999955522</p>
          <p>Email: info@mibardecócteles.com</p>
        </div>
      </footer>
    </div>
  );
};

export default App;