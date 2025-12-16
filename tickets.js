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

    for(let i = 1; i <= seatsCount; i++)
    {
        const seat = document.createElement("label");
        seat.className = "seat";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const number = document.createElement("span");
        number.textContent = i;

        seat.style.gridRow = i%2 === 1 ? "1" : "2";

        if(bookedSeats.includes(i))
        {
            checkbox.checked = true;
            checkbox.disabled = true;
            seat.classList.add("booked");
        }
        else
        {
            checkbox.onchange = () => {
                if(checkbox.checked)
                {
                    selectedSeats.push(i);
                }
                else
                {
                    selectedSeats = selectedSeats.filter(s => s !== i);
                }
                total.textContent = selectedSeats.length * price;
            };
        }

        seat.appendChild(checkbox);
        seat.appendChild(number);
        seats.appendChild(seat);
    }
});

book.addEventListener("click", () => {
    const direction = document.getElementById("direction").value;
    const date = document.getElementById("date").value;
    document.getElementById("my").classList.remove("hidden");
    document.getElementById("ticketsTable").classList.remove("hidden");

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