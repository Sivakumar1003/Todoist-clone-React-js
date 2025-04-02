# Todoist Clone

This is a **Todoist Clone** built using **React.js**, **Ant Design**, **Redux** and **Tailwind CSS**. The application allows users to manage tasks, projects, and favorites without requiring a backend or database.

## 🚀 Live Demo

🔗 master branch [Todoist Clone](https://todoist-clone-react-js.vercel.app/)

## 📂 Project Structure
```
todoist-clone-react-js/ 
├── public/ # Static assets 
├── src/ # Source code 
│ ├── components/ # Reusable React components 
│ │ ├── pages/ # Page-level components 
│ │ ├── Task/ # Task based components 
│ │ └── Project/ # Project based components 
| ├── service/ # API requests
| │ ├── Project/ # Project based API request
| │ └── Task/ # Task based API request
| ├── config/ # Redux store
| ├── slices/ # slices for store
│ ├── index.css # CSS and styling files 
│ ├── App.jsx # Root component managing application structure 
│ ├── main.jsx # Entry point for rendering the app 
├── .gitignore # Specifies files to ignore in version control 
├── package.json # Project dependencies and scripts 
├── vite.config.js # Vite configuration settings 
├── README.md # Project documentation
```

## 🚀 Technologies Used

- **React.js**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Ant Design**: UI library providing pre-built components for enhanced user experience.
- **Redux**: Manages global store across the application.
- **Vite**: Next-generation frontend tooling for fast development and build processes.

## 📱 Responsive Design

- **Mobile-First Approach**: Ensures optimal user experience on smaller screens.
- **Flexbox & Grid Layouts**: Provides flexible and adaptive component positioning.
- **Media Queries**: Adjusts styles based on device screen sizes.
- **Ant Design Components**: Responsive by default, enhancing consistency across devices.

## 🔥 Features

- **Task Management**: Add, edit, and delete tasks seamlessly.
- **Project Organization**: Categorize tasks into specific projects for better organization.
- **Favorites**: Mark projects as favorites for quick and easy access.
- **State Management**: Utilizes React's `useState` and `useContext` for efficient state handling.
- **Responsive UI**: Adapts to various screen sizes, ensuring usability across devices.
- **Ant Design Integration**: Leverages Ant Design components for a polished and consistent UI.

## 🛠 Installation & Setup
Follow these steps to set up the project on your local machine:

1. **Clone the repository**:
   ```
   git clone https://github.com/Sivakumar1003/Todoist-clone-React-js.git
   ```
2. **Navigate to the project directory**:
    ```
    cd Todoist-clone-React-js
    ```
3. **Install dependencies**: 
    ```
    npm install
    ```
4. **Create a `.env` file in the root directory**and add the following environment variables:
    ```
    VITE_TODOIST_API_KEY=your_api_key_here
    VITE_TODOIST_API_URL=your_api_url_here
    ```
    * Replace `your_api_key_here` and `your_api_url_here` with the actual values required for API integration.

## 🚀 Deployment
This project is deployed on Vercel.

## 🔮 Future Enhancements
- [ ] **User Authentication**: Implement user login and registration to personalize task management.
- [ ] **Due Dates & Reminders**: Add functionality to set due dates and reminders for tasks.
- [ ] **Subtasks**: Enable breaking down tasks into smaller, manageable subtasks.
- [ ] **Drag & Drop Interface**: Integrate drag-and-drop functionality for task prioritization and organization.
- [ ] **Offline Support**: Allow users to access and manage tasks without an internet connection.

---
Made with ❤️ by [Sivakumar Nanchappan]

