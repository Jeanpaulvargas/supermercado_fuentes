const btnGuardar = document.getElementById('btnGuardar');
const btnModificar = document.getElementById('btnModificar');
const btnBuscar = document.getElementById('btnBuscar');
const btnCancelar = document.getElementById('btnCancelar');
const btnLimpiar = document.getElementById('btnLimpiar');
const tablaproductos = document.getElementById('tablaproductos');
const formulario = document.querySelector('form');

btnModificar.parentElement.style.display = 'none';
btnCancelar.parentElement.style.display = 'none';

const getproductos = async (alerta = 'si') => {
    const nombre = formulario.producto_nombre.value;
    const precio = formulario.producto_precio.value;
    const url = `/fuentes1_vargas2_IS2_crudjs/controllers/productos/index.php?producto_nombre=${nombre}&producto_precio=${precio}`;
    const config = {
        method: 'GET'
    };

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log(data);

        tablaproductos.tBodies[0].innerHTML = '';
        const fragment = document.createDocumentFragment();
        let contador = 1;
        if (respuesta.status == 200) {

            if(alerta == 'si'){

                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    icon: "success",
                    title: 'productos encontrados',
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                }).fire();
            }

            if (data.length > 0) {
                data.forEach(producto => {
                    const tr = document.createElement('tr');
                    const celda1 = document.createElement('td');
                    const celda2 = document.createElement('td');
                    const celda3 = document.createElement('td');
                    const celda4 = document.createElement('td');
                    const celda5 = document.createElement('td');
                    const buttonModificar = document.createElement('button');
                    const buttonEliminar = document.createElement('button');

                    celda1.innerText = contador;
                    celda2.innerText = producto.producto_nombre;
                    celda3.innerText = producto.producto_precio;


                    buttonModificar.textContent = 'Modificar';
                    buttonModificar.classList.add('btn', 'btn-warning', 'w-100');
                    buttonModificar.addEventListener('click', () => llenardatos(producto));

                    buttonEliminar.textContent = 'Eliminar';
                    buttonEliminar.classList.add('btn', 'btn-danger', 'w-100');
                    buttonEliminar.addEventListener('click', () => eliminarproducto(producto.producto_id));

                    celda4.appendChild(buttonModificar);
                    celda5.appendChild(buttonEliminar);

                    tr.appendChild(celda1);
                    tr.appendChild(celda2);
                    tr.appendChild(celda3);
                    tr.appendChild(celda4);
                    tr.appendChild(celda5);
                    fragment.appendChild(tr);

                    contador++;
                });

            } else {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.innerText = 'No hay productos disponibles';
                td.colSpan = 5;

                tr.appendChild(td);
                fragment.appendChild(tr);
            }
        } else {
            console.log('Error al cargar productos');
        }

        tablaproductos.tBodies[0].appendChild(fragment);
    } catch (error) {
        console.log(error);
    }
}

getproductos();

const guardarproducto = async (e) => {
    e.preventDefault();
    btnGuardar.disabled = true;

    const url = '/fuentes1_vargas2_IS2_crudjs/controllers/productos/index.php';
    const formData = new FormData(formulario);
    formData.append('tipo', 1);
    formData.delete('producto_id');
    const config = {
        method: 'POST',
        body: formData
    };

    try {
        console.log('Enviando datos:', ...formData.entries());
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log('Respuesta recibida:', data);
        const { mensaje, codigo, detalle } = data;
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "success",
            title: mensaje,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();

        if (codigo == 1 && respuesta.status == 200) {
            getproductos(alerta = 'no');
            formulario.reset();
        } else {
            console.log(detalle);
        }

    } catch (error) {
        console.log(error);
    }
    btnGuardar.disabled = false;
}

const llenardatos = (producto) => {
    formulario.producto_id.value = producto.producto_id;
    formulario.producto_nombre.value = producto.producto_nombre;
    formulario.producto_precio.value = producto.producto_precio;
    btnBuscar.parentElement.style.display = 'none';
    btnGuardar.parentElement.style.display = 'none';
    btnLimpiar.parentElement.style.display = 'none';
    btnModificar.parentElement.style.display = '';
    btnCancelar.parentElement.style.display = '';
}

const modificar = async (e) => {
    e.preventDefault();
    btnModificar.disabled = true;

    const url = '/fuentes1_vargas2_IS2_crudjs/controllers/productos/index.php';
    const formData = new FormData(formulario);
    formData.append('tipo', 2);
    const config = {
        method: 'POST',
        body: formData
    };

    try {
        console.log('Enviando datos:', ...formData.entries());
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log('Respuesta recibida:', data);
        const { mensaje, codigo, detalle } = data;
        if (respuesta.ok && codigo === 1) {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "success",
                title: mensaje,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire();
            formulario.reset();
            getproductos(alerta = 'no');
            btnBuscar.parentElement.style.display = '';
            btnGuardar.parentElement.style.display = '';
            btnLimpiar.parentElement.style.display = '';
            btnModificar.parentElement.style.display = 'none';
            btnCancelar.parentElement.style.display = 'none';
        } else {
            console.log('Error:', detalle);
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "error",
                title: 'Error al guardar',
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire();
        }
    } catch (error) {
        console.log('Error de conexión:', error);
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "error",
            title: 'Error de conexión',
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();
    }
    btnModificar.disabled = false;
}

const eliminarproducto = async (producto_id) => {
    const url = '/fuentes1_vargas2_IS2_crudjs/controllers/productos/index.php';
    const formData = new FormData();
    formData.append('producto_id', producto_id);
    formData.append('tipo', 3);
    const config = {
        method: 'POST',
        body: formData
    };

    try {
        const respuesta = await fetch(url, config);
        const data = await respuesta.json();
        console.log('Respuesta recibida:', data);
        const { mensaje, codigo } = data;
        if (respuesta.ok && codigo === 1) {
            Swal.mixin({
                toast: true,
                position: "top-start",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "success",
                title: mensaje,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire();
            getproductos(alerta = 'no');
        } else {
            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "error",
                title: data.mensaje || 'Error al eliminar',
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire();
        }
    } catch (error) {
        console.log('Error de conexión:', error);
        Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "error",
            title: 'Error de conexión',
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        }).fire();
    }
}


const cancelar = (e) => {
    e.preventDefault();
    formulario.reset();
    btnBuscar.parentElement.style.display = '';
    btnGuardar.parentElement.style.display = '';
    btnLimpiar.parentElement.style.display = '';
    btnModificar.parentElement.style.display = 'none';
    btnCancelar.parentElement.style.display = 'none';
}

formulario.addEventListener('submit', guardarproducto);
btnBuscar.addEventListener('click', getproductos);
btnModificar.addEventListener('click', modificar);
btnCancelar.addEventListener('click', cancelar);
