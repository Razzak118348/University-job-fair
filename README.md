# 🚀 Job Portal - Applied Jobs System

This is a **MERN Stack Job Portal Application** where users can browse jobs, apply for jobs, and view their applied jobs in a personal dashboard.
It includes authentication, job posting, job application tracking, and viewing applied job details.

---
## Live link : https://solojobportal.web.app/
## ✨ Features

- 🔐 **Authentication System** – Secure login & signup using Firebase/Auth system.
- 📝 **Job Postings** – Employers can post job details.
- 📩 **Job Applications** – Users can apply to jobs.
- 👤 **My Bids / Applications** – Users can view all jobs they applied for.
- 📄 **Job Details Page** – Each job has a separate detail page.
- 📂 **Resume Link Support** – Applicants can upload & share their resume.
- 📊 **Responsive UI** – Clean and responsive design with TailwindCSS.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router
- Axios
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose / Native driver)

---

## 📂 Project Structure

```
job-portal/
│── backend/ # Express.js backend
│ ├── index.js # Main server file
│ ├── routes/ # Routes for jobs & applications
│ └── models/ # MongoDB models
│
│── frontend/ # React.js frontend
│ ├── src/
│ │ ├── Components
│ │ ├── firebase
│ │ ├── Layout
│ │ ├── Provider
│ │ ├── Router
│ │ ├── Pages/
│ │ │ ├── AllJob
│ │ │ └── ApplicationProfile
│ │ │ └── Admin
│ │ │ └── ApplyJob
│ │ │ └── ClientPage
│ │ │ └── Error
│ │ │ └── Home
│ │ │ └── Profile
│ │ │ └── Registration
│ │ │ └── Login
│ │ ├── Hook/UseAuth.js # Custom hook for auth
│ │ └── App.jsx # Router setup
│
└── README.md

```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/job-portal.git
cd job-portal

2️⃣ Backend Setup
cd backend
npm install
Create .env file inside backend/:
PORT=3000
MONGO_URI=your_mongodb_connection_string
Run server:nodemon run dev
npm start

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
Frontend will start at:
👉 http://localhost:5173

Backend runs at:
👉 http://localhost:3000

🔗 API Endpoints

GET /jobs → Get all jobs

GET /jobs/:id → Get job details by ID

POST /jobs → Post a new job

Applications
POST /jobApplications → Apply for a job

GET /jobApplications/:email → Get all applications by user email

GET /jobApplications/id/:id → Get application details by ID

