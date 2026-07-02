export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="font-heading text-sm font-semibold text-foreground">SS</span>
            <span className="font-mono text-xs text-muted-foreground">Sahil Sohani</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/sahilsohani27"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/sahilsohani"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              LinkedIn
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sahilsohani2704@gmail.com"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Email
            </a>
          </div>

          <p className="font-mono text-xs text-muted-foreground/50">
            Built with Next.js · TypeScript · TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  )
}
