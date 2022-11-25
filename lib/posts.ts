import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), 'posts');

export type TPosts = {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
}

export function getSortedPostsData(): TPosts[] {
  // Get file names  under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    // use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  // @ts-ignore
  return allPostsData.sort(({ date: a}, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  // use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}