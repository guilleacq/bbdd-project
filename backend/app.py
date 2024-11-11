from flask import Flask, request, jsonify
import pymysql
from config import db_config

app = Flask(__name__)

# funcion para obtener una conexion a la base de datos
def get_db_connection():
    # usamos cursorclass aca para obtener los resultados como diccionarios
    db_config['cursorclass'] = pymysql.cursors.DictCursor
    conexion = pymysql.connect(**db_config)
    return conexion


# =============== RUTAS para el ABM de instructores, alumnos, etc =======================0

# ruta de ejemplo para verificar que todo funciona
@app.route('/')
def inicio():
    return 'Hola mundo!'

# ========== INSTRUCTORES ===========

# ruta para obtener todos los instructores
@app.route('/instructores', methods=['GET'])
def obtener_instructores():
    conexion = get_db_connection()
    cursor = conexion.cursor()

    cursor.execute('SELECT * FROM instructores')
    instructores = cursor.fetchall()

    conexion.close()

    return jsonify(instructores)


# ruta para agregar un nuevo instructor
@app.route ('/instructores', methods=['POST'])
def agregar_instructor():
    conexion = get_db_connection()
    cursor = conexion.cursor()

    # obtenemos los datos del instructor del body del request
    datos = request.json
    ci = datos['ci']
    nombre = datos['nombre']
    apellido = datos['apellido']

    # insertamos el nuevo instructor
    cursor.execute('INSERT INTO instructores (ci, nombre, apellido) VALUES (%s, %s, %s)', (ci, nombre, apellido))
    conexion.commit()

    conexion.close()

    return jsonify({'mensaje': 'Instructor agregado correctamente'})


# ruta para obtener un instructor por id
@app.route('/instructores/<ci>', methods=['GET'])
def obtener_instructor(ci):
    conexion = get_db_connection()
    cursor = conexion.cursor()

    cursor.execute('SELECT * FROM instructores WHERE ci = %s', (ci))
    instructor = cursor.fetchone()

    conexion.close()

    return jsonify(instructor)


# ruta para modificar un instructor
@app.route('/instructores/<ci>', methods=['PUT'])
def modificar_instructor(ci):
    conexion = get_db_connection()
    cursor = conexion.cursor()

    # obtenemos los datos del instructor del body del request
    datos = request.json
    ci = datos['ci']
    nombre = datos['nombre']
    apellido = datos['apellido']

    # modificamos el instructor
    cursor.execute('UPDATE instructores SET nombre = %s, apellido = %s WHERE ci = %s', (nombre, apellido, ci))
    conexion.commit()

    conexion.close()

    return jsonify({'mensaje': 'Instructor modificado correctamente'})

# eliminar un instructor

@app.route('/instructores/<ci>', methods=['DELETE'])
def eliminar_instructor(ci):
    conexion = get_db_connection()
    cursor = conexion.cursor()

    cursor.execute('DELETE FROM instructores WHERE ci = %s', (ci))
    conexion.commit()

    conexion.close()

    return jsonify({'mensaje': 'Instructor eliminado correctamente'})

# ========== TURNOS ===========

# ruta para obtener todos los turnos
@app.route('/turnos', methods=['GET'])
def obtener_turnos():
    conexion = get_db_connection()
    cursor = conexion.cursor()

    cursor.execute('SELECT * FROM turnos')
    turnos = cursor.fetchall()

    # convierto a string
    for turno in turnos:
        turno['hora_inicio'] = str(turno['hora_inicio'])
        turno['hora_fin'] = str(turno['hora_fin'])

    conexion.close()

    return jsonify(turnos)

# ruta para agregar un nuevo turno

@app.route('/turnos', methods=['POST'])
def agregar_turno():
    conexion = get_db_connection()
    cursor = conexion.cursor()

    # obtenemos los datos del turno del body del request
    datos = request.json
    hora_inicio = datos['hora_inicio']
    hora_fin = datos['hora_fin']

    # insertamos el nuevo turno
    cursor.execute('INSERT INTO turnos (hora_inicio, hora_fin) VALUES (%s, %s)', (hora_inicio, hora_fin))
    conexion.commit()

    conexion.close()

    return jsonify({'mensaje': 'Turno agregado correctamente'})

# ruta para obtener un turno por id
@app.route('/turnos/<int:id>', methods=['GET'])
def obtener_turno(id):
    conexion = get_db_connection()
    cursor = conexion.cursor()

    cursor.execute('SELECT * FROM turnos WHERE id = %s', (id))
    turno = cursor.fetchone()

    # convierto a string para que funcione
    if turno:
        turno['hora_inicio'] = str(turno['hora_inicio']) 
        turno['hora_fin'] = str(turno['hora_fin'])

    conexion.close()

    return jsonify(turno)


# ruta para modificar un turno
@app.route('/turnos/<int:id>', methods=['PUT'])
def modificar_turno(id):
    conexion = get_db_connection()
    cursor = conexion.cursor()

    # obtenemos los datos del turno del body del request
    datos = request.json
    hora_inicio = datos['hora_inicio']
    hora_fin = datos['hora_fin']

    # modificamos el turno
    cursor.execute('UPDATE turnos SET hora_inicio = %s, hora_fin = %s WHERE id = %s', (hora_inicio, hora_fin, id))
    conexion.commit()

    conexion.close()

    return jsonify({'mensaje': 'Turno modificado correctamente'})

# eliminar un turno
@app.route('/turnos/<int:id>', methods=['DELETE'])
def eliminar_turno(id):
    conexion = get_db_connection()
    cursor = conexion.cursor()

    cursor.execute('DELETE FROM turnos WHERE id = %s', (id))
    conexion.commit()

    conexion.close()

    return jsonify({'mensaje': 'Turno eliminado correctamente'})


if __name__ == '__main__':
    app.run(debug=True)


