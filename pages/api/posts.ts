import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const posts = await prisma.post.findMany();
        const postResponse = posts.map((post) => ({
          id: post.id,
          title: post.title,
        }));
        res.status(200).json(postResponse);
      } catch (e) {
        console.error('Request error', e);
        res.status(500).json({ error: 'Error fetching posts' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
