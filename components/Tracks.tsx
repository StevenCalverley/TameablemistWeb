import { FC } from 'react';
import type { Track } from '../types/spotify';

const Tracks: FC<{ tracks: Track[] }> = ({ tracks }) => {
  if (!tracks) return <div>Loading...</div>;

  return (
    <div className="mt-4">
      <h3 className="font-bold text-3xl tracking-tight text-black">
        Top Tracks
      </h3>
      <ul className="mt-1 space-y-3 divide-y max-w-3xl">
        {tracks &&
          tracks.map((track, idx) => (
            <li
              key={track.title}
              className="pt-3 flex items-baseline space-x-3"
            >
              <p className="text-sm text-gray-600">{idx + 1}</p>
              <div>
                <a
                  className="font-medium text-gray-900 truncate"
                  href={track.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {track.title}
                </a>
                <p className="text-gray-500">{track.artist}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Tracks;
