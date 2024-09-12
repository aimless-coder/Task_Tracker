#!/usr/bin/env node

import fs from 'fs';

//To beautify the app. Can be done without these.
import chalk from 'chalk';
import Table from 'cli-table3';

const globalState = { data: [] }; //Ensures all task operations operate on the same consistent data set.
const argv = process.argv.slice(2);
const filePath = './tasks.json';

//Create JSON File, if not there.
const initializeFile = () => {
    if (!fs.existsSync(filePath)){
        try {
            fs.writeFileSync(filePath, JSON.stringify(globalState.data, null, 2));
            console.log(chalk.blue('tasks.json created.'));
        } catch (error) {
            console.error(chalk.red('Error creating tasks.json:', error.message));
        }
    }
};

//Load JSON file whenever needed
const loadTasks = () => {
    initializeFile(); //Initialize file before loading.
    try {
        if (fs.existsSync(filePath)) {
            const dataBuffer = fs.readFileSync(filePath);
            const dataJSON = dataBuffer.toString();
            globalState.data = JSON.parse(dataJSON);
        }
    } catch (error) {
        console.error(chalk.red('Error loading tasks:', error.message));
    }
};

//Save in JSON file
const saveTasks = () => {
    try {
        const dataJSON = JSON.stringify(globalState.data, null, 2);
        fs.writeFileSync(filePath, dataJSON);
    } catch (error) {
        console.error(chalk.red('Error saving tasks:', error.message));
    }
};

//Add new task
const addTask = () => {
    loadTasks();
    const createTask = {
        id : globalState.data.length > 0 ?  globalState.data[globalState.data.length - 1].id + 1 : 1,
        description: argv[1],
        status: 'todo',
        createdAt: new Date(),
        updatedAt: new Date()
    }
        globalState.data.push(createTask);
        saveTasks();
        console.log(chalk.green('Task added successfully.'));

};


//Update Task description and time-stamp.
const updateTask = () => {
    loadTasks();
    const taskId = parseInt(argv[1]);
    const taskToUpdate = globalState.data.find(t => t.id === taskId);

    if (!taskToUpdate) {
        console.log(chalk.red(`Task with id ${taskId} not found.`));
        return;
    }
    
    if (!(argv[2])) { 
        console.log(chalk.red(`Task cannot be empty.`));
        process.exit(1);
    } else {
        taskToUpdate.description = argv[2]; 
        taskToUpdate.updatedAt = new Date();
        saveTasks();
        console.log(chalk.green(`Task with id ${taskId} updated successfully.`));
    }
};

//Deletion of task.
const deleteTask = () => {
    loadTasks();

    const taskId = parseInt(argv[1]);
    const initialLength = globalState.data.length;

    globalState.data = globalState.data.filter(t => t.id !== taskId);

    if (globalState.data.length === initialLength) {
        console.error(chalk.red(`Task with id ${taskId} not found.`));
        return;
    }

    saveTasks();
    console.log(chalk.green(`Task with id ${taskId} deleted successfully.`));
};

// Update task status as "done" and update time stamp.
const markTaskDone = () => {
    loadTasks();

    const taskId = parseInt(argv[1]);
    const taskToMark = globalState.data.find(t => t.id === taskId);

    if (!taskToMark) {
        console.error(chalk.red(`Task with id ${id} not found.`));
    } else {
        taskToMark.status = 'done'; 
        taskToMark.updatedAt = new Date();

        saveTasks();
        console.log(chalk.green(`Task with id ${taskId} marked as done.`));
    }
};

// Update task status as "in-progress" and update time stamp.
const markTaskInProgress = () => {
    loadTasks();

    const taskId = parseInt(argv[1]);
    const taskToMark = globalState.data.find(t => t.id === taskId);

    if (!taskToMark) {
        console.error(chalk.red(`Task with id ${taskId} not found.`));
    } else {
        taskToMark.status = 'in-progress';
        taskToMark.updatedAt = new Date();
        saveTasks();
        console.log(chalk.green(`Task with id ${taskId} marked as in-progress.`));
    }
};

//Render task in CLI.
const showTasks = () => {
    loadTasks();

    const table = new Table({
        head: ['ID', 'Description', 'Status', 'Created At', 'Updated At'],
        colWidths: [5, 30, 15, 25, 25]
    });

    const status = argv[1];
    const validStatus = ['todo', 'done', 'in-progress'];
    
    if(globalState.data.length < 1){
        console.error(chalk.red("No task found."));
        return;

    }else if(!status){

        globalState.data.forEach(task => {
            table.push([
                task.id,
                task.description,
                task.status,
                new Date(task.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
                new Date(task.updatedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
            ]);
        });
    } else if(!validStatus.includes(status)){
        console.error(chalk.red('Invalid status. Use "todo", "done" or "in-progress".'));
        return;

    } else {
        const filteredTasks = globalState.data.filter(t => t.status === status);

        if(filteredTasks.length < 1){
            console.log(chalk.red(`No task with status "${status}" found.`));
            return;

        } else {
            filteredTasks.forEach(task => {
                table.push([
                    task.id,
                    task.description,
                    task.status,
                    new Date(task.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
                    new Date(task.updatedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
                ]);
            });
        }
    }

    console.log(table.toString());
};

//Show how to use this application.
const showHelp = () => {

    console.log(`
${chalk.bold.magenta("Welcome to TASK TRACKER: A CLI based todo app")}

${chalk.bold('Usage:')} 
task-cli [command]

${chalk.bold('Commands:')}
  ${chalk.green('add')} "task description"              Adds a new task with the given description.
  ${chalk.green('update')} [task ID] "new description"  Updates the task with the specified ID.
  ${chalk.green('delete')} [task ID]                    Deletes the task with the specified ID.
  ${chalk.green('mark-done')} [task ID]                 Marks the task with the specified ID as done.
  ${chalk.green('mark-in-progress')} [task ID]          Marks the task with the specified ID as in-progress.
  ${chalk.green('list')} [status]                       Shows tasks. Optional status can be "todo", "done", or "in-progress".
  ${chalk.green('help')}                                Displays this help message.

`);
};

//Selection of Command.
switch(argv[0]){
    case "add" :
        addTask();
        break;
    
    case "update":
        updateTask();
        break;
    
    case "delete":
        deleteTask();
        break;
    
    case 'mark-done':
        markTaskDone();
        break;

    case 'mark-in-progress':
        markTaskInProgress();
        break;

    case "list":
        showTasks();
        break;

    case "help":
    default:
        showHelp();
        break;

};