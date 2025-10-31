# ⚙️ BOOK_IT Backend

BOOK_IT Backend is a RESTful API built using Node.js, Express.js, and MongoDB. It powers the BOOK_IT platform by handling experience management, and booking operations.

---

## 🌐 Live API

🔗 **Base URL:** [https://book-it-backend-yxk9.onrender.com](https://book-it-backend-yxk9.onrender.com)  
🧠 **Frontend:** [https://book-it-frontend-one.vercel.app](https://book-it-frontend-one.vercel.app)

---

## 🏗️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Express Validator**
- **Dotenv**
- **CORS**

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)

### Steps

```bash
# Clone the repository
git clone https://github.com/surajbruh/BOOK_IT-BACKEND.git
cd BOOK_IT-BACKEND

# Install dependencies
npm install
```

Create a `.env` file in the root directory:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=your_frontend_url
```

Run the server:
```bash
node src/index.js
```

> Server should run at **http://localhost:3000**

---

## 📁 Folder Structure

```
src/
├── config/
├── controllers/     # Core business logic
├── middleware/      # Authentication, error handling
├── models/          # Mongoose schemas
├── routes/          # API routes
├── validators/      # Input validation chain
└── index.js         # Entry point
```

---

## 🔐 API Endpoints

### 🔸 Experiences

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/api/experiences` | Fetch all experiences |
| GET | `/api/experiences/:id` | Get single experience |

### 🔸 Bookings
| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/api/bookings` | Create a new booking |
| POST | `/api/promo/validate` | Validate promo code |

---

## 🧩 Features

✅ RESTful API architecture  
✅ Input validation with express-validator  
✅ MongoDB data modeling via Mongoose  
✅ CORS enabled for frontend communication  

---

## 🚀 Deployment

- **Hosting:** Render  
- **Database:** MongoDB Atlas  
- **Frontend:** [BOOK_IT Frontend](https://book-it-frontend-one.vercel.app)

---

## 👨‍💻 Author

**Suraj Yadav**
🌐 [LinkedIn](https://www.linkedin.com/in/suraj-yadav-b15a1b36b)
📧 [GitHub Profile](https://github.com/surajbruh)
