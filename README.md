# 🚀 SpaceX Mission Explorer

A modern Angular application that displays SpaceX launch data with a sleek, space-themed UI. This project showcases SpaceX missions, rocket information, and launch details using the public SpaceX API.

## ✨ Features

- **Mission Dashboard**: Browse all SpaceX missions with a modern, responsive UI
- **Mission Details**: View comprehensive information about each mission
- **Year Filtering**: Filter missions by launch year
- **Search Functionality**: Search missions by name or rocket type
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Glassmorphism, animations, and space-themed design elements
- **Interactive Elements**: Hover effects, transitions, and micro-interactions
- **Image Gallery**: View mission images in a full-screen modal


## 🛠️ Technologies Used

- **Angular 17**: Latest version with standalone components
- **Angular Material**: UI component library
- **TypeScript**: Type-safe JavaScript
- **RxJS**: Reactive programming library
- **SpaceX API**: Public API for SpaceX data
- **SCSS**: Advanced styling with variables and mixins
- **Angular Animations**: For smooth transitions and effects

## 🚀 Installation

1. Clone the repository:

```shellscript
git clone https://github.com/Harrybandukda/101451857-lab-test2-comp3133
cd 101451857-lab-test2-comp3133
```


2. Install dependencies:

```shellscript
npm install
```


3. Start the development server:

```shellscript
ng serve
```


4. Open your browser and navigate to `http://localhost:4200`


## 📱 Usage

### Home Page

The home page provides an overview of the application features and quick access to the missions list.

### Missions List

Browse all SpaceX missions with key details:

- Mission name and patch
- Launch year
- Rocket information
- Success/failure status
- Brief mission description


### Mission Details

Click on "View Details" to see comprehensive information about a specific mission:

- Full mission description
- Rocket specifications
- Launch site information
- First stage and payload details
- External links (articles, videos, Wikipedia)
- Mission images gallery


### Filtering

Use the year filter to view missions from a specific launch year.

### Searching

Use the search box to find missions by name or rocket type.

## 🌐 API Information

This application uses the public SpaceX API to fetch mission data:

- Base URL: `https://api.spacexdata.com/v3`
- Endpoints used:

- `/launches`: Get all launches
- `/launches/:flight_number`: Get specific launch by flight number
- `/launches/year/:year`: Get launches by year

No API key is required as this is a public API.

## 📸 Screenshots

### Home Page
![Home Page](screenshot/HomePage.png)

### Missions List
![Missions List](screenshot/MissionPage.png)

### Mission Details
![Mission Details](screenshot/ViewDetailPage.png)



---
