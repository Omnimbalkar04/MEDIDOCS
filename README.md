# MEDIDOCS 🏥

### A Full-Stack Healthcare Management Platform

MEDIDOCS is a full-stack healthcare management application designed to simplify interactions between patients, doctors, and administrators. It provides a centralized platform for doctor discovery, appointment scheduling, patient management, and healthcare administration through dedicated role-based dashboards.

Built with **React, Node.js, Express, and MongoDB**, MEDIDOCS focuses on organized healthcare workflows, secure authentication, and an intuitive user experience.

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- User registration and login with JWT authentication.
- Secure password hashing using bcrypt.
- Cookie-based authentication sessions.
- Role-based access control for Patients, Doctors, and Administrators.
- Protected routes and role-specific dashboards.

### 🧑‍⚕️ Patient Portal
- Patient onboarding and profile management.
- Browse approved doctors.
- View detailed doctor profiles and specializations.
- Book appointments with available doctors.
- View and manage booked appointments.
- Track appointment statuses.
- Personalized patient dashboard.

### 🩺 Doctor Portal
- Doctor registration and onboarding.
- Administrator approval workflow.
- Doctor profile management.
- View and manage patient appointments.
- Complete or cancel appointments.
- Dedicated doctor dashboard.
- Access doctor-specific appointment information.

### 🛡️ Admin Portal
- Dedicated administrator dashboard.
- Review pending doctor registrations.
- Approve or reject doctor applications.
- View and manage doctor records.
- View registered patient records.
- Monitor appointments across the platform.
- Filter appointments by status.
- Search patient and doctor information.

### ⚙️ Backend & Infrastructure
- RESTful API architecture.
- MongoDB database with Mongoose models.
- Role-based authorization middleware.
- Centralized API communication using Axios.
- Server-side validation and error handling.
- Cloudinary integration for media handling.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React 19, Vite |
| Routing | React Router |
| Styling | Tailwind CSS, DaisyUI |
| State & Data Fetching | TanStack React Query |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| Icons | Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Middleware | Cookie Parser, CORS |
| Media Storage | Cloudinary |
| Environment | dotenv, Nodemon |

---

## 🏗️ Project Architecture

MEDIDOCS follows a client-server architecture.

```text
                 MEDIDOCS
                     |
          +----------+----------+
          |                     |
       Frontend               Backend
       (React)              (Node.js)
          |                     |
     React Router          Express API
          |                     |
    Role-Based UI         Authentication
          |               Authorization
    React Query                 |
          |                 Controllers
        Axios                   |
          |                  Mongoose
          |                     |
          +---------------------+
                    |
                 MongoDB
```

### Project Structure

```text
MEDIDOCS/
│
├── Backend/
│   ├── src/
│   │   ├── controller/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── router/
│   │   └── server.js
│   │
│   └── package.json
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── package.json
└── README.md
```

---

## 🚀 Getting Started

Follow these instructions to run MEDIDOCS locally.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/) account (if using media uploads)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd MEDIDOCS
```

### 2. Install Dependencies

From the project root:

```bash
npm install
npm install --prefix Backend
npm install --prefix Frontend
```

### 3. Configure Environment Variables

Create a `.env` file inside the `Backend` directory.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

FRONTEND_URL=http://localhost:5173
```

Replace the placeholder values with your actual credentials.

**Important:** Never commit `.env` files, API keys, database credentials, or JWT secrets to version control.

### 4. Start the Backend

Open a terminal:

```bash
cd Backend
npm run dev
```

The backend will run on the configured port.

### 5. Start the Frontend

Open another terminal:

```bash
cd Frontend
npm run dev
```

Open the frontend in your browser:

**http://localhost:5173**

---

## 🧭 Application Routes

### Patient Routes

| Route | Description |
|---|---|
| `/` | Patient Dashboard |
| `/onboardingPatient` | Patient Onboarding |
| `/doctor/approved` | Browse Approved Doctors |
| `/doctor/:id` | Doctor Profile |
| `/appointments` | Patient Appointments |
| `/appointments/:id` | Appointment Details |

### Doctor Routes

| Route | Description |
|---|---|
| `/onboardingDoctor` | Doctor Onboarding |
| `/doctor/pending` | Approval Pending Page |
| `/doctor/dashboard` | Doctor Dashboard |
| `/doctor/my-profile` | Manage Doctor Profile |
| `/appointments/doctor` | Doctor Appointments |

### Admin Routes

| Route | Description |
|---|---|
| `/admin` | Admin Dashboard |
| `/admin/doctors` | Doctor Management |
| `/admin/patients` | Patient Management |
| `/admin/appointments` | Appointment Management |

### Public Routes

| Route | Description |
|---|---|
| `/signup` | User Registration |
| `/login` | User Login |

---

## 🗄️ Database Models

MEDIDOCS uses MongoDB with Mongoose to organize application data.

| Model | Responsibility |
|---|---|
| User | Authentication, identity, and user roles |
| Patient | Patient profile and health information |
| Doctor | Doctor profile, specialization, and approval status |
| Appointment | Patient-doctor appointment scheduling |
| Medical Record | Medical record management |
| Billing | Billing-related information |

---

## 🔄 Core Application Workflows

### Doctor Approval Workflow

```text
Doctor Registration
       |
Doctor Onboarding
       |
Pending Approval
       |
Admin Reviews Application
       |
  +----+----+
  |         |
Approve   Reject
  |         |
Doctor    Application
Dashboard  Rejected
```

### Appointment Booking Workflow

```text
Patient Login
     |
Browse Approved Doctors
     |
View Doctor Profile
     |
Select Date & Time
     |
Book Appointment
     |
Appointment Created
     |
Doctor Manages Appointment
     |
Completed / Cancelled
```

---

## 🔒 Security Considerations

MEDIDOCS incorporates several security-related practices:

- Password hashing with bcryptjs.
- JWT-based authentication.
- HTTP cookie-based session handling.
- Protected backend routes.
- Role-based authorization.
- Environment-based configuration for secrets.
- Restricted doctor access through administrator approval.

For production deployment, additional considerations include HTTPS, secure cookie configuration, request validation, rate limiting, and careful handling of sensitive patient information.

---

## 📌 Available Root Scripts

```bash
npm run build
npm start
```

- `npm run build` — Installs dependencies and builds the frontend.
- `npm start` — Starts the backend application.

Check the root `package.json` for the exact script definitions.

---

## 🛣️ Future Enhancements

Potential improvements for future development:

- Admin analytics dashboard.
- Advanced appointment availability and scheduling.
- Medical record uploads and management.
- Billing and payment integration.
- Email and appointment reminders.
- Improved reporting and statistics.
- Production deployment and monitoring.

---

## 🎯 Project Goals

MEDIDOCS aims to demonstrate practical full-stack development through:

- Building REST APIs with Node.js and Express.
- Designing MongoDB schemas and relationships.
- Implementing authentication and authorization.
- Developing role-based React applications.
- Managing asynchronous server state with React Query.
- Connecting frontend components with backend services.
- Structuring a maintainable full-stack project.

---

## 📄 License

This project is developed for learning and demonstration purposes. Add an appropriate open-source license if you intend to distribute or reuse the project publicly.

---

**MEDIDOCS — Connecting Patients, Doctors & Healthcare Management.** 🏥
