from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
from config import db_config
from datetime import datetime, time

app = Flask(__name__)
CORS(app)  # Habilitar CORS para permitir peticiones desde cualquier origen

# Función para obtener una conexión a la base de datos
def get_db_connection():
    db_config['cursorclass'] = pymysql.cursors.DictCursor
    conexion = pymysql.connect(**db_config)
    return conexion

# =============== RUTAS para el ABM de instructores, alumnos, actividades, clases, equipamientos y turnos =======================

# ========== INSTRUCTORES ===========
# CRUD completo para instructores
@app.route('/instructores', methods=['GET'])
def obtener_instructores():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    cursor.execute('SELECT * FROM instructores')
    instructores = cursor.fetchall()
    conexion.close()
    return jsonify(instructores)

@app.route('/instructores', methods=['POST'])
def agregar_instructor():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    datos = request.json
    ci = datos['ci']
    nombre = datos['nombre']
    apellido = datos['apellido']
    cursor.execute('INSERT INTO instructores (ci, nombre, apellido) VALUES (%s, %s, %s)', (ci, nombre, apellido))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Instructor agregado correctamente'})

@app.route('/instructores/<ci>', methods=['GET'])
def obtener_instructor(ci):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    cursor.execute('SELECT * FROM instructores WHERE ci = %s', (ci,))
    instructor = cursor.fetchone()
    conexion.close()
    return jsonify(instructor)

@app.route('/instructores/<ci>', methods=['PUT'])
def modificar_instructor(ci):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    datos = request.json
    nombre = datos['nombre']
    apellido = datos['apellido']
    cursor.execute('UPDATE instructores SET nombre = %s, apellido = %s WHERE ci = %s', (nombre, apellido, ci))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Instructor modificado correctamente'})

@app.route('/instructores/<ci>', methods=['DELETE'])
def eliminar_instructor(ci):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    # Verificar si el instructor tiene clases asignadas
    cursor.execute('SELECT COUNT(*) AS count FROM clase WHERE ci_instructor = %s', (ci,))
    count_result = cursor.fetchone()
    if count_result['count'] > 0:
        conexion.close()
        return jsonify({'error': 'No se puede eliminar un instructor que tiene clases asignadas'}), 400
    cursor.execute('DELETE FROM instructores WHERE ci = %s', (ci,))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Instructor eliminado correctamente'})

# ========== TURNOS ===========
# CRUD completo para turnos
@app.route('/turnos', methods=['GET'])
def obtener_turnos():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    cursor.execute('SELECT * FROM turnos')
    turnos = cursor.fetchall()
    for turno in turnos:
        turno['hora_inicio'] = str(turno['hora_inicio'])
        turno['hora_fin'] = str(turno['hora_fin'])
    conexion.close()
    return jsonify(turnos)

@app.route('/turnos', methods=['POST'])
def agregar_turno():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    datos = request.json
    hora_inicio = datos['hora_inicio']
    hora_fin = datos['hora_fin']
    cursor.execute('INSERT INTO turnos (hora_inicio, hora_fin) VALUES (%s, %s)', (hora_inicio, hora_fin))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Turno agregado correctamente'})

@app.route('/turnos/<int:id>', methods=['GET'])
def obtener_turno(id):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    cursor.execute('SELECT * FROM turnos WHERE id = %s', (id,))
    turno = cursor.fetchone()
    if turno:
        turno['hora_inicio'] = str(turno['hora_inicio'])
        turno['hora_fin'] = str(turno['hora_fin'])
    conexion.close()
    return jsonify(turno)

@app.route('/turnos/<int:id>', methods=['PUT'])
def modificar_turno(id):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    datos = request.json
    hora_inicio = datos['hora_inicio']
    hora_fin = datos['hora_fin']
    cursor.execute('UPDATE turnos SET hora_inicio = %s, hora_fin = %s WHERE id = %s', (hora_inicio, hora_fin, id))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Turno modificado correctamente'})

