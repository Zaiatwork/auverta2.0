import { PROJECTS, getProject as getProjectBase } from '@/content/work'
import type { Project } from '@/types/content'

export async function getProjects(): Promise<Project[]> {
  return PROJECTS
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return getProjectBase(slug)
}

export { PROJECTS }
