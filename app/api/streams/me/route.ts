import { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from '@/lib/db'; // Assuming this path is correct
import { getServerSession } from 'next-auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle different HTTP methods using a switch statement
  switch (req.method) {
    case 'GET':
      try {
        const session = await getServerSession({req});

        // Validate session and user existence
        if (!session?.user?.email) {
          return res.status(403).json({ message: 'User is not authenticated' });
        }

        const user = await prismaClient.user.findFirst({
          where: {
            email: session.user.email,
          },
        });

        if (!user) {
          return res.status(403).json({ message: 'User not found' });
        }

        const streams = await prismaClient.stream.findMany({
          where: {
            userId: user.id,
          },
        });

        return res.status(200).json(streams);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

    default:
      // Handle unsupported methods (optional)
      return res.status(405).json({ message: 'Method not allowed' });
  }
}