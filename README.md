# 🎙️ Voice-Enabled Task Tracker

A voice-enabled task tracking application where spoken input is converted into structured task data using AI and stored in a database.

Built as part of the **SDE Assignment – Voice-Enabled Task Tracker**.

---

## 1. Project Setup

### a. Prerequisites

- Node.js v18+
- npm or yarn
- PostgreSQL
- Gemini / Perplexity API keys

---

### b. Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=4000
DATABASE_URL=""
GEMINI_API_KEY=
PERPLEXITY_API_KEY=
```
---
### c. Running the Project Locally

### Steps

1. Ensure PostgreSQL is running
2. Configure environment variables in `backend/.env`
3. Install backend dependencies and start the server
4. Install frontend dependencies and start the client
5. Access the application in the browser

---

### Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 2.Tech Stack

### a. Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Shadcn/UI
- React Speech Recognition

---

### b. Backend

- Node.js
- Express
- TypeScript
- Prisma ORM

---

### c. Database

- PostgreSQL

---

### d. AI Providers

- Perplexity AI (used for transcript parsing)
- Google Gemini (optional / alternative)

---

### e. Key Libraries & Tools

- Prisma
- Zod
- dotenv
- Axios / Fetch

---

## 3. API Documentation

### a. Parse Voice Transcript

- **Method:** POST  
- **Path:** `/parse`

#### Request Body
```json
{
  "transcript": "Finish dashboard UI by tomorrow evening"
}
```
#### Success Reponse
```json
{
  "success": true,
  "message": "Transcript parsed successfully",
  "data": {
    "title": "Finish dashboard UI",
    "priority": "medium",
    "dueDate": "2025-12-15T00:00:00.000Z",
    "status": "todo"
  }
}
```

### a. Create Task

- **Method:** POST  
- **Path:** `/create`

#### Request Body
```json
  {
  "title": "Fix login bug",
  "priority": "high",
  "dueDate": "2025-12-18T00:00:00.000Z",
  "status": "todo"
}
```

#### Success Reponse
```json
{
  "message": "Transcript created successfully",
  "data": {
    "id" : "jksladkadsjsal",
    "title": "Fix login bug",
    "priority": "high",
    "dueDate": "2025-12-18T00:00:00.000Z",
    "status": "todo"
    "createdAt": "2025-12-18T00:00:00.000Z"
  }
}
```

#### Error Response
```json
{
  "error": "Task creation failed"
}
```



