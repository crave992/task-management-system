// pages/api/tasks/create.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/util/supabase';
import { Task, TaskStatus } from '@/interfaces/Task';

interface TaskIdResponse {
  task_id: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Get the last task ID to determine the next task ID
      const { data: lastTaskId, error: taskIdError } = await supabase
        .from('tasks')
        .select('task_id')
        .order('task_id', { ascending: false })
        .limit(1);

      if (taskIdError) throw taskIdError;

      let taskId: string;

      // Generate the next available task ID
      if (lastTaskId && lastTaskId.length > 0) {
        const lastIdNumber = parseInt(lastTaskId[0].task_id.split('-')[1]);
        taskId = `TASK-${(lastIdNumber + 1).toString().padStart(2, '0')}`;
      } else {
        taskId = 'TASK-01';
      }

      // Create the task in the Supabase table
      const { data, error } = await supabase.from('tasks').insert({
        task_id: taskId,
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        status: TaskStatus.Todo, // Default status is Todo
        deleted: false,
        user_id: req.body.user_id,
        due_date: req.body.due_date,
      });

      if (error) throw error;

      return res.status(201).json({ task: data });
    } catch (error) {
      console.error('Error creating task:', (error as Error).message);
      return res.status(500).json({ error: 'Error creating task' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
