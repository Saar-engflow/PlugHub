1️⃣ Project Goals / MVP Scope

Build a web app (mobile-first) where clients can find service providers.

Providers: register, create service listings, optionally add samples/pastClients.

Clients: fill request form → get ranked provider list.

Admin: approve providers, flag reports, track leads.

No payments yet.

Timeline: 10 days, must be functional.

2️⃣ Folder Structure (Node + Express + Mongoose)
PlugHub/
│
├─ server.js # Entry point
├─ db.js # MongoDB connection
├─ package.json
│
├─ models/ # Mongoose schemas
│ ├─ User.js # Clients, Providers, Admin
│ └─ Service.js # Services
│
├─ routes/ # Express routes
│ ├─ auth.js # Login / Register
│ ├─ services.js # CRUD for services
│ ├─ admin.js # Admin actions
│ └─ clients.js # Client actions / requests
│
├─ controllers/ # Route logic (keeps routes clean)
│ ├─ authController.js
│ ├─ serviceController.js
│ ├─ adminController.js
│ └─ clientController.js
│
├─ middlewares/ # Auth, validation, etc.
│ └─ authMiddleware.js
│
├─ utils/ # Helpers
│ └─ recommendation.js
│
├─ public/ # Static assets
│ └─ images/
│
└─ config/ # Configs / env
└─ default.json

3️⃣ Database Design (MongoDB / Mongoose)
User Schema
{
name: String,
email: { type: String, unique: true },
password: String,
role: { type: String, enum: ['client', 'provider', 'admin'] },
location: String,
createdAt: Date,
}

Service Schema
{
provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
title: String,
description: String,
categories: [String], // e.g., ["music", "beats"]
items: [ // multiple things offered in one service
{
name: String,
price: Number
}
],
availability: {
days: [String], // ["Mon", "Tue"]
startTime: String,
endTime: String
},
serviceArea: String,
images: [String], // URLs or file paths
samples: [String], // Optional
pastClients: [String], // Optional
status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
createdAt: Date
}

Request / Lead Schema
{
client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
serviceRequested: String, // text input
budget: Number,
location: String,
urgency: String,
matchedProviders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
contactedProvider: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
createdAt: Date
}

4️⃣ System Flow

Provider registers → status = pending.

Admin approves → provider active.

Client fills request form → system ranks providers using:

Budget

Location

Urgency

Preferences (categories)

Ranked providers shown → client contacts provider → lead logged.

Optional: provider may later pay for leads (future version).

5️⃣ Tech / Stack

Backend: Node.js + Express + Mongoose

Database: MongoDB (local first, then Atlas)

Frontend: React (or Next.js if you want SSR)

Auth: JWT for API, password hashing with bcrypt

File uploads: multer (images/samples)

Recommendation engine: simple JS function first

6️⃣ To-Do List / Timeline (10 Days)
Day 1-2: Setup & DB

Initialize Node project, install dependencies

MongoDB connection, create User and Service models

Test DB connection

Day 3-4: Auth

Register/Login (client, provider, admin)

Role-based auth middleware

Day 5: Provider workflow

Create / edit service listing

Optional samples / pastClients

File upload (images)

Day 6: Admin panel

Approve / reject providers

Flag reports

Day 7: Client workflow

Guided request form

Store request in DB

Day 8: Recommendation engine

Simple ranking based on budget, location, categories

Return top 3-5 providers

Day 9: Frontend MVP

Home page, login/register, provider list, request form

Show provider details

Day 10: Testing & Polish

API testing

Fix bugs

Deploy (optional: localhost MVP)
