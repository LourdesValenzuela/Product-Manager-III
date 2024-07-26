import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = ({ products = [], removeFromDom }) => {
    // Verifica si removeFromDom es una función válida.
    if (typeof removeFromDom !== 'function') {
        console.error('removeFromDom is not a function');
        return null;
    }

    // Función para manejar la eliminación de un producto.
    const deleteProduct = (productId) => {
        // Realiza una solicitud DELETE para eliminar el producto.
        axios.delete('http://localhost:8000/' + productId)
            .then(res => { 
                // Llama a la función removeFromDom pasada como prop para actualizar el DOM.
                removeFromDom(productId); 
            })
            .catch(err => console.error(err)); // Maneja cualquier error que ocurra.
    }

    return (
        <div>
            <h2>All Products:</h2>
            {products.length > 0 ? (
                // Mapea los productos para crear un elemento <p> para cada uno.
                products.map((product, idx) => (
                    <p key={idx}>
                        {/* Enlace al detalle del producto */}
                        <Link to={`/${product._id}`}>
                            {product.title}
                        </Link> <br/>
                        {/* Botón para eliminar el producto */}
                        <button onClick={() => deleteProduct(product._id)}>Eliminar</button>
                        {/* Botón para editar el producto */}
                        <button><Link to={`/${product._id}/edit`}>Editar</Link></button>
                    </p>
                ))
            ) : (
                // Mensaje si no hay productos disponibles.
                <p>No products available</p>
            )}
        </div>
    );
};

export default ProductList;
