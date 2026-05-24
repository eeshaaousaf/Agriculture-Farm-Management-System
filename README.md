# 🌾 Agriculture Farm Management System (AFMS)

A professional DBMS-based Agriculture Farm Management System designed to digitize and simplify farm operations for landlords and farm owners in Pakistan. The system centralizes farm data management including crops, irrigation, workers, harvests, and analytics through a normalized relational database.

---

## Project Overview

Traditional farming systems in rural areas often rely on paper records and manual calculations, leading to:

- Data loss
- Poor farm planning
- Irrigation mismanagement
- Wage calculation errors
- Lack of productivity analysis

The **Agriculture Farm Management System (AFMS)** solves these issues by providing a centralized database-driven platform that helps landlords manage farms efficiently through structured CRUD operations and analytical SQL queries.

---

## Objectives

- Design a fully normalized relational database (up to 3NF)
- Replace paper-based records with a digital system
- Implement complete CRUD functionality
- Maintain data integrity using constraints and foreign keys
- Generate smart analytical reports using SQL
- Support data-driven agricultural decision making

---

## Target Users

### Primary User
- Landlords / Farm Owners
- Agricultural Entrepreneurs
- Farm Managers

The system is specially designed for landlords who manage farms remotely and require centralized monitoring of all farming operations.

---

# Key Features

## Authentication Module
- Secure admin login system
- Password hashing support
- Session management

## Farm Management
- Add, update, delete, and manage farms
- Store:
  - Farm name
  - Location
  - Soil type
  - Total area
  - Registration details

## Crop Management
- Record crop planting cycles
- Track crop growth status
- Maintain harvest schedules

##  Worker Management
- Worker registration and assignment
- Wage tracking
- Employment status management

## Irrigation Management
- Track irrigation schedules
- Monitor water usage
- Store irrigation methods and duration

## Harvest Management
- Record harvest details
- Track yield quantity and quality
- Storage management

## Dashboard & Analytics
- Total farms overview
- Active crops statistics
- Worker summaries
- Harvest reports
- Irrigation monitoring

---

# Smart Decision Support Layer (SDSL)

The system includes analytical SQL views and reports for smarter farm management.

### Included Analytical Features:
- Crop profitability analysis
- Seasonal yield recommendations
- Irrigation resource summaries
- Monthly wage reports

---

# Database Design

The project is built using a normalized relational database structure.

## Main Entities

| Entity | Purpose |
|---|---|
| Admin | Authentication & ownership |
| Farm | Farm details management |
| Crop | Crop lifecycle records |
| Worker | Worker information |
| Irrigation | Water management logs |
| Harvest | Harvest records |

---

# CRUD Operations

The system supports full CRUD operations for all major modules:

- Create
- Read
- Update
- Delete

Implemented using SQL queries and relational database concepts.

---

# DBMS Concepts Used

- ER Modeling
- Relational Schema Design
- Primary & Foreign Keys
- Normalization (1NF, 2NF, 3NF)
- SQL Joins
- Views
- Aggregate Functions
- Constraints
- Referential Integrity

---

# Technologies Used

| Technology | Purpose |
|---|---|
| MySQL / SQL | Database Management |
| HTML | Frontend Structure |
| CSS | Styling |
| JavaScript | Client-side Functionality |
| DBMS Concepts | Database Design & Queries |

---

# Project Modules

```bash
AFMS/
│
├── Authentication Module
├── Dashboard Module
├── Farm Management Module
├── Crop Management Module
├── Worker Management Module
├── Irrigation Management Module
├── Harvest Management Module
└── Smart Decision Support Layer
```

---

# System Highlights

✅ Centralized Farm Database  
✅ Remote Farm Monitoring  
✅ Secure Authentication  
✅ Data Integrity Enforcement  
✅ Smart SQL Analytics  
✅ Structured CRUD Operations  
✅ Normalized Database Design  

---

# Academic Scope

The project demonstrates practical implementation of:

- Database normalization
- SQL query formulation
- Real-world relational schema design
- Analytical database systems

---

# Conclusion

The Agriculture Farm Management System (AFMS) modernizes traditional farming record management by transforming fragmented manual processes into a structured digital platform. Through normalized database architecture and analytical SQL capabilities, the system enables efficient farm monitoring, improved decision-making, and scalable agricultural management.

---

# License

This project is developed for educational purposes.
