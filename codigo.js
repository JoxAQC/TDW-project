document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.sign-in form');
    const registerForm = document.querySelector('.sign-up form');

    // Event listener for login form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Retrieve input values
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Call function to check login
        loginUser(email, password);
    });

    // Event listener for register form submission
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Retrieve input values
        const name = registerForm.querySelector('input[placeholder="Nombre"]').value;
        const email = registerForm.querySelector('input[type="email"]').value;
        const password = registerForm.querySelector('input[type="password"]').value;

        // Call function to register user
        registerUser(name, email, password);
    });

    // Function to check login
    function loginUser(email, password) {
        // Assuming `datos` is an array of user objects with `email` and `password` properties
        // Replace this with your actual authentication logic
        
        // Mockup data for demonstration purposes
        const datos = [
            { email: "example@email.com", password: "password123" },
            { email: "test@test.com", password: "test123" }
        ];

        const user = datos.find(user => user.email === email && user.password === password);
        if (user) {
            // Login successful, redirect to home.html
            window.location.href = 'home.html';
        } else {
            // Login failed, show alert
            alert('Inicio de sesión fallido. Verifica tus credenciales.');
        }
    }

    // Function to register user
    function registerUser(name, email, password) {
        // Mockup data for demonstration purposes
        const newUser = { name, email, password };
        const newData = JSON.stringify(newUser);
        
        // Assuming you have a server-side script to handle data addition to datos.json
        // This is just a client-side representation
        // Replace this with your actual server-side code to save data
        fetch('datos.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: newData
        })
        .then(response => {
            if (response.ok) {
                alert('Usuario registrado exitosamente.');
                registerForm.reset(); // Clear form fields after successful registration
            } else {
                alert('Error al registrar usuario. Inténtalo de nuevo.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al registrar usuario. Inténtalo de nuevo.');
        });
    }
});