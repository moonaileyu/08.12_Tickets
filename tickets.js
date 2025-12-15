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

function selectSeat(number, seat)
{
    if(selectedSeats.includes(number))
    {
        selectedSeats = selectedSeats.filter(s => s !== number);
        seat.classList.remove("selected");
    }
    else
    {
        selectedSeats.push(number);
        seat.classList.add("selected");
    }

    total.textContent = selectedSeats.length * price;
}

search.addEventListener("click", () => {
    seats.innerHTML = "";
    total.textContent = "0";
    selectedSeats = [];

    bookedSeats = generateSeats(bookedCount, seatsCount);

    train.classList.remove("hidden");

    for(let i = 1; 1 <= seatsCount; i++)
    {
        const seat = document.createElement("div");
        seat.textContent = i;
        seat.className = "seat";

        if(bookedSeats.includes(i))
        {
            seat.classList.add("booked");
        }
        else
        {
            seat.onclick = () => selectedSeats(i, seat);
        }

        seats.appendChild(seat);
    }
});

book.addEventListener("click", () => {
    const direction = document.getElementById("direction").value;
    const date = document.getElementById("date").value;

    selectedSeats.forEach(seat => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${direction}</td>
        <td>${date}</td>
        <td>${seat}</td>
        `;

        tickets.appendChild(row);
    });

    train.classList.add("hidden");
});