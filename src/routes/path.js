const express = require("express");
const router = express.Router();
const controller = require('../controllers/controller')

// Home page route.
//router.get('/', controller.getSession)

//Envia una lista con elementos JSON
router.get("/Almacen/Session", controller.getSession);
router.get("/Almacen/Listar/Nombre/:Name", controller.getProductName);
router.get("/Almacen/Listar/Cantidad/:Cant", controller.getProductCant);
router.get("/Almacen/Listar/Clases/:Clss", controller.getProductClss);
router.get("/Almacen/Listar/Producto/:Codigo", controller.getProduct); //Recordar cambiar esto por el codigo del articulo
router.get("/Almacen/Listar", controller.getProducts);
// Create an article.
router.post("/Almacen/Crear", controller.postProducts);
// Delete an article.
router.patch("/Almacen/Borrar/:Codigo", controller.deleteProduct);

//Update an arcticle
router.patch("/Almacen/Actualizar/:Codigo", controller.patchProduct)
router.use(controller.notFound);

module.exports = router;