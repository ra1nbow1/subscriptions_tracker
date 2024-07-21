# Subscription Tracker

## Description

Subscription Tracker is an application designed for managing user subscriptions. It allows users to add, edit, and
delete their subscriptions, as well as track total expenditures and monthly expenses. The application also includes a
Telegram bot that offers the same functionality as the website.

## Features

- **Docker support**
- User registration (with email confirmation) and authentication.
- Adding new subscriptions with fields for title, description, price, renewal period, start date, website (with link validation) and payments history categories (with autocompletion).
- Apple Calendar and Google Calendar integration
- Viewing a list of all user subscriptions.
- Editing existing subscriptions.
- Deleting subscriptions.
- Displaying total subscription expenses.
- Showing expenses for subscriptions in the current month.
- Telegram bot integration with the same features as the website.

## Technologies Used

- **Frontend**: [TypeScript](https://www.typescriptlang.org), [React](https://react.dev), [Redux Toolkit](https://redux-toolkit.js.org), [Tailwind CSS](https://tailwindcss.com).
- **Backend**: [TypeScript](https://www.typescriptlang.org), [Node.js](https://nodejs.org/en), [Express.js](https://expressjs.com), [Mongoose](https://mongoosejs.com), [JWT](https://jwt.io)
  for authentication.
- **Project Structure**: Client-server application with REST API for communication between frontend and backend.
- **Bot**: Python, [aiogram](https://docs.aiogram.dev/en/v3.1.1/index.html)
- **Deployment Tools:** [Docker](https://www.docker.com)

## Telegram Integration

If `VITE_WITH_TELEGRAM="true"` a new path `/telegram` will be available in the application, which is just the
`WEBAPP_URL` for the bot. The Telegram connection button will also be displayed in the header.
When `VITE_WITH_TELEGRAM="false"` all these functions are not available.

## Installation and Running

### Using Docker

**Telegram mini app is unavailable while using Docker due to Telegram restrictions to `http`!**

1. Clone the repository:

```bash
git clone https://github.com/ra1nbow1/subscriptions_tracker.git
cd subscription_tracker
```

2. Set up environment variable:

_MongoDB is deployed locally in a separate container, so `MONGO_URI` is not needed. All ports are set._

```bash
# /server/api/.env
TOKEN_KEY="your_token"

# you can create /.env to run the bot
VITE_WITH_TELEGRAM="true"
```

2. Edit `server/api/package.json`

Add this line:

```json
{
  "type": "module"
}
```

3. Run Docker container:

```bash
docker-compose up --build -d
```

### Without Docker

1. Clone the repository:

```bash
git clone https://github.com/ra1nbow1/subscriptions_tracker.git
cd subscription_tracker
```

2. Install dependencies for both client, server, and bot:

```bash
npm install # client

cd /server/api # server
npm install

cd ../../bot # bot
pip install -r requirements.txt
```

3. Create environment files for the bot, server, and project root:

```bash
# /bot/.env
BOT_TOKEN="" # Your Telegram bot token
WEBAPP_URL=".../telegram" # URL where the frontend is hosted (I used netlify)
VITE_WITH_TELEGRAM="true/false" # Flag to show if Telegram integration should be enabled

# /server/api/.env
MONGO_URI="" # Your MongoDB connection string
TOKEN_KEY="" # Key for JWT
MAIL_SERVER="" # URL for SMTP server
MAIL_USER="" # Your mail user
MAIL_PASSWORD="" # Your mail password
BASE_URL="http://localhost:5555" # Base URL that will be used in email confirmation link (localhost for development)

# /.env
BACKEND_URL="" # URL where the backend is hosted (I used ngrok)
VITE_WITH_TELEGRAM="true/false" # Flag to show if Telegram integration should be enabled
```

4. Start the server and client:

```bash
# Start the server
cd server/api
npm run dev

# Start the client
npm run dev
```

5. If you want to run the bot, ensure the frontend and backend are hosted. Don't forget to edit environment variable.
   For example, you can use ngrok for the backend:

```bash
ngrok http http://localhost:5555/
```

6. Then, start the bot:

```bash
python bot/main.py
```
