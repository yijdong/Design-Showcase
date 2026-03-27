import { COMMERCIAL_PROJECTS, VIBE_PROJECTS, ARTICLES } from "@/lib/data";

// Since there is no backend API, we simulate data fetching hooks returning static data.
export function useCommercialProjects() {
  return { data: COMMERCIAL_PROJECTS, isLoading: false };
}

export function useVibeProjects() {
  return { data: VIBE_PROJECTS, isLoading: false };
}

export function useProject(id: string) {
  const project = [...COMMERCIAL_PROJECTS, ...VIBE_PROJECTS].find(p => p.id === id);
  return { data: project, isLoading: false };
}

export function useArticles() {
  return { data: ARTICLES, isLoading: false };
}

export function useArticle(id: string) {
  const article = ARTICLES.find(a => a.id === id);
  return { data: article, isLoading: false };
}
