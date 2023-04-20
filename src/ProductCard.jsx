
const ProductCard = ({ imagen, nombre, precio }) => {
  return (
    <div className="product-card">
      <img src={imagen} alt={nombre} />
      <div className="product-details">
        <h3>{nombre}</h3>
        <p>Precio: ${precio}</p>
      </div>
    </div>
  );
};

export default ProductCard;
