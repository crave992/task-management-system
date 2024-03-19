import Image from "next/image";
import { Inter } from "next/font/google";
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <Head>
          <title>Task Manager</title>
          <meta name="description" content="Beautiful landing page for task management system" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="#">Task Manager</a>
          </h1>

          <p className={styles.description}>
            Get organized, stay productive
          </p>

          <div className={styles.grid}>
            <a href="#" className={styles.card}>
              <h3>Create Task &rarr;</h3>
              <p>Create new tasks quickly and easily.</p>
            </a>

            <a href="#" className={styles.card}>
              <h3>Manage Tasks &rarr;</h3>
              <p>Effortlessly manage your tasks.</p>
            </a>

            <a href="#" className={styles.card}>
              <h3>Track Progress &rarr;</h3>
              <p>Track your progress and stay on top of your goals.</p>
            </a>

            <a href="#" className={styles.card}>
              <h3>Collaborate &rarr;</h3>
              <p>Collaborate with your team seamlessly.</p>
            </a>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>
            Powered by{' '}
            <a href="#" target="_blank" rel="noopener noreferrer">
              Next.js
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
