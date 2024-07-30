document.addEventListener('DOMContentLoaded', (event) => {
    const btnGuardar = document.getElementById('btnGuardar');
    const btnBuscar = document.getElementById('btnBuscar');
    const btnCancelar = document.getElementById('btnCancelar');
    const tablaselecciones = document.getElementById('tablaselecciones');
    const formulario = document.querySelector('form');

    if (btnCancelar) {
        btnCancelar.parentElement.style.display = 'none';
    }

    const getselecciones = async (alerta = 'si') => {
        const clienteId = formulario.cliente_seleccion_id.value;
        const productoid = formulario.producto_seleccion_id.value;
        const url = `/fuentes1_vargas2_IS2_crudjs/controllers/selecciones/index.php?cliente_seleccion_id=${clienteId}&producto_seleccion_id=${productoid}`;
        const config = {
            method: 'GET'
        };

        try {
            const respuesta = await fetch(url, config);
            const data = await respuesta.json();
            console.log(data);

            tablaselecciones.tBodies[0].innerHTML = '';
            const fragment = document.createDocumentFragment();
            let contador = 1;

            if (respuesta.status === 200) {
                if (alerta === 'si') {
                    Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        icon: "success",
                        title: 'Selecciones encontradas',
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    }).fire();
                }

                if (data.length > 0) {
                    data.forEach(selecciones => {
                        const tr = document.createElement('tr');
                        const celda1 = document.createElement('td');
                        const celda2 = document.createElement('td');
                        const celda3 = document.createElement('td');
                        const celda4 = document.createElement('td');

                        celda1.innerText = contador;
                        celda2.innerText = selecciones.cliente_nombre || 'No disponible';
                        celda3.innerText = selecciones.producto_nombre || 'No disponible';
                        celda4.innerText = selecciones.producto_precio || 'No disponible';

                        tr.appendChild(celda1);
                        tr.appendChild(celda2);
                        tr.appendChild(celda3);
                        tr.appendChild(celda4);

                        fragment.appendChild(tr);

                        contador++;
                    });
                } else {
                    const tr = document.createElement('tr');
                    const td = document.createElement('td');
                    td.innerText = 'No hay selecciones disponibles';
                    td.colSpan = 4; // Ajusta el colspan según el número de columnas en tu tabla

                    tr.appendChild(td);
                    fragment.appendChild(tr);
                }
            } else {
                console.log('Error al cargar selecciones');
            }

            tablaselecciones.tBodies[0].appendChild(fragment);
        } catch (error) {
            console.log(error);
        }
    }

    const guardarselecciones = async (e) => {
        e.preventDefault();
        btnGuardar.disabled = true;

        const url = '/fuentes1_vargas2_IS2_crudjs/controllers/selecciones/index.php';
        const formData = new FormData(formulario);
        formData.append('tipo', 1);
        formData.delete('selecciones_id');

        const config = {
            method: 'POST',
            body: formData
        };

        try {
            console.log('Enviando datos:', ...formData.entries());
            const respuesta = await fetch(url, config);
            const data = await respuesta.json();
            console.log('Respuesta recibida:', data);
            const { mensaje, codigo } = data;

            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: codigo === 1 ? "success" : "error",
                title: mensaje,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire();

            if (codigo === 1) {
                getselecciones('no');
                formulario.reset();
            }
        } catch (error) {
            console.log('Error al guardar selecciones:', error);
        } finally {
            btnGuardar.disabled = false;
        }
    }

    if (btnGuardar) {
        btnGuardar.addEventListener('click', guardarselecciones);
    }
    if (btnBuscar) {
        btnBuscar.addEventListener('click', getselecciones);
    }
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            formulario.reset();
            btnCancelar.parentElement.style.display = 'none';
            btnGuardar.disabled = false;
        });
    }
});
