"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Task from "@/model/Task";
import { Ticket } from "../ticket";

export function TaskBoard() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task[]>([]);
  const [completedTask, setCompletedTask] = useState<Task[]>([]);
  const [smallestGroupId, setSetSmallestGroupId] = useState(1);

  const refreshList = async () => {
    const [activeResponse, completedResponse, allResponse] = await Promise.all([
      fetch("http://localhost:3000/api/getActiveTasks"),
      fetch("http://localhost:3000/api/getCompletedTasks"),
      fetch("http://localhost:3000/api/getAllTasks"),
    ]);

    if (!activeResponse.ok || !completedResponse.ok || !allResponse.ok) {
      throw new Error("INS");
    }
    const activeTask = (await activeResponse.json()) as Task[];
    const completedTask = (await completedResponse.json()) as Task[];
    let tasks: Task[] = (await allResponse.json()) as Task[];

    const activeTaskSet = new Set(activeTask.map((task) => task.id));
    const completedTaskSet = new Set(completedTask.map((task) => task.id));
    tasks = tasks.filter(
      (task) => !activeTaskSet.has(task.id) && !completedTaskSet.has(task.id)
    );

    if (activeTask.length == 1 && tasks.length > 0) {
      const [firstTask, ...remainingTask] = tasks;
      activeTask.push(firstTask);
      tasks = remainingTask;
    }

    setActiveTask(activeTask);
    setCompletedTask(completedTask);
    setAllTasks(tasks);

    if (activeTask.length > 0) {
      const smallestActive = activeTask.reduce((smallest, task) =>
        smallest === null || task.group < smallest.group ? task : smallest
      );
      setSetSmallestGroupId(smallestActive.group);
    }
  };

  const callCompleteTask = async (taskTitle: string) => {
    await fetch("http://localhost:3000/api/completeTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: taskTitle }),
    });

    await refreshList();
  };

  useEffect(() => {
    refreshList();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.subContainerHeading}>
          <h3>To-Do</h3>
          <div className={styles.count}>{allTasks.length}</div>
        </div>
        <ul>
          {allTasks.map((task) => (
            <li key={task.id}>
              <Ticket task={task} screen="todo" />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.subContainer}>
        <div className={styles.subContainerHeading}>
          <h3>In Progress</h3>
          <div className={styles.count}>{activeTask.length}</div>
        </div>
        <ul>
          {activeTask.map((task) => (
            <li key={task.id}>
              {task.group === smallestGroupId && (
                <Ticket
                  task={task}
                  screen="progress"
                  onClick={() => callCompleteTask(task.title)}
                  disabled={smallestGroupId === task.group}
                />
              )}

              {task.group !== smallestGroupId && (
                <Ticket task={task} screen="todo" />
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.subContainer}>
        <div className={styles.subContainerHeading}>
          <h3>Completed</h3>
          <div className={styles.count}>{completedTask.length}</div>
        </div>
        <ul>
          {completedTask.map((task) => (
            <li key={task.id}>
              <Ticket task={task} screen="completed" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
