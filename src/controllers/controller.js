const conex = require('../database/connection');
const sql = require('mssql')


const notFound = function(req, res){
  res.status(404).send('La pagina no existe!')
}

const getSession = (req,res) => {

  const h1 = "<h2> hola!!! </h2>"
  res.send(
    `
    <h1>Pagina inicial</h1> ${h1}
    `
    )
};

/**
 * 
 * @param {*} req //No se usa de momento
 * @param {*} res //Este parametro se usa para enviarle una respuesta al cliente
 */
const getProducts = async (req,res) => {

  const pool = await conex();
  const result = await pool
    .request()
    .query('spOrdenarLista'); //espera a la base de datos
  const listJson = result.recordset;

  console.log(listJson);

  res.send(listJson);
  };

const getProductName = async(req, res) => {
  const {Name} = req.params
  console.log(Name)

  const pool = await conex();
  const result = await pool
    .request()
    .input("Name", sql.VarChar(128), Name)
    .query('spFiltrarArticulos @Name, 0, 0'); //Cambiar por el Sp

  const listJson = result.recordset;
  console.log(listJson);

  return res.send(listJson);
}

const getProductCant = async(req, res) => {
  const {Cant} = req.params
  console.log('ahhhhh')
  var re = /^[0-9]+$/;
  if(!re.test(Cant)){
    return res.status(400).json({
      error:'error'
    })
  }
  const pool = await conex();
  const result = await pool
    .request()
    .input("Cant", sql.Int, Cant)
    .query("spFiltrarArticulos '', @Cant, 0"); //Cambiar por el Sp

  const listJson = result.recordset;
  console.log(listJson);

  return res.send(listJson);
}

const getProductClss = async(req, res) => {
  const {Clss} = req.params
  
  const pool = await conex();
  const result = await pool
    .request()
    .input("Clss", sql.Int, Clss)
    .query("spFiltrarArticulos '',0 ,@Clss"); //Cambiar por el Sp

  const listJson = result.recordset;
  console.log(listJson);

  return res.send(listJson);
}

//Por codigo, es para la parte de eliminar
const getProduct = async (req,res) => {
  const {Codigo} = req.params
  var re = /^[0-9]+$/;
  if(!re.test(Codigo)){
    return res.status(400).send(`
      <h1> Favor digitar el codigo del articulos
      </h1>`)
  }
  const pool = await conex();
  const result = await pool
    .request()
    .input("Codigo", sql.Int, Codigo)
    .query('Select * from Articulo A where @Codigo = A.Codigo'); //Cambiar por el Sp

  const listJson = result.recordset;
  console.log(listJson);

  if (listJson[0] === undefined){
    return res.send(`<h1> El articulo con el codigo: ${Id}
      No existe </h1>`)
  }
  return res.send(listJson);
};
/**
 * 
 * @param {*} req Este recibe unos datos del cliente para luego
 * introducirlos a la base de datos por medio de sp's.
 * @param {*} res Este envia el estado del servidor al cliente y 
 * si se logró introducir el elemento al BD
 * @returns Este retorna el estado del servidor, 
 * el 400 indica una mala solicitud de parte del cliente
 */
const postProducts = async (req, res) => {
  const { Nombre, Precio } = req.body

  if (Nombre == "" || Precio <= 0 || Precio == null){
    return res.status(400).json({
        Result: 50002
        , msg:'Datos incompletos'
    })
  }
    const pool = await conex();

  const result = await pool
    .request()
    .input("nombre", sql.VarChar, Nombre)
    .input("precio", sql.Money, Precio)
    .query('spInsertarArticulo @nombre, @precio')
  console.log(result.recordset[0])
  res.status(200).json(result.recordset[0])
  };

module.exports = {getProducts,getProductName,getProductCant, getProductClss, postProducts, getSession, getProduct, notFound};
