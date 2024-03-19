import Image from "next/image";
import { Inter } from "next/font/google";
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Link from "next/link";

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
            <Link href="/login" className={styles.card}>
              <h3>Login &rarr;</h3>
              <p>Login to create new tasks quickly and easily.</p>
            </Link>

            <Link href="/sign-up" className={styles.card}>
              <h3>Sign Up &rarr;</h3>
              <p>Sign up to effortlessly manage your tasks.</p>
            </Link>
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
