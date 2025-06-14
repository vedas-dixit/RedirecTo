import { useState } from "react";
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
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Your URLs</CardTitle>
        <CardDescription className="text-zinc-400">
          Manage and track your shortened URLs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left p-2 text-zinc-300">Short URL</th>
                <th className="text-left p-2 text-zinc-300">Destination</th>
                <th className="text-left p-2 text-zinc-300">Clicks</th>
                <th className="text-left p-2 text-zinc-300">TTL</th>
                <th className="text-left p-2 text-zinc-300">Status</th>
                <th className="text-left p-2 text-zinc-300">Protected</th>
                <th className="text-left p-2 text-zinc-300">Created</th>
                <th className="text-left p-2 text-zinc-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUrls.map((url) => (
                <tr
                  key={url.id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/30"
                >
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <code className="text-orange-400 bg-zinc-800 px-2 py-1 rounded text-xs">
                        {url.shortUrl}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                        onClick={() => handleCopy(url.shortUrl)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                  <td className="p-2 max-w-xs">
                    <div
                      className="truncate text-zinc-300"
                      title={url.destination}
                    >
                      {url.destination}
                    </div>
                  </td>
                  <td className="p-2 text-white">{url.clicks}</td>
                  <td className="p-2 text-zinc-300">{url.ttl}</td>
                  <td className="p-2">
                    <Badge
                      className={
                        url.status === "Active"
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-zinc-700 text-zinc-300"
                      }
                    >
                      {url.status}
                    </Badge>
                  </td>
                  <td className="p-2">
                    {url.protected ? (
                      <Shield className="h-4 w-4 text-orange-500" />
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="p-2 text-zinc-300">{url.createdAt}</td>
                  <td className="p-2">
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                        onClick={() => handleVisit(url.shortUrl)}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                      {!isGuest && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                          onClick={() => handleEdit(url.id)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-zinc-400 hover:text-red-400 hover:bg-red-900/20"
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
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="flex items-center px-4 text-sm text-zinc-400">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
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
