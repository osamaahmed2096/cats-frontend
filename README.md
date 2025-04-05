## 📦 Tech Stack

- React (Next.js App Router)
- Tailwind CSS

## 🚀 Getting Started

### 1. Set up the backend

This frontend app depends on the [cats backend](../cats-backend).
Make sure it is running locally on the port defined in your `.env`.

Follow the backend README to install and run it.

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Create a .env file using .env.example:
```bash
cp .env.example .env
```

### 4. start the dev server
``` bash
npm run dev
```

Then visit
```
http://localhost:3000/welcome/<USER_ID>
```