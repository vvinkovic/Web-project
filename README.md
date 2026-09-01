# Web-project

# Student Tracker

Full-stack web aplikacija za praćenje studentskih zadataka (to-do lista) s korisničkim računima, rokovima i statistikom napretka.

## 🔗 Live demo

- **Frontend:** https://student-tracker-8wnn.onrender.com
- **Backend API:** https://backed-tty7.onrender.com

> Napomena: backend koristi besplatni Render plan, pa se nakon perioda neaktivnosti "uspavljuje" — prvi zahtjev nakon toga može potrajati 30-ak sekundi dok se probudi.

## ✨ Funkcionalnosti

- Registracija i prijava korisnika (JWT autentikacija, hashirane lozinke)
- CRUD operacije nad zadacima (dodavanje, označavanje kao gotovo, brisanje)
- Rokovi za zadatke s vizualnom oznakom kašnjenja
- Statistika napretka (postotak riješenih zadataka, progress bar)
- Korisnički profil s uploadom profilne slike
- Uređivanje i brisanje korisničkog računa
- Prikaz citata dana (poziv na vanjski API — ZenQuotes)
- Responzivan dizajn (Bootstrap grid)

## 🛠️ Tehnologije

**Frontend:**
- React 19 + Vite
- React Router DOM
- Bootstrap 5

**Backend:**
- Node.js + Express
- SQLite (`node:sqlite`, ugrađeno u Node)
- JWT (jsonwebtoken) za autentikaciju
- bcryptjs za hashiranje lozinki
- Multer za upload slika

**Deploy:**
- Render (backend + frontend, dva odvojena servisa)

## 📁 Struktura projekta

```
web-project/
├── client/          # React (Vite) frontend
│   └── src/
│       ├── pages/       # Home, Login, Register, Tasks, Profile
│       ├── components/  # Navbar, ProtectedRoute
│       └── context/     # AuthContext (globalno auth stanje)
└── server/          # Express backend
    ├── config/          # Konekcija na SQLite bazu
    ├── models/          # (napomena: SQL tablice definirane u config/db.js)
    ├── middleware/       # JWT auth middleware
    ├── routes/           # auth, tasks, profile, quote
    └── uploads/          # Spremljene profilne slike
```

## 🚀 Pokretanje lokalno

### Preduvjeti
- Node.js (v20+)
- npm

### Backend

```bash
cd server
npm install
```

Kreiraj `.env` fajl u `server/` folderu:
```
PORT=5000
JWT_SECRET=neki-dugacak-nasumican-string
```

Pokreni server:
```bash
npm run dev
```
Server sluša na `http://localhost:5000`. SQLite baza (`data.db`) kreira se automatski pri prvom pokretanju.

### Frontend

```bash
cd client
npm install
npm run dev
```
Frontend je dostupan na `http://localhost:5173`.

> Napomena: `API_URL` u `client/src/context/AuthContext.jsx` i `client/src/pages/Tasks.jsx` / `Profile.jsx` je postavljen na produkcijski backend URL. Za lokalno testiranje s lokalnim backendom, promijeni ga privremeno na `http://localhost:5000/api`.

## 📡 API rute

| Metoda | Ruta | Opis | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Registracija korisnika | ne |
| POST | `/api/auth/login` | Prijava korisnika | ne |
| GET | `/api/tasks` | Dohvati zadatke korisnika | da |
| POST | `/api/tasks` | Kreiraj zadatak | da |
| PUT | `/api/tasks/:id` | Izmijeni zadatak | da |
| DELETE | `/api/tasks/:id` | Obriši zadatak | da |
| GET | `/api/profile` | Dohvati profil | da |
| PUT | `/api/profile` | Izmijeni profil | da |
| POST | `/api/profile/picture` | Upload profilne slike | da |
| DELETE | `/api/profile` | Obriši korisnički račun | da |
| GET | `/api/quote` | Citat dana (vanjski API) | ne |

