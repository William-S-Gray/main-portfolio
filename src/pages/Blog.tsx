import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { posts } from "@/data/posts";
import Seo from "@/components/Seo";
import { pageMeta } from "@/data/pages";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

// Newest first, regardless of array order.
const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

const Blog = () => (
  <section className="px-4 py-16">
    <Seo {...pageMeta["/blog"]} path="/blog" />
    <div className="container mx-auto max-w-4xl">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          The <span className="text-gradient">Blog</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Notes on software engineering, AI, and building technology that solves real problems.
        </p>
      </motion.div>

      <div className="space-y-5">
        {sortedPosts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="clay p-6 sm:p-8 clay-hover"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="inline-flex items-center gap-1">
                <Clock size={12} /> {post.readingTime}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">
              <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {t}
                  </span>
                ))}
              </div>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Read <ArrowRight size={14} />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Blog;
