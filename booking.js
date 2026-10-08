const params = new URLSearchParams(window.location.search);
const barberId = params.get("id");

const shop = typeof barbers !== "undefined"
    ? barbers.find(b => String(b.id) === barberId)
    : null;

let selectedService = null;
let selectedEmployee = null;
let selectedDate = null;
let selectedTime = null;

const serviceOptions = document.getElementById("serviceOptions");
const employeeOptions = document.getElementById("employeeOptions");
const dateOptions = document.getElementById("dateOptions");
const timeOptions = document.getElementById("timeOptions");

if (shop) {
    document.getElementById("bookingShopName").textContent = shop.name;
} else {
    document.getElementById("bookingShopName").textContent =
        "Demo randevu ekranı";
}

// Örnek hizmetler
const services = [
    { name: "Saç Kesimi", price: 350 },
    { name: "Sakal Tıraşı", price: 200 },
    { name: "Saç + Sakal", price: 500 }
];

// Seçilen dükkânın çalışanlarını getir
const employees = shop?.employees?.length
    ? shop.employees
    : [
        { name: "Mert Şahin" },
        { name: "Can Arslan" }
    ];

function renderServices() {
    serviceOptions.innerHTML = "";

    services.forEach(service => {
        const button = document.createElement("button");
        button.className = "booking-option";

        button.innerHTML = `
            <strong>${service.name}</strong>
            <span>${service.price} TL</span>
        `;

        button.onclick = () => {
            selectedService = service;
            renderServices();
            updateSummary();
        };

        if (selectedService === service) {
            button.classList.add("selected");
        }

        serviceOptions.appendChild(button);
    });
}

function renderEmployees() {
    employeeOptions.innerHTML = "";

    employees.forEach(employee => {
        const button = document.createElement("button");
        button.className = "booking-option";

        button.innerHTML = `
            <strong>${employee.name}</strong>
            <span>Berberi seç</span>
        `;

        button.onclick = () => {
            selectedEmployee = employee;
            selectedTime = null;
            renderEmployees();
            renderTimes();
            updateSummary();
        };

        if (selectedEmployee === employee) {
            button.classList.add("selected");
        }

        employeeOptions.appendChild(button);
    });
}

function renderDates() {
    dateOptions.innerHTML = "";

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setHours(12, 0, 0, 0);
        date.setDate(date.getDate() + i);

        const dateKey = [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0")
        ].join("-");

        const button = document.createElement("button");
        button.className = "booking-option";

        button.innerHTML = `
            <strong>${date.toLocaleDateString("tr-TR", {
                weekday: "long"
            })}</strong>
            <span>${date.toLocaleDateString("tr-TR")}</span>
        `;

        button.onclick = () => {
            selectedDate = dateKey;
            selectedTime = null;
            renderDates();
            renderTimes();
            updateSummary();
        };

        if (selectedDate === dateKey) {
            button.classList.add("selected");
        }

        dateOptions.appendChild(button);
    }
}

function renderTimes() {
    timeOptions.innerHTML = "";

    const times = [
        "09:00", "09:30", "10:00", "10:30",
        "11:00", "11:30", "12:00", "12:30",
        "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00", "16:30",
        "17:00", "17:30", "18:00"
    ];

    times.forEach(time => {
        const button = document.createElement("button");
        button.className = "booking-option";

        button.innerHTML = `<strong>${time}</strong>`;

        button.onclick = () => {
            selectedTime = time;
            renderTimes();
            updateSummary();
        };

        if (selectedTime === time) {
            button.classList.add("selected");
        }

        timeOptions.appendChild(button);
    });
}

function updateSummary() {
    const summary = document.getElementById("bookingSummary");
    const confirmButton = document.getElementById("confirmBooking");

    summary.innerHTML = `
        <p>Hizmet: ${selectedService?.name || "Seçilmedi"}</p>
        <p>Çalışan: ${selectedEmployee?.name || "Seçilmedi"}</p>
        <p>Tarih: ${selectedDate || "Seçilmedi"}</p>
        <p>Saat: ${selectedTime || "Seçilmedi"}</p>
        <p>Toplam: ${selectedService?.price || 0} TL</p>
    `;

    confirmButton.disabled = !(
        selectedService &&
        selectedEmployee &&
        selectedDate &&
        selectedTime
    );
}

document.getElementById("confirmBooking").onclick = () => {
    alert("Demo randevu seçiminiz tamamlandı!");
};

renderServices();
renderEmployees();
renderDates();
renderTimes();
updateSummary();