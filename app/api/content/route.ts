import { NextResponse } from 'next/server';
import { getMdxContent, listMdxFiles } from '@/lib/mdx';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'legal'; // 'legal' or 'settings'
  const file = searchParams.get('file') || searchParams.get('page');

  if (file) {
    const content = await getMdxContent(type, file);
    if (!content) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    return NextResponse.json(content);
  }

  // If no file, list all and their titles
  const files = await listMdxFiles(type);
  const results = await Promise.all(
    files.map(async (f) => {
      const content = await getMdxContent(type, f);
      return {
        id: f,
        label: content?.frontmatter?.title || f,
        content: content,
      };
    })
  );

  return NextResponse.json(results);
}
