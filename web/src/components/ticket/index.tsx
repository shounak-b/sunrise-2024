"use client";

import Task from "@/model/Task";
import styles from "./styles.module.css";
import { BiCheck } from "react-icons/bi";

export interface TicketProps {
  task: Task;
  screen: string;
  onClick?: () => Promise<void>;
  disabled?: boolean;
}

export function Ticket({ task, screen, onClick, disabled }: TicketProps) {
  const buttonClass =
    screen === "completed"
      ? styles.hide
      : disabled || (screen === "progress" && task.completed === false)
      ? styles.buttonEnabled
      : styles.buttonDisabled;
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <span>
          <b>Task {task.id}</b>
        </span>
        <div className={buttonClass} onClick={onClick}>
          <BiCheck />
          Done
        </div>
      </div>
      <div className={styles.content}>
        <span className={styles.ticketName}>{task.title}</span>
        <span className={styles.description}>{task.description}</span>
      </div>
    </div>
  );
}
