import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import { posts } from "@/data/posts";
import Seo from "@/components/Seo";
import NotFound from "./NotFound";

const SITE_URL = "https://www.williamgray.dev";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

const BlogPost = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <NotFound />;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    keywords: post.tags.join(", "),
    url: `${SITE_URL}/blog/${post.slug}`,
    author: { "@type": "Person", name: "William S. Gray", url: `${SITE_URL}/` },
    image: `${SITE_URL}/og-image.png`,
  };

  return (
    <section className="px-4 py-16">
      <Seo title={`${post.title} | William S. Gray`} description={post.excerpt} path={`/blog/${post.slug}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="container mx-auto max-w-2xl">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={15} /> All posts
        </Link>

        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="inline-flex items-center gap-1">
              <Clock size={12} /> {post.readingTime}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">{post.title}</h1>
          <div className="flex flex-wrap gap-1.5 mb-10">
            {post.tags.map((t) => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {t}
              </span>
            ))}
          </div>
        </motion.header>

        <div className="space-y-5 text-muted-foreground leading-relaxed">
          {post.content.map((block, i) => {
            if (block.type === "h2")
              return (
                <h2 key={i} className="text-xl font-bold text-foreground pt-4">
                  {block.text}
                </h2>
              );
            if (block.type === "quote")
              return (
                <blockquote key={i} className="clay-sm px-5 py-4 text-foreground font-medium italic">
                  “{block.text}”
                </blockquote>
              );
            if (block.type === "ul")
              return (
                <ul key={i} className="space-y-2 list-disc pl-5">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            return <p key={i}>{block.text}</p>;
          })}
        </div>

        <div className="clay-lg p-8 text-center mt-14">
          <h2 className="text-lg font-bold mb-2">Let's build something</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Have a project or idea you want to bring to life? I'd love to hear about it.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 rounded-clay bg-primary text-primary-foreground font-semibold clay-hover transition-all text-sm"
          >
            Get in touch
          </Link>
        </div>
      </article>
    </section>
  );
};

export default BlogPost;
