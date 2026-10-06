import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <section className="px-4 py-16 min-h-[calc(100vh-12rem)] flex items-center justify-center">
      <div className="clay p-10 sm:p-14 text-center max-w-xl">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-gradient mb-3">404</h1>
        <p className="text-lg font-semibold mb-2">Page not found</p>
        <p className="text-sm text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
<div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-clay bg-primary text-primary-foreground font-semibold clay-hover transition-all text-sm"
          >
            <Home size={16} /> Back to Home
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-3 rounded-clay clay-sm clay-hover text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            See projects
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 rounded-clay clay-sm clay-hover text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
