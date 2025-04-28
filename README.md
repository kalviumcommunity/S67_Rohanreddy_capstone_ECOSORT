                   Capstone Project RoadMap
                          Eco sort
                 (Smart waste management System)
Concept
Project GreenBin AI is a mobile-based smart waste management application that helps users efficiently sort and dispose of waste using AI-powered image recognition and barcode scanning. This app enhances waste disposal habits by analyzing scanned items and providing real-time disposal recommendations based on recyclability and local waste management guidelines.
                   The system works by allowing users to scan waste items (barcode or image), detect their type (plastic, paper, organic, etc.), and receive disposal suggestions based on their location. 

Tech Stack 
Frontend: React Native (for cross-platform mobile development)
Backend: FastAPI  for handling API requests and user authentication
AI Processing: TensorFlow or OpenCV for image recognition & barcode scanning; spaCy for NLP-based waste categorization
Database: MongoDB (for storing scanned waste data, user activity, and disposal records)
Storage: Firebase (for storing scanned images and user-uploaded data)
Mapping & Location Services: Google Maps API (for locating nearby recycling centers and waste bins)
Notifications: Firebase Cloud Messaging (for waste collection reminders and alerts)

Daily Plans


Week 1: UI/UX Design & Project Initialization
Day 1: Ideated and came up with the ideas.
Day 2: Thought further and came up with features that would make the application stand out. Did a little bit more thinking and came up with a better structure.
Day 3: Started working on the low-fid design using Figma. Finalized the main focus areas and began designing.
Day 4: Continued working on the low-fid design. If completed, started working on the high-fid design.
Day 5: Started working on the high-fid design.
Day 6: In parallel with the high-fid design, continued working on the actual project by creating a new GitHub project and initialized the frontend (React Native) and backend (Node.js with Express.js).

Week 2: Backend Setup & API Development
Day 7: Completed the high-fid design and finalized UI details. Set up backend folder structure, installed necessary dependencies, and configured Express.js server.
Day 8: Implemented user authentication (JWT/Firebase) and created signup/login API endpoints.
Day 9: Designed the database schema (MongoDB/PostgreSQL) and set up connections. Created models for users, waste items, and disposal locations.
Day 10: Developed CRUD operations for waste items (add, update, delete, fetch) in the backend.
Day 11: Integrated barcode scanning API into the backend for waste item identification.
Day 12: Integrated Google Maps API to fetch and store disposal center locations based on user location.
Day 13: Tested backend APIs using Postman and fixed any errors.

Week 3: Frontend Development & Feature Integration
Day 14: Set up React Native project structure, installed dependencies, and implemented navigation.
Day 15: Developed login and signup screens and connected them to the backend authentication API.
Day 16: Integrated barcode scanner feature into the frontend.
Day 17: Implemented the waste classification display (showing users how to dispose of scanned items).
Day 18: Integrated Google Maps to display nearby disposal centers on the frontend.
Day 19: Developed the user dashboard with waste tracking and disposal history.
Day 20: Performed frontend testing, fixed UI issues, and improved design elements.

Week 4: Testing, Refinements & Deployment
Day 21: Connected frontend with backend and performed end-to-end testing.
Day 22: Fixed any bugs or UI inconsistencies found during testing.
Day 23: Optimized performance and improved user experience based on feedback.
Day 24: Implemented push notifications (optional) to remind users to dispose of waste.
Day 25: Deployed backend on Render/Heroku and tested API functionality in production.
Day 26: Deployed frontend for testing (Play Store/TestFlight).
Day 27: Gathered user feedback from testers and made final improvements.
Day 28: Wrote project documentation and finalized reports for submission.
Day 29: Conducted a final debugging session and ensured everything is ready.
Day 30: Project demonstration and submission.



API Documentation 3.1. POST /api/auth/register Description: Registers a new user.
Access: Public

Request body: JSON object with name, email, and password.

Responses: Success (201) or Error (400)

3.2. POST /api/auth/login Description: Authenticates the user and returns a JWT token.

Access: Public

Request body: JSON object with email and password.


=======
Responses: Success with token and user data or Error (401)

3.3. GET /api/auth/me Description: Retrieves current authenticated user's profile.

Access: Private (JWT required)

Responses: User data or Error (404)

3.4. PUT /api/auth/profile Description: Allows users to update their profile information (name, email, bio).

Access: Private (JWT required)

Request body: JSON object with updated user data.

Responses: Updated user data or Error (404)

3.5. PUT /api/auth/password Description: Allows users to update their password.

Access: Private (JWT required)

Request body: JSON object with current and new password.

Responses: Success message or Error (401)


