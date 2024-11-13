USE obligatorio;

SELECT 'El script database.sql está siendo ejecutado';

CREATE TABLE login (
    correo VARCHAR(255) NOT NULL PRIMARY KEY,
    contraseña VARCHAR(255) NOT NULL
);

CREATE TABLE actividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    costo DECIMAL(10, 2) NOT NULL,
    restriccion_edad INT NOT NULL
);

CREATE TABLE equipamiento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_actividad INT NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    costo DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (id_actividad) REFERENCES actividades(id)
);

CREATE TABLE instructores (
    ci VARCHAR(20) NOT NULL PRIMARY KEY, # TODO: Review
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL
);

CREATE TABLE turnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
);

CREATE TABLE alumnos (
    ci VARCHAR(20) NOT NULL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    telefono_contacto VARCHAR(20),
    correo_electronico VARCHAR(255)
);

CREATE TABLE clase (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ci_instructor VARCHAR(20) NOT NULL,
    id_actividad INT NOT NULL,
    id_turno INT NOT NULL,
    dictada BOOLEAN NOT NULL DEFAULT FALSE,
    tipo_clase ENUM('grupal', 'individual') NOT NULL,
    FOREIGN KEY (ci_instructor) REFERENCES instructores(ci),
    FOREIGN KEY (id_actividad) REFERENCES actividades(id),
    FOREIGN KEY (id_turno) REFERENCES turnos(id)
);


CREATE TABLE alumno_clase (
    id_clase INT NOT NULL,
    ci_alumno VARCHAR(20) NOT NULL,
    id_equipamiento INT,
    usa_equipamiento_prop BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id_clase, ci_alumno),
    FOREIGN KEY (id_clase) REFERENCES clase(id),
    FOREIGN KEY (ci_alumno) REFERENCES alumnos(ci),
    FOREIGN KEY (id_equipamiento) REFERENCES equipamiento(id)
);

# Aca hago los inserts

INSERT INTO turnos (hora_inicio, hora_fin) VALUES
('09:00:00', '11:00:00'),
('12:00:00', '14:00:00'),
('16:00:00', '18:00:00');


INSERT INTO actividades(descripcion, costo, restriccion_edad) VALUES
('Snowboard', 1500.00, 18),
('Ski', 1200.00, 18),
('Moto de Nieve', 2200.00, 21);

INSERT INTO equipamiento (id_actividad, descripcion, costo) VALUES
(1, 'Tabla de snowboard', 600.00),
(1, 'Casco de snowboard', 400.00),
(2, 'Esquís', 400.00),
(2, 'Casco de ski', 300.00),
(3, 'Moto de nieve', 2500.00),
(3, 'Casco de moto de nieve', 500.00);

INSERT INTO instructores (ci, nombre, apellido) VALUES
('12345678', 'Camilo', 'Daniel'),
('87654321', 'Diego', 'Marrano'),
('11223344', 'Guillermo', 'Aquiestapase');

INSERT INTO alumnos (ci, nombre, apellido, fecha_nacimiento, telefono_contacto, correo_electronico) VALUES
('23456789', 'Ana', 'Martínez', '2005-04-12', '099123456', 'ana@gmail.com'),
('34567890', 'Jorge', 'López', '2000-09-30', '098765432', 'jorge@gmail.com'),
('45678901', 'Lucía', 'Fernández', '1998-07-22', '097654321', 'lucia@gmail.com');

INSERT INTO login(correo, contraseña) VALUES
('admin@gmail.com', 'admin');

INSERT INTO clase (ci_instructor, id_actividad, id_turno, dictada, tipo_clase) VALUES
('12345678', 1, 1, FALSE, 'grupal'),
('87654321', 2, 2, FALSE, 'grupal'),
('11223344', 3, 3, FALSE, 'individual');

INSERT INTO alumno_clase (id_clase, ci_alumno, id_equipamiento, usa_equipamiento_prop) VALUES
(1, '23456789', 1, FALSE),
(1, '34567890', 2, TRUE),
(2, '45678901', 3, FALSE),
(3, '23456789', 5, FALSE);

# Restricciones

#Esto hace que no un instructor no pueda dar dos clases en el mismo turno
ALTER TABLE clase
ADD CONSTRAINT unique_instructor_turno UNIQUE (ci_instructor, id_turno);


# RECORDAR RESTRINGIR EN EL BACK y EL FRONT:
# - que el instructor no pueda dar dos clases en el mismo turno (YA ESTA CHECKEADO ACA)
# - Que un alumno no pueda estar en dos clases en el mismo turno
# - Que no se puedan hacer modificaciones de horario si se esta en clase




