# System Design Document: Next.js Journal Application

## 1. Architecture Diagram and Explanation

### 1.1 Architecture Diagram

[Browser] <---> [Next.js Frontend] <---> [Supabase Auth & Database] | v [Prisma ORM Layer]

### 1.2 Explanation

- **Frontend**: Built with Next.js, the frontend handles routing, rendering, and user interactions. It uses server-side rendering (SSR) for authenticated pages and client-side rendering (CSR) for interactive components.
- **Backend**: Next.js API routes act as the backend, handling requests for authentication, journal entry management, and database interactions.
- **Database**: Supabase provides a managed PostgreSQL database for storing user and journal entry data. Prisma is used as the ORM for database queries.
- **Hosting**: The application is deployed on Vercel, which provides serverless hosting and automatic scaling.

---

## 2. Data Model Design and Relationships

### 2.1 Data Model

#### User Table

| Column | Type   | Constraints      |
| ------ | ------ | ---------------- |
| id     | String | Primary Key      |
| email  | String | Unique, Not Null |
| name   | String | Nullable         |

#### JournalEntry Table

| Column  | Type     | Constraints        |
| ------- | -------- | ------------------ |
| id      | String   | Primary Key        |
| title   | String   | Not Null           |
| content | Text     | Not Null           |
| date    | DateTime | Default: now()     |
| userId  | String   | Foreign Key (User) |

#### Relationships

- **One-to-Many**: A user can have multiple journal entries.
- **Foreign Key**: `JournalEntry.userId` references `User.id`.

---

## 3. Security Measures Beyond Basic Authentication

### 3.1 Data Protection

- **Environment Variables**: Sensitive credentials (e.g., `DATABASE_URL`, `SUPABASE_ANON_KEY`) are stored securely in environment variables.
- **HTTPS**: All communication between the client and server is encrypted using HTTPS.

### 3.2 Authorization

- **Role-Based Access Control (RBAC)**: Supabase policies ensure users can only access their own data.
- **API Route Validation**: Middleware checks user sessions before processing requests.

### 3.3 Additional Measures

- **Rate Limiting**: Implement rate limiting on API routes to prevent abuse.
- **Audit Logs**: Track user actions (e.g., login, journal entry creation) for monitoring and debugging.

---

## 4. Potential Scaling Challenges and Solutions

### 4.1 Challenges

1. **Database Load**: As the number of users and journal entries grows, database queries may become slower.
2. **Cold Starts**: Vercel's serverless functions may experience latency during cold starts under heavy traffic.
3. **Authentication Bottleneck**: Supabase's authentication service may face delays with a high volume of concurrent logins.

### 4.2 Solutions

1. **Database Optimization**:
   - Use indexes on frequently queried columns (e.g., `userId` in `JournalEntry`).
   - Implement query caching for frequently accessed data.
2. **Serverless Optimization**:
   - Use Vercel's edge functions for faster response times.
   - Warm up serverless functions during peak hours.
3. **Authentication Scaling**:
   - Use Supabase's enterprise plan for higher rate limits and dedicated resources.

---

## 5. How the Design Would Scale to Support 1M+ Users

### 5.1 Database Scaling

- **Read Replicas**: Add read replicas to distribute read-heavy workloads.
- **Partitioning**: Partition the `JournalEntry` table by `userId` to improve query performance.

### 5.2 Caching

- Use a caching layer (e.g., Redis) to store frequently accessed data like user profiles and journal summaries.

### 5.3 Load Balancing

- Use a CDN (e.g., Vercel's built-in CDN) to distribute traffic globally and reduce latency.

---

## 6. Potential Bottlenecks and How to Address Them

### 6.1 Bottlenecks

1. **Database Write Operations**: High write frequency (e.g., journal entry creation) could overwhelm the database.
2. **API Latency**: Increased traffic could slow down API responses.

### 6.2 Solutions

1. **Batch Writes**: Group multiple write operations into a single transaction.
2. **Horizontal Scaling**: Use Supabase's scaling options to handle increased traffic.

---

## 7. Components That Might Need Redesign at Scale

1. **Database Schema**:
   - Add sharding or partitioning for large tables.
   - Optimize indexes for high-traffic queries.
2. **Authentication**:
   - Use a dedicated authentication service (e.g., Auth0) for better scalability.
3. **API Routes**:
   - Migrate to a dedicated backend (e.g., Node.js or Go) for complex business logic.

---

## Technical Decision Log

### Decision 1: Use Supabase for Authentication and Database

- **Problem**: Needed a secure and scalable authentication and database solution.
- **Options**:
  1. Firebase
  2. Supabase
  3. Custom-built solution
- **Chosen Approach**: Supabase
  - **Rationale**: Provides both authentication and PostgreSQL in one platform.
  - **Trade-offs**: Limited control over database scaling compared to self-hosted solutions.

### Decision 2: Use Prisma as the ORM

- **Problem**: Needed a way to interact with the PostgreSQL database.
- **Options**:
  1. Prisma
  2. Knex.js
  3. Raw SQL
- **Chosen Approach**: Prisma
  - **Rationale**: Developer-friendly syntax and built-in migrations.
  - **Trade-offs**: Slightly slower performance compared to raw SQL.

### Decision 3: Deploy on Vercel

- **Problem**: Needed a hosting platform for the Next.js application.
- **Options**:
  1. Vercel
  2. AWS
  3. DigitalOcean
- **Chosen Approach**: Vercel
  - **Rationale**: Optimized for Next.js with serverless functions and automatic scaling.
  - **Trade-offs**: Cold starts in serverless functions under heavy traffic.

### Decision 4: Use Serverless Functions for Backend

- **Problem**: Needed a lightweight backend for API routes.
- **Options**:
  1. Serverless functions (Vercel)
  2. Dedicated backend (Node.js/Express)
- **Chosen Approach**: Serverless functions
  - **Rationale**: Simplifies deployment and scales automatically.
  - **Trade-offs**: Limited execution time and potential cold starts.

---

## Conclusion

This document outlines the architecture, data model, security measures, and scaling strategies for the Next.js Journal Application. While the current design is suitable for small to medium-scale usage, significant changes (e.g., database partitioning, caching) would be required to support 1M+ users. The technical decisions made prioritize simplicity and developer productivity while acknowledging trade-offs in scalability and performance.
