

window.onload = function() {
    ocultarModificar()
    listarPeliculas();
};

//LISTAR PELICULAS
let listarPeliculas = async()=>{

    const peticion = await fetch("http://localhost:8080/api/peliculas",
    {   method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        }, 
    });

    const peliculas = await peticion.json()

    let contenidoTabla ="";

    for (const pelicula of peliculas) {
        let contenidoFila = `<tr>
<td>${pelicula.id}</td>
<td>${pelicula.titulo}</td>
<td>${pelicula.director}</td>
<td>${pelicula.categoria}</td>
<td>
  <i onClick="borrarPelicula(${pelicula.id})" class="material-icons button delete">borrar</i>
  <i onClick="editarPelicula(${pelicula.id})" class="material-icons button delete">editar</i>
</td>
</tr>`

    contenidoTabla += contenidoFila;
    }

    document.querySelector("#tabla tbody").outerHTML = contenidoTabla;

}


//BORRAR UNA PELÍCULA
let borrarPelicula = async(id)=>{

    const peticion = await fetch("http://localhost:8080/api/pelicula/"+id,
    {   method: 'DELETE',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        }, 
    });

    listarPeliculas();

}

let idEditar
//EDITAR UNA PELICULA
let editarPelicula = async(id)=>{

    idEditar = id;
    mostrarModificar();

    const peticion = await fetch("http://localhost:8080/api/pelicula/"+id,
    {   method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        }, 
    });

    const pelicula = await peticion.json();

    document.getElementsByClassName("formbold-form-input")[0].value=pelicula.titulo;
    document.getElementsByClassName("formbold-form-input")[1].value=pelicula.director;
    document.getElementsByClassName("formbold-form-input")[2].value=pelicula.categoria;
    let btnModificar = document.getElementById("btnModificar");

}

//BOTON MODIFICAR
btnModificar.addEventListener("click", evento =>{
    aplicarActualizacion(idEditar);
})

    

let aplicarActualizacion = async(id)=>{

    let campos = {};
    campos.id = id;
    campos.titulo = document.getElementById("titulo").value;
    campos.director = document.getElementById("director").value;
    campos.categoria = document.getElementById("genero").value;

    const p = await fetch("http://localhost:8080/api/pelicula/"+id,
    {   method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(campos)  
    });

    listarPeliculas();
}

//OCULTAR Y MOSTRAR EL FORMULARIO DE EDICIÓN
function ocultarModificar(){
    let formulario = document.getElementById("formulario").style.visibility="hidden";
    document.getElementsByTagName("h1")[0].style.visibility="hidden";
}

function mostrarModificar(){
    let formulario = document.getElementById("formulario").style.visibility="visible";
    document.getElementsByTagName("h1")[0].style.visibility="visible";
}



