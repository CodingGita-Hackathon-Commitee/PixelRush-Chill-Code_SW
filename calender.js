const eventSchedule = {
  "2026-10-06": [
    { category: "Culture", title: "Diwali Night: Festival of Lights", time: "6:00 PM", end: "10:00 PM", location: "Main Quadrangle" },
    { category: "Culture", title: "Poetry Slam & Open Mic Night", time: "7:30 PM", end: "10:30 PM", location: "The Loft, Arts Building" },
    { category: "Technical", title: "Web3 & Blockchain Workshop", time: "1:00 PM", end: "4:00 PM", location: "Lab 204, CS Building" }
  ],
  "2026-10-07": [
    { category: "Sports", title: "Inter-University Basketball Finals", time: "4:00 PM", end: "7:00 PM", location: "Sports Arena" },
    { category: "Professional", title: "Resume Review Workshop", time: "3:00 PM", end: "5:00 PM", location: "Online (Zoom)" }
  ],
  "2026-10-08": [
    { category: "Technical", title: "AI & Robotics Hackathon 2026", time: "9:00 AM", end: "6:00 PM", location: "Innovation Lab, Block C" },
    { category: "Professional", title: "Engineering Careers Q&A", time: "2:00 PM", end: "3:00 PM", location: "Innovation Lab, Block C" }
  ],
  "2026-10-09": [
    { category: "Social", title: "Mindfulness & Yoga Retreat", time: "7:30 AM", end: "10:00 AM", location: "Lakeside Pavilion", joined: true }
  ],
  "2026-10-10": [
    { category: "Technical", title: "Startup Pitch Competition", time: "2:00 PM", end: "5:30 PM", location: "Auditorium A, Business Block" }
  ],
  "2026-10-11": [
    { category: "Professional", title: "Career Fair: Tech & Finance Expo", time: "10:00 AM", end: "4:00 PM", location: "Grand Hall, Student Center" },
    { category: "Culture", title: "Navratri Garba Night", time: "7:00 PM", end: "11:30 PM", location: "Main Quadrangle" }
  ],
  "2026-10-12": [
    { category: "Social", title: "Film Society: Outdoor Cinema Night", time: "8:00 PM", end: "11:00 PM", location: "Library Lawn" }
  ],
  "2026-10-13": [
    { category: "Sports", title: "5K Charity Run for Education", time: "8:00 AM", end: "11:00 AM", location: "Campus Ring Road" }
  ],
  "2026-10-14": [
    { category: "Professional", title: "Alumni Networking Mixer", time: "6:30 PM", end: "9:00 PM", location: "Skyline Lounge, Tower Building" }
  ],
  "2026-10-15": [
    { category: "Professional", title: "Creative Coding Workshop", time: "2:00 PM", end: "4:00 PM", location: "Computer Lab 2" }
  ]
};

const colors = { Culture: "culture", Technical: "technical", Sports: "sports", Professional: "professional", Social: "social" };
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const shownMonth = new Date(2026, 9, 1);
const appToday = new Date(2026, 9, 6);
let selectedDate = null;
let focusedDate = "2026-10-07";
let calendarView = "month";

