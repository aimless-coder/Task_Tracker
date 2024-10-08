# Task Management CLI Tool

`task-cli` is a command-line tool for managing tasks. It allows you to add, update, delete, and list tasks, as well as mark them as done or in-progress.

For more information on this project idea, visit [roadmap.sh](https://roadmap.sh/projects/task-tracker)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file_structure)
## Features

- **Add a new task** with a description.
- **Update a task** description by its ID.
- **Delete a task** by its ID.
- **Mark a task as done** or in-progress.
- **List tasks** filtered by status (e.g., "todo", "done", "in-progress").

## Prerequisites


- [Node.js](https://nodejs.org/) (v12.0 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)
## Installation

1. Clone this repository to your local machine:

    ```sh
    https://github.com/aimless-coder/Task_Tracker.git
    ```

2. Navigate to the project directory:

    ```sh
    cd task-cli
    ```

3. Install the required dependencies:

    ```sh
    npm install
    ```

4. Make the script executable:

    ```sh
    chmod +x index.js
    ```

5. Add the script to your PATH to use it globally:

    ```sh
    npm link
    ```


## Usage

Run the `task-cli` with one of the following commands:

```sh
task-cli [command]
```

### Commands
- `add "task description"`
Adds a new task with the specified description.
**Example:** `task-cli add "Finish the report"`

- `update [task ID] "new description"`
Updates the task with the specified ID.
**Example:** `task-cli update 2 "Start the presentation"`

- `delete [task ID]`
Deletes the task with the specified ID.
**Example:** `task-cli delete 3`

- `mark-done [task ID]`
Marks the task with the specified ID as done.
**Example:** `task-cli mark-done 4`

- `mark-in-progress [task ID]`
Marks the task with the specified ID as in-progress.
**Example:** `task-cli mark-in-progress 5`

- `list [status]`
Lists all tasks. Optionally, filter by status: "todo", "done", or "in-progress".
**Example:** `task-cli list done`

- `help`
Displays the help message with all available commands.
**Example:** `task-cli help`
## File Structure

- index.js: The main script file containing all task management logic.
- tasks.json: A JSON file that stores all tasks.
