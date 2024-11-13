# Usar la imagen base de Python 3.10
FROM python:3.10-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar las dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev build-essential pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Copiar el archivo de requerimientos
COPY requirements.txt .

# Instalar las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación
COPY . .

# Exponer el puerto en el que corre Flask
EXPOSE 5000

# Establecer la variable de entorno para Flask
ENV FLASK_APP=app.py

# Comando para ejecutar la aplicación
CMD ["flask", "run", "--host=0.0.0.0"]
