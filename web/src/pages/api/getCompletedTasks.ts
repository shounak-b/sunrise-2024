import Task from "@/model/Task";
import { getActiveTasks, getCompletedTasks } from "@/modules/taskManager";
import type { NextApiRequest, NextApiResponse } from "next";


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task[]>,
) {
  res.status(200).json(getCompletedTasks());
}