@app.route('/turnos/<int:id>', methods=['DELETE'])
def eliminar_turno(id):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    # Verificar si hay clases asociadas a este turno
    cursor.execute('SELECT COUNT(*) AS count FROM clase WHERE id_turno = %s', (id,))
    count_result = cursor.fetchone()
    if count_result['count'] > 0:
        conexion.close()
        return jsonify({'error': 'No se puede eliminar un turno que tiene clases asociadas'}), 400
    cursor.execute('DELETE FROM turnos WHERE id = %s', (id,))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Turno eliminado correctamente'})

# ========== ALUMNOS ===========
# CRUD completo para alumnos
@app.route('/alumnos', methods=['GET'])
def obtener_alumnos():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    cursor.execute('SELECT * FROM alumnos')
    alumnos = cursor.fetchall()
    conexion.close()
    return jsonify(alumnos)

@app.route('/alumnos', methods=['POST'])
def agregar_alumno():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    datos = request.json
    ci = datos['ci']
    nombre = datos['nombre']
    apellido = datos['apellido']
    fecha_nacimiento = datos['fecha_nacimiento']
    telefono_contacto = datos.get('telefono_contacto')
    correo_electronico = datos.get('correo_electronico')
    cursor.execute('INSERT INTO alumnos (ci, nombre, apellido, fecha_nacimiento, telefono_contacto, correo_electronico) VALUES (%s, %s, %s, %s, %s, %s)', (ci, nombre, apellido, fecha_nacimiento, telefono_contacto, correo_electronico))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Alumno agregado correctamente'})

@app.route('/alumnos/<ci>', methods=['GET'])
def obtener_alumno(ci):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    cursor.execute('SELECT * FROM alumnos WHERE ci = %s', (ci,))
    alumno = cursor.fetchone()
    conexion.close()
    return jsonify(alumno)

@app.route('/alumnos/<ci>', methods=['PUT'])
def modificar_alumno(ci):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    datos = request.json
    nombre = datos['nombre']
    apellido = datos['apellido']
    fecha_nacimiento = datos['fecha_nacimiento']
    telefono_contacto = datos.get('telefono_contacto')
    correo_electronico = datos.get('correo_electronico')
    cursor.execute('UPDATE alumnos SET nombre = %s, apellido = %s, fecha_nacimiento = %s, telefono_contacto = %s, correo_electronico = %s WHERE ci = %s', (nombre, apellido, fecha_nacimiento, telefono_contacto, correo_electronico, ci))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Alumno modificado correctamente'})

@app.route('/alumnos/<ci>', methods=['DELETE'])
def eliminar_alumno(ci):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    # Verificar si el alumno está inscrito en alguna clase
    cursor.execute('SELECT COUNT(*) AS count FROM alumno_clase WHERE ci_alumno = %s', (ci,))
    count_result = cursor.fetchone()
    if count_result['count'] > 0:
        conexion.close()
        return jsonify({'error': 'No se puede eliminar un alumno que está inscrito en clases'}), 400
    cursor.execute('DELETE FROM alumnos WHERE ci = %s', (ci,))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Alumno eliminado correctamente'})

# Ruta para obtener las clases de un alumno
@app.route('/alumnos/<ci_alumno>/clases', methods=['GET'])
def obtener_clases_de_alumno(ci_alumno):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    query = '''
    SELECT c.id, c.ci_instructor, c.id_actividad, c.id_turno, c.dictada, c.tipo_clase
    FROM alumno_clase ac
    JOIN clase c ON ac.id_clase = c.id
    WHERE ac.ci_alumno = %s
    '''
    cursor.execute(query, (ci_alumno,))
    clases = cursor.fetchall()
    conexion.close()
    return jsonify(clases)

# ========== ACTIVIDADES ===========
# CRUD completo para actividades
@app.route('/actividades', methods=['GET'])
def obtener_actividades():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    cursor.execute('SELECT * FROM actividades')
    actividades = cursor.fetchall()
    conexion.close()
    return jsonify(actividades)

