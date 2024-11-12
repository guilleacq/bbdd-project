// login.js

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form-login').addEventListener('submit', function(e) {
        e.preventDefault();
        const correo = document.getElementById('login-correo').value;
        const contraseña = document.getElementById('login-contraseña').value;

        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, contraseña })
        })
        .then(response => response.json())
        .then(data => {
            if (data.exito) {
                // Redirigir a index.html
                window.location.href = 'index.html';
            } else {
                alert(data.error || 'Credenciales inválidas');
            }
        })
        .catch(error => {
            alert('Error al iniciar sesión');
            console.error(error);
        });
    });
});
