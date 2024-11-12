
# FERI Computer Science Student Planner

## 1. About the App
This app is designed specifically for Computer Science students at FERI to efficiently plan and manage their schedules. The planner provides a daily, weekly, and monthly calendar view of their lessons, exercises, and other academic activities based on their enrolled courses and groups. Additionally, students can create and manage custom events to maintain a holistic overview of their schedules, enabling better time management and studying.

## 2. Technologies Used

### Frontend
- Next.js
- React
- Tailwind CSS
- React Calendar
- FullCalendar
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT) for authentication
- dotenv for environment variable management
- cors for Cross-Origin Resource Sharing
- cookie-parser for handling cookies
- bcrypt for password hashing

## 3. Starting the Backend and Frontend

### Backend Setup
1. Navigate to the backend folder.
2. Install dependencies using:
   ```
   npm install
   ```
3. Create a `.env` file and structure it as follows:
   ```
   MONGO_URL=<your-mongo-connection-string>
   PORT=your_port
   JWT_SECRET=<your-jwt-secret>
   ```
4. Start the server using:
   ```
   npm run dev
   ```
   Alternatively, to run the server without nodemon:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder.
2. Install dependencies using:
   ```
   npm install
   ```
3. Create a `.env` file and structure it as follows:
   ```
   NEXT_PUBLIC_API_URL=<your-backend-api-url>
   ```
4. Start the frontend development server using:
   ```
   npm run dev
   ```

## 4. Backend Endpoints

### Auth Endpoints (`/api/auth`)
- **POST /register** - Register a new user.
- **POST /login** - Log in a user.
- **POST /logout** - Log out a user.
- **GET /status** - Check if the user is authenticated (requires authentication token).

### Course Endpoints (`/api/course`)
- **POST /** - Create a new course.
- **GET /lessons/:cycle/:year** - Retrieve lessons based on cycle and year.
- **GET /exercises/:cycle/:year/:group** - Retrieve exercises based on cycle, year, and group.

### Custom Event Endpoints (`/api/custom-event`)
- **POST /add** - Add a custom event (requires authentication).
- **GET /:userId** - Retrieve custom events for a specific user (requires authentication).

## Project Structure

### Backend Structure
- `routes/` - Contains the route definitions.
  - `authRoute.js` - Handles authentication routes.
  - `courseRoute.js` - Handles course-related routes.
  - `customEventRoute.js` - Handles custom event routes.
- `controllers/` - Contains business logic for each route.
- `models/` - Contains MongoDB models (e.g., User).
- `middleware/` - Contains middleware functions (e.g., token authentication).
- `app.js` - Entry point for the backend server.

### Frontend Structure
- `components/` - Reusable React components such as Navbar.
- `pages/` - Next.js pages structure for routing.
- `styles/` - Contains Tailwind CSS and custom styles.
- `public/` - Public assets such as fonts.
- `RootLayout.js` - Main layout component.
