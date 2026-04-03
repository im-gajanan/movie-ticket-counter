const movies = document.querySelectorAll(".movie-card");
const booking = document.querySelector(".booking");
const movieName = document.getElementById("movieName");
const selectedPoster = document.getElementById("selectedPoster");

const seats = document.querySelectorAll(".seat");
const total = document.getElementById("total");
const selectedCount = document.getElementById("selectedCount");

const seatCountDisplay = document.getElementById("seatCount");
const maxSeatsDisplay = document.getElementById("maxSeats");

const minus = document.getElementById("minus");
const plus = document.getElementById("plus");

const modal = document.getElementById("modal");
const summary = document.getElementById("summary");
const confirmBtn = document.getElementById("confirm");

const success = document.getElementById("success");
const successMovie = document.getElementById("successMovie");

const toast = document.getElementById("toast");

let maxSeats = 1;
let selectedSeats = [];
let currentMovie = "";

/* 🎬 MOVIE SELECT */
movies.forEach(movie => {
movie.onclick = () => {
currentMovie = movie.dataset.movie;
movieName.innerText = currentMovie;
selectedPoster.src = movie.querySelector("img").src;

booking.classList.remove("hidden");

movies.forEach(m => m.classList.add("dim"));
movie.classList.remove("dim");
movie.classList.add("active");
};
});

/* 🔢 SEAT COUNT */
plus.onclick = () => {
if (maxSeats < 6) maxSeats++;
updateSeatLimit();
};

minus.onclick = () => {
if (maxSeats > 1) maxSeats--;
updateSeatLimit();
};

function updateSeatLimit() {
seatCountDisplay.innerText = maxSeats;
maxSeatsDisplay.innerText = maxSeats;
}

/* 💺 SEATS */
seats.forEach(seat => {
seat.onclick = () => {

if (seat.classList.contains("booked")) return;

if (seat.classList.contains("selected")) {
seat.classList.remove("selected");
selectedSeats = selectedSeats.filter(s => s !== seat.innerText);
} else {

if (selectedSeats.length >= maxSeats) {
showToast("Seat limit reached");
return;
}

seat.classList.add("selected");
selectedSeats.push(seat.innerText);
}

updateTotal();
};
});

/* 💰 TOTAL */
function updateTotal() {
let price = 0;

selectedSeats.forEach(s => {
if (s.startsWith("A")) price += 300;
else if (s.startsWith("B") || s.startsWith("C")) price += 220;
else price += 150;
});

total.innerText = price;
selectedCount.innerText = selectedSeats.length;
}

/* 🪟 CHECKOUT */
document.getElementById("checkout").onclick = () => {
if (selectedSeats.length === 0) {
showToast("Select seats first");
return;
}

summary.innerText = `${currentMovie}
Seats: ${selectedSeats.join(", ")}
Total ₹${total.innerText}`;

modal.style.display = "flex";
};

/* ✅ CONFIRM */
confirmBtn.onclick = () => {
modal.style.display = "none";

document.querySelectorAll(".seat.selected").forEach(seat => {
seat.classList.remove("selected");
seat.classList.add("booked");
});

selectedSeats = [];
updateTotal();

success.style.display = "flex";
successMovie.innerText = currentMovie;

setTimeout(() => {
success.style.display = "none";
}, 2000);
};

/* ✨ TOAST */
function showToast(msg) {
toast.innerText = msg;
toast.classList.add("show");
setTimeout(() => toast.classList.remove("show"), 2000);
}