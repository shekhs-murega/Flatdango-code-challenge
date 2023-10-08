document.addEventListener('DOMContentLoaded', () => {
    const filmsList = document.getElementById('films');
    const movieDetails = document.getElementById('movie-details');
    const buyTicketButton = document.getElementById('buy-ticket');

    // Function to fetch movie data from the server
    function fetchMovies() {
        fetch('http://localhost:3000/films') // Replace with your server URL
            .then(response => response.json())
            .then(movies => {
                // Populate the movie list
                movies.forEach(movie => {
                    const movieItem = document.createElement('li');
                    movieItem.textContent = movie.title;
                    movieItem.classList.add('film', 'item');
                    movieItem.setAttribute('data-movie-id', movie.id);
                    filmsList.appendChild(movieItem);

                    // Add click event to movie items
                    movieItem.addEventListener('click', () => {
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
            <h2 class="title">${movie.title}</h2>
            <p id="runtime">Runtime: ${movie.runtime} minutes</p>
            <p class="content">${movie.description}</p>
            <p>Showtime: ${movie.showtime}</p>
            <p id="ticket-num">Tickets Available: ${movie.capacity - movie.tickets_sold}</p>
        `;

        // Update Buy Ticket button click event
        buyTicketButton.disabled = movie.capacity - movie.tickets_sold <= 0;
        buyTicketButton.textContent = buyTicketButton.disabled ? 'Sold Out' : 'Buy Ticket';

        // Add click event to Buy Ticket button
        buyTicketButton.addEventListener('click', () => {
            buyTicket(movie);
        });
    }

    // Function to buy a ticket
    function buyTicket(movie) {
        if (movie.capacity - movie.tickets_sold <= 0) {
         return  window.alert("You have successfully purchased a ticket!");
            
        }

        // Simulate buying a ticket (update tickets_sold)
        movie.tickets_sold++;
        const remainingTickets = movie.capacity - movie.tickets_sold;

        // Update the displayed ticket count
        document.getElementById('ticket-num').textContent = `Tickets Available: ${remainingTickets}`;

        // Update Buy Ticket button state
        buyTicketButton.disabled = remainingTickets <= 0;
        buyTicketButton.textContent = buyTicketButton.disabled ? 'Sold Out' : 'Buy Ticket';
    }

    // Fetch movies and initialize the page
    fetchMovies();
});
