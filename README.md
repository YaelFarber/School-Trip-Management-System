# School Trip Management System

A full-stack system for managing school trip classes, teachers, students, and student locations.

The system is intended for teachers only.

Students must register with the system.

Teachers can see the students in the class they are taking on a trip with,

Including a map showing their locations and the locations of students who have moved away.

In addition, they have the option to view all classes, all teachers, and all students.

## How to use:

Homepage-

<img width="1434" height="860" alt="homepage" src="https://github.com/user-attachments/assets/4b5ee08b-f824-41a4-a3f7-0aaa47bb72a2" />

sign in -

<img width="1440" height="778" alt="signin1" src="https://github.com/user-attachments/assets/e0a5c67c-1590-4442-b541-c704c48600b0" />

<img width="1438" height="813" alt="signin2" src="https://github.com/user-attachments/assets/077411bb-10aa-4c26-9197-e0c325fb2898" />

login -

<img width="1440" height="811" alt="login" src="https://github.com/user-attachments/assets/9c731cf5-6dcb-49b3-a993-bf5455bdede5" />


Teacher dashboard - View all her students +
Location map (a student who has moved away by an air distance of more than 3 km from the teacher will receive a red marker)


<img width="1440" height="804" alt="dashboard" src="https://github.com/user-attachments/assets/302deb05-2adb-4369-ac19-e7155d80a9a7" />

<img width="1440" height="781" alt="map1" src="https://github.com/user-attachments/assets/6e4c349a-f224-4c3c-abca-9f5d84c4a21d" />

<img width="1440" height="782" alt="map2" src="https://github.com/user-attachments/assets/842cddb4-845b-4255-8d9c-cb63a6abdf7a" />

view all classes - 

<img width="1440" height="677" alt="classes" src="https://github.com/user-attachments/assets/759b59ed-908a-442f-b133-4b1630bcb81b" />

view all teachers - 

<img width="1440" height="633" alt="teachers" src="https://github.com/user-attachments/assets/3e478485-c2f5-418e-beb4-2c06bfc46091" />

view all students - 

<img width="1440" height="729" alt="students" src="https://github.com/user-attachments/assets/14114d93-1dc7-41a9-b761-9d13a4dcec24" />

create class - 

<img width="1440" height="511" alt="create class" src="https://github.com/user-attachments/assets/33541175-e149-4ed1-b5ed-feaa36223dd7" />


## Requirements

Install before running:

- Python 3.10+
- Node.js + npm
- PostgreSQL


## Database Setup

You can use any PostgreSQL client (psql, pgAdmin, etc.)


#### Option 1 – Using pgAdmin (GUI)
- Create a database named `SchoolTrip_DB`
- Use the Query Tool to run:
  - `createTables.sql`
  - `insertTables.sql`
  - `selectQueries.sql`

#### Option 2 – Using terminal (psql)
Create the database:
```
CREATE DATABASE "SchoolTrip_DB";
```

```
psql -U your_postgres_user -d SchoolTrip_DB -f DB/createTables.sql
psql -U your_postgres_user -d SchoolTrip_DB -f DB/insertTables.sql
psql -U your_postgres_user -d SchoolTrip_DB -f DB/selectQueries.sql
```

#### Option 3 – Restore from backup (fastest)

```
pg_restore -U your_postgres_user -d SchoolTrip_DB -c DB/backup.dump
```


## Backend Setup

Open terminal in the project folder:

```
cd Server
pip install fastapi uvicorn psycopg2-binary python-dotenv
```
Create a .env file in the project root:

```
DB_HOST=127.0.0.1
DB_PORT=5433
DB_NAME=SchoolTrip_DB
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
```

Run the server:
```
cd Server
uvicorn main:app --reload
```

Backend runs at:
http://127.0.0.1:8000


## Frontend Setup

Open another terminal:
```
cd Client
npm install
npm run dev
```

Frontend runs at:
http://localhost:5173

##

I assumed that each teacher was responsible for only one class.
