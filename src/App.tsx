
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import BookmarksPage from "./pages/BookmarksPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import EmployeeDetailPage from "./pages/EmployeeDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BookmarkProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <Layout>
                  <Index />
                </Layout>
              } />
              <Route path="/bookmarks" element={
                <Layout>
                  <BookmarksPage />
                </Layout>
              } />
              <Route path="/analytics" element={
                <Layout>
                  <AnalyticsPage />
                </Layout>
              } />
              <Route path="/employee/:id" element={
                <Layout>
                  <EmployeeDetailPage />
                </Layout>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BookmarkProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
