import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/language-context";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import Home from "@/pages/home";
import Projects from "@/pages/projects";
import VibeCoding from "@/pages/vibe-coding";
import Insight from "@/pages/insight";
import ProjectDetail from "@/pages/project-detail";
import AnnotationPlatformDetail from "@/pages/annotation-detail";
import ArticleDetail from "@/pages/article-detail";
import Resume from "@/pages/resume";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/vibe-coding" component={VibeCoding} />
          <Route path="/insight" component={Insight} />
          <Route path="/resume" component={Resume} />
          <Route path="/projects/ernie-annotation" component={AnnotationPlatformDetail} />
          <Route path="/projects/:id" component={ProjectDetail} />
          <Route path="/vibe-coding/:id" component={ProjectDetail} />
          <Route path="/insight/:id" component={ArticleDetail} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
