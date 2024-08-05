import Task from "@/model/Task";
import { getActiveTasks, initializeTasks } from "@/modules/taskManager";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>,
) {
    initializeTasks()
  res.status(200).json({successful: true});
}
