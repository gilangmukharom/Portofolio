import { useBlock, useContent } from '@/content/ContentProvider'

export function Footer() {
  const { profile, socials } = useContent()
  const footer = useBlock('global.footer')

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-content flex-col gap-4 px-5 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. {footer.description}
        </p>
        <ul className="flex items-center gap-6">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                className="transition-colors duration-300 hover:text-fg"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
