document.addEventListener('DOMContentLoaded', () => {
    const filmsList = document.getElementById('dividedlist');
    const movieDetails = document.getElementById('buymovie');
// Function to fetch movie data from the server
    function fetchMovies() {
        fetch('http://localhost:3000/films')
            .then(response => response.json())
            .then(movies => {
                movies.forEach(movie => {
                    const movieItem = document.createElement('li');
                    movieItem.textContent = movie.title;
                    movieItem.classList.add('film', 'item');
                    movieItem.setAttribute('data-movie-id', movie.id);
                    filmsList.appendChild(movieItem);

                    movieItem.addEventListener('click', (e) => {
                        e.preventDefault()
                        displayMovieDetails(movie);
                    });
                });

// Display details of the first movie initially
                if (movies.length > 0) {
                    displayMovieDetails(movies[0]);
                }
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }

// Function to display movie details
    function displayMovieDetails(movie) {
        movieDetails.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="img-fluid">
            <h2 id="title">Title: ${movie.title}</h2>
            <p id="description">Description: ${movie.description}</p>
            <p id="runtime">Runtime: ${movie.runtime} minutes</p>
            <p id="showtime">Showtime: ${movie.showtime}</p>
            <p id="tickets-available">Tickets Available: ${movie.capacity - movie.tickets_sold}</p>
        `;

// Create a "Buy Ticket" button
        const buyTicketButton = document.createElement('button');
        buyTicketButton.id = 'buyticket';
        buyTicketButton.textContent = 'PURCHASE TICKET';
        movieDetails.appendChild(buyTicketButton);
// Calculate available tickets by subtracting tickets_sold from capacity
        let availableTickets = movie.capacity - movie.tickets_sold;
        const ticketsAvailable = document.getElementById('tickets-available');
        ticketsAvailable.textContent = "Tickets Available: " + availableTickets;
// Add a click event listener to the "Buy Ticket" button
        buyTicketButton.addEventListener("click", (e) => {
            e.preventDefault();
// Check if there are available tickets
            if (availableTickets > 0) {
// Decrement tickets_sold count
                movie.tickets_sold++;
// Update available tickets
                availableTickets--;
// Update the frontend to reflect the changes
                ticketsAvailable.textContent = "Tickets Available: " + availableTickets;
// Check if all tickets are sold out
                if (availableTickets === 0) {
// Disable the "Buy Ticket" button
                    buyTicketButton.disabled = true;
                    buyTicketButton.textContent = "Sold Out";
                }
// Show a success alert message
        window.alert("You have successfully purchased a ticket!");
            } else {
// No available tickets
                buyTicketButton.disabled = true;
                buyTicketButton.textContent = "Sold Out";
            }
        });
    }

// Fetch movies and initialize the page
    fetchMovies();
});
