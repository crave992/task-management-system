// pages/api/tasks/[userId].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/util/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.query;
    // Retrieve tasks data from the 'tasks' table based on the provided user_id
    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .eq('deleted', true) // Filter where deleted is false
      .order('created_at', { ascending: false });

    if (error) throw error;

    return res.status(200).json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', (error as Error).message);
    return res.status(500).json({ error: 'Error fetching tasks' });
  }
}
