 //Si el usuario toca el boton inicia el proceso

function patchProduct(value){
    const url = `http://localhost:3000/Borrar/${value}`;
    //var data = { Codigo: value } //datos del cliente
    fetch(url, {
        credentials: "omit",
        method: 'POST', //Post es el metodo para enviarle datos al servidor
        headers: {
            'Content-Type': 'application/json' //Importante, ya que le enviaremos un dato de tipo JSON
        },
       // body: JSON.stringify(data),
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