import { notFound } from 'next/navigation'
import { projectDetails } from '@/lib/data'
import { ProjectPageClient } from '@/components/project-page-client'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return Object.keys(projectDetails).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projectDetails[slug]
  if (!project) return {}
  return {
    title: `${project.name} — Sahil Sohani`,
    description: project.tagline,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projectDetails[slug]
  if (!project) notFound()
  return <ProjectPageClient project={project} />
}
