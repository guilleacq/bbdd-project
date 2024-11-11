// URL base de la API
const API_URL = 'http://localhost:5000';

// Funciones para Instructores
$(document).ready(function() {
    cargarInstructores();

    $('#form-instructor').submit(function(e) {
        e.preventDefault();
        const ci = $('#instructor-ci').val();
        const nombre = $('#instructor-nombre').val();
        const apellido = $('#instructor-apellido').val();

        $.ajax({
            url: `${API_URL}/instructores`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ ci, nombre, apellido }),
            success: function(response) {
                alert(response.mensaje);
                $('#form-instructor')[0].reset();
                cargarInstructores();
            },
            error: function(error) {
                alert('Error al agregar instructor');
            }
        });
    });

    // Cargar instructores en tabla
    function cargarInstructores() {
        $.ajax({
            url: `${API_URL}/instructores`,
            method: 'GET',
            success: function(instructores) {
                let tbody = $('#tabla-instructores tbody');
                tbody.empty();
                instructores.forEach(instr => {
                    tbody.append(`
                        <tr>
                            <td>${instr.ci}</td>
                            <td>${instr.nombre}</td>
                            <td>${instr.apellido}</td>
                            <td>
                                <button class="btn btn-warning btn-sm btn-editar-instructor" data-ci="${instr.ci}">Editar</button>
                                <button class="btn btn-danger btn-sm btn-eliminar-instructor" data-ci="${instr.ci}">Eliminar</button>
                            </td>
                        </tr>
                    `);
                });
            }
        });
    }

    // Similarmente, puedes agregar las funciones para editar y eliminar instructores
    // ...

    // Funciones para Alumnos
    cargarAlumnos();

    $('#form-alumno').submit(function(e) {
        e.preventDefault();
        const ci = $('#alumno-ci').val();
        const nombre = $('#alumno-nombre').val();
        const apellido = $('#alumno-apellido').val();
        const fecha_nacimiento = $('#alumno-fecha-nacimiento').val();
        const telefono_contacto = $('#alumno-telefono').val();
        const correo_electronico = $('#alumno-correo').val();

        $.ajax({
            url: `${API_URL}/alumnos`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ ci, nombre, apellido, fecha_nacimiento, telefono_contacto, correo_electronico }),
            success: function(response) {
                alert(response.mensaje);
                $('#form-alumno')[0].reset();
                cargarAlumnos();
            },
            error: function(error) {
                alert('Error al agregar alumno');
            }
        });
    });

    function cargarAlumnos() {
        $.ajax({
            url: `${API_URL}/alumnos`,
            method: 'GET',
            success: function(alumnos) {
                let tbody = $('#tabla-alumnos tbody');
                tbody.empty();
                alumnos.forEach(alumno => {
                    tbody.append(`
                        <tr>
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
                        </tr>
                    `);
                });
            }
        });
    }

    // Similarmente, puedes agregar las funciones para editar y eliminar alumnos
    // ...

    // Funciones para Turnos
    cargarTurnos();

    $('#form-turno').submit(function(e) {
        e.preventDefault();
        const hora_inicio = $('#turno-hora-inicio').val();
        const hora_fin = $('#turno-hora-fin').val();

        $.ajax({
            url: `${API_URL}/turnos`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ hora_inicio, hora_fin }),
            success: function(response) {
                alert(response.mensaje);
                $('#form-turno')[0].reset();
                cargarTurnos();
            },
            error: function(error) {
                alert('Error al agregar turno');
            }
        });
    });

    function cargarTurnos() {
        $.ajax({
            url: `${API_URL}/turnos`,
            method: 'GET',
            success: function(turnos) {
                let tbody = $('#tabla-turnos tbody');
                tbody.empty();
                $('#clase-turno').empty();
                turnos.forEach(turno => {
                    tbody.append(`
                        <tr>
                            <td>${turno.id}</td>
                            <td>${turno.hora_inicio}</td>
                            <td>${turno.hora_fin}</td>
                            <td>
                                <button class="btn btn-warning btn-sm btn-editar-turno" data-id="${turno.id}">Editar</button>
                                <button class="btn btn-danger btn-sm btn-eliminar-turno" data-id="${turno.id}">Eliminar</button>
                            </td>
                        </tr>
                    `);
                    $('#clase-turno').append(`<option value="${turno.id}">${turno.hora_inicio} - ${turno.hora_fin}</option>`);
                });
            }
        });
    }

    // Similarmente, puedes agregar las funciones para editar y eliminar turnos
    // ...

    // Funciones para Actividades
    cargarActividades();

    $('#form-actividad').submit(function(e) {
        e.preventDefault();
        const id = $('#actividad-id').val();
        const descripcion = $('#actividad-descripcion').val();
        const costo = $('#actividad-costo').val();
        const restriccion_edad = $('#actividad-restriccion').val();

        $.ajax({
            url: `${API_URL}/actividades/${id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ descripcion, costo, restriccion_edad }),
            success: function(response) {
                alert(response.mensaje);
                cargarActividades();
            },
            error: function(error) {
                alert('Error al modificar actividad');
            }
        });
    });

    function cargarActividades() {
        $.ajax({
            url: `${API_URL}/actividades`,
            method: 'GET',
            success: function(actividades) {
                let tbody = $('#tabla-actividades tbody');
                tbody.empty();
                $('#actividad-id').empty();
                $('#clase-actividad').empty();
                actividades.forEach(act => {
                    tbody.append(`
                        <tr>
                            <td>${act.id}</td>
                            <td>${act.descripcion}</td>
                            <td>${act.costo}</td>
                            <td>${act.restriccion_edad}</td>
                        </tr>
                    `);
                    $('#actividad-id').append(`<option value="${act.id}">${act.descripcion}</option>`);
                    $('#clase-actividad').append(`<option value="${act.id}">${act.descripcion}</option>`);
                });
            }
        });
    }

    // Funciones para Clases
    cargarClases();

    $('#form-clase').submit(function(e) {
        e.preventDefault();
        const ci_instructor = $('#clase-instructor').val();
        const id_actividad = $('#clase-actividad').val();
        const id_turno = $('#clase-turno').val();
        const tipo_clase = $('#clase-tipo').val();

        $.ajax({
            url: `${API_URL}/clases`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ ci_instructor, id_actividad, id_turno, tipo_clase }),
            success: function(response) {
                alert(response.mensaje);
                $('#form-clase')[0].reset();
                cargarClases();
            },
            error: function(error) {
                alert(error.responseJSON.error || 'Error al agregar clase');
            }
        });
    });

    function cargarClases() {
        $.ajax({
            url: `${API_URL}/clases`,
            method: 'GET',
            success: function(clases) {
                let tbody = $('#tabla-clases tbody');
                tbody.empty();
                $('#ac-clase-id').empty();
                clases.forEach(clase => {
                    tbody.append(`
                        <tr>
                            <td>${clase.id}</td>
                            <td>${clase.ci_instructor}</td>
                            <td>${clase.id_actividad}</td>
                            <td>${clase.id_turno}</td>
                            <td>${clase.tipo_clase}</td>
                            <td>
                                <!-- Puedes agregar botones de editar/eliminar si lo deseas -->
                            </td>
                        </tr>
                    `);
                    $('#ac-clase-id').append(`<option value="${clase.id}">${clase.id}</option>`);
                });
            }
        });
    }

    // Cargar instructores y alumnos en selects
    function cargarSelects() {
        $.ajax({
            url: `${API_URL}/instructores`,
            method: 'GET',
            success: function(instructores) {
                $('#clase-instructor').empty();
                instructores.forEach(instr => {
                    $('#clase-instructor').append(`<option value="${instr.ci}">${instr.nombre} ${instr.apellido}</option>`);
                });
            }
        });

        $.ajax({
            url: `${API_URL}/alumnos`,
            method: 'GET',
            success: function(alumnos) {
                $('#ac-alumno-ci').empty();
                alumnos.forEach(alumno => {
                    $('#ac-alumno-ci').append(`<option value="${alumno.ci}">${alumno.nombre} ${alumno.apellido}</option>`);
                });
            }
        });
    }

    cargarSelects();

    // Agregar alumno a clase
    $('#form-alumno-clase').submit(function(e) {
        e.preventDefault();
        const id_clase = $('#ac-clase-id').val();
        const ci_alumno = $('#ac-alumno-ci').val();
        const id_equipamiento = $('#ac-equipamiento').val() || null;
        const usa_equipamiento_prop = $('#ac-equip-propio').val() === 'true';

        $.ajax({
            url: `${API_URL}/clases/${id_clase}/alumnos`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ ci_alumno, id_equipamiento, usa_equipamiento_prop }),
            success: function(response) {
                alert(response.mensaje);
                $('#form-alumno-clase')[0].reset();
            },
            error: function(error) {
                alert(error.responseJSON.error || 'Error al agregar alumno a clase');
            }
        });
    });

    // Funciones para Reportes
    $('#btn-reporte-ingresos').click(function() {
        $.ajax({
            url: `${API_URL}/reportes/actividades_mas_ingresos`,
            method: 'GET',
            success: function(data) {
                mostrarReporte(data, ['Actividad', 'Ingresos Totales']);
            }
        });
    });

    $('#btn-reporte-alumnos').click(function() {
        $.ajax({
            url: `${API_URL}/reportes/actividades_mas_alumnos`,
            method: 'GET',
            success: function(data) {
                mostrarReporte(data, ['Actividad', 'Cantidad de Alumnos']);
            }
        });
    });

    $('#btn-reporte-turnos').click(function() {
        $.ajax({
            url: `${API_URL}/reportes/turnos_mas_clases`,
            method: 'GET',
            success: function(data) {
                mostrarReporte(data, ['Turno', 'Cantidad de Clases']);
            }
        });
    });

    function mostrarReporte(data, headers) {
        let thead = $('#tabla-reportes thead tr');
        let tbody = $('#tabla-reportes tbody');
        thead.empty();
        tbody.empty();

        headers.forEach(header => {
            thead.append(`<th>${header}</th>`);
        });

        data.forEach(item => {
            let row = '<tr>';
            for (let key in item) {
                row += `<td>${item[key]}</td>`;
            }
            row += '</tr>';
            tbody.append(row);
        });
    }
});
