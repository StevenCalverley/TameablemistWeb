import type { NextApiRequest, NextApiResponse } from 'next';
import type { TrackApiResponse, Track } from '../../types/spotify';

import { getTopTracks } from '../../lib/spotify';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<{ tracks: Track[] }>
) => {
  const response = await getTopTracks();
  const { items }: TrackApiResponse = await response.json();

  const tracks = items.slice(0, 10).map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }));

  return res.status(200).json({ tracks });
};
