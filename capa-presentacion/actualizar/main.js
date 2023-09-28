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

const Component = `<label for="name">Nombre
<input class="arts" type="text" id="name" minlength="0" maxlength="8" size="10" autocomplete="off"/>

<button id="btnNombre" class="btnFiltrar">Filtrar por nombre</button>
</label>

<label for="number">Cantidad
<input class="arts" type="number" id="number" minlength="0" maxlength="8" size="10"/>

<button id="btnNumber" class="btnFiltrar">Filtrar por cantidad</button>
</label>

<label>Clases
<select id="select-box" class="arts">
    <option value=1>Plomería</option>
    <option value=2>Eléctricos</option>
    <option value=3>Ebanistería</option>
</select>

<button id="btnClass" class="btnFiltrar">Filtrar por clase</button>
</label>`