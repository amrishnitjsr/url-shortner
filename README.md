# URL Shortener

A simple URL shortening web application built with Node.js, Express, MongoDB, and EJS templating.  
Users can create accounts, log in, and shorten URLs which can be tracked for click counts.

---

## Features

- User authentication (Signup, Login, Logout)
- Secure password hashing with bcrypt
- Create shortened URLs
- Track number of clicks on shortened URLs
- Delete URLs
- Responsive UI with Bootstrap
- Background video or image for better UI experience

---

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- EJS (Embedded JavaScript) templating
- bcryptjs for password hashing
- express-session for session management
- Bootstrap 5 for styling

---

## Prerequisites

- Node.js installed (v14+ recommended)
- MongoDB account or local MongoDB server
- npm (Node package manager)

---

## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/amrishnitjsr/url-shortner.git
   cd url-shortner

---
## Install dependencies:
1 npm install

2 MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret_key
PORT=5000

3 npm start
4 http://localhost:5000
---

--------
## Folder Structure

url-shortner/
├── models/
│   ├── User.js           # User schema and model
│   └── shorturl.js       # URL schema and model
├── public/
│   ├── images/           # Images for background, etc.
│   └── css/              # Stylesheets (if any)
├── views/
│   ├── index.ejs         # Homepage and URL list
│   ├── login.ejs         # Login page
│   ├── signup.ejs        # Signup page
│   └── partials/         # (optional) header/footer partials
├── .env                  # Environment variables (not committed to GitHub)
├── server.js             # Main server file
├── package.json          # Project metadata and dependencies
└── README.md             # This file
---------



Troubleshooting
If you see Cannot find module errors, make sure to run npm install before starting the server.

Ensure MongoDB connection string in .env is correct.

For any issues with sessions, verify SESSION_SECRET is set properly.





Usage
Register a new account via the Signup page.

Log in using your credentials.

Enter a full URL in the input box and click Shrink to create a shortened URL.

The table below shows all URLs you created with click count and a delete option.

Logout when finished.

Author
Amrish Yadav
Email: amrishrock2002@gmail.com

### Login
![Homepage Screenshot](public/screenshots/login.png)

### Signup
![Homepage Screenshot](public/screenshots/signup.png)

### Homepage
![Homepage Screenshot](public/screenshots/home.png)



