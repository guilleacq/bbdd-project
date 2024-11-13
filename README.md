
<h1>Instrucciones para Ejecutar el Proyecto</h1>

<h2>Requisitos Previos</h2>
<p>Antes de empezar, asegurate de tener instaladas estas herramientas:</p>
<ul>
<li>Docker</li>
<li>Docker Compose</li>
</ul>

<p><strong>Nota:</strong> Asegurate de que los puertos 80, 5000 y 3306 estén libres en tu máquina local, porque van a ser utilizados por la aplicación.</p>

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
<p>NOTA: Este proceso puede tomar unos minutos la primera vez, ya que Docker va a descargar las imágenes base y construir las imágenes de tu aplicación.</p>

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
<p>Acá vas a poder interactuar con la interfaz de usuario de la aplicación.</p>

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
</li>
</ul>
