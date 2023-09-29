function patchProduct(value){
    console.log(value)
    const url = `http://localhost:3000/Almacen/Borrar/${value}`;
    //var data = { Codigo: value } //datos del cliente
    fetch(url, {
        credentials: "omit",
        method: 'PATCH', //Post es el metodo para enviarle datos al servidor
        headers: {
            'Content-Type': 'application/json' //Importante, ya que le enviaremos un dato de tipo JSON
        },
       body: JSON.stringify({Codigo: value}),
    })
    .then(res => res.json())
    .then(response => { //Prepara la respuesta para el cliente
        console.log(response)
    })
    .catch((ERROR) => console.error("Error:", ERROR))
    .then((response) => 
        {console.log("Success:", response)
    });
}

const select = `<select id="select-box" class="arts">
<option value=1>Eléctricos</option>
<option value=2>Tornilleria</option>
<option value=3>Pinturas</option>
<option value=4>Fontaneria</option>
<option value=5>Proteccion</option>
<option value=6>MaquinariaPesada</option>
<option value=7>Cerraduras</option>
<option value=8>Construccion</option>
<option value=9>Carpinteria</option>
<option value=10>Jardineria</option>
<option value=11>Uniformes</option>
<option value=12>Adhesivos</option>
<option value=13>Automotriz</option>
<option value=14>Almacenamiento</option>
</select>`