@app.route('/actividades', methods=['POST'])
def agregar_actividad():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    datos = request.json
    descripcion = datos['descripcion']
    costo = datos['costo']
    restriccion_edad = datos['restriccion_edad']
    cursor.execute('INSERT INTO actividades (descripcion, costo, restriccion_edad) VALUES (%s, %s, %s)', (descripcion, costo, restriccion_edad))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Actividad agregada correctamente'})

@app.route('/actividades/<int:id>', methods=['GET'])
def obtener_actividad(id):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    cursor.execute('SELECT * FROM actividades WHERE id = %s', (id,))
    actividad = cursor.fetchone()
    conexion.close()
    return jsonify(actividad)

@app.route('/actividades/<int:id>', methods=['PUT'])
def modificar_actividad(id):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    datos = request.json
    descripcion = datos['descripcion']
    costo = datos['costo']
    restriccion_edad = datos['restriccion_edad']
    cursor.execute('UPDATE actividades SET descripcion = %s, costo = %s, restriccion_edad = %s WHERE id = %s', (descripcion, costo, restriccion_edad, id))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Actividad modificada correctamente'})

@app.route('/actividades/<int:id>', methods=['DELETE'])
def eliminar_actividad(id):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    # Verificar si hay clases asociadas a esta actividad
    cursor.execute('SELECT COUNT(*) AS count FROM clase WHERE id_actividad = %s', (id,))
    count_result = cursor.fetchone()
    if count_result['count'] > 0:
        conexion.close()
        return jsonify({'error': 'No se puede eliminar una actividad que tiene clases asociadas'}), 400
    cursor.execute('DELETE FROM actividades WHERE id = %s', (id,))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Actividad eliminada correctamente'})

# ========== EQUIPAMIENTOS ===========
# CRUD completo para equipamientos
@app.route('/equipamientos', methods=['GET'])
def obtener_equipamientos():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    cursor.execute('SELECT * FROM equipamiento')
    equipamientos = cursor.fetchall()
    conexion.close()
    return jsonify(equipamientos)

@app.route('/equipamientos', methods=['POST'])
def agregar_equipamiento():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    datos = request.json
    id_actividad = datos['id_actividad']
    descripcion = datos['descripcion']
    costo = datos['costo']
    cursor.execute('INSERT INTO equipamiento (id_actividad, descripcion, costo) VALUES (%s, %s, %s)', (id_actividad, descripcion, costo))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Equipamiento agregado correctamente'})

@app.route('/equipamientos/<int:id>', methods=['GET'])
def obtener_equipamiento(id):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    cursor.execute('SELECT * FROM equipamiento WHERE id = %s', (id,))
    equipamiento = cursor.fetchone()
    conexion.close()
    return jsonify(equipamiento)

@app.route('/equipamientos/<int:id>', methods=['PUT'])
def modificar_equipamiento(id):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    datos = request.json
    id_actividad = datos['id_actividad']
    descripcion = datos['descripcion']
    costo = datos['costo']
    cursor.execute('UPDATE equipamiento SET id_actividad = %s, descripcion = %s, costo = %s WHERE id = %s', (id_actividad, descripcion, costo, id))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Equipamiento modificado correctamente'})

@app.route('/equipamientos/<int:id>', methods=['DELETE'])
def eliminar_equipamiento(id):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    # Verificar si hay alumnos usando este equipamiento en alguna clase
    cursor.execute('SELECT COUNT(*) AS count FROM alumno_clase WHERE id_equipamiento = %s', (id,))
    count_result = cursor.fetchone()
    if count_result['count'] > 0:
        conexion.close()
        return jsonify({'error': 'No se puede eliminar un equipamiento que está siendo usado por alumnos'}), 400
    cursor.execute('DELETE FROM equipamiento WHERE id = %s', (id,))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Equipamiento eliminado correctamente'})

# ========== CLASES ===========
# CRUD completo para clases, incluyendo restricciones y reportes
@app.route('/clases', methods=['GET'])
def obtener_clases():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    cursor.execute('SELECT * FROM clase')
    clases = cursor.fetchall()
    conexion.close()
    return jsonify(clases)

    # Función para verificar si una clase está en curso
