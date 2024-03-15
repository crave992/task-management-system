import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '@/util/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password }: { email: string, password: string } = req.body;
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;

    if (!users) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, users.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If the password matches, generate a JWT token and a refresh token
    const token = jwt.sign({ email: users.email, userId: users.id }, process.env.JWT_SECRET!, {
      expiresIn: '1d'
    });

    const refreshToken = jwt.sign({ userId: users.id }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: '7d' 
    });

    const { password: hashedPassword, ...userData } = users;
    return res.status(200).json({ user: userData, token, refreshToken });
  } catch (error) {
    console.error('Error logging in user:', (error as Error).message);
    return res.status(500).json({ error: 'Error logging in user' });
  }
}
