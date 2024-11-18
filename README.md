# Sticky Notes App 📝

A powerful and intuitive **Sticky Notes Web App** that helps you stay organized! This app allows you to create, edit, drag, and drop sticky notes, schedule events, and manage tasks. It's designed for ease of use and efficiency, with a sleek, modern UI.

## 🌟 Features

- **User Authentication**: Secure login and signup system.
- **Sticky Notes**: Create, edit, and delete notes. Drag and drop them anywhere on the screen.
- **Dynamic Note Resizing**: Notes dynamically grow or shrink based on content.
- **Event Scheduling**:
  - Add, view, and delete events.
  - View "Today" and "Tomorrow" tags for events happening soon.
  - Notifications/reminders for upcoming events.
- **Responsive Design**: Optimized for different screen sizes.
- **Persistent Data**: Notes and events are saved securely in a PostgreSQL database.

---

## 🚀 Live Demo

Check out the live version here: **[Sticky Notes App](https://sticky-notes-2-ten.vercel.app)**.

---

## 🛠️ Tech Stack

### Frontend:
- **React** with Context API for state management.
- **Axios** for API requests.
- **Vercel** for deployment.

### Backend:
- **Node.js** with Express.
- **CORS** for secure cross-origin requests.
- **Render** for hosting the backend.

### Database:
- **PostgreSQL** (hosted on **Supabase**).

---

## 🔧 Installation & Setup

Follow these steps to download, set up, and run the Sticky Notes App locally.

### Prerequisites

- **Node.js** installed.
- **PostgreSQL** database set up.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/sticky-notes-2.git
cd sticky-notes-2
```
### 2️⃣ Backend Setup

Navigate to the server directory:


```
cd server
```
Install dependencies:


npm install
Create a .env file in the server directory and add the following variables:
```
PORT=5000
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_secret_key
Start the backend server:
```
```
npm start
```
###3️⃣ Frontend Setup
Navigate to the client directory:

```
cd ../client
```
Install dependencies:
```
npm install
```
Create a .env file in the client directory and add:

```
REACT_APP_SERVER_URL=http://localhost:5000
```
Start the React app:

```
npm start
```

### 4️⃣ Open in Browser
Frontend: Visit http://localhost:3000
Backend: Visit http://localhost:5000/api to check the API.

### 🌍 Deployment
Backend:
Push your backend code to GitHub.
Connect your GitHub repo to Render.
Set environment variables (same as your .env file).
Frontend:
Push your frontend code to GitHub.
Deploy the frontend using Vercel.
Update the REACT_APP_SERVER_URL to your Render backend URL.


📧 Contact
If you have any questions or feedback, feel free to reach out!

Email: hashirahsan9@gmail.com










