import Head from "next/head"
import Link from "next/link"

import Layout from "../../components/layout"

export default function FirstPost() {
  return (
    <Layout home={false}>
      <Head>
        <title>First Post</title>
      </Head>
      <h2>First Post</h2>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </Layout>
  )
}