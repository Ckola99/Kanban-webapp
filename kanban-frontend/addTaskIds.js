import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Load your JSON data (replace 'data.json' with your actual JSON file path)
const filePath = './data.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Function to add IDs to tasks recursively
function addIdsToTasks(boards) {
	boards.forEach(board => {
		board.columns.forEach(column => {
			column.tasks.forEach(task => {
				if (!task.id) {
					task.id = uuidv4(); // Generate a unique ID for each task
				}

				// Optionally, add IDs to subtasks
				task.subtasks.forEach(subtask => {
					if (!subtask.id) {
						subtask.id = uuidv4();
					}
				});
			});
		});
	});
}

// Add IDs to tasks
addIdsToTasks(data.boards);

// Save the updated JSON data back to the file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
console.log('Task IDs have been added successfully!');
