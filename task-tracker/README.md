# Task Flow — Task Tracker Web App

A clean, premium, and fully responsive browser-based **Task Tracker** built from scratch using HTML5, CSS3, JavaScript (ES6 Modules), and TypeScript. Developed as part of the Intern Day Assignment.

## Features

- **Semantic HTML5 Foundation**: Valid structure featuring `<header>`, `<main>`, `<section>`, and `<footer/>`.
- **Vanilla CSS styling**: Curated color palette, modern typography, micro-interactions, responsive grid alignments, and a full **Dark Mode** toggle.
- **Dynamic Render Cycle**: Zero DOM patching; utilizes `Array.map` and `Array.filter` to render lists and tables dynamically upon any state change.
- **TypeScript Core**: Fully typed properties via a custom `Task` interface and robust state management utilizing a generic-equipped `TaskManager` class.
- **Priority grouping**: Custom generic `groupBy` function to aggregate stats and populate a priority distribution table.
- **Data Persistence**: Instant local storage sync across additions, updates, toggles, or deletions.
- **Premium Stretch Additions**:
  - In-place task title editing.
  - One-click JSON data export.
  - Interactive List View vs Table View toggle.

## Project Structure

```
task-tracker/
├── index.html       # Application template containing DOM nodes & labels
├── style.css        # Premium styling sheet with dark mode properties
├── main.js          # Main coordinator importing TaskManager and rendering DOM
├── tasks.ts         # TypeScript interface, TaskManager class, and groupBy helper
├── tasks.js         # Compiled JavaScript output from tasks.ts (do not edit)
├── tsconfig.json    # TypeScript compiler configuration
└── README.md        # This documentation file
```
