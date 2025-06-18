# Booking Hotels App (Frontend)

This is the frontend of the Booking Hotels App. A responsive web application built with React and Vite. It allows users to search for hotels, view suggestions based on location, and make reservations.

Backend repository: [booking-hotels-app-backend](https://github.com/ManuelJLuna/booking-hotels-app-backend)

## Features

- Search hotels by city or country
- Select check-in and check-out dates
- View hotel suggestions
- Make hotel reservations
- Responsive and user-friendly interface

## Technologies Used

- React
- Vite
- React Router DOM
- React DatePicker

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ManuelJLuna/booking-hotels-app.git
cd booking-hotels-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)

## Backend Requirements

This project requires the backend to be running. You can find it here:  
[booking-hotels-app-backend](https://github.com/ManuelJLuna/booking-hotels-app-backend)

By default, the frontend expects the backend to be available at `http://localhost:8080`.  
You can update the base URL in the source code if needed.

## Project Structure

```
src/
├── components/             # Reusable UI components
│   └── cardComponent/      # Hotel suggestion card
├── pages/                  # Page components
│   ├── home/               # Home page
│   ├── hotel/              # Hotel detail and suggestions
├── assets/                 # Static files and images
├── App.jsx                 # Main application routes
└── main.jsx                # Application entry point
```

## License

This project is open-source and is distributed under the MIT License.

## Author

Created by Manu Luna — [GitHub Profile](https://github.com/ManuelJLuna)
