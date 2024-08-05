import { deleteTask } from "@/modules/taskManager";
import type { NextApiRequest, NextApiResponse } from "next";


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>,
) {

  if(req.method === 'POST'){
    const { taskId } = req.body;
    deleteTask(taskId);
   res.status(200).json({successful: true}); 
  } else {
    res.status(404).end('Only Post is allowed!')
  }
}
