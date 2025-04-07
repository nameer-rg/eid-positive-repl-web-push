import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import FormLayout from "@/components/layouts/FormLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <FormLayout>
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
          <p className="text-xl text-gray-400 mb-8">Oops! The page you're looking for doesn't exist :(</p>
          <Link to="/" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Return to Home →
          </Link>
        </div>
      </div>
    </FormLayout>
  );
};

export default NotFound;
