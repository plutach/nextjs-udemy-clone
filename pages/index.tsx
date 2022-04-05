import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

// Types
import { ICourse } from '../types/index';

// Components
import CourseList from '../components/courseList';

// graphql
import { gql, useQuery } from '@apollo/client';
import client from '../lib/apollo-client';

type Courses = {
  courses: ICourse[];
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query CourseList {
        developer_test_course {
          id
          cover_url
          price
          name
          short_description
          who_is_for
          long_description
          instructors {
            name
          }
          feedbacks {
            rating
          }
        }
      }
    `,
  });
  console.log('props', data.developer_test_course);
  return {
    props: {
      courses: data.developer_test_course,
    },
  };
}

const Home: NextPage<Courses> = (props: Courses) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to our courses</h1>
        <hr />
        <div className={styles.grid}>
          <CourseList courseList={props.courses} />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
