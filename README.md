# GoLedger Challenge

This is a challenge for a frontend developer position at GoLedger. Plese, follow the instructions in this readme file to be able to run the application.

## Prerequisites

- Node.js v18.17 (or later)

## Setup

1. Clone the repository

```bash
git clone https://github.com/lwfe/goledger-challenge-web.git
```

2. Install dependencies

```bash
cd goledger-challenge-web
npm install
```

3. Create a `.env` file in the root of the project

```bash
NEXT_PUBLIC_BASE_URL=<api_url>  # '/api' must be included here. Example: https://random.api.com/api

NEXT_PUBLIC_BASIC_AUTH_USERNAME=<username>
NEXT_PUBLIC_BASIC_AUTH_PASSWORD=<password>
```

## Running the app

### For a local development

```bash
npm run dev
```

### For a production build

```bash
npm run build
npm run start
```
