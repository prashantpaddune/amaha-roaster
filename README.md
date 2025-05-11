# Amaha Roster Management Application

Amaha Roster is a comprehensive application designed to efficiently manage and display roster data dynamically. It provides seamless schedule management with intuitive filters, detailed views, and calendar functionalities.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Additional Implemented Features](#additional-implemented-features)
- [Mock Data](#mock-data)

---

## Features

### Core Functionality:

- **Roster Management:** Dynamic viewing and management of provider schedules.
- **Filters & Search:** Ability to filter providers by:
    - Services (Therapist, Psychiatrist, Cardiologist, etc.)
    - Types (In-house, External)
    - Centers (Bandra Clinic, Andheri Clinic, etc.)
- **Search Providers:** Quickly search specific providers by name.
- **Detailed Calendar View:** View detailed provider schedules with clearly color-coded statuses:
    - 🟢 Online
    - 🟠 Offline
    - 🔵 Online + Offline
    - 🟤 Blocked
    - ⚪ Available Slots

### UI/UX & Design:

- Pixel-perfect responsive design following provided Figma references.
- Time-slot-based schedule viewing for clear and intuitive interactions.
- Clean, modern interface developed with React.js, Tailwind CSS, and Redux Toolkit.

---

## Additional Implemented Features

- **List and Calender View with Filters:** Users can switch between list and calender views for better scheduling context with filters.
- **Day & Week Calendar Views:** Users can switch between daily and weekly views for better scheduling context.
- **Redux Toolkit Integration:** Efficient state management for filters, views, and provider data.

---

## Screenshots

**Roster List View**  
![Roster List View](/mnt/data/a1e5b15c-1d59-4daa-8335-20213be1ec67.png)

**Provider Detailed Calendar View**  
![Provider Calendar View](/mnt/data/f1bb8a9e-d013-453c-9663-1c03d099657e.png)

**Filters & Search Implementation**  
![Filters and Search](/mnt/data/c9f7045c-c3e9-43d0-af88-875dae60a4f0.png)

---

## Tech Stack

### Frontend:
- **Framework:** React.js, Next.js
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **API Handling:** fetch
- **Date Management:** Date-fns

### Testing:
- Vitest & React Testing Library for unit tests

---

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/prashantpaddune/amaha-roaster
cd amaha-roaster
```

### Install Dependencies

```bash
npm install
# or using yarn
yarn
# or using pnpm
pnpm install
```

### Running Locally

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Access the app at [http://localhost:3000](http://localhost:3000)

---

## Running Tests

Run unit and integration tests using Jest:

```bash
npm test
# or
yarn test
# or
pnpm test
```


---

## Deployment

Deployed using Vercel/Netlify/Firebase Hosting:

```bash
pnpm run build
pnpm start
```

Live link: [Amaha Roster App](https://amaha-roaster.vercel.app/)

---