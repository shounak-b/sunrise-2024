
import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];
let activeGroupId: number = 1;
let taskIndex: Map<string, number> = new Map();
let lastIndex:number = 10;


export function initializeTasks() {
    tasks = [...initialTasks];
    tasks.forEach((task, idx) => taskIndex.set(task.title, idx))
}

export function getActiveTasks(): Task[] {
    return tasks.filter(task => task.group <= activeGroupId && task.completed == false);
 
}

export function getCompletedTasks(): Task[] {

    return tasks.filter(task => task.completed==true)

}

export function getAllTasks(): Task[] {

    return tasks;
 
}

export function completeTask(taskTitle: string): void {
        const taskId = taskIndex.get(taskTitle);
        
        if(taskId!==undefined && taskId>=0)
            tasks[taskId].completed=true;
        
        if(tasks.filter(task => task.group<=activeGroupId && task.completed === false).length == 0)
            activeGroupId++;
  
}

export function createTask(title: string, description: string, persona: string, group: number): void {

    let newTask: Task = new Task(lastIndex+1, title, description, persona, group);
    
    tasks.push(newTask);
    taskIndex.set(title, lastIndex);
    lastIndex++;
  
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
    const idx = tasks.findIndex(task => task.id === taskId);
    if(idx === -1)
            return;
    tasks[idx] = {
        ...tasks[idx],
        ...updatedTask
    };
 
}

export function deleteTask(taskId: number): void {
    const idx = tasks.findIndex(task => task.id === taskId);;
    if(idx !== -1 && tasks[idx] !== undefined){
        taskIndex.delete(tasks[idx].title);
        tasks = tasks.filter(task => task.id !== taskId);
    }
}
