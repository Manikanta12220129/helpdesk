const API_URL = "http://localhost:5000";

// Helper to get/set JWT token
function setToken(token) { localStorage.setItem("token", token); }
function getToken() { return localStorage.getItem("token"); }

// Register
if(document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", async e => {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    let data = await res.json();
    if(data.token){ setToken(data.token); window.location = "tickets.html"; }
    else document.getElementById("registerMsg").innerText = data.error || "Error";
  });
}

// Login
if(document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", async e => {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    let data = await res.json();
    if(data.token){ setToken(data.token); window.location = "tickets.html"; }
    else document.getElementById("loginMsg").innerText = data.error || "Error";
  });
}

// Create new ticket
if(document.getElementById("ticketForm")) {
  document.getElementById("ticketForm").addEventListener("submit", async e => {
    e.preventDefault();
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let token = getToken();
    let res = await fetch(`${API_URL}/api/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ title, description })
    });
    let data = await res.json();
    if(data.title){ window.location = "tickets.html"; }
    else document.getElementById("ticketMsg").innerText = data.error || "Error";
  });
}

// Load tickets
if(document.getElementById("ticketsList")) {
  (async () => {
    let token = getToken();
    let res = await fetch(`${API_URL}/api/tickets`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    let tickets = await res.json();
    let html = tickets.map(t =>
      `<div class="ticket-box">
        <div><b>${t.title}</b></div>
        <div>Status: ${t.status}</div>
        <a href="ticket_detail.html?id=${t._id}">View Details</a>
      </div>`
    ).join("");
    document.getElementById("ticketsList").innerHTML = html;
  })();
}

// Load ticket details
if(document.getElementById("ticketDetail")) {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");
  let token = getToken();
  (async () => {
    let res = await fetch(`${API_URL}/api/tickets/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    let t = await res.json();
    let html = `
      <div class="ticket-box">
        <div><b>${t.title}</b></div>
        <div>${t.description}</div>
        <div>Status: ${t.status}</div>
      </div>
    `;
    document.getElementById("ticketDetail").innerHTML = html;
  })();
}