def clase_en_curso(id_clase):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    cursor.execute('''
        SELECT t.hora_inicio, t.hora_fin
        FROM clase c
        JOIN turnos t ON c.id_turno = t.id
        WHERE c.id = %s
    ''', (id_clase,))
    clase = cursor.fetchone()
    conexion.close()
    if clase:
        hora_actual = datetime.now().time()
        hora_inicio = datetime.strptime(str(clase['hora_inicio']), '%H:%M:%S').time()
        hora_fin = datetime.strptime(str(clase['hora_fin']), '%H:%M:%S').time()
        return hora_inicio <= hora_actual <= hora_fin
    return False

@app.route('/clases', methods=['POST'])
def agregar_clase():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    datos = request.json
    ci_instructor = datos['ci_instructor']
    id_actividad = datos['id_actividad']
    id_turno = datos['id_turno']
    tipo_clase = datos['tipo_clase']
    # Verificar si el instructor ya tiene una clase en el mismo turno
    cursor.execute('SELECT * FROM clase WHERE ci_instructor = %s AND id_turno = %s', (ci_instructor, id_turno))
    if cursor.fetchone():
        conexion.close()
        return jsonify({'error': 'El instructor ya tiene una clase en ese turno'}), 400
    cursor.execute('INSERT INTO clase (ci_instructor, id_actividad, id_turno, tipo_clase) VALUES (%s, %s, %s, %s)', (ci_instructor, id_actividad, id_turno, tipo_clase))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Clase agregada correctamente'})

@app.route('/clases/<int:id>', methods=['GET'])
def obtener_clase(id):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    cursor.execute('SELECT * FROM clase WHERE id = %s', (id,))
    clase = cursor.fetchone()
    conexion.close()
    return jsonify(clase)

# Ruta para modificar una clase
@app.route('/clases/<int:id>', methods=['PUT'])
def modificar_clase(id):
    if clase_en_curso(id):
        return jsonify({'error': 'No se puede modificar una clase en curso'}), 400

    conexion = get_db_connection()
    cursor = conexion.cursor()
    datos = request.json
    ci_instructor = datos['ci_instructor']
    id_turno = datos['id_turno']
    # Verificar si la clase ya fue dictada
    cursor.execute('SELECT dictada FROM clase WHERE id = %s', (id,))
    clase = cursor.fetchone()
    if clase and clase['dictada']:
        conexion.close()
        return jsonify({'error': 'La clase ya fue dictada, no se puede modificar'}), 400
    # Verificar si el instructor ya tiene una clase en el mismo turno
    cursor.execute('SELECT * FROM clase WHERE ci_instructor = %s AND id_turno = %s AND id != %s', (ci_instructor, id_turno, id))
    if cursor.fetchone():
        conexion.close()
        return jsonify({'error': 'El instructor ya tiene otra clase en ese turno'}), 400
    cursor.execute('UPDATE clase SET ci_instructor = %s, id_turno = %s WHERE id = %s', (ci_instructor, id_turno, id))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Clase modificada correctamente'})

# Ruta para eliminar una clase
@app.route('/clases/<int:id>', methods=['DELETE'])
def eliminar_clase(id):
    if clase_en_curso(id):
        return jsonify({'error': 'No se puede eliminar una clase en curso'}), 400

    conexion = get_db_connection()
    cursor = conexion.cursor()
    # Verificar si la clase ya fue dictada
    cursor.execute('SELECT dictada FROM clase WHERE id = %s', (id,))
    clase = cursor.fetchone()
    if clase and clase['dictada']:
        conexion.close()
        return jsonify({'error': 'No se puede eliminar una clase que ya fue dictada'}), 400
    cursor.execute('DELETE FROM clase WHERE id = %s', (id,))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Clase eliminada correctamente'})

