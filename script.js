// Initial Data Stores
let students = [
    { id: "S101", name: "Alex Johnson", room: "101", phone: "+1 555-0192", feePaid: true },
    { id: "S102", name: "Sam Wilson", room: "102", phone: "+1 555-0184", feePaid: false }
];

let rooms = [
    { number: "101", capacity: 2, occupied: 1 },
    { number: "102", capacity: 2, occupied: 1 },
    { number: "103", capacity: 3, occupied: 0 }
];

let complaints = [
    { id: "C01", room: "102", desc: "Plumbing issue in bathroom", status: "Pending" }
];

// Initialize UI
document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    renderAll();
});

function setupNavigation() {
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const targetTab = e.target.getAttribute("data-tab");
            switchTab(targetTab);
        });
    });
}

function switchTab(tabId) {
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
    
    document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");
    document.getElementById(tabId).classList.add("active");
    document.getElementById("page-title").innerText = tabId.charAt(0).toUpperCase() + tabId.slice(1);
}

function renderAll() {
    renderStats();
    renderStudents();
    renderRooms();
    renderFees();
    renderComplaints();
}

function renderStats() {
    document.getElementById("stat-students").innerText = students.length;
    document.getElementById("stat-rooms").innerText = rooms.length;
    const totalCapacity = rooms.reduce((acc, r) => acc + r.capacity, 0);
    const totalOccupied = rooms.reduce((acc, r) => acc + r.occupied, 0);
    const rate = totalCapacity ? Math.round((totalOccupied / totalCapacity) * 100) : 0;
    document.getElementById("stat-occupancy").innerText = `${rate}%`;
    document.getElementById("stat-complaints").innerText = complaints.filter(c => c.status === "Pending").length;
}

function renderStudents() {
    const list = document.getElementById("student-list");
    list.innerHTML = students.map(s => `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.room}</td>
            <td>${s.phone}</td>
            <td><span class="badge ${s.feePaid ? 'badge-paid' : 'badge-pending'}">${s.feePaid ? 'Paid' : 'Pending'}</span></td>
            <td><button class="btn btn-danger btn-sm" onclick="removeStudent('${s.id}')">Remove</button></td>
        </tr>
    `).join("");
}

function renderRooms() {
    const container = document.getElementById("rooms-container");
    container.innerHTML = rooms.map(r => `
        <div class="room-card ${r.occupied >= r.capacity ? 'full' : ''}">
            <h3>Room ${r.number}</h3>
            <p>Occupancy: ${r.occupied} / ${r.capacity}</p>
            <p>Status: <strong>${r.occupied >= r.capacity ? 'Full' : 'Available'}</strong></p>
        </div>
    `).join("");
}

function renderFees() {
    const list = document.getElementById("fee-list");
    list.innerHTML = students.map(s => `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.room}</td>
            <td>$500</td>
            <td><span class="badge ${s.feePaid ? 'badge-paid' : 'badge-pending'}">${s.feePaid ? 'Paid' : 'Unpaid'}</span></td>
            <td>
                ${!s.feePaid ? `<button class="btn btn-primary btn-sm" onclick="toggleFee('${s.id}')">Mark Paid</button>` : 'Completed'}
            </td>
        </tr>
    `).join("");
}

function renderComplaints() {
    const list = document.getElementById("complaint-list");
    list.innerHTML = complaints.map(c => `
        <tr>
            <td>${c.id}</td>
            <td>Room ${c.room}</td>
            <td>${c.desc}</td>
            <td><span class="badge ${c.status === 'Resolved' ? 'badge-resolved' : 'badge-pending'}">${c.status}</span></td>
            <td>
                ${c.status === 'Pending' ? `<button class="btn btn-secondary btn-sm" onclick="resolveComplaint('${c.id}')">Resolve</button>` : 'Closed'}
            </td>
        </tr>
    `).join("");
}

function toggleFee(studentId) {
    const student = students.find(s => s.id === studentId);
    if (student) student.feePaid = true;
    renderAll();
}

function resolveComplaint(id) {
    const complaint = complaints.find(c => c.id === id);
    if (complaint) complaint.status = "Resolved";
    renderAll();
}

function removeStudent(id) {
    students = students.filter(s => s.id !== id);
    renderAll();
}
