const conex = require('../database/connection');
const sql = require('mssql')


const notFound = function(req, res){
  res.status(404).send('La pagina no existe!')
}

const getSession = async (req,res) => {
  const {Pass, Nombre} = req.params
  console.log(Pass,Nombre,'1')
  const pool = await conex();
  const result = await pool
    .request()
    .input('Nombre', sql.VarChar(128), Nombre)
    .input('Pass', sql.VarChar(32), Pass)
    .query('spPassUser @Nombre, @Pass'); //espera a la base de datos
  const listJson = result.recordset;

  console.log(listJson);

  res.send(listJson);
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
    .query('spFiltrarArticulos @Name, -1, 0'); //Cambiar por el Sp

  const listJson = result.recordset;
  console.log(listJson);

  return res.send(listJson);
}

const getProductCant = async(req, res) => {
  const {Cant} = req.params
  console.log(Cant)
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
    .query("spFiltrarArticulos '',-1,@Clss"); //Cambiar por el Sp

  const listJson = result.recordset;
  console.log(listJson);

  return res.send(listJson);
}

//Por codigo, es para la parte de eliminar y actualizar
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
    .query('spFiltrarXCodigo @Codigo'); //Cambiar por el Sp

  const listJson = result.recordset;
  //console.log(listJson);

  if (listJson[0] === undefined){
    console.log('a')
    return res.status(400).send({error:`<h1> El articulo con el codigo: ${Codigo}
      No existe.</h1>`})
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
  const { Nombre, Precio, IdClaseArticulo, Codigo } = req.body

  console.log(Nombre)
  console.log(Precio)
  console.log(IdClaseArticulo)
  console.log(Codigo)
  if (Nombre == "" || Precio <= 0 || Precio == null || Codigo == ""){
    return res.status(400).json({
        Result: 50002
        , msg:'Datos incompletos'
    })
  }
    const pool = await conex();

  const result = await pool
    .request()
    .input("nombre", sql.VarChar(128), Nombre)
    .input("precio", sql.Money, Precio)
    .input("idClaseA", sql.Int, IdClaseArticulo)
    .input("codigo", sql.VarChar(32), Codigo)
    .query('spInsertarArticulo @nombre, @precio, @codigo, @idClaseA')
  console.log(result.recordset[0])
  res.status(200).json(result.recordset[0])
  };

const deleteProduct = async (req, res) => {
  const { Codigo } = req.params
  console.log(Codigo)

  const pool = await conex();
  const result = await pool
    .request()
    .input("codigo", sql.VarChar(32), Codigo)
    .query('spBorrarArticulo @codigo')
  console.log(result.recordset[0])
  res.status(200).json(result.recordset[0])
  };

const patchProduct = async (req, res) => {
  const { Codigo } = req.params
  const { NewCode, IdClaseArticulo, Nombre, Precio } = req.body
  console.log(Codigo, NewCode, IdClaseArticulo, Nombre, Precio)

  const pool = await conex();
  const result = await pool
    .request()
    .input("codigo", sql.VarChar(32), Codigo)
    .input("NewCode", sql.VarChar(32), NewCode)
    .input("IdClase", sql.Int, IdClaseArticulo)
    .input("Nombre", sql.VarChar(128), Nombre)
    .input("Precio", sql.Money, Precio)
    .query
    (
      'spActualizarArticulo @codigo, @NewCode, @IdClase, @Nombre, @Precio' //Hacer corto
    )
  console.log(result.recordset[0])
  res.status(200).json(result.recordset[0])
}

module.exports = {getProducts,getProductName,
  getProductCant, getProductClss,
  postProducts, patchProduct, deleteProduct,
  getSession, getProduct, notFound};