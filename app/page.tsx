import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { ProjectsSection } from '@/components/sections/projects'
import { ExperienceSection } from '@/components/sections/experience'
import { ResearchSection } from '@/components/sections/research'
import { PrinciplesSection } from '@/components/sections/principles'
import { ContactSection } from '@/components/sections/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProjectsSection />
        <ExperienceSection />
        <ResearchSection />
        <PrinciplesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
