//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn =   document.getElementById('vaciar-carrito');


//Listerners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     cursos.addEventListener('click', comprarCurso);

//when to choose delete course from car
carrito.addEventListener('click', eliminarCurso);
// when empy the car
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}

//Function
//Function to add course to car
function comprarCurso(e){
    e.preventDefault();

    ///Delation to add car
    if(e.target.classList.contains('agregar-carrito')){
    const curso = e.target.parentElement.parentElement;
        //send curse selection to take the data
    leerDatosCurso(curso);
    }
    
}
//Read data curse

function leerDatosCurso(curso){

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insetarCarrito(infoCurso);
}
//show the curse selected in the car
function insetarCarrito(curso){

const row = document.createElement('tr');
row.innerHTML = `
<td>
    <img src="${curso.imagen}" width=100>
</td>
<td>${curso.titulo}</td>
<td>${curso.precio}</td>
<td>
<a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
</td>

`;
listaCursos.appendChild(row);
}



//Delete course of car in the DOM
function eliminarCurso(e){
    e.preventDefault();
    
    let curso;
    if(e.target.classList.contains('borrar-curso')){

      e.target.parentElement.parentElement.remove();

    }

}


//empy the car
function vaciarCarrito(){
    //two ways to do it
    // the slow way
    //listaCursos.innerHTML = '';
    //fast and recommended way
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);

    }


    return false;

}