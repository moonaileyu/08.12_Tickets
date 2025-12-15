const search = document.getElementById("searchButton");
const book = document.getElementById("bookButton");
const train = document.getElementById("train");
const seats = document.getElementById("seats");
const total = document.getElementById("total");
const tickets = document.getElementById("ticketsBody");

const price = 60;
const seatsCount = 28;
const bookedCount = 4;

let selectedSeats = [];
let bookedSeats = [];

function generateSeats(count, max)
{
    const result = [];

    while(result.length < count)
    {
        const random = Math.floor(Math.random() * max) + 1;

        if(!result.includes(random))
        {
            result.push(random);
        }
    }
    return result;
}

search.addEventListener("click", () => {
    seats.innerHTML = "";
    total.textContent = "0";
    selectedSeats = [];
    bookedSeats = generateSeats(bookedCount, seatsCount);
});