# Smart Study Space Management and Reservation System (S3-MRS)

## Overview
The Smart Study Space Management and Reservation System (S3-MRS) is a modern web application developed for Ho Chi Minh City University of Technology – VNU (HCMUT) as an assigment for the course "Software Engineering". 

## Features

### For Students
- Easy access to study space reservations through web interface
- Flexible booking system for various study spaces
- Real-time space availability checking
- Different space types for individual study, group work, and mentoring sessions
- Automatic reminder notifications
- User authentication through HCMUT's SSO system

### For Administrators
- Comprehensive space management dashboard
- Real-time monitoring of space utilization
- Booking approval system
- Usage analytics and reporting
- Equipment and facility management

## Technology Stack
- Frontend: React + Vite
- Routing: React Router DOM v7
- UI Components: Custom components with CSS
- Backend: JSON Server (development)
- Authentication: HCMUT SSO Integration
- Icons: Font Awesome

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation
1. Clone the repository
```bash
git clone [repository-url]
cd Smart-Study-Space-Management
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Start the JSON server (in a separate terminal)
```bash
npm run server
```

The application will be available at `http://localhost:5173`

### Environment Setup
- Make sure to have all required environment variables set up
- Configure the backend API endpoints
- Set up the HCMUT SSO authentication credentials

## Project Structure
```
src/
├── components/         # Reusable UI components
│   ├── Admin/         # Admin-specific components
│   └── Student/       # Student-specific components
├── pages/             # Main page components
├── styles/            # CSS styles
├── data/             # Mock data and configurations
└── assets/           # Static assets
```

## Features in Development
- IoT integration for automatic space status updates
- QR code check-in system
- Automated device control (lights, AC)
- Mobile application
- Advanced analytics dashboard
- Real-time occupancy monitoring
