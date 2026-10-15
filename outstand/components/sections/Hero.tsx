import Image from 'next/image';
import Link from 'next/link';

import { hero } from '@/data/hero';
import Reveal from '@/components/motion/Reveal';
import ReflectShader from '@/components/originkit/ui/reflect-shader';
import styles from './Hero.module.css';

/**
 * Homepage hero: headline, CTA, and stat row over a fading pattern.
 */
export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.background} aria-hidden="true">
        <div className={styles.pattern}>
          <ReflectShader
            background="#0f0f0f"
            tint="#cdf140"
            speed={35}
            brightness={95}
            thickness={22}
            chromatic={12}
            bandGap={20}
            zoom={240}
            hover={100}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          />
        </div>
        <div className={styles.fade} />
        <div className={`${styles.light} ${styles.lightLeft}`}>
          <Image src={hero.background.lightLeft} alt="" width={583} height={507} />
        </div>
        <div className={`${styles.light} ${styles.lightRight}`}>
          <Image src={hero.background.lightRight} alt="" width={583} height={507} />
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.intro}>
          <div className={styles.headingBlock}>
            <div className={styles.textContainer}>
              <Reveal as="h1" className={styles.heading} split="word">
                {hero.heading}
              </Reveal>
              <Reveal as="p" className={styles.subheading} delay={0.25}>
                {hero.subheading}
              </Reveal>
            </div>
          </div>

          <div className={styles.ctaBlock}>
            <Link
              href={hero.primaryCta.href}
              className={styles.cta}
              target="_blank"
              rel="noreferrer"
            >
              {hero.primaryCta.label}
            </Link>
          </div>
        </div>

        <div className={styles.lower} style={{ paddingBottom: '2rem' }}>
          <div className={styles.statsBlock}>
            <div className={styles.rule} aria-hidden="true" />
            <dl className={styles.stats}>
              {hero.stats.map((stat) => (
                <div key={stat.label} className={styles.stat} data-border="true">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className={styles.statValue}>
                    {stat.value}
                    {stat.suffix}
                  </dd>
                  <p className={styles.statLabel} aria-hidden="true">
                    {stat.label}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
