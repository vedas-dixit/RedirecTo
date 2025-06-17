import { useState, useEffect } from "react";
import { URLTableProps } from "../types/dashboard.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../UI/card";
import { Badge, Copy, Edit, ExternalLink, Shield, Trash2 } from "lucide-react";
import { Button } from "../../UI/button";

// Dynamic import for client-side only
const LiquidGlassWrapper = ({ children }: { children: React.ReactNode }) => {
  const [LiquidGlass, setLiquidGlass] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Dynamic import to avoid SSR issues
    import('liquid-glass-react').then((module) => {
      setLiquidGlass(() => module.default);
    });
  }, []);

  if (!isClient || !LiquidGlass) {
    return <>{children}</>;
  }

  return <LiquidGlass>{children}</LiquidGlass>;
};

export const URLTable: React.FC<URLTableProps> = ({ urls, isGuest }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const handleCopy = async (url: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  const handleEdit = (id: number): void => {
    console.log("Edit URL:", id);
  };

  const handleDelete = (id: number): void => {
    console.log("Delete URL:", id);
  };

  const handleVisit = (url: string): void => {
    window.open(url, "_blank");
  };

  const paginatedUrls = urls.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const totalPages = Math.ceil(urls.length / itemsPerPage);

  return (
    <Card className="bg-white/5 backdrop-blur-md border border-none shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:shadow-black/30 h-full relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <LiquidGlassWrapper>
          <div className="w-full h-full" />
        </LiquidGlassWrapper>
      </div>
      <CardHeader className="relative z-10">
        <CardTitle className="text-white/90 drop-shadow-sm">Your URLs</CardTitle>
        <CardDescription className="text-white/70">
          Manage and track your shortened URLs
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left p-2 text-white/80 font-medium">Short URL</th>
                <th className="text-left p-2 text-white/80 font-medium">Destination</th>
                <th className="text-left p-2 text-white/80 font-medium">Clicks</th>
                <th className="text-left p-2 text-white/80 font-medium">TTL</th>
                <th className="text-left p-2 text-white/80 font-medium">Status</th>
                <th className="text-left p-2 text-white/80 font-medium">Protected</th>
                <th className="text-left p-2 text-white/80 font-medium">Created</th>
                <th className="text-left p-2 text-white/80 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUrls.map((url) => (
                <tr
                  key={url.id}
                  className="border-b border-white/10 hover:bg-white/10 transition-colors"
                >
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <code className="text-white bg-black/10 px-2 py-1 rounded text-xs border border-white/20 drop-shadow-sm">
                        {url.shortUrl}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/70 hover:text-white hover:bg-white/10"
                        onClick={() => handleCopy(url.shortUrl)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                  <td className="p-2 max-w-xs">
                    <div
                      className="truncate text-white/80 drop-shadow-sm"
                      title={url.destination}
                    >
                      {url.destination}
                    </div>
                  </td>
                  <td className="p-2 text-white drop-shadow-sm">{url.clicks}</td>
                  <td className="p-2 text-white/80">{url.ttl}</td>
                    <td className="p-2">
                    {url.status === "Active" ? (
                      <div className="flex items-center justify-center w-5 h-5 bg-white rounded-full">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-5 h-5 bg-white rounded-full">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      </div>
                    )}
                    </td>
                  <td className="p-2">
                    {url.protected ? (
                      <Shield className="h-4 w-4 text-white drop-shadow-sm" />
                    ) : (
                      <span className="text-white/40">—</span>
                    )}
                  </td>
                  <td className="p-2 text-white/80">{url.createdAt}</td>
                  <td className="p-2">
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/70 hover:text-white hover:bg-white/10"
                        onClick={() => handleVisit(url.shortUrl)}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                      {!isGuest && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white/70 hover:text-white hover:bg-white/10"
                          onClick={() => handleEdit(url.id)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white/70 hover:text-red-400 hover:bg-red-600/20"
                        onClick={() => handleDelete(url.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {urls.length > itemsPerPage && (
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/30"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="flex items-center px-4 text-sm text-white/70">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/30"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage >= totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
