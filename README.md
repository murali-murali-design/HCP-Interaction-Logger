# AI-Powered HCP Interaction Logger

## Overview

This project is an AI-powered Healthcare Professional (HCP) Interaction Logger developed using React, FastAPI, LangGraph, Groq LLM, and MySQL.

Users can describe an HCP interaction in natural language, and the AI extracts structured information, automatically fills the interaction form, validates the data, suggests follow-up actions, and stores the interaction in the MySQL database.

---

## Features

- AI-powered interaction extraction
- Automatic form filling
- Edit interaction using natural language
- Validate interaction before saving
- AI-generated follow-up suggestions
- Save interactions to MySQL
- LangGraph workflow
- Groq LLM integration

---

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Redux Toolkit
- Axios

### Backend
- FastAPI
- SQLAlchemy
- LangGraph
- Groq LLM
- MySQL

---

## Tools Implemented

- Log Interaction Tool
- Edit Interaction Tool
- Validate Interaction Tool
- Suggest Follow-ups Tool
- Save Interaction Tool

---

## Project Structure

```
HCP-INTERACTION
│
├── backend
│   ├── agent
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   └── requirements.txt
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

---

## Installation

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Database

- Database Name: `hcp_interaction`
- Table Name: `interactions`

---

## Author

**Murali Krishna**