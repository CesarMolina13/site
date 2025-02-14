document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.username === username && user.password === password);
            
            if (user) {
                alert('Inicio de sesión exitoso');
                window.location.href = 'index.html';
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        });
    }

    // Formulario de Registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const fullName = document.getElementById('full-name').value;
            const age = document.getElementById('age').value;
            const email = document.getElementById('email').value;
            const idDocument = document.getElementById('id-document').value;
            const password = document.getElementById('register-password').value;
            
            let users = JSON.parse(localStorage.getItem('users')) || [];
            const newUser = {
                fullName,
                age,
                email,
                idDocument,
                username: email,
                password
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registro exitoso');
            window.location.href = 'index.html';
        });
    }
});