import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const CONTENT_PATH = path.join(process.cwd(), 'content');

export async function getMdxContent(subfolder: string, fileName: string) {
  const filePath = path.join(CONTENT_PATH, subfolder, `${fileName}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    source: mdxSource,
    frontmatter: data,
  };
}

export async function listMdxFiles(subfolder: string) {
  const dirPath = path.join(CONTENT_PATH, subfolder);
  if (!fs.existsSync(dirPath)) return [];
  
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx'));
  return files.map(f => f.replace('.mdx', ''));
}
