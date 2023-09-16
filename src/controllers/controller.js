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

const getProduct = async (req,res) => {
  const {Id} = req.params
  var re = /^[0-9]+$/;
  if(!re.test(Id)){
    return res.send(`
      <h1> Favor digitar el codigo del articulo
      </h1>`)
  }
  const pool = await conex();
  const result = await pool
    .request()
    .input("Id", sql.Int, Id)
    .query('Select * from Articulo A where @Id = A.Id'); //Cambiar por el Sp

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

module.exports = {getProducts, postProducts, getSession, getProduct, notFound};
