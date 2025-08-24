# Employee Management System 🚀
This project demonstrates a full-featured backend for managing employee records using Node.js and Elasticsearch, enabling efficient search, update, delete, and retrieval of employee data in real time.


## Features:
1. **CRUD Operations**
   - Handles details like name, department, salary, contact info, skills, location, rating, etc.

2. **Search Functionality**
   - Search employees by **name**, **DOB**, **joining date**, or a combination.
   - Hashing to prevent duplicate entries.

3. **Real-Time Updates**
   - Efficient updates using Elasticsearch’s `update` API.
   - Immediate reflection of changes in search results.

4. **Nearest Employee Finder**
   - Finds employees closest to a given location (latitude & longitude).
  
## Project Structure

```
employee-management/
├── src
│   ├── controllers
│   │   ├── getWholeData.js         # Controller to fetch all employees
│   │   ├── searchEmployee.js       # Controller for searching employees
│   │   ├── insertData.js           # Controller for inserting employees
│   │   ├── updateEmp.js            # Controller for updating employees
│   │   ├── deleteEmp.js            # Controller for deleting employees
│   │   └── nearestKnn.js           # Controller to find nearest employees by location
│   │
│   ├── routes
│   │   └── page2page.js            # All API routes
│   ├── models
│   │   └── createIndex.js          # Database stored in json format
│   ├── utils
│   │   └── clientConnect.js        # Elasticsearch client connection
│   │
│   └── app.js                      # Express server entry point
│   └── .env                        # file for authentication

├── README.md                       # Project documentation
├── package.json                    # Node.js dependencies 
```
## Getting started :)
```bash
# 1. Clone the repo
$ git clone https://github.com/<your-org>/elasticSearch_employeeData.git
$ cd elasticSearch_employeeData

# 2. Install dependencies
$ npm install

# 3. Create a .env file 
# Example variables:
# ELASTIC_URL=http://localhost:9200
# PORT=8000

# 4. Start in development mode
$ npm run dev

# Production build
$ npm start
```

### Example Requests

```bash
# Search Employee
curl "http://localhost:8000/employees/search?indName=employeev3&name=Amit%20Sharma&dob=1991-08-30&joind=2021-08-15"

# Insert Employee
curl -X POST "http://localhost:8000/employees/insert" \
  -H "Content-Type: application/json" \
  -d '{
    "indName": "employeev3",
    "data": {
      "name": "Amit Sharma",
      "dob": "1991-08-30",
      "joining_date": "2021-08-15",
      "department": "IT",
      "skills": "Node.js, Express.js, Machine Learning",
      "salary": 65000,
      "location": {
        "lat": 28.6139,
        "lon": 77.2090
      }
    }
  }'

# Delete Employee
nvoke-WebRequest -Uri "http://localhost:8000/employees/del?indName=employeev3&name=Sneha%20Iyer&dob=1990-04-19&joind=2020-01-25" `
   -Method DELETE 

# Update Employee
Invoke-WebRequest -Uri "http://localhost:8000/employees/update?indName=employeev3&name=Karan%20Mehta&dob=1987-09-27&joind=2017-07-07" `
       -Method PUT `   
       -Body '{"data": {"department": "Management", "salary": 85000}}' `                                                                                         
        -ContentType "application/json"'

```

### API Routes

| Method | Endpoint           |
|--------|------------------|
| GET    | /employees/getAll |
| POST   | /employees/insert |
| GET    | /employees/search |
| PUT    | /employees/update |
| DELETE | /employees/del    |

