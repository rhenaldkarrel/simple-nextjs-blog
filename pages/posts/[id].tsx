import Layout from '../../components/layout';
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllPostIds, getPostData, TPosts } from '../../lib/posts';

export default function Post({ postData }: { postData: TPosts }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
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
  const postData = getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};