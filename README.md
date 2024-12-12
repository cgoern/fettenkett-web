# fettenkett

fettenkett is a web application designed to help cyclists keep track of their bicycle maintenance. By connecting to your Strava account, Fettenkett Web can monitor the distance traveled by your selected bicycle and create maintenance reminders for individually selected parts of the bicycle.

## Features

- **Strava Integration**: Authorize with your Strava account to access your bicycles and track their usage.
- **Maintenance Reminders**: Set up reminders for different parts of your bicycle based on the distance traveled.
- **User-Friendly Interface**: Easy-to-use interface to manage your bicycles and maintenance schedules.

## Getting Started

To get started with Fettenkett Web, follow these steps:

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/cgoern/fettenkett-web.git
   cd fettenkett-web
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server**:

   ```bash
   npm run dev
   ```

   This will start the application on `http://localhost:5173`.

2. **Open your browser** and navigate to `http://localhost:5173` to see the application in action.

## Acknowledgements

- [Strava API](https://developers.strava.com/) for providing the data and integration capabilities.
