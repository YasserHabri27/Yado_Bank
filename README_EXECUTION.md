# Yado Bank - Execution Guide

Follow this guide to run the full stack application (Backend + Frontend) with a functional database.

## 1. Prerequisites

Ensure you have the following installed:
*   **Java JDK 17+** (You have Java 25 installed, which is great)
*   **Maven** (Verified available)
*   **Node.js & npm**
*   **MySQL Server** (e.g., via XAMPP, WAMP, or standalone MySQL Community Server)

## 2. Database Setup

The backend is configured to use MySQL.

1.  **Start your MySQL Server**:
    *   If using XAMPP/WAMP, start the "MySQL" module.
    *   If standalone, ensure the service is running.

2.  **Verify Setup**:
    *   The application attempts to connect to: `jdbc:mysql://localhost:3306/yado_bank`
    *   Default configured user: `root`
    *   Default configured password: *(empty)*

    > **IMPORTANT**: If your local MySQL `root` user has a password, you **MUST** update it in:
    > `src/main/resources/application.properties`
    > ```properties
    > spring.datasource.password=YOUR_PASSWORD_HERE
    > ```

3.  **Create Database (Optional but Recommended)**:
    *   Although the app is configured to `createDatabaseIfNotExist=true`, it is good practice to create it manually if it fails.
    *   Run SQL: `CREATE DATABASE yado_bank;`

## 3. Running the Backend (Spring Boot)

1.  Open a terminal in the project root: `c:\Users\yasse\Music\kawlasa\architecture\Yado_Bank`
2.  Run the application using Maven:
    ```powershell
    mvn spring-boot:run
    ```
3.  **Wait for startup**:
    *   You should see logs indicating Hibernate is running.
    *   Look for the connection log: `>>> Seeded Agent: agent@yadobank.com / password123`
    *   The server should start on `http://localhost:8080`.

## 4. Running the Frontend (React/Vite)

1.  Open a **new** terminal window.
2.  Navigate to the frontend directory:
    ```powershell
    cd frontend
    ```
3.  Install dependencies (only need to do this once):
    ```powershell
    npm install
    ```
4.  Start the development server:
    ```powershell
    npm run dev
    ```
5.  Access the application at the URL shown (usually `http://localhost:5173`).

## 5. Usage & Login

Once both servers are running:

1.  Open your browser to the frontend URL (e.g., `http://localhost:5173`).
2.  You will be redirected to the **Login Page**.
3.  Use the seeded credentials to log in as an Agent:
    *   **Username (Identifiant)**: `agent@yadobank.com`
    *   **Password**: `password123`

## 6. Deployment Notes

*   **Database Persistence**: Since `spring.jpa.hibernate.ddl-auto=update` is set, your data (clients, accounts) will be preserved in your local MySQL database between restarts.
*   **Security**: This is a development configuration. For production, never use `root` user or empty passwords.
