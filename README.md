# auto_login

This project automates user login using **Selenium**, **Node.js (Express.js)**, and **MongoDB**.

---

## 🛠 Prerequisites

Make sure you have the following installed before running the project:

### 1. Install Required Software  
- **[Node.js](https://nodejs.org/)**
- **[MongoDB](https://www.mongodb.com/try/download/community)** (or use MongoDB Atlas)
- **[Python](https://www.python.org/)**
- **Google Chrome** (Latest version)
- **Chrome WebDriver** ([Download Here](https://chromedriver.chromium.org/downloads))

---

### 2. Install Dependencies  

#### **Backend (Node.js)**
```bash
cd backend
npm install
```

#### **Python Libraries**
```bash
pip install selenium pymongo
```

---

## 🚀 Running the Project  

### **1. Start MongoDB**
Make sure MongoDB is running:
```bash
mongod
```

### **2. Start the Backend Server**
Run the Node.js backend:
```bash
cd backend
node server.js
```

### **3. Start the Frontend**
Open `frontend/login.html` in a browser or use **Live Server** (if using VS Code).

### **4. Run Selenium Automation**
```bash
python automation/login_automation.py
```

This will automatically fetch credentials from MongoDB and log in.
