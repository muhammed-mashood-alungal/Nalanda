# Nalanda - Library Management System

A robust and scalable backend system for managing library operations, built with modern technologies and best practices.

## 🚀 Overview

Nalanda is a comprehensive library management system that handles book inventory, user management, borrowing operations, and analytics. The system is built using a clean architecture with Repository pattern and follows SOLID principles for maintainability and scalability.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Zod
- **Architecture:** Repository Pattern with SOLID Principles
- **Containerization:** Docker
- **Deployment:** AWS EC2

## 📋 Prerequisites

Before you start, make sure you have the following installed on your machine:


 **Docker**
   - To build and run the containerized app
   - [Install Docker](https://docs.docker.com/get-docker/)

## 🚀 Getting Started

### Steps to Run Locally Using Docker

#### 1. Clone the Repository
```bash
https://github.com/muhammed-mashood-alungal/Nalanda.git
cd Nalanda
```
#### 2. Create Environment Variables
Create a .env file in the project root:
```bash
NODE_ENV=development
JWT_ACCESS_KEY=<your_sercret>
JWT_REFRESH_KEY=<your_refresh_sercret>
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=9000
```
#### 3. Build the Docker Image
Create a .env file in the project root:
```bash
docker build -t nalanda-api .
```
#### 4. Run the App in Docker
```bash
docker run -p 9000:9000 --env-file .env nalanda-api
```


### Alternative: Run Without Docker

**Prerequisites:** Node.js 20+ and MongoDB must be installed locally.

If you prefer to run the app locally without Docker:
```bash
# Install dependencies
npm install

# Create .env file (same as above)

# Run in development mode
npm run dev

# Or build and run in production mode
npm run build
npm start
```


---

## 🐳 Deployment

The application is containerized using Docker and deployed on AWS EC2:

1. Docker image is built from the Dockerfile
2. Image is pushed to a container registry
3. EC2 instance pulls and runs the container
4. MongoDB connection is configured via environment variables

---
## 🔑 Admin Credentials (For Review Purpose Only)

**Login URL:** [Login Url](https://nalanda.mashood.site/api/v1/auth/login)  
**Email:** admin@gmail.com  
**Password:** 123456  

> Note: This is a temporary account for testing. You can view all admin features such as user, books , borrow managements..

---
## 🔗 Links

- **Live API:** [View Link](https://nalanda.mashood.site/api/v1/)
- **API Documentation:** [View Documentation](https://documenter.getpostman.com/view/32060834/2sB3QGtr7q)

---
Thank you for checking out this project!



