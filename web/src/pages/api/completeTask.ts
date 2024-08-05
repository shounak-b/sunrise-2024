import Task from "@/model/Task";
import { completeTask } from "@/modules/taskManager";
import type { NextApiRequest, NextApiResponse } from "next";


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>,
) {

  if(req.method === 'POST'){
    const { title } = req.body;
    completeTask(title);
   res.status(200).json({successful: true}); 
  } else {
    res.status(404).end('Only Post is allowed!')
  }
}
