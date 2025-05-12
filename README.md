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
<img width="1469" alt="image" src="https://github.com/user-attachments/assets/0158e12d-d61b-4c72-a335-7102b0c55c73" />
<img width="1464" alt="image" src="https://github.com/user-attachments/assets/edfffd42-163b-4070-a2fe-39983aa30d6a" />
<img width="1469" alt="image" src="https://github.com/user-attachments/assets/7447b3cb-bac0-4323-8b98-6350f7f72206" />
<img width="1467" alt="image" src="https://github.com/user-attachments/assets/afd1d59a-a760-414e-9745-455bdc0b6736" />
<img width="1467" alt="image" src="https://github.com/user-attachments/assets/b09ced04-47f3-4ab7-b31a-8ae2e65eccdc" />
<img width="1465" alt="image" src="https://github.com/user-attachments/assets/d7124b03-6903-4dcd-9e4f-3400fdd6f942" />
<img width="1464" alt="image" src="https://github.com/user-attachments/assets/c52d5dbd-c08a-435b-a55c-c3640d5c7703" />
<img width="1470" alt="image" src="https://github.com/user-attachments/assets/67902266-ecc7-470b-bcba-3235d9847436" />




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
