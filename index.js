document.addEventListener('DOMContentLoaded', () => {
    // Sample movie data (replace with actual data from your API)
    const movieData = {
        title: 'The Giant Gila Monster',
        runtime: '108',
        capacity: 30,
        showtime: '04:00 PM',
        tickets_sold: 27,
        description: 'A giant lizard terrorizes a rural Texas community...',
        poster: 'https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg',
    };

    const filmsList = document.getElementById('films');
    const movieDetails = document.getElementById('movie-details');
    const buyTicketButton = document.getElementById('buy-ticket');

    // Display movie details
    function displayMovieDetails(movie) {
        movieDetails.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="img-fluid">
            <h2 class="title">${movie.title}</h2>
            <p id="runtime">Runtime: ${movie.runtime} minutes</p>
            <p class="content">${movie.description}</p>
            <p>Showtime: ${movie.showtime}</p>
            <p id="ticket-num">Tickets Available: ${movie.capacity - movie.tickets_sold}</p>
        `;
    }

    // Initial display of movie details
    displayMovieDetails(movieData);

    // Buy Ticket button click event
    buyTicketButton.addEventListener('click', () => {
        const remainingTickets = movieData.capacity - movieData.tickets_sold;
        if (remainingTickets > 0) {
            movieData.tickets_sold++;
            document.getElementById('ticket-num').textContent = `Tickets Available: ${remainingTickets - 1}`;
        } else {
            buyTicketButton.textContent = 'Sold Out';
            buyTicketButton.disabled = true;
        }
    });
});
