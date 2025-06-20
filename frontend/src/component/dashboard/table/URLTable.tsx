import { useState } from "react";
import { URLTableProps } from "../types/dashboard.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../UI/card";
import { Copy, Edit, ExternalLink, Shield, Trash2 } from "lucide-react";
import { Button } from "../../UI/button";
import { useUrlManagement } from "@/hooks/useUrlQueries";
import { LiquidGlassWrapper } from "../../UI/LiquidGlassWrapper";
import GlassyToast from "../../UI/GlassyToast";
import { useThemeStyles } from "../../../hooks/useThemeStyles";

export const URLTable: React.FC<URLTableProps> = ({ urls, isGuest }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showToast, setShowToast] = useState<boolean>(false);
  const itemsPerPage = 5;
  const { deleteUrl } = useUrlManagement();
  const styles = useThemeStyles();
  const gradients = styles.gradientAccents();
  const handleCopy = async (url: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(url);
      setShowToast(true);
      // Auto-hide toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  const handleEdit = (id: string): void => {
    console.log("Edit URL:", id);
  };

  const handleDelete = (id: string): void => {
    console.log("Delete URL:", id);
    deleteUrl(id);
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
    <Card className={`${styles.glassmorphicCard("primary")} h-full group`}>
      {/* Orange gradient overlay for extra depth */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradients.primary} opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="absolute inset-0 opacity-40 dark:opacity-60 group-hover:opacity-60 dark:group-hover:opacity-80 transition-opacity duration-500 pointer-events-none">
        <LiquidGlassWrapper>
          <div className="w-full h-full" />
        </LiquidGlassWrapper>
      </div>

      {/* Orange glowing accent border */}
      <div
        className={`absolute inset-0 rounded-lg bg-gradient-to-r ${gradients.glow} opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-500 pointer-events-none`}
      />

      <CardHeader className="relative z-10">
        <CardTitle
          className={`text-lg drop-shadow-sm ${styles.text("primary")} group-hover:text-white/100 dark:group-hover:text-orange-50 transition-colors duration-300`}
        >
          Your URLs
        </CardTitle>
        <CardDescription
          className={`${styles.text("muted")} group-hover:text-white/90 dark:group-hover:text-orange-200/80 transition-colors duration-300`}
        >
          Manage and track your URLs
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        {!urls || urls.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center h-80 ${styles.text("muted")}`}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-white/20 to-white/30 dark:from-orange-800/20 dark:to-orange-700/30 flex items-center justify-center backdrop-blur-sm border border-white/30 dark:border-white/20">
                <svg
                  className="w-8 h-8 text-white/70 dark:text-white/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <h3
                className={`text-lg font-medium mb-2 ${styles.text("secondary")}`}
              >
                No URLs Created Yet
              </h3>
              <p className={`text-sm ${styles.text("muted")}`}>
                Create your first URL to start tracking analytics and managing
                your links
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20 dark:border-orange-400/10">
                  <th
                    className={`text-left p-2 font-medium ${styles.text("secondary")}`}
                  >
                    URL
                  </th>
                  <th
                    className={`text-left p-2 font-medium ${styles.text("secondary")}`}
                  >
                    Destination
                  </th>
                  <th
                    className={`text-left p-2 font-medium ${styles.text("secondary")}`}
                  >
                    Clicks
                  </th>
                  <th
                    className={`text-left p-2 font-medium ${styles.text("secondary")}`}
                  >
                    TTL
                  </th>
                  <th
                    className={`text-left p-2 font-medium ${styles.text("secondary")}`}
                  >
                    Status
                  </th>
                  <th
                    className={`text-left p-2 font-medium ${styles.text("secondary")}`}
                  >
                    Protected
                  </th>
                  <th
                    className={`text-left p-2 font-medium ${styles.text("secondary")}`}
                  >
                    Created
                  </th>
                  <th
                    className={`text-left p-2 font-medium ${styles.text("secondary")}`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUrls.map((url) => (
                  <tr
                    key={url.id}
                    className="border-b border-white/20 dark:border-orange-400/10 hover:bg-gradient-to-r hover:from-white/10 hover:to-white/15 dark:hover:from-orange-900/20 dark:hover:to-orange-800/25 transition-all duration-300 group"
                  >
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <code
                          className={`bg-gradient-to-r from-white/20 to-white/25 dark:from-orange-900/30 dark:to-orange-800/35 px-2 py-1 rounded text-xs border border-white/30 dark:border-orange-400/20 drop-shadow-sm backdrop-blur-sm ${styles.text("primary")}`}
                        >
                          {url.shortUrl}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`${styles.text("muted")} hover:text-white/100 dark:hover:text-orange-200 hover:bg-black/20 dark:hover:bg-orange-900/20 border border-white/20 dark:border-orange-400/10 hover:border-white/40 dark:hover:border-orange-400/30 transition-all duration-300`}
                          onClick={() => handleCopy(url.shortUrl)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="p-2 max-w-xs">
                      <div
                        className={`truncate drop-shadow-sm ${styles.text("secondary")} group-hover:text-white/100 dark:group-hover:text-orange-200 transition-colors duration-300`}
                        title={url.destination}
                      >
                        {url.destination}
                      </div>
                    </td>
                    <td
                      className={`p-2 drop-shadow-sm ${styles.text("primary")} group-hover:text-white/100 dark:group-hover:text-orange-100 transition-colors duration-300`}
                    >
                      {url.clicks}
                    </td>
                    <td
                      className={`p-2 ${styles.text("secondary")} group-hover:text-white/100 dark:group-hover:text-orange-200 transition-colors duration-300`}
                    >
                      {url.ttl}
                    </td>
                    <td className="p-2">
                      {url.status === "Active" ? (
                        <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-br from-green-400/80 to-green-500/90 rounded-full shadow-lg shadow-green-400/30">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-5 h-5 bg-gradient-to-br from-red-400/80 to-red-500/90 rounded-full shadow-lg shadow-red-400/30">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="p-2">
                      {url.protected ? (
                        <Shield
                          className={`h-4 w-4 drop-shadow-sm ${styles.text("primary")} group-hover:text-white/100 dark:group-hover:text-orange-200 transition-colors duration-300`}
                        />
                      ) : (
                        <span
                          className={`${styles.text("muted")} group-hover:text-white/100 dark:group-hover:text-orange-300 transition-colors duration-300`}
                        >
                          —
                        </span>
                      )}
                    </td>
                    <td
                      className={`p-2 ${styles.text("secondary")} group-hover:text-white/100 dark:group-hover:text-orange-200 transition-colors duration-300`}
                    >
                      {url.createdAt}
                    </td>
                    <td className="p-2">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`${styles.text("muted")} hover:text-white/100 dark:hover:text-orange-200 hover:bg-black/20 dark:hover:bg-orange-900/20 border border-white/20 dark:border-orange-400/10 hover:border-white/40 dark:hover:border-orange-400/30 transition-all duration-300`}
                          onClick={() => handleVisit(url.shortUrl)}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                        {!isGuest && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`${styles.text("muted")} hover:text-white/100 dark:hover:text-orange-200 hover:bg-black/20 dark:hover:bg-orange-900/20 border border-white/20 dark:border-orange-400/10 hover:border-white/40 dark:hover:border-orange-400/30 transition-all duration-300`}
                            onClick={() => handleEdit(url.id)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`${styles.text("muted")} hover:text-red-200 hover:bg-red-200/20 dark:hover:bg-red-900/20 border border-white/20 dark:border-orange-400/10 hover:border-red-300/40 dark:hover:border-red-400/30 transition-all duration-300`}
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
        )}

        {urls.length > itemsPerPage && (
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              className={`border-white/40 dark:border-orange-400/30 hover:bg-black/20 dark:hover:bg-orange-900/20 hover:border-white/60 dark:hover:border-orange-400/50 transition-all duration-300 ${styles.text("secondary")} hover:text-white/100 dark:hover:text-orange-200`}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span
              className={`flex items-center px-4 text-sm ${styles.text("muted")}`}
            >
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className={`border-white/40 dark:border-orange-400/30 hover:bg-black/20 dark:hover:bg-orange-900/20 hover:border-white/60 dark:hover:border-orange-400/50 transition-all duration-300 ${styles.text("secondary")} hover:text-white/100 dark:hover:text-orange-200`}
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
      {showToast && (
        <GlassyToast
          message="URL Copied"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </Card>
  );
};
