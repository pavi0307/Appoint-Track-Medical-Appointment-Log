# AppointTrack - Medical Appointment Log


A secure full-stack web application for tracking medical appointments, designed to help users manage their healthcare schedule efficiently.

## Features

### Core Functionality
- **User Authentication**: Secure registration and login system using JWT tokens.
- **Appointment Management**:
  - **Create**: Add new appointments with provider name, date/time, reason, and status.
  - **Read**: View all appointments in a clean, organized interface.
  - **Update**: Modify appointment details or status (Upcoming/Completed/Cancelled).
  - **Delete**: Remove appointments permanently.
- **Advanced Features**:
  - **Filtering**: Filter appointments by status or date range (e.g., "Next 7 days").
  - **Sorting**: Sort appointments chronologically by date.
  - **Summary Dashboard**: View count of upcoming appointments within the next week.

### Technical Highlights
- Responsive UI compatible with mobile devices and desktops
- Secure password hashing using bcrypt
- RESTful API architecture
- SQLite database with SQLAlchemy ORM

## Technologies

**Backend**:
- Python 3.x
- FastAPI
- SQLAlchemy
- JWT Authentication

**Frontend**:
- HTML5/Jinja2 Templates
- CSS3 (Flexbox/Grid)
- Vanilla JavaScript

**Database**:
- SQLite

## Installation

1. **Clone Repository**:
   ```bash
   git clone https://github.com/yourusername/AppointTrack.git
   cd AppointTrack
2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
3. **Run Application**:
   ```bash
   uvicorn main:app --reload
4. **Access Application**:
   - open browser and navigate to:
   ```bash
   http://localhost:8000
## Usage Guide

### Registration
1. Navigate to registration form
2. Provide valid email and password
3. Click "Register"

### Login
1. Use registered credentials
2. Successful login grants access to dashboard

### Managing Appointments
- **Create**: Click "+ New Appointment", fill form, and save
- **Edit**: Click "Edit" on any appointment card
- **Delete**: Click "Delete" on any appointment card
- **Filter/Sort**: Use dropdowns in the control panel

## API Endpoints

| Endpoint            | Method | Description                |
|---------------------|--------|----------------------------|
| `/register`         | POST   | User registration          |
| `/token`            | POST   | Generate access token      |
| `/appointments`     | GET    | List all appointments      |
| `/appointments`     | POST   | Create new appointment     |
| `/appointments/{id}`| PUT    | Update appointment         |
| `/appointments/{id}`| DELETE | Delete appointment         |
## 📬 Contact

For questions, suggestions, or collaborations, feel free to reach out:

- **GitHub**: [@pavi0307](https://github.com/pavi0307)
- **Email**: [gbpavithra34@gmail.com](mailto:gbpavithra34@gmail.com)
