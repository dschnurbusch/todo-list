# Todo List Application

This is a feature-rich todo list application built with JavaScript, utilizing modern web development practices and tools.

## Features

-   Create, edit, and delete tasks
-   Organize tasks into multiple lists
-   Set task priorities and due dates
-   Mark tasks as complete
-   Move tasks between lists
-   Persistent storage using localStorage

## Technical Stack

-   Vanilla JavaScript for core functionality
-   Webpack for bundling and development server
-   Babel for JavaScript compatibility
-   CSS for styling
-   HTML5 for structure

## Project Structure

The application follows a modular architecture with the following key components:

-   `TaskService`: Manages task-related operations
-   `ListService`: Handles list management
-   `TaskUI`: Renders task-related UI elements
-   `ListUI`: Manages list-related UI components
-   `TaskEditModal`: Provides a modal for task creation and editing
-   `PubSub`: Implements a publish-subscribe pattern for event handling

## Getting Started

1. Clone the repository
2. Run `npm install` to install dependencies
3. Use `npm start` to run the development server
4. Open `http://localhost:9000` in your browser

## Building for Production

Run `npm run build` to create a production-ready bundle in the `dist` directory.

## Dependencies

-   date-fns: For date manipulation
-   Various development dependencies for Webpack, Babel, and loaders

## Browser Compatibility

This application is designed to work in modern browsers that support ES6+ features and localStorage.
