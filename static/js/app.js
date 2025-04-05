let currentAppointmentId = null;

document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
    
    // Registration handler
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const response = await fetch('/register', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                alert('Registration successful! Please login.');
                e.target.reset();
            } else {
                const error = await response.json();
                alert(error.detail);
            }
        } catch (error) {
            alert('Registration failed');
        }
    });

    // Login handler
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const response = await fetch('/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    username: formData.get('email'),
                    password: formData.get('password'),
                    grant_type: 'password'
                })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('access_token', data.access_token);
                checkAuthStatus();
                await loadAppointments();
            } else {
                alert(data.detail || 'Login failed');
            }
        } catch (error) {
            alert('Login error');
        }
    });

    // Appointment form handler
    document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const url = currentAppointmentId ? `/appointments/${currentAppointmentId}` : '/appointments';
        
        try {
            const response = await fetch(url, {
                method: currentAppointmentId ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: new URLSearchParams(formData)
            });
            
            if (response.ok) {
                await loadAppointments();
                document.getElementById('appointmentForm').style.display = 'none';
                e.target.reset();
                currentAppointmentId = null;
            } else {
                alert('Operation failed');
            }
        } catch (error) {
            alert('Request error');
        }
    });
});

async function checkAuthStatus() {
    const token = localStorage.getItem('access_token');
    if (token) {
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('appointmentSection').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'block';
    }
}

async function loadAppointments() {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
        const response = await fetch('/appointments', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load appointments');
        }
        
        const data = await response.json();
        renderAppointments(data.appointments);
        document.getElementById('upcomingCount').textContent = data.summary.upcoming;
    } catch (error) {
        alert(error.message);
    }
}

function renderAppointments(appointments) {
    const container = document.getElementById('appointmentsList');
    container.innerHTML = '';
    
    appointments.forEach(appt => {
        const apptDate = new Date(appt.date_time).toLocaleString();
        const card = document.createElement('div');
        card.className = 'appointment-card';
        card.innerHTML = `
            <h3>${appt.provider}</h3>
            <p><strong>Date:</strong> ${apptDate}</p>
            <p><strong>Reason:</strong> ${appt.reason}</p>
            <p><strong>Status:</strong> <span class="status-${appt.status.toLowerCase()}">${appt.status}</span></p>
            <div class="actions">
                <button onclick="editAppointment('${appt.id}')">Edit</button>
                <button onclick="deleteAppointment('${appt.id}')">Delete</button>
            </div>
        `;
        container.appendChild(card);
    });
}

async function deleteAppointment(id) {
    if (!confirm('Are you sure you want to delete this appointment?')) return;
    
    try {
        const response = await fetch(`/appointments/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        if (response.ok) {
            await loadAppointments();
        }
    } catch (error) {
        alert('Delete failed');
    }
}

async function editAppointment(id) {
    try {
        const response = await fetch(`/appointments/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load appointment');
        }
        
        const appt = await response.json();
        document.getElementById('provider').value = appt.provider;
        document.getElementById('date_time').value = formatDateTime(appt.date_time);
        document.getElementById('reason').value = appt.reason;
        document.getElementById('status').value = appt.status;
        currentAppointmentId = id;
        document.getElementById('appointmentForm').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}

function formatDateTime(datetimeStr) {
    const dt = new Date(datetimeStr);
    const pad = n => n.toString().padStart(2, '0');
    return `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
}

function showAppointmentForm() {
    document.getElementById('appointmentForm').style.display = 'block';
    document.getElementById('appointmentForm').reset();
    currentAppointmentId = null;
}

function logout() {
    localStorage.removeItem('access_token');
    window.location.reload();
}