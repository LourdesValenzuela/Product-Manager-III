import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const Detail = ({ deleteProduct }) => {
    // Obtén el ID del producto desde los parámetros de la URL usando useParams.
    const { id } = useParams();
    
    // Define el estado local para el producto.
    const [product, setProduct] = useState({});
    
    // Obtén el objeto history para redirigir después de la eliminación.
    const history = useHistory();

    // useEffect para obtener los datos del producto cuando el componente se monta.
    useEffect(() => {
        // Realiza una solicitud GET para obtener el producto por ID.
        axios.get(`http://localhost:8000/${id}`)
            .then(res => setProduct(res.data)) // Si la solicitud es exitosa, actualiza el estado con los datos del producto.
            .catch(err => console.log(err)); // Maneja cualquier error que ocurra.
    }, [id]);

    // Función para manejar la eliminación del producto.
    const handleDelete = () => {
        // Realiza una solicitud DELETE para eliminar el producto.
        axios.delete(`http://localhost:8000/${id}`)
            .then(res => {
                deleteProduct(id); // Llama a la función deleteProduct pasada como prop.
                history.push('/'); // Redirige a la página principal después de eliminar el producto.
            })
            .catch(err => console.error(err)); // Maneja cualquier error que ocurra.
    };

    return (
        <div>
            <h2>{product.title}</h2>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
            <button onClick={handleDelete}>Eliminar</button>
        </div>
    );
};

export default Detail;
