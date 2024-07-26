import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Update = () => {
    // Obtén el ID del producto desde los parámetros de la URL usando useParams.
    const { id } = useParams();
    
    // Define los estados locales para title, price, y description.
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    // useEffect para obtener los datos del producto cuando el componente se monta.
    useEffect(() => {
        // Realiza una solicitud GET para obtener el producto por ID.
        axios.get('http://localhost:8000/' + id)
            .then(res => {
                // Si la solicitud es exitosa, actualiza los estados con los datos del producto.
                setTitle(res.data.title);
                setPrice(res.data.price);
                setDescription(res.data.description);
            })
            .catch(err => console.error(err)); // Maneja cualquier error que ocurra.
    }, [id]);

    // Función para manejar la actualización del producto.
    const updateProduct = e => {
        e.preventDefault(); // Previene la acción predeterminada del formulario.
        
        // Realiza una solicitud PUT para actualizar el producto.
        axios.put('http://localhost:8000/' + id + '/update', {
            title,
            price,
            description
        })
        .then(res => {
            console.log('Product updated:', res.data);
            // Puedes redirigir a otra página o mostrar un mensaje de éxito aquí.
        })
        .catch(err => console.error('Error updating product:', err)); // Maneja cualquier error que ocurra.
    };
    
    return (
        <div>
            <h1>Update a Product</h1>
            <form onSubmit={updateProduct}>
                <p>
                    <label>Title</label><br />
                    <input 
                        type="text" 
                        name="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                </p>
                <p>
                    <label>Price</label><br />
                    <input 
                        type="number" 
                        name="price"
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                    />
                </p>
                <p>
                    <label>Description</label><br />
                    <input 
                        type="text" 
                        name="description"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </p>
                <input type="submit" value="Update Product" />
            </form>
        </div>
    );
};

export default Update;

