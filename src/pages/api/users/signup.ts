import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { supabase } from '@/util/supabase';
import { User } from '@/interfaces/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, ...userData }: User = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds parameter

    // Insert user data into the 'users' table
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        email,
        password: hashedPassword, // Store the hashed password in the database
        ...userData,
      })
      .single();

    if (error) throw error;

    // Return the user object without sensitive information
    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error signing up user:', (error as Error).message);
    return res.status(500).json({ error: 'Error signing up user' });
  }
}
