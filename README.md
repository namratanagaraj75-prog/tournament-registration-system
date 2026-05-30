# 🏆 Tournament Registration System

A full-stack MERN application designed to simplify tournament management for sports venues, colleges, gaming events, and local competitions.

The system allows organizers to create tournaments, register teams, manage entry fees, generate match fixtures, track winners, maintain leaderboards, and monitor tournament performance through an analytics dashboard.

---

## 🚀 Live Features
⚠️ Backend is hosted on Render free tier. First request may take 30–60 seconds to wake up the server.
### Tournament Management

* Create tournaments with entry fee and schedule
* View all active tournaments
* Track tournament status

### Team Registration

* Register teams for tournaments
* Store captain details and contact information
* Edit team information
* Delete registrations before fixtures are generated

### Payment Management

* Track entry fee payments
* Mark teams as paid
* Revenue calculation dashboard

### Fixture Generation

* Automatically generate match fixtures
* Schedule tournament matches
* Prevent duplicate fixture generation

### Match Management

* Select match winners
* Update fixture results
* Track tournament progress

### Leaderboard System

* Automatic points calculation
* Wins, losses, and matches played tracking
* Dynamic ranking system
* Top performers leaderboard

### Analytics Dashboard

* Total teams registered
* Total tournaments
* Paid teams count
* Revenue generated
* Visual analytics charts

### Export Features

* Export registration data to Excel
* Export tournament reports to PDF

### User Experience

* Modern dark-themed UI
* Responsive design
* Real-time toast notifications
* Clean dashboard interface

---

## 📸 Screenshots

### Dashboard
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7bab4626-9440-45a3-b65d-5e74bf52eba7" />

### Tournament Creation

<img width="1618" height="317" alt="image" src="https://github.com/user-attachments/assets/dae58222-2ff1-4edd-afd0-78e523aca6e4" />


### Team Registration
<img width="1900" height="320" alt="image" src="https://github.com/user-attachments/assets/2855590a-da74-479b-9e43-3b0facd244b0" />

### Fixtures Management

<img width="1608" height="369" alt="image" src="https://github.com/user-attachments/assets/71dc64f6-e4d1-4e20-ae19-895f9f59af38" />


### Leaderboard

<img width="1832" height="402" alt="image" src="https://github.com/user-attachments/assets/fe14941f-2391-4e93-84ed-596fe37d90f5" />


## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Axios
* Recharts
* Lucide React
* React Hot Toast
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Version Control

* Git
* GitHub

---

## 📂 Project Structure

```text
Tournament Registration System
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── assets
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── public
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/namratanagaraj75-prog/tournament-registration-system.git
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGO_URI=mongodb://tournamentadmin:Tournament12345@ac-rtywwsr-shard-00-00.wydwovm.mongodb.net:27017,ac-rtywwsr-shard-00-01.wydwovm.mongodb.net:27017,ac-rtywwsr-shard-00-02.wydwovm.mongodb.net:27017/?ssl=true&replicaSet=atlas-3nm0t2-shard-0&authSource=admin&appName=Cluster0
PORT=5000
```

---

## 📊 Key Functionalities

| Feature             | Status |
| ------------------- | ------ |
| Team Registration   | ✅      |
| Tournament Creation | ✅      |
| Payment Tracking    | ✅      |
| Match Fixtures      | ✅      |
| Winner Selection    | ✅      |
| Leaderboard         | ✅      |
| Analytics Dashboard | ✅      |
| Excel Export        | ✅      |
| PDF Export          | ✅      |
| Responsive UI       | ✅      |

---

## 🎯 Real-World Use Cases

* Sports Tournament Management
* College Sports Events
* Cricket Tournaments
* Football Competitions
* Esports Events
* Weekend Community Leagues

---

## 🔮 Future Enhancements

* User Authentication
* Admin Dashboard
* Online Payment Gateway
* Email Notifications
* Multi-Tournament Support
* Team Logos & Profiles
* Advanced Analytics
* Cloud Deployment

---

## 👩‍💻 Author

**Namrata Nagaraj**

Aspiring Software Engineer & Data Scientist

GitHub:
https://github.com/namratanagaraj75-prog

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.
