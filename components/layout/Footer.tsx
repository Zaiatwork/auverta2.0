import { FOOTER_NAV, SITE } from '@/content/site'
import { TransitionLink } from '@/components/ui/TransitionLink'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.foot}>
      <span>© {new Date().getFullYear()} {SITE.name}</span>
      <nav aria-label="Footer">
        {FOOTER_NAV.map((n) => <TransitionLink key={n.href} href={n.href} label={n.label}>{n.label}</TransitionLink>)}
      </nav>
      <div>
        {SITE.social.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>)}
      </div>
    </footer>
  )
}