# Ruta para marcar una clase como dictada
@app.route('/clases/<int:id>/dictar', methods=['POST'])
def dictar_clase(id):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    cursor.execute('UPDATE clase SET dictada = TRUE WHERE id = %s', (id,))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Clase marcada como dictada'})

# Ruta para obtener los alumnos de una clase
@app.route('/clases/<int:id>/alumnos', methods=['GET'])
def obtener_alumnos_de_clase(id):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    query = '''
    SELECT ac.ci_alumno, a.nombre, a.apellido, ac.id_equipamiento, ac.usa_equipamiento_prop
    FROM alumno_clase ac
    JOIN alumnos a ON ac.ci_alumno = a.ci
    WHERE ac.id_clase = %s
    '''
    cursor.execute(query, (id,))
    alumnos = cursor.fetchall()
    conexion.close()
    return jsonify(alumnos)

# Ruta para agregar un alumno a una clase
@app.route('/clases/<int:id_clase>/alumnos', methods=['POST'])
def agregar_alumno_a_clase(id_clase):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    datos = request.json
    ci_alumno = datos['ci_alumno']
    id_equipamiento = datos.get('id_equipamiento')  # Puede ser None si usa equipamiento propio
    usa_equipamiento_prop = datos.get('usa_equipamiento_prop', False)

    # Verificar si la clase existe y no ha sido dictada
    cursor.execute('SELECT dictada, id_turno, id_actividad, tipo_clase FROM clase WHERE id = %s', (id_clase,))
    clase = cursor.fetchone()
    if not clase:
        conexion.close()
        return jsonify({'error': 'La clase no existe'}), 404
    if clase['dictada']:
        conexion.close()
        return jsonify({'error': 'No se puede modificar una clase que ya fue dictada'}), 400

    id_turno_clase = clase['id_turno']
    id_actividad_clase = clase['id_actividad']
    tipo_clase = clase['tipo_clase']

    # Verificar si el alumno ya está inscrito en otra clase en el mismo turno
    query_alumno_turno = '''
    SELECT ac.id_clase
    FROM alumno_clase ac
    JOIN clase c ON ac.id_clase = c.id
    WHERE ac.ci_alumno = %s AND c.id_turno = %s
    '''
    cursor.execute(query_alumno_turno, (ci_alumno, id_turno_clase))
    if cursor.fetchone():
        conexion.close()
        return jsonify({'error': 'El alumno ya está inscrito en otra clase en este turno'}), 400

    # Verificar restricción de edad
    # Obtener fecha de nacimiento del alumno
    cursor.execute('SELECT fecha_nacimiento FROM alumnos WHERE ci = %s', (ci_alumno,))
    alumno = cursor.fetchone()
    if not alumno:
        conexion.close()
        return jsonify({'error': 'El alumno no existe'}), 404
    fecha_nacimiento = alumno['fecha_nacimiento']
    # Calcular edad
    today = datetime.today().date()
    edad = today.year - fecha_nacimiento.year - ((today.month, today.day) < (fecha_nacimiento.month, fecha_nacimiento.day))

    # Obtener restricción de edad de la actividad
    cursor.execute('SELECT restriccion_edad FROM actividades WHERE id = %s', (id_actividad_clase,))
    actividad = cursor.fetchone()
    if not actividad:
        conexion.close()
        return jsonify({'error': 'La actividad no existe'}), 404
    restriccion_edad = actividad['restriccion_edad']

    if edad < restriccion_edad:
        conexion.close()
        return jsonify({'error': f'El alumno no cumple con la restricción de edad para esta actividad (Edad mínima: {restriccion_edad})'}), 400

    # Si la clase es individual, verificar que no haya más alumnos
    if tipo_clase == 'individual':
        cursor.execute('SELECT COUNT(*) AS count FROM alumno_clase WHERE id_clase = %s', (id_clase,))
        count_result = cursor.fetchone()
        if count_result['count'] >= 1:
            conexion.close()
            return jsonify({'error': 'No se puede agregar más alumnos a una clase individual'}), 400

    # Agregar el alumno a la clase
    cursor.execute('''
        INSERT INTO alumno_clase (id_clase, ci_alumno, id_equipamiento, usa_equipamiento_prop)
        VALUES (%s, %s, %s, %s)
    ''', (id_clase, ci_alumno, id_equipamiento, usa_equipamiento_prop))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Alumno agregado a la clase correctamente'})

