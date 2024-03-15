// pages/api/tasks/remove/[taskId].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/util/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { taskId } = req.query;

    // Update the task in the database to set deleted = true
    const { data: updatedTask, error } = await supabase
      .from('tasks')
      .update({ deleted: true })
      .match({ task_id: taskId })
      .single();

    if (error) throw error;

    return res.status(200).json({ message: 'Task soft deleted successfully', task: updatedTask });
  } catch (error) {
    console.error('Error soft deleting task:', (error as Error).message);
    return res.status(500).json({ error: 'Error soft deleting task' });
  }
}
