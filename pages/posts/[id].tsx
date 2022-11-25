import Layout from '../../components/layout';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllPostIds, getPostData, TPosts } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }: { postData: TPosts }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <header>
          <h1 className={utilStyles.headingXl}>
            {postData.title}
          </h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
        </header>
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml}} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};