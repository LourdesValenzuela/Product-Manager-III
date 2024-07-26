// Importa el modelo 'Product' desde el archivo 'product.model.js'.
const { Product } = require('../models/product.model');

// Maneja la creación de un nuevo producto.
module.exports.createProduct = (request, response) => {
    // Desestructura el cuerpo de la solicitud para obtener 'title', 'price', y 'description'.
    const { title, price, description } = request.body;
    
    // Crea un nuevo producto utilizando el modelo 'Product'.
    Product.create({
        title,
        price,
        description
    })
    // Si la creación es exitosa, responde con el producto creado en formato JSON.
    .then(product => response.json(product))
    // Si ocurre un error, responde con el error en formato JSON.
    .catch(err => response.json(err));
}

// Método para obtener todos los productos de la base de datos.
module.exports.getAllProducts = (request, response) => {
    // Busca todos los documentos en la colección 'Product'.
    Product.find({})
    // Si la búsqueda es exitosa, responde con los productos encontrados en formato JSON.
    .then(products => response.json(products))
    // Si ocurre un error, responde con el error en formato JSON.
    .catch(err => response.json(err));
}

// Método para obtener un producto específico basado en el ID proporcionado en los parámetros de la solicitud.
module.exports.getProducts = (request, response) => {
    // Busca un producto con el ID proporcionado en los parámetros de la solicitud.
    Product.findOne({_id: request.params.id})
    // Si la búsqueda es exitosa, responde con el producto encontrado en formato JSON.
    .then(product => response.json(product))
    // Si ocurre un error, responde con el error en formato JSON.
    .catch(err => response.json(err));
}

// Maneja la actualización de un producto existente.
module.exports.updateProduct = (request, response) => {
    console.log('Updating product with ID:', request.params.id);
    // Encuentra y actualiza un producto con el ID proporcionado en los parámetros de la solicitud.
    // `request.body` contiene los datos actualizados.
    // `new: true` asegura que el documento actualizado sea devuelto.
    Product.findOneAndUpdate({_id: request.params.id}, request.body, {new: true})
        // Si la actualización es exitosa, responde con el producto actualizado en formato JSON.
        .then(updateProduct => response.json(updateProduct))
        // Si ocurre un error, responde con el error en formato JSON y un estado HTTP 400.
        .catch(err => response.status(400).json(err)); 
}

// Maneja la eliminación de un producto.
module.exports.deleteProduct = (request, response) => {
    // Elimina un producto con el ID proporcionado en los parámetros de la solicitud.
    Product.deleteOne({_id: request.params.id})
    // Si la eliminación es exitosa, responde con la confirmación de eliminación en formato JSON.
    .then(deleteConfirmation => response.json(deleteConfirmation))
    // Si ocurre un error, responde con el error en formato JSON.
    .catch(err => response.json(err))
}