const monthLabel = document.getElementById("monthLabel");
const daysContainer = document.getElementById("calendarDays");
const agendaPanel = document.getElementById("agendaPanel");

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function displayDate(date, options = { weekday: "long", month: "long", day: "numeric", year: "numeric" }) {
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

function dateCell(date, isOutside = false) {
  const key = dateKey(date);
  const events = eventSchedule[key] || [];
  const categories = [...new Set(events.map(event => event.category))];
  const selectedClass = key === (selectedDate ? dateKey(selectedDate) : "") ? " selected-date" : "";
  const focusClass = !selectedDate && key === focusedDate ? " focus-date" : "";
  const outsideClass = isOutside ? " outside-month" : "";
  const joined = events.some(event => event.joined);
  const eventDots = categories.slice(0, 4).map(category => `<i class="date-dot ${colors[category]}-dot" title="${category}"></i>`).join("");
  return `<button type="button" class="day-cell${selectedClass}${focusClass}${outsideClass}${events.length > 2 ? " busy-day" : ""}" data-date="${key}" aria-label="${displayDate(date)}${events.length ? `, ${events.length} events` : ""}">
    <span class="day-number">${calendarView === "week" ? `${weekDays[date.getDay()]} ${date.getDate()}` : date.getDate()}</span>
    <span class="day-markers">${eventDots}${joined ? `<i class="joined-mark day-joined">✓</i>` : ""}</span>
    ${calendarView === "week" ? `<span class="week-event-titles">${events.map(event => `<small>${event.time} · ${event.title}</small>`).join("")}</span>` : ""}
  </button>`;
}

function renderCalendar() {
  monthLabel.textContent = displayDate(shownMonth, { month: "long", year: "numeric" });
  if (calendarView === "month") {
    const first = new Date(shownMonth.getFullYear(), shownMonth.getMonth(), 1);
    const offset = first.getDay();
    const numberOfDays = new Date(shownMonth.getFullYear(), shownMonth.getMonth() + 1, 0).getDate();
    const totalCells = Math.ceil((offset + numberOfDays) / 7) * 7;
    const start = new Date(shownMonth.getFullYear(), shownMonth.getMonth(), 1 - offset);
    daysContainer.classList.remove("week-grid");
    daysContainer.innerHTML = Array.from({ length: totalCells }, (_, index) => {
      const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
      return dateCell(date, date.getMonth() !== shownMonth.getMonth());
    }).join("");
  } else {
    const anchor = selectedDate || appToday;
    const start = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate() - anchor.getDay());
    daysContainer.classList.add("week-grid");
    daysContainer.innerHTML = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
      return dateCell(date, date.getMonth() !== shownMonth.getMonth());
    }).join("");
  }
  daysContainer.querySelectorAll(".day-cell").forEach(cell => {
    cell.addEventListener("click", () => {
      selectedDate = new Date(`${cell.dataset.date}T12:00:00`);
      focusedDate = cell.dataset.date;
      shownMonth.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      renderCalendar();
      renderAgenda();
    });
  });
}

function renderAgenda() {
  if (!selectedDate) {
    agendaPanel.innerHTML = `<div class="pick-date"><span class="pick-icon">▦</span><h3>Pick a date</h3><p>Select any day to see all events scheduled then. Dots show categories, a red dot means a busy day.</p></div>`;
    return;
  }
  const key = dateKey(selectedDate);
  const events = eventSchedule[key] || [];
  const cards = events.length ? events.map(event => {
    const categoryClass = colors[event.category];
    return `<article class="agenda-event ${categoryClass}-event">
      <div class="agenda-time"><strong>${event.time.replace(/ (AM|PM)/, "")}</strong><span>${event.time.match(/AM|PM/)?.[0] || ""}</span></div>
      <div class="agenda-event-details"><span class="event-pill ${categoryClass}-pill"><i class="legend-dot ${categoryClass}-dot"></i>${event.category}</span><h4>${event.title}</h4><p>◷ &nbsp;${event.time} – ${event.end}</p><p>♧ &nbsp;${event.location}</p></div>
    </article>`;
  }).join("") : `<div class="no-events"><span class="no-event-icon">▦</span><p>No events on this date</p><small>Check other days or browse Discover</small></div>`;
  agendaPanel.innerHTML = `<div class="agenda-heading"><div><strong>Selected Date</strong><h3>${displayDate(selectedDate)}</h3></div><button type="button" class="clear-date" aria-label="Clear selected date">×</button></div><div class="agenda-list">${cards}</div>`;
  agendaPanel.querySelector(".clear-date").addEventListener("click", () => {
    selectedDate = null;
    renderCalendar();
    renderAgenda();
  });
}

document.querySelectorAll(".month-arrow").forEach(button => {
  button.addEventListener("click", () => {
    shownMonth.setMonth(shownMonth.getMonth() + Number(button.dataset.step), 1);
    renderCalendar();
  });
});

document.querySelectorAll(".view-button").forEach(button => {
  button.addEventListener("click", () => {
    calendarView = button.dataset.view;
    document.querySelectorAll(".view-button").forEach(viewButton => viewButton.classList.toggle("active", viewButton === button));
    renderCalendar();
  });
});

document.querySelector(".today-button").addEventListener("click", () => {
  shownMonth.setFullYear(appToday.getFullYear(), appToday.getMonth(), 1);
  selectedDate = new Date(appToday);
  focusedDate = dateKey(appToday);
  renderCalendar();
  renderAgenda();
});

renderCalendar();
renderAgenda();