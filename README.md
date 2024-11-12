
<h1>Instrucciones para Ejecutar el Proyecto</h1>

<h2>Requisitos Previos</h2>
<p>Antes de empezar, asegurate de tener instaladas las siguientes herramientas en tu máquina:</p>
<ul>
<li>Docker</li>
<li>Docker Compose</li>
</ul>

<p><strong>Nota:</strong> Asegurate de que los puertos 80, 5000 y 3306 estén libres en tu máquina local, ya que serán utilizados por la aplicación.</p>

<h2>Pasos para Ejecutar la Aplicación</h2>

<h3>1. Clonar el Repositorio</h3>
<p>Abrí una terminal y ejecutá el siguiente comando para clonar el repositorio:</p>
<code>git clone https://github.com/guilleacq/bbdd-project.git</code>

<h3>2. Navegar al Directorio del Proyecto</h3>
<p>Ingresá al directorio del proyecto clonado:</p>
<code>cd bbdd-project</code>

<h3>3. Construir y Ejecutar los Contenedores con Docker Compose</h3>
<p>Ejecutá el siguiente comando para construir las imágenes y levantar los contenedores:</p>
<code>docker-compose up --build</code>

<h4>¿Qué hace este comando?</h4>
<ul>
<li><strong>--build:</strong> Fuerza la reconstrucción de las imágenes Docker para el backend y frontend.</li>
<li><strong>docker-compose up:</strong> Levanta todos los servicios definidos en docker-compose.yml.</li>
</ul>
<p>Este proceso puede tomar unos minutos la primera vez, ya que Docker va a descargar las imágenes base y construir las imágenes de tu aplicación.</p>

<h3>4. Verificar que los Contenedores Estén Corriendo</h3>
<p>Cuando los contenedores estén levantados, vas a poder verificar su estado así:</p>
<code>docker-compose ps</code>

<p>Tendrías que ver algo parecido a lo siguiente:</p>
<pre>
Name                    Command               State           Ports
-----------------------------------------------------------------------------------
mysql-obligatorio   docker-entrypoint.sh mysqld    Up      0.0.0.0:3306->3306/tcp
obligatorio_backend flask run --host=0.0.0.0       Up      0.0.0.0:5000->5000/tcp
obligatorio_frontend nginx -g daemon off;          Up      0.0.0.0:80->80/tcp
</pre>

<h3>5. Acceder a la Aplicación</h3>

<h4>Frontend</h4>
<p>Abrí tu navegador y entrá a:</p>
<p><a href="http://localhost">http://localhost</a></p>
<p>Acá vas a poder interactuar con la interfaz de usuario de tu aplicación.</p>

<h4>Backend</h4>
<p>Si querés acceder directamente al backend (por ejemplo, para probar las APIs), entrá a:</p>
<p><a href="http://localhost:5000">http://localhost:5000</a></p>

<h4>Base de Datos</h4>
<p>La base de datos MySQL está disponible en el puerto 3306. Podés conectarte utilizando un cliente MySQL (como MySQL Workbench o DataGrip) con las siguientes credenciales:</p>
<ul>
<li>Host: localhost</li>
<li>Puerto: 3306</li>
<li>Usuario: root</li>
<li>Contraseña: 1234</li>
<li>Base de datos: obligatorio</li>
</ul>

<h3>6. Detener y Eliminar los Contenedores</h3>
<p>Cuando hayas terminado de usar la aplicación, podés detener y eliminar los contenedores ejecutando:</p>
<code>docker-compose down</code>
<p>Este comando detiene los contenedores y libera los recursos asociados.</p>

<h2>Notas Adicionales</h2>

<h3>Actualizar el Código</h3>
<p>Si realizás cambios en el código del backend o frontend, vas a tener que reconstruir las imágenes para que los cambios se reflejen en los contenedores. Para hacerlo, seguí estos pasos:</p>
<ol>
<li>Detenés los contenedores si están corriendo:
    <code>docker-compose down</code>
</li>
<li>Volvés a construir y ejecutar los contenedores:
    <code>docker-compose up --build</code>
</li>
</ol>

<h3>Reinicializar la Base de Datos</h3>
<p>Si necesitás reiniciar la base de datos desde cero (por ejemplo, si hiciste cambios en database.sql), podés eliminar el volumen de datos y volver a levantar los contenedores:</p>
<ol>
<li>Detenés y eliminás los contenedores y volúmenes:
    <code>docker-compose down -v</code>
    <p><strong>Advertencia:</strong> Este comando va a eliminar todos los datos almacenados en la base de datos. Usalo con precaución.</p>
</li>
<li>Volvés a construir y ejecutar los contenedores:
    <code>docker-compose up --build</code>
</li>
</ol>

<h3>Cambiar Puertos en Caso de Conflicto</h3>
<p>Si alguno de los puertos necesarios (80, 5000, 3306) está en uso en tu máquina, podés modificar el archivo docker-compose.yml para mapear los puertos del contenedor a puertos diferentes en tu host. Por ejemplo, para cambiar el puerto del frontend:</p>
<p>En docker-compose.yml, buscá el servicio frontend y modificá la sección de puertos:</p>
<pre>
ports:
- "8080:80"
</pre>
<p>Ahora, vas a poder acceder al frontend en:</p>
<p><a href="http://localhost:8080">http://localhost:8080</a></p>

<h3>Acceder a los Logs de los Contenedores</h3>
<p>Para depurar problemas o ver la salida de los contenedores, podés acceder a los logs:</p>
<ul>
<li>Ver logs en tiempo real:
    <code>docker-compose logs -f</code>
</li>
<li>Ver logs de un servicio específico (por ejemplo, el backend):
    <code>docker-compose logs -f backend</code>
</li>
</ul>

<h3>Ingresar a un Contenedor en Ejecución</h3>
<p>Si necesitás acceder al shell de un contenedor (por ejemplo, para inspeccionar archivos o ejecutar comandos), podés hacerlo con:</p>
<code>docker exec -it nombre_del_contenedor /bin/sh</code>
<p>Reemplazá nombre_del_contenedor con el nombre adecuado, como obligatorio_backend.</p>

<h3>Administrar Dependencias de Python</h3>
<p>Si necesitás agregar nuevas dependencias de Python a tu aplicación, seguí estos pasos:</p>
<ol>
<li>Agregás la dependencia a requirements.txt en la carpeta backend/.</li>
<li>Reconstruís la imagen del backend:
    <code>docker-compose build backend</code>
</li>
<li>Reiniciás los contenedores:
    <code>docker-compose up</code>
</li>
</ol>
