
        // Simulación de una base de datos de libros
        const books = [
            { id: 1, title: "Cien años de soledad", author: "Gabriel García Márquez", genre: "Realismo mágico", available: true },
            { id: 2, title: "1984", author: "George Orwell", genre: "Ciencia ficción", available: true },
            { id: 3, title: "El señor de los anillos", author: "J.R.R. Tolkien", genre: "Fantasía", available: true },
            { id: 4, title: "Orgullo y prejuicio", author: "Jane Austen", genre: "Romance", available: true }
        ];

        // Simulación de una base de datos de usuarios
        let users = [];
        let currentUser = null;

        function register() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            if (username && password) {
                if (users.some(user => user.username === username)) {
                    alert('El nombre de usuario ya existe. Por favor, elige otro.');
                } else {
                    users.push({ username, password });
                    alert('Registro exitoso. Ahora puedes iniciar sesión.');
                }
            } else {
                alert('Por favor, ingresa un nombre de usuario y contraseña.');
            }
        }

        function login() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                currentUser = user;
                document.getElementById('authSection').classList.add('hidden');
                document.getElementById('userSection').classList.remove('hidden');
                document.getElementById('userWelcome').textContent = username;
            } else {
                alert('Nombre de usuario o contraseña incorrectos.');
            }
        }

        function logout() {
            currentUser = null;
            document.getElementById('authSection').classList.remove('hidden');
            document.getElementById('userSection').classList.add('hidden');
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }

        function searchBooks() {
            const searchInput = document.getElementById('searchInput').value.toLowerCase();
            const searchType = document.getElementById('searchType').value;
            const resultsDiv = document.getElementById('results');

            const filteredBooks = books.filter(book => 
                book[searchType].toLowerCase().includes(searchInput)
            );

            resultsDiv.innerHTML = filteredBooks.map(book => `
                <div class="book">
                    <h3>${book.title}</h3>
                    <p>Autor: ${book.author}</p>
                    <p>Género: ${book.genre}</p>
                    <p>Estado: ${book.available ? 'Disponible' : 'No disponible'}</p>
                    ${book.available ? `<button onclick="reserveBook(${book.id})">Reservar</button>` : ''}
                </div>
            `).join('');
        }

        function reserveBook(bookId) {
            if (currentUser) {
                const book = books.find(b => b.id === bookId);
                if (book && book.available) {
                    book.available = false;
                    alert(`Libro "${book.title}" reservado exitosamente.`);
                    sendNotification(`Has reservado "${book.title}". Por favor, recógelo en los próximos 3 días.`);
                    searchBooks(); // Actualizar la lista de libros
                } else {
                    alert('Lo siento, este libro ya no está disponible.');
                }
            } else {
                alert('Por favor, inicia sesión para reservar un libro.');
            }
        }

        function sendNotification(message) {
            const notificationsDiv = document.getElementById('notifications');
            notificationsDiv.innerHTML += `<p>${message}</p>`;
        }

        // Simulación de recordatorios
        setInterval(() => {
            if (currentUser) {
                sendNotification("Recordatorio: Tienes un libro que vence en 2 días.");
            }
        }, 30000); // Envía un recordatorio cada 30 segundos (en una aplicación real, esto sería mucho menos frecuente)
    