import fs from "fs";
import matter from "gray-matter";
import Link from 'next/link'
import Image from 'next/image'

import { BsArrowLeft } from 'react-icons/bs'

import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Post({frontmatter, content}) {

    const {title, author, category, date, bannerImage, tags} = frontmatter

    return <main className="h-screen px-4 md:px-12 max-w-4xl mx-auto">
      <div className="mt-12">
        <Link href="/" className="text-3xl hover:text-gray-300">
          <BsArrowLeft />
        </Link>
      </div>
        <div className="mt-6 flex flex-col justify-center">
          <Image 
            src={bannerImage} 
            width="1200"
            height="0"
            alt="blog image"
            className="flex justify-center object-contain"
          />
          <h1 className="text-gray-600 mt-4 text-xl tracking-widest">{title}</h1>
          <h2 className="text-gray-500 mt-1">{date}</h2>
          <h3 className="text-gray-400 text-sm mt-2">{tags.join()} </h3>
          <ReactMarkdown className="text-left my-10">{content}</ReactMarkdown>
        </div>
    </main>
}

export async function getStaticPaths() {
  const files = fs.readdirSync('./src/pages/posts');

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
    const fileName = fs.readFileSync(`./src/pages/posts/${slug}.md`, 'utf-8');
    const { data: frontmatter, content } = matter(fileName);
    return {
      props: {
        frontmatter,
        content,
      },
    };
  }
