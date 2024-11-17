# WhatsApp Template Message Preview System

This repository contains a solution to the "WhatsApp Template Message Preview System" challenge. The system consists of two main components: a backend API built with Python and FastAPI, and a frontend interface built with React and TypeScript. Additionally, a MongoDB database is set up using Docker to store the template data used by the backend.

## Project Structure

The project is organized as follows:

- **API (Backend)**: Located in the `api` directory, this is where the FastAPI-based backend is implemented.
- **Web (Frontend)**: Located in the `web` directory, this folder contains the React (TypeScript) application for the user interface.
- **MongoDB**: Managed by Docker, used by the FastAPI backend for storing templates.

## Project Objective

The goal of this project is to create a system that can parse WhatsApp message templates, handle template variables, and generate message previews based on sample data.

### Core Requirements

1. **Backend API (Python/FastAPI)**:
   - Endpoint to parse WhatsApp message templates.
   - Handle template variables (e.g., `{{1}}`, `{{name}}`).
   - Validate template structure.
   - Generate a live preview with sample data.

2. **Frontend Interface**:
   - Template input form.
   - Variable input fields (dynamic based on the template).
   - Live preview of the message.
   - Basic error handling.

## Setup Instructions

### Backend (FastAPI)

1. **Create a virtual environment** (if not already done):

   - **For Windows**:
     ```bash
     python -m venv venv
     ```

   - **For Linux**:
     ```bash
     python3 -m venv venv
     ```

2. **Activate the virtual environment**:

   - **For Windows**:
     ```bash
     .\venv\Scripts\activate
     ```

   - **For Linux**:
     ```bash
     source venv/bin/activate
     ```

3. **Install the required dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Start the backend API with Uvicorn**:

   ```bash
   uvicorn app.Main:app --reload
   ```

5. **Access the Swagger documentation**:

   - Open a browser and navigate to `http://127.0.0.1:8000/redoc` to view the interactive API documentation.

### Frontend (React/TypeScript)

1. **Navigate to the `template-preview` directory**:

   ```bash
   cd ..\TemplatePreviewer\web\template-preview
   ```

2. **Install the dependencies**:

   ```bash
   npm install
   ```

3. **Start the frontend development server**:

   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

### MongoDB Setup

The project uses MongoDB as the database for storing message templates. It is configured to run with Docker. To set up the database, run the following:

1. Ensure that Docker is installed and running.
2. In the root directory of the project, there is a `docker-compose.yml` file. To start MongoDB with Docker, use the following command:

   ```bash
   docker-compose up
   ```

   This will bring up the MongoDB container and allow the backend to connect to it.

### Figma Prototype

You can view the prototype of the frontend design on Figma:

[View Figma Prototype](https://www.figma.com/design/Qwoex5tvCgtgNtVYQxEEqk/template-preview?node-id=0-1&t=jJAfN84YTHT4wBN4-1)

## Conclusion

This project implements a system for parsing and previewing WhatsApp message templates. The backend API is built with Python and FastAPI, and the frontend is a React-based interface that allows for dynamic input fields and live message preview. The system uses MongoDB for data storage and Docker for containerization.
