import type { NextPage } from 'next';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getTopTracks } from '../lib/spotify';
import type { TrackApiResponse, Track } from '../types/spotify';

import Tracks from '../components/Tracks';

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await getTopTracks();
  const { items }: TrackApiResponse = await response.json();
  const tracks = items.slice(0, 10).map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }));

  if (!tracks) {
    return {
      notFound: true,
    };
  }

  return {
    props: { tracks }, // will be passed to the page component as props
    revalidate: 60,
  };
};

const Home: NextPage<{ tracks: Track[] }> = ({ tracks }) => {
  return (
    <div>
      <Head>
        <title>Tameblemist</title>
        <meta name="description" content="Tameablemist personal website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-3xl">
        <Tracks tracks={tracks} />
      </main>
    </div>
  );
};

export default Home;
