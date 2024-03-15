import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle GET request
  if (req.method === 'GET') {
    // Send a JSON response with a greeting message
    res.status(200).json({ message: 'Hello, world!' });
  } else {
    // Handle other HTTP methods
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}