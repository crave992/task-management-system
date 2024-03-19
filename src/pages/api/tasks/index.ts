// pages/api/tasks/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/util/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    // Retrieve task from Supabase table where task_id matches the provided ID
    const { data: task, error } = await supabase.from('tasks').select('*').eq('id', id).single();

    if (error) {
      throw error;
    }

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ task });
  } catch (error) {
    console.error('Error retrieving task:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the task' });
  }
}
