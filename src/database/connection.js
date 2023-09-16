const sql = require('mssql') //commonJS, otra alternativa sería ES modules

const dbSettings = { //La configuración de la base de datos
    user: "Campos",
    password: "dhxaQmFTA3$",
    server: "LocalHost",
    database: "Warehouse",//"Almacen",
    options: {
        encrypt: true, 
        trustServerCertificate:true //Certificado de veracidad
    }
};

module.exports = async function getConec() {
    const pool = await sql.connect(dbSettings) //el await es porque es asyncrono

    return pool
}

