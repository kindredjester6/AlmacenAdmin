const express = require("express");
const router = express.Router();
const controller = require('../controllers/controller')

// Home page route.
//router.get('/', controller.getSession)

//Envia una lista con elementos JSON
router.get("/Almacen/Session", controller.getSession);
router.get("/Almacen/Listar", controller.getProducts);

router.get("/Almacen/Listar/:Id", controller.getProduct); //Recordar cambiar esto por el codigo del articulo
// Create an article.
router.post("/Almacen/Crear", controller.postProducts);

router.use(controller.notFound);

module.exports = router;