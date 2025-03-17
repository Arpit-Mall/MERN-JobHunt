import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

dotenv.config({}); // is used to load environment variables from a .env file into process.env using the dotenv package.

const app = express();

app.use(express.json()); // is used to parse incoming JSON requests (convert JSON into JavaScript object) and make the data available in req.body.

app.use(express.urlencoded({extended:true})); /*When a form is submitted in an HTML page with method="POST", the data is sent in URL-encoded format by default.

Without express.urlencoded(), req.body will be undefined.
With express.urlencoded({ extended: true }), req.body will be: { username: "Arpit", age: "25" }
*/

app.use(cookieParser()); /* is used to parse cookies from incoming requests and make them available in req.cookies.

Without cookieParser(), you would need to manually extract and parse the cookies from req.headers.cookie.
With cookieParser(), Express automatically parses them, making them available in req.cookies:
*/

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions)); /* By default, web browsers block requests made from one origin (domain, protocol, or port) to another for security reasons (known as the same-origin policy).

For example:

Your frontend (React/Vue/Angular) is running on http://localhost:5173.
Your backend (Node.js/Express) is running on http://localhost:3000.
If the frontend tries to make an API request to the backend (http://localhost:3000), the browser blocks it unless CORS is enabled.

This "credentials: true" allows the browser to send cookies, authorization headers, or TLS client certificates in cross-origin requests.

Useful for authentication systems (e.g., JWT tokens or session cookies).
Without this, cookies and authentication headers will not be included in cross-origin requests.
*/ 


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectDB();
    console.log(`Backend Server is running at port ${PORT}`);
})