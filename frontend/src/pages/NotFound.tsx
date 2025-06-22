import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, MapPin } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-pink-50 to-sage-100 p-4">
      <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm border-2 border-sage-200 shadow-2xl">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <CardTitle className="text-4xl font-fredoka font-bold text-sage-800 mb-2">
            404
          </CardTitle>
          <p className="text-xl text-sage-600 mb-2">Quest Path Not Found!</p>
          <p className="text-sm text-sage-500 italic">
            Looks like you've wandered off the beaten path, adventurer!
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="p-4 cozy-accent rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-sage-700">
              <MapPin className="w-5 h-5" />
              <p className="text-sm font-medium">
                The quest you seek doesn't exist in our magical realm.
              </p>
            </div>
          </div>
          
          <Button asChild className="quest-button w-full">
            <a href="/">
              <Home className="w-4 h-4 mr-2" />
              Return to Quest House
            </a>
          </Button>
          
          <div className="flex items-center justify-center space-x-2 text-sage-600 text-xs">
            <span>🧚‍♀️</span>
            <p className="italic">"Every great adventurer gets lost sometimes!" - Spryte</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
