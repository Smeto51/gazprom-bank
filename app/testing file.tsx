import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hello World - Next.js + TypeScript</title>
        <meta name="description" content="A simple Hello World app with Next.js and TypeScript" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Hello, World!</h1>
        <p>Welcome to Next.js with TypeScript.</p>
      </main>
    </div>
  );
};

export default Home;