import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/util/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    // Assuming you have logic to retrieve the updated information for the task from the request body
    const updatedInfo = req.body; // Assuming the updated information is sent in the request body

    // Update the task with the provided ID in the database
    const { data: updatedTask, error } = await supabase
      .from('tasks')
      .update(updatedInfo)
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    // If the task was successfully updated, respond with a success message
    res.status(200).json({ message: `Task with ID ${id} has been edited`, updatedTask });
  } catch (error) {
    console.error('Error editing task:', error);
    res.status(500).json({ error: 'An error occurred while editing the task' });
  }
}
