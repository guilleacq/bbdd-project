// URL base de la API
const API_URL = 'http://localhost:5000';

// Funciones para Instructores
document.addEventListener('DOMContentLoaded', function() {
    cargarInstructores();

    document.getElementById('form-instructor').addEventListener('submit', function(e) {
        e.preventDefault();
        const ci = document.getElementById('instructor-ci').value;
        const nombre = document.getElementById('instructor-nombre').value;
        const apellido = document.getElementById('instructor-apellido').value;

        fetch(`${API_URL}/instructores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ci, nombre, apellido })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje || data.error);
            document.getElementById('form-instructor').reset();
            cargarInstructores();
            cargarSelects();
        })
        .catch(error => {
            alert('Error al agregar instructor');
        });
    });

    function cargarInstructores() {
        fetch(`${API_URL}/instructores`)
        .then(response => response.json())
        .then(instructores => {
            const tbody = document.querySelector('#tabla-instructores tbody');
            tbody.innerHTML = '';
            instructores.forEach(instr => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${instr.ci}</td>
                    <td>${instr.nombre}</td>
                    <td>${instr.apellido}</td>
                    <td>
                        <button class="btn btn-warning btn-sm btn-editar-instructor" data-ci="${instr.ci}">Editar</button>
                        <button class="btn btn-danger btn-sm btn-eliminar-instructor" data-ci="${instr.ci}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
            // Agregar eventos a los botones
            document.querySelectorAll('.btn-editar-instructor').forEach(button => {
                button.addEventListener('click', editarInstructor);
            });
            document.querySelectorAll('.btn-eliminar-instructor').forEach(button => {
                button.addEventListener('click', eliminarInstructor);
            });
        });
    }

    function editarInstructor() {
        const ci = this.getAttribute('data-ci');
        fetch(`${API_URL}/instructores/${ci}`)
        .then(response => response.json())
        .then(instructor => {
            document.getElementById('editar-instructor-ci').value = instructor.ci;
            document.getElementById('editar-instructor-nombre').value = instructor.nombre;
            document.getElementById('editar-instructor-apellido').value = instructor.apellido;
            $('#modal-editar-instructor').modal('show');
        });
    }

    document.getElementById('form-editar-instructor').addEventListener('submit', function(e) {
        e.preventDefault();
        const ci = document.getElementById('editar-instructor-ci').value;
        const nombre = document.getElementById('editar-instructor-nombre').value;
        const apellido = document.getElementById('editar-instructor-apellido').value;

        fetch(`${API_URL}/instructores/${ci}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellido })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje || data.error);
            $('#modal-editar-instructor').modal('hide');
            cargarInstructores();
            cargarSelects();
        })
        .catch(error => {
            alert('Error al modificar instructor');
        });
    });

    function eliminarInstructor() {
        const ci = this.getAttribute('data-ci');
        if (confirm('¿Estás seguro de eliminar este instructor?')) {
            fetch(`${API_URL}/instructores/${ci}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje || data.error);
                cargarInstructores();
                cargarSelects();
            })
            .catch(error => {
                alert('Error al eliminar instructor');
            });
        }
    }

    // Funciones para Alumnos
    cargarAlumnos();

    document.getElementById('form-alumno').addEventListener('submit', function(e) {
        e.preventDefault();
        const ci = document.getElementById('alumno-ci').value;
        const nombre = document.getElementById('alumno-nombre').value;
        const apellido = document.getElementById('alumno-apellido').value;
        const fecha_nacimiento = document.getElementById('alumno-fecha-nacimiento').value;
        const telefono_contacto = document.getElementById('alumno-telefono').value;
        const correo_electronico = document.getElementById('alumno-correo').value;

        fetch(`${API_URL}/alumnos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ci, nombre, apellido, fecha_nacimiento, telefono_contacto, correo_electronico })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje || data.error);
            document.getElementById('form-alumno').reset();
            cargarAlumnos();
            cargarSelects();
        })
        .catch(error => {
            alert('Error al agregar alumno');
        });
    });

    function cargarAlumnos() {
        fetch(`${API_URL}/alumnos`)
        .then(response => response.json())
        .then(alumnos => {
            const tbody = document.querySelector('#tabla-alumnos tbody');
            tbody.innerHTML = '';
            alumnos.forEach(alumno => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${alumno.ci}</td>
                    <td>${alumno.nombre}</td>
                    <td>${alumno.apellido}</td>
                    <td>${alumno.fecha_nacimiento}</td>
                    <td>${alumno.telefono_contacto || ''}</td>
                    <td>${alumno.correo_electronico || ''}</td>
                    <td>
                        <button class="btn btn-warning btn-sm btn-editar-alumno" data-ci="${alumno.ci}">Editar</button>
                        <button class="btn btn-danger btn-sm btn-eliminar-alumno" data-ci="${alumno.ci}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
            // Agregar eventos a los botones
            document.querySelectorAll('.btn-editar-alumno').forEach(button => {
                button.addEventListener('click', editarAlumno);
            });
            document.querySelectorAll('.btn-eliminar-alumno').forEach(button => {
                button.addEventListener('click', eliminarAlumno);
            });
        });
    }

    function editarAlumno() {
        const ci = this.getAttribute('data-ci');
        fetch(`${API_URL}/alumnos/${ci}`)
        .then(response => response.json())
        .then(alumno => {
            document.getElementById('editar-alumno-ci').value = alumno.ci;
            document.getElementById('editar-alumno-nombre').value = alumno.nombre;
            document.getElementById('editar-alumno-apellido').value = alumno.apellido;
            document.getElementById('editar-alumno-fecha-nacimiento').value = alumno.fecha_nacimiento;
            document.getElementById('editar-alumno-telefono').value = alumno.telefono_contacto;
            document.getElementById('editar-alumno-correo').value = alumno.correo_electronico;
            $('#modal-editar-alumno').modal('show');
        });
    }

    document.getElementById('form-editar-alumno').addEventListener('submit', function(e) {
        e.preventDefault();
        const ci = document.getElementById('editar-alumno-ci').value;
        const nombre = document.getElementById('editar-alumno-nombre').value;
        const apellido = document.getElementById('editar-alumno-apellido').value;
        const fecha_nacimiento = document.getElementById('editar-alumno-fecha-nacimiento').value;
        const telefono_contacto = document.getElementById('editar-alumno-telefono').value;
        const correo_electronico = document.getElementById('editar-alumno-correo').value;

        fetch(`${API_URL}/alumnos/${ci}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellido, fecha_nacimiento, telefono_contacto, correo_electronico })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje || data.error);
            $('#modal-editar-alumno').modal('hide');
            cargarAlumnos();
            cargarSelects();
        })
        .catch(error => {
            alert('Error al modificar alumno');
        });
    });

    function eliminarAlumno() {
        const ci = this.getAttribute('data-ci');
        if (confirm('¿Estás seguro de eliminar este alumno?')) {
            fetch(`${API_URL}/alumnos/${ci}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje || data.error);
                cargarAlumnos();
                cargarSelects();
            })
            .catch(error => {
                alert('Error al eliminar alumno');
            });
        }
    }

    // Funciones para Turnos
    cargarTurnos();

    document.getElementById('form-turno').addEventListener('submit', function(e) {
        e.preventDefault();
        const hora_inicio = document.getElementById('turno-hora-inicio').value;
        const hora_fin = document.getElementById('turno-hora-fin').value;

        fetch(`${API_URL}/turnos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hora_inicio, hora_fin })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje || data.error);
            document.getElementById('form-turno').reset();
            cargarTurnos();
            cargarSelects();
        })
        .catch(error => {
            alert('Error al agregar turno');
        });
    });

    function cargarTurnos() {
        fetch(`${API_URL}/turnos`)
        .then(response => response.json())
        .then(turnos => {
            const tbody = document.querySelector('#tabla-turnos tbody');
            tbody.innerHTML = '';
            const selectTurno = document.getElementById('clase-turno');
            selectTurno.innerHTML = '';
            turnos.forEach(turno => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${turno.id}</td>
                    <td>${turno.hora_inicio}</td>
                    <td>${turno.hora_fin}</td>
                    <td>
                        <button class="btn btn-warning btn-sm btn-editar-turno" data-id="${turno.id}">Editar</button>
                        <button class="btn btn-danger btn-sm btn-eliminar-turno" data-id="${turno.id}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
                const option = document.createElement('option');
                option.value = turno.id;
                option.textContent = `${turno.hora_inicio} - ${turno.hora_fin}`;
                selectTurno.appendChild(option);
            });
            // Agregar eventos a los botones
            document.querySelectorAll('.btn-editar-turno').forEach(button => {
                button.addEventListener('click', editarTurno);
            });
            document.querySelectorAll('.btn-eliminar-turno').forEach(button => {
                button.addEventListener('click', eliminarTurno);
            });
        });
    }

    function editarTurno() {
        const id = this.getAttribute('data-id');
        fetch(`${API_URL}/turnos/${id}`)
        .then(response => response.json())
        .then(turno => {
            document.getElementById('editar-turno-id').value = turno.id;
            document.getElementById('editar-turno-hora-inicio').value = turno.hora_inicio;
            document.getElementById('editar-turno-hora-fin').value = turno.hora_fin;
            $('#modal-editar-turno').modal('show');
        });
    }

    document.getElementById('form-editar-turno').addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('editar-turno-id').value;
        const hora_inicio = document.getElementById('editar-turno-hora-inicio').value;
        const hora_fin = document.getElementById('editar-turno-hora-fin').value;

        fetch(`${API_URL}/turnos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ hora_inicio, hora_fin })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje || data.error);
            $('#modal-editar-turno').modal('hide');
            cargarTurnos();
            cargarSelects();
        })
        .catch(error => {
            alert('Error al modificar turno');
        });
    });

    function eliminarTurno() {
        const id = this.getAttribute('data-id');
        if (confirm('¿Estás seguro de eliminar este turno?')) {
            fetch(`${API_URL}/turnos/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje || data.error);
                cargarTurnos();
                cargarSelects();
            })
            .catch(error => {
                alert('Error al eliminar turno');
            });
        }
    }

    // Funciones para Actividades
    cargarActividades();

    document.getElementById('form-actividad').addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('actividad-id').value;
        const descripcion = document.getElementById('actividad-descripcion').value;
        const costo = document.getElementById('actividad-costo').value;
        const restriccion_edad = document.getElementById('actividad-restriccion').value;

        if (id) {
            // Modificar actividad existente
            fetch(`${API_URL}/actividades/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ descripcion, costo, restriccion_edad })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje || data.error);
                cargarActividades();
                document.getElementById('form-actividad').reset();
            })
            .catch(error => {
                alert('Error al modificar actividad');
            });
        } else {
            // Agregar nueva actividad
            fetch(`${API_URL}/actividades`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ descripcion, costo, restriccion_edad })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje || data.error);
                cargarActividades();
                document.getElementById('form-actividad').reset();
            })
            .catch(error => {
                alert('Error al agregar actividad');
            });
        }
    });

    function cargarActividades() {
        fetch(`${API_URL}/actividades`)
        .then(response => response.json())
        .then(actividades => {
            const tbody = document.querySelector('#tabla-actividades tbody');
            tbody.innerHTML = '';
            const selectActividad = document.getElementById('actividad-id');
            selectActividad.innerHTML = '<option value="">Seleccionar para modificar</option>';
            const selectClaseActividad = document.getElementById('clase-actividad');
            selectClaseActividad.innerHTML = '';
            actividades.forEach(act => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${act.id}</td>
                    <td>${act.descripcion}</td>
                    <td>${act.costo}</td>
                    <td>${act.restriccion_edad}</td>
                    <td>
                        <button class="btn btn-warning btn-sm btn-editar-actividad" data-id="${act.id}">Editar</button>
                        <button class="btn btn-danger btn-sm btn-eliminar-actividad" data-id="${act.id}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
                const option = document.createElement('option');
                option.value = act.id;
                option.textContent = act.descripcion;
                selectActividad.appendChild(option);
                const optionClase = document.createElement('option');
                optionClase.value = act.id;
                optionClase.textContent = act.descripcion;
                selectClaseActividad.appendChild(optionClase);
            });
            // Agregar eventos a los botones
            document.querySelectorAll('.btn-editar-actividad').forEach(button => {
                button.addEventListener('click', editarActividad);
            });
            document.querySelectorAll('.btn-eliminar-actividad').forEach(button => {
                button.addEventListener('click', eliminarActividad);
            });
        });
    }

    function editarActividad() {
        const id = this.getAttribute('data-id');
        fetch(`${API_URL}/actividades/${id}`)
        .then(response => response.json())
        .then(actividad => {
            document.getElementById('editar-actividad-id').value = actividad.id;
            document.getElementById('editar-actividad-descripcion').value = actividad.descripcion;
            document.getElementById('editar-actividad-costo').value = actividad.costo;
            document.getElementById('editar-actividad-restriccion').value = actividad.restriccion_edad;
            $('#modal-editar-actividad').modal('show');
        });
    }

    document.getElementById('form-editar-actividad').addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('editar-actividad-id').value;
        const descripcion = document.getElementById('editar-actividad-descripcion').value;
        const costo = document.getElementById('editar-actividad-costo').value;
        const restriccion_edad = document.getElementById('editar-actividad-restriccion').value;

        fetch(`${API_URL}/actividades/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descripcion, costo, restriccion_edad })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje || data.error);
            $('#modal-editar-actividad').modal('hide');
            cargarActividades();
            cargarSelects();
        })
        .catch(error => {
            alert('Error al modificar actividad');
        });
    });

    function eliminarActividad() {
        const id = this.getAttribute('data-id');
        if (confirm('¿Estás seguro de eliminar esta actividad?')) {
            fetch(`${API_URL}/actividades/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje || data.error);
                cargarActividades();
                cargarSelects();
            })
            .catch(error => {
                alert('Error al eliminar actividad');
            });
        }
    }

    // Funciones para Clases
    cargarClases();

    document.getElementById('form-clase').addEventListener('submit', function(e) {
        e.preventDefault();
        const ci_instructor = document.getElementById('clase-instructor').value;
        const id_actividad = document.getElementById('clase-actividad').value;
        const id_turno = document.getElementById('clase-turno').value;
        const tipo_clase = document.getElementById('clase-tipo').value;

        fetch(`${API_URL}/clases`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ci_instructor, id_actividad, id_turno, tipo_clase })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje || data.error);
            document.getElementById('form-clase').reset();
            cargarClases();
        })
        .catch(error => {
            alert('Error al agregar clase');
        });
    });

    function cargarClases() {
        fetch(`${API_URL}/clases`)
        .then(response => response.json())
        .then(clases => {
            const tbody = document.querySelector('#tabla-clases tbody');
            tbody.innerHTML = '';
            const selectClaseId = document.getElementById('ac-clase-id');
            selectClaseId.innerHTML = '';
            clases.forEach(clase => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${clase.id}</td>
                    <td>${clase.ci_instructor}</td>
                    <td>${clase.id_actividad}</td>
                    <td>${clase.id_turno}</td>
                    <td>${clase.tipo_clase}</td>
                    <td>
                        <button class="btn btn-info btn-sm btn-ver-alumnos" data-id="${clase.id}">Alumnos</button>
                        <button class="btn btn-warning btn-sm btn-editar-clase" data-id="${clase.id}">Editar</button>
                        <button class="btn btn-danger btn-sm btn-eliminar-clase" data-id="${clase.id}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
                const option = document.createElement('option');
                option.value = clase.id;
                option.textContent = clase.id;
                selectClaseId.appendChild(option);
            });
            // Agregar eventos a los botones
            document.querySelectorAll('.btn-ver-alumnos').forEach(button => {
                button.addEventListener('click', verAlumnosClase);
            });
            document.querySelectorAll('.btn-editar-clase').forEach(button => {
                button.addEventListener('click', editarClase);
            });
            document.querySelectorAll('.btn-eliminar-clase').forEach(button => {
                button.addEventListener('click', eliminarClase);
            });
        });
    }

    function verAlumnosClase() {
        const id_clase = this.getAttribute('data-id');
        fetch(`${API_URL}/clases/${id_clase}/alumnos`)
        .then(response => response.json())
        .then(alumnos => {
            let mensaje = 'Alumnos en la clase:\n';
            alumnos.forEach(alumno => {
                mensaje += `- ${alumno.nombre} ${alumno.apellido}\n`;
            });
            alert(mensaje);
        })
        .catch(error => {
            alert('Error al obtener alumnos de la clase');
        });
    }

    function editarClase() {
        const id = this.getAttribute('data-id');
        fetch(`${API_URL}/clases/${id}`)
        .then(response => response.json())
        .then(clase => {
            document.getElementById('clase-instructor').value = clase.ci_instructor;
            document.getElementById('clase-turno').value = clase.id_turno;
            document.getElementById('clase-actividad').value = clase.id_actividad;
            document.getElementById('clase-tipo').value = clase.tipo_clase;
            document.getElementById('form-clase').dataset.editando = true;
            document.getElementById('form-clase').dataset.id = id;
            window.scrollTo(0, document.getElementById('form-clase').offsetTop);
        })
        .catch(error => {
            alert('Error al obtener datos de la clase');
        });
    }

    document.getElementById('form-clase').addEventListener('submit', function(e) {
        e.preventDefault();
        const ci_instructor = document.getElementById('clase-instructor').value;
        const id_actividad = document.getElementById('clase-actividad').value;
        const id_turno = document.getElementById('clase-turno').value;
        const tipo_clase = document.getElementById('clase-tipo').value;
        const editando = this.dataset.editando;
        const id = this.dataset.id;

        if (editando) {
            // Modificar clase
            fetch(`${API_URL}/clases/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ci_instructor, id_turno })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje || data.error);
                cargarClases();
                document.getElementById('form-clase').reset();
                delete this.dataset.editando;
                delete this.dataset.id;
            })
            .catch(error => {
                alert('Error al modificar clase');
            });
        } else {
            // Agregar clase
            fetch(`${API_URL}/clases`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ci_instructor, id_actividad, id_turno, tipo_clase })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje || data.error);
                cargarClases();
                document.getElementById('form-clase').reset();
            })
            .catch(error => {
                alert('Error al agregar clase');
            });
        }
    });

    function eliminarClase() {
        const id = this.getAttribute('data-id');
        if (confirm('¿Estás seguro de eliminar esta clase?')) {
            fetch(`${API_URL}/clases/${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje || data.error);
                cargarClases();
            })
            .catch(error => {
                alert('Error al eliminar clase');
            });
        }
    }

    // Funciones para Alumnos en Clases
    document.getElementById('form-alumno-clase').addEventListener('submit', function(e) {
        e.preventDefault();
        const id_clase = document.getElementById('ac-clase-id').value;
        const ci_alumno = document.getElementById('ac-alumno-ci').value;
        const id_equipamiento = document.getElementById('ac-equipamiento').value || null;
        const usa_equipamiento_prop = document.getElementById('ac-equip-propio').value === 'true';

        fetch(`${API_URL}/clases/${id_clase}/alumnos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ci_alumno, id_equipamiento, usa_equipamiento_prop })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje || data.error);
            document.getElementById('form-alumno-clase').reset();
        })
        .catch(error => {
            alert('Error al agregar alumno a clase');
        });
    });

    // Cargar equipamientos en select
    function cargarEquipamientos() {
        fetch(`${API_URL}/equipamientos`)
        .then(response => response.json())
        .then(equipamientos => {
            const selectEquipamiento = document.getElementById('ac-equipamiento');
            selectEquipamiento.innerHTML = '<option value="">Seleccione equipamiento</option>';
            equipamientos.forEach(equip => {
                const option = document.createElement('option');
                option.value = equip.id;
                option.textContent = equip.descripcion;
                selectEquipamiento.appendChild(option);
            });
        });
    }

    cargarEquipamientos();

    // Cargar instructores y alumnos en selects
    function cargarSelects() {
        fetch(`${API_URL}/instructores`)
        .then(response => response.json())
        .then(instructores => {
            const selectInstructor = document.getElementById('clase-instructor');
            selectInstructor.innerHTML = '';
            instructores.forEach(instr => {
                const option = document.createElement('option');
                option.value = instr.ci;
                option.textContent = `${instr.nombre} ${instr.apellido}`;
                selectInstructor.appendChild(option);
            });
        });

        fetch(`${API_URL}/alumnos`)
        .then(response => response.json())
        .then(alumnos => {
            const selectAlumno = document.getElementById('ac-alumno-ci');
            selectAlumno.innerHTML = '';
            alumnos.forEach(alumno => {
                const option = document.createElement('option');
                option.value = alumno.ci;
                option.textContent = `${alumno.nombre} ${alumno.apellido}`;
                selectAlumno.appendChild(option);
            });
        });

        fetch(`${API_URL}/turnos`)
        .then(response => response.json())
        .then(turnos => {
            const selectTurno = document.getElementById('clase-turno');
            selectTurno.innerHTML = '';
            turnos.forEach(turno => {
                const option = document.createElement('option');
                option.value = turno.id;
                option.textContent = `${turno.hora_inicio} - ${turno.hora_fin}`;
                selectTurno.appendChild(option);
            });
        });

        fetch(`${API_URL}/actividades`)
        .then(response => response.json())
        .then(actividades => {
            const selectActividad = document.getElementById('clase-actividad');
            selectActividad.innerHTML = '';
            actividades.forEach(act => {
                const option = document.createElement('option');
                option.value = act.id;
                option.textContent = act.descripcion;
                selectActividad.appendChild(option);
            });
        });
    }

    cargarSelects();

    // Funciones para Reportes
    document.getElementById('btn-reporte-ingresos').addEventListener('click', function() {
        fetch(`${API_URL}/reportes/actividades_mas_ingresos`)
        .then(response => response.json())
        .then(data => {
            mostrarReporte(data, ['Actividad', 'Ingresos Totales']);
        });
    });

    document.getElementById('btn-reporte-alumnos').addEventListener('click', function() {
        fetch(`${API_URL}/reportes/actividades_mas_alumnos`)
        .then(response => response.json())
        .then(data => {
            mostrarReporte(data, ['Cantidad de Alumnos', 'Actividad']);
        });
    });

    document.getElementById('btn-reporte-turnos').addEventListener('click', function() {
        fetch(`${API_URL}/reportes/turnos_mas_clases`)
        .then(response => response.json())
        .then(data => {
            mostrarReporte(data, ['Cantidad de Clases', 'Turno']);
        });
    });

    function mostrarReporte(data, headers) {
        const thead = document.querySelector('#tabla-reportes thead tr');
        const tbody = document.querySelector('#tabla-reportes tbody');
        thead.innerHTML = '';
        tbody.innerHTML = '';

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            thead.appendChild(th);
        });

        data.forEach(item => {
            const tr = document.createElement('tr');
            for (let key in item) {
                const td = document.createElement('td');
                td.textContent = item[key];
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });
    }

    // Marcar clase como dictada
    $(document).on('click', '.btn-dictar-clase', function() {
        const id = $(this).data('id');
        if (confirm('¿Desea marcar esta clase como dictada?')) {
            fetch(`${API_URL}/clases/${id}/dictar`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje || data.error);
                cargarClases();
            })
            .catch(error => {
                alert('Error al marcar clase como dictada');
            });
        }
    });

    // Eliminar alumno de una clase
    // Implementación de eliminar alumno de una clase
    // ...

});
