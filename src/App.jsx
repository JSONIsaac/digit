import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import ProductCard from './ProductCard';


const App = () => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [message, setMessage] = useState('');

  const fetchTranslatedText = async (searchText) => {
    const response = await axios.get(
      `https://guatemaladigital.com:85/api/Busqueda?CadenaBusqueda=${searchText}`
    );
    return response.data;
  };

  const fetchProducts = async (searchText, translatedText) => {
    const response = await axios.get(
      `https://guatemaladigital.com:85/api/Busqueda?CadenaBusqueda=${searchText}&NumeroPagina=1&Traduccion=${translatedText}`
    );
    return response.data;
  };

  const handleSearch = async (searchText) => {
    setLoading(true);
    setMessage('');
    setSearchResult([]);

    const translatedText = await fetchTranslatedText(searchText);
    const products = await fetchProducts(searchText, translatedText);

    if (Array.isArray(products) && products.length === 0) {
      setMessage('No se encontraron productos.');
    } else if (Array.isArray(products)) {
      setSearchResult(products);
    } else {
      setMessage('Error en la respuesta de la API.');
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Buscador de productos</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <img src={'./cargando.gif'} alt="Cargando..." />}
      {message && <p>{message}</p>}
      <div className="product-list">
        {Array.isArray(searchResult) && searchResult.map((product) => (
          <ProductCard
            key={product.id}
            imagen={product.imagen}
            nombre={product.nombre}
            precio={product.precio}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
