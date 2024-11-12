# Usar la imagen base de Python 3.10
FROM python:3.10-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo de requerimientos
COPY requirements.txt .

# Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación
COPY . .

# Exponer el puerto en el que corre Flask (por defecto 5000)
EXPOSE 5000

# Establecer la variable de entorno para Flask
ENV FLASK_APP=app.py

# Comando para ejecutar la aplicación
CMD ["flask", "run", "--host=0.0.0.0"]
