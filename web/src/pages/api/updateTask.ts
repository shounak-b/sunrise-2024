import { updateTask } from "@/modules/taskManager";
import type { NextApiRequest, NextApiResponse } from "next";


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>,
) {

  if(req.method === 'POST'){
    const { taskId, data } = req.body;
    updateTask(taskId, data);
   res.status(200).json({successful: true}); 
  } else {
    res.status(404).end('Only Post is allowed!')
  }
}
