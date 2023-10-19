let ListaUsuarios =[];

const objusuario =  {
    id:'',
    nombre: '',
    Denuncia:''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreImput = document.querySelector('#nombre');
const DenunciaImput = document.querySelector('#Denuncia');
const btnAgregar = document.querySelector('#btnAgregar');

formulario.addEventListener('submit',validarFormulario);

function validarFormulario(e){
    e.preventDefault();

    if(nombreImput.value === ''|| DenunciaImput.value === ''){
        alert('Todos los campos son obligatorios.');
        return;
    }

    if (editando){
        editarUsuario();
        editando = false;
    } else {
      objusuario.id = Date.now();
      objusuario.nombre = nombreImput.value;
      objusuario.Denuncia = DenunciaImput.value;

        agregarUsuario();
    }
}

function agregarUsuario (){
    ListaUsuarios.push({...objusuario});

    mostrarUsuarios();

    formulario.reset();

    limpiarObjeto();
}

function limpiarObjeto(){
    objusuario.id = '';
    objusuario.nombre = '';
    objusuario.Denuncia = '';
}

function mostrarUsuarios() {

    limpiarDatos();

        const divUsuarios = document.querySelector('.div-usuarios');

        ListaUsuarios.forEach(usuario => {
            const {id,nombre,denuncia}= usuario;

            const parrafo = document.createElement('p');
            parrafo.textContent = `${id} - ${nombre} - ${denuncia} -`;
            parrafo.dataset.id = id;

            const editarBoton = document.createElement('button');
            editarBoton.onclick=() => cargarUsuario (usuario);
            editarBoton.textContent = 'Editar';
            editarBoton.classList.add('btn','btn-editar');
            parrafo.append (editarBoton);

            const eliminarBoton = document.createElement('button');
            eliminarBoton.onclick=() => eliminarUsuario (id);
            eliminarBoton.textContent = 'Eliminar';
            eliminarBoton.classList.add('btn','btn-eliminar');
            parrafo.append (eliminarBoton);

            const hr = document.createElement ('hr');

            divUsuarios.appendChild(parrafo);
            divUsuarios.appendChild(hr);

        });
}

function cargarUsuario(usuario){

    const {id,nombre,denuncia} =usuario ;

    nombreImput.value = nombre;
    DenunciaImput.value = denuncia;

    objusuario.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

function editarUsuario(){
    objusuario.nombre = nombreImput.value;
    objusuario.Denuncia = DenunciaImput.value;

    ListaUsuarios.map(usuario => {

        if(usuario.id === objusuario.id){
            usuario.id = objusuario.id;
            usuario.nombre = objusuario.nombre;
            usuario.denuncia = objusuario.Denuncia;
        }
    });

    limpiarDatos();
    mostrarUsuarios();

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;
}

function eliminarUsuario(id){

    ListaUsuarios = ListaUsuarios.filter(usuario => usuario.id !== id);

    limpiarDatos();
    mostrarUsuarios();
}

function limpiarDatos(){
    const divUsuarios = document.querySelector('.div-usuarios')
    while(divUsuarios.firstChild){
        divUsuarios.removeChild(divUsuarios.firstChild)
    }
}

