// pages/api/users/refreshToken.ts

import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken'; // Import JWT library
import { JwtPayload } from 'jsonwebtoken'; // Import JwtPayload type
import { supabase } from '@/util/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { refreshToken }: { refreshToken: string } = req.body;

    const decoded: JwtPayload | string = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);

    if (typeof decoded === 'string') {
      throw new Error('Invalid token');
    }

    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET!, {
      expiresIn: '15m' 
    });

    return res.status(200).json({ token: accessToken });
  } catch (error) {
    console.error('Error refreshing token:', (error as Error).message);
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
}
