const Tracks = ({ tracks }) => {
  if (!tracks) return <div>Loading...</div>;

  return (
    <div className="mt-4">
      <h3 className="font-medium text-lg">My Top 10 Tracks</h3>
      <ul className="mt-2">
        {tracks &&
          tracks.map((track) => (
            <li key={track.title} className="text-sm text-gray-600">
              <span className="font-semibold">{track.title}</span> -{' '}
              <span className="">{track.artist}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Tracks;