# Ruta para eliminar un alumno de una clase
@app.route('/clases/<int:id_clase>/alumnos/<ci_alumno>', methods=['DELETE'])
def eliminar_alumno_de_clase(id_clase, ci_alumno):
    conexion = get_db_connection()
    cursor = conexion.cursor()
    # Verificar si la clase ya fue dictada
    cursor.execute('SELECT dictada FROM clase WHERE id = %s', (id_clase,))
    clase = cursor.fetchone()
    if clase and clase['dictada']:
        conexion.close()
        return jsonify({'error': 'No se puede eliminar un alumno de una clase que ya fue dictada'}), 400
    cursor.execute('DELETE FROM alumno_clase WHERE id_clase = %s AND ci_alumno = %s', (id_clase, ci_alumno))
    conexion.commit()
    conexion.close()
    return jsonify({'mensaje': 'Alumno eliminado de la clase correctamente'})

# ========== REPORTES ===========
# Reporte: Actividades que más ingresos generan, incluyendo costo de equipamiento
@app.route('/reportes/actividades_mas_ingresos', methods=['GET'])
def actividades_mas_ingresos():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    query = '''
    SELECT a.descripcion AS actividad, 
        SUM(a.costo + IFNULL(e.costo, 0)) AS ingresos_totales
    FROM actividades a
    JOIN clase c ON c.id_actividad = a.id
    JOIN alumno_clase ac ON c.id = ac.id_clase
    LEFT JOIN equipamiento e ON ac.id_equipamiento = e.id
    GROUP BY a.descripcion
    ORDER BY ingresos_totales DESC;
    '''
    cursor.execute(query)
    resultados = cursor.fetchall()
    conexion.close()
    return jsonify(resultados)

# Reporte: Actividades con más alumnos
@app.route('/reportes/actividades_mas_alumnos', methods=['GET'])
def actividades_mas_alumnos():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    query = '''
    SELECT a.descripcion, COUNT(DISTINCT ac.ci_alumno) AS cantidad_alumnos
    FROM clase c
    JOIN actividades a ON c.id_actividad = a.id
    LEFT JOIN alumno_clase ac ON c.id = ac.id_clase
    GROUP BY a.descripcion
    ORDER BY cantidad_alumnos DESC
    '''
    cursor.execute(query)
    resultados = cursor.fetchall()
    conexion.close()
    return jsonify(resultados)

# Reporte: Turnos con más clases dictadas
@app.route('/reportes/turnos_mas_clases', methods=['GET'])
def turnos_mas_clases():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    query = '''
    SELECT CONCAT(t.hora_inicio, ' - ', t.hora_fin) AS turno, 
        COUNT(c.id) AS cantidad_clases
    FROM clase c
    JOIN turnos t ON c.id_turno = t.id
    GROUP BY turno
    ORDER BY cantidad_clases DESC;
    ''' # Aca sacamos el 'WHERE c.dictada = TRUE'
    cursor.execute(query)
    resultados = cursor.fetchall()
    conexion.close()
    return jsonify(resultados)

# ========== LOGIN ===========
@app.route('/login', methods=['POST'])
def login():
    conexion = get_db_connection()
    cursor = conexion.cursor()
    datos = request.json
    correo = datos['correo']
    contraseña = datos['contraseña']
    cursor.execute('SELECT * FROM login WHERE correo = %s AND contraseña = %s', (correo, contraseña))
    usuario = cursor.fetchone()
    conexion.close()
    if usuario:
        return jsonify({'exito': True})
    return jsonify({'error': 'Usuario o contraseña incorrectos'}), 401


if __name__ == '__main__':
    app.run(debug=True)
