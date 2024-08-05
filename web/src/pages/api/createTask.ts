import Task from "@/model/Task";
import { createTask } from "@/modules/taskManager";
import type { NextApiRequest, NextApiResponse } from "next";
import { title } from "process";


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Object>,
) {

  if(req.method === 'POST'){
    const { data }: { data: Task } = req.body;
    
    createTask(data.title, data.description, data.persona, data.group);
   res.status(200).json({successful: true}); 
  } else {
    res.status(404).end('Only Post is allowed!')
  }
}
