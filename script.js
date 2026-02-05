const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const eventsLayer = document.getElementById("eventsLayer");

let currentDate = new Date(2022, 8, 1); 

function renderCalendar(date) {
    calendarDays.innerHTML = "";
    eventsLayer.innerHTML = "";

    const year = date.getFullYear();
    const month = date.getMonth();

    
    monthYear.textContent = date.toLocaleString("default", {
        month: "long",
        year: "numeric"
    });

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
        const day = document.createElement("div");
        day.className = "calendar-day other-month";
        day.innerHTML = `<div class="day-number">${prevMonthDays - i}</div>`;
        calendarDays.appendChild(day);
    }

    
    for (let d = 1; d <= daysInMonth; d++) {
        const day = document.createElement("div");
        day.className = "calendar-day";
        day.innerHTML = `<div class="day-number">${d}</div>`;
        calendarDays.appendChild(day);
    }

    
    const totalCells = firstDayIndex + daysInMonth;
    const nextDays = 35 - totalCells; 

    for (let i = 1; i <= nextDays; i++) {
        const day = document.createElement("div");
        day.className = "calendar-day other-month";
        day.innerHTML = `<div class="day-number">${i}</div>`;
        calendarDays.appendChild(day);
    }

    
    if (year === 2022 && month === 8) {
        addEvents();
    }
}

function addEvents() { 
    const firstDayIndex = new Date(2022, 8, 1).getDay();

    const events = [
        { date: -2, span: 1, text: "👥 Team meeting 10:00 AM", class: "pink" },
        { date: 1, span: 1, text: "📞 Client call 2:00 PM", class: "blue" },
        { date: 2, span: 1, text: "💻 Demo presentations", class: "teal" },
        { date: 6, span: 1, text: "✉ Follow up emails", class: "green" },
        { date: 9, span: 1, text: "📊 Sales review 3:00 PM", class: "orange" },
        { date: 13, span: 3, text: "✈ Trade show All day", class: "blue" },
        { date: 20, span: 2, text: "📑 Quarterly planning 11:00AM", class: "purple" },
        { date: 23, span: 4, text: "🚀 Product launch 4:00PM", class: "pink" },
        { date: 28, span: 3, text: "👤 Contract signing 5:00 PM", class: "darkgreen" }
    ];

    events.forEach(ev => {
        const startIndex = firstDayIndex + ev.date - 1;
        const col = (startIndex % 7) + 1;
        const row = Math.floor(startIndex / 7) + 1;

        const event = document.createElement("div");
        event.className = `event ${ev.class}`;
        event.style.gridColumn = `${col} / span ${ev.span}`;
        event.style.gridRow = row;
        event.textContent = ev.text;

        eventsLayer.appendChild(event);
    });
}


document.getElementById("prevMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

document.getElementById("nextMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});


renderCalendar(currentDate);
