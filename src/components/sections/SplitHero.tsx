import { useBlock, useProfile } from '@/content/ContentProvider'
import { useRotatingWord } from '@/hooks/useRotatingWord'
import { Annotation } from '@/components/ui/Annotation'
import type { HeroHalf } from '@/types'
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button'

/**
 * The reference site's signature move: one portrait split down the middle to
 * stand for two skill sets. Both halves are the same file - `clip-path` shows
 * one vertical half of each, and a different filter gives each half its mood.
 */
function SplitPortrait({ avatar, alt }: { avatar: string; alt: string }) {
  // The source is a wide shot, so zoom onto the face - otherwise the "split
  // face" reads as a split landscape. Clipping lives on the wrappers and the
  // zoom on the images: a transform on a clipped element would scale the clip
  // region too and break the exact 50/50 seam.
  const zoom = '[transform:scale(1.85)] [transform-origin:50%_38%] h-full w-full object-cover'

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem] lg:max-w-[26rem]">
      <div className="absolute inset-0 overflow-hidden rounded-full border border-line bg-elevated">
        {/* Left half - front end, warm. */}
        <div className="absolute inset-0 [clip-path:inset(0_50%_0_0)]">
          <img
            src={avatar}
            alt={alt}
            width={500}
            height={500}
            fetchPriority="high"
            decoding="async"
            className={`${zoom} [filter:saturate(1.3)_contrast(1.05)]`}
          />
        </div>

        {/* Right half - back end, cool and desaturated. The alt text sits on the
            left image only, so this one is decorative to avoid a duplicate. */}
        <div className="absolute inset-0 [clip-path:inset(0_0_0_50%)]">
          <img
            src={avatar}
            alt=""
            aria-hidden="true"
            width={500}
            height={500}
            decoding="async"
            className={`${zoom} [filter:grayscale(0.9)_contrast(1.1)_brightness(0.96)]`}
          />
        </div>

        {/* The seam. */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-bg/70"
        />
      </div>
    </div>
  )
}

function HalfStack({ side, half }: { side: 'left' | 'right'; half: HeroHalf }) {
  return (
    <ul
      className={`flex flex-wrap gap-x-3 gap-y-1 text-xs font-medium text-muted ${
        side === 'left' ? 'justify-start' : 'justify-end'
      }`}
    >
      {half.stack.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function SplitHero() {
  const profile = useProfile()
  const block = useBlock('home.hero')
  const { halves } = profile
  const word = useRotatingWord(profile.roles)

  return (
    <section className="mx-auto max-w-content px-5 pb-8 pt-12 md:px-8 md:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(18rem,26rem)_1fr] lg:gap-8">
        {/* Left annotation - hidden on small screens where there's no room. */}
        <div className="hidden flex-col items-start gap-3 lg:flex">
          <Annotation label={halves.left.label} caption={halves.left.caption} side="left" />
          <HalfStack side="left" half={halves.left} />
        </div>

        <SplitPortrait avatar={profile.avatar} alt={`${profile.name}, ${profile.role}`} />

        <div className="hidden flex-col items-end gap-3 lg:flex">
          <Annotation label={halves.right.label} caption={halves.right.caption} side="right" />
          <HalfStack side="right" half={halves.right} />
        </div>
      </div>

      {/* Compact stand-in for the annotations on tablet and phone. Separators are
          gaps rather than literal characters, so a wrap never strands a dot. */}
      <div className="mt-8 flex items-start justify-center gap-5 lg:hidden">
        {[halves.left, halves.right].map((half) => (
          <div key={half.label} className="flex-1 text-center">
            <p className="font-hand text-2xl text-accent">{half.label}</p>
            <ul className="mt-1 flex flex-wrap justify-center gap-x-2 gap-y-0.5 text-xs text-muted">
              {half.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-3xl text-center md:mt-14">
        <h1 className="text-display font-extrabold text-balance">
          {profile.name}
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted md:text-2xl">
          {profile.intro}
        </p>
        <p className="mt-4 text-base text-muted">
          Working today as a{' '}
          <span className="font-semibold text-fg">
            {word}
            <span
              aria-hidden="true"
              className="ml-0.5 inline-block w-px animate-caret border-r-2 border-accent align-middle"
            >
              &nbsp;
            </span>
          </span>
          <span className="sr-only">{profile.roles.join(', ')}</span> in {profile.location}.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink to={block.primary?.href ?? '/work'}>
            {block.primary?.label ?? 'View my work'}
          </ButtonLink>
          <ButtonAnchor href={block.secondary?.href || profile.resumeUrl} variant="ghost">
            {block.secondary?.label ?? 'Read my resume'}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </ButtonAnchor>
        </div>
      </div>
    </section>
  )
}
