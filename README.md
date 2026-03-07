# ⚠️ Legacy/Academic Project Disclaimer

> **Historical Note:** This repository contains an academic project developed during my early university years. I keep it public solely as a historical record of my learning process and professional evolution. 
 
> The monolithic design, lack of separation of concerns, and the coding practices applied in this repository **do not** reflect my current technical standards, architectural mindset, or seniority level. 

---

# Activity and Class Management System

## Project Purpose
This project was developed for a Database university course. The main objective of the application is to manage the operations of a sports center, including the management of instructors, students, classes, and activities. Additionally, the system includes features to enrich the application, such as reports showing the most profitable activities or the shifts with the highest number of classes.

Although this was a group project, I was solely responsible for designing the technological architecture, developing all the source code (frontend and backend), building the database and fully containerizing the environments.

## Architecture and Technical Decisions
We made several key decisions to get the application up and running:

* **Containerization with Docker:** We used Docker to make the application easy to run and replicate on any machine. Docker allowed us to isolate components and manage them effectively, avoiding environment configuration issues.
* **MySQL Database:** We chose MySQL because of its robustness and community support. We implemented constraints and foreign keys to maintain data integrity (e.g., ensuring an instructor cannot teach two classes in the same shift). We also handled special characters (like "ñ" and accents) by setting the encoding to UTF-8 to prevent errors in the SQL scripts.
* **RESTful Backend with Flask:** We used Flask to build our RESTful API because it is a lightweight and flexible framework. We integrated the database using the `pymysql` library.

## 🧠 Critical Analysis and "Technical Debt" (What I would improve today)
Since this was an academic project with strict deadlines, the main goal was to deliver a functional product. However, reviewing the current code (specifically the `app.py` file), there are clear architectural improvements I would implement today:

1. **N-Tier Architecture:** Currently, the `app.py` file is a monolith mixing routing (HTTP endpoints), business logic, and SQL queries. Today, I would refactor this into Controllers, Services, and Repositories.
2. **Database Connection Pooling:** The current code opens and closes a connection on every single endpoint hit. For a production system, I would implement Connection Pooling to reuse active connections, reducing latency and resource consumption.
3. **Data Validation (DTOs):** Instead of accessing `request.json` directly, I would implement validation schemas to guarantee the incoming payload has the correct structure.
4. **Security:** The current `/login` endpoint stores and compares plain-text passwords. This is SERIOUS PROBLEM for security. In a real environment, I would hash the password using bcrypt, and authentication should rely on JWTs (JSON Web Tokens) or sessions.

## Instructions to Run the Project

### Prerequisites
* Docker
* Docker Compose

*Note: Ensure ports 80, 5000, and 3306 are free on your local machine.*

### Steps to Run

1. **Clone the repository:**
`git clone [https://github.com/guilleacq/bbdd-project.git](https://github.com/guilleacq/bbdd-project.git)`

3. **Navigate to the directory:**

`cd bbdd-project`


3. **Build and run the containers:**
`docker-compose up --build`



4. **Access the application:**
* **Frontend:** http://localhost
* **Backend API:** http://localhost:5000
* **Database:** localhost:3306 (User: root, Pass: 1234, DB: obligatorio)



To stop the containers, run `docker-compose down`.

