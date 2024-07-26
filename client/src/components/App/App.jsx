import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ProductForm from '../ProductForm/ProductForm';
import ProductList from '../ProductList/ProductList';
import Detail from '../../views/Detail';
import './App.css';
import Update from '../../views/Update';

const App = () => {
    // Estados para manejar los datos del formulario y la lista de productos
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const [redirect, setRedirect] = useState(null);

    // Manejador de envío del formulario para agregar un nuevo producto
    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/', { title, price, description })
            .then(res => {
                console.log(res);
                fetchProducts(); // Actualiza la lista de productos después de agregar uno nuevo
            })
            .catch(err => console.log(err));
    };

    // Función para obtener todos los productos del servidor
    const fetchProducts = () => {
        axios.get('http://localhost:8000/')
            .then(res => {
                console.log(res.data);
                setProducts(res.data);
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
                setLoaded(true);
            });
    }

    // Hook de efecto para obtener los productos cuando el componente se monta
    useEffect(() => {
        fetchProducts();
    }, []);

    // Función para eliminar un producto del estado local
    const removeFromDom = productId => {
        setProducts(products.filter(product => product._id !== productId));
    }

    // Función para manejar la eliminación de un producto del servidor y actualizar el estado local
    const deleteProduct = (productId) => {
        axios.delete(`http://localhost:8000/${productId}`)
            .then(res => {
                removeFromDom(productId);
                setRedirect('/'); // Redirige a la página principal después de eliminar un producto
            })
            .catch(err => console.error(err));
    }

    return (
        <Router>
            <div className="App">
                {/* Redirecciona si el estado redirect está configurado */}
                {redirect && <Redirect to={redirect} />}
                <Switch>
                    <Route exact path="/" render={() => (
                        <div>
                            {/* Formulario para agregar un nuevo producto */}
                            <ProductForm
                                title={title}
                                price={price}
                                description={description}
                                setTitle={setTitle}
                                setPrice={setPrice}
                                setDescription={setDescription}
                                onSubmitHandler={onSubmitHandler}
                            />
                            <div className="divider"></div>
                            {/* Lista de productos */}
                            {loaded && <ProductList products={products} removeFromDom={removeFromDom} />}
                        </div>
                    )}/>
                    {/* Ruta para editar un producto */}
                    <Route path="/:id/edit" render={(routeProps) => (<Update {...routeProps} />)} />
                    {/* Ruta para ver los detalles de un producto */}
                    <Route exact path="/:id" render={(routeProps) => (
                        <Detail {...routeProps} deleteProduct={deleteProduct} />
                    )} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
