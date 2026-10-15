import Image from 'next/image';
import styles from './OurSolutionSection.module.css';

export default function OurSolutionSection() {
  return (
    <section className={styles.ourSolutionSection} id="solution">
      {/* Header */}
      <div className={styles.headerWrap}>
        <div className={styles.tag}>
          <Image
            className={styles.tagIcon}
            src="/assets/media/GdOqOnfzeQJ0zIgwQSNT2Pm3BQ.svg"
            alt="Icon"
            width={16}
            height={16}
          />
          <span>Evidence Engine</span>
        </div>
        <h2 className={styles.mainHeading}>
          Empowering Technical Minds with Verifiable Intelligence
        </h2>
        <p className={styles.mainParagraph}>
          VeriLearn bridges raw spoken audio, university slide decks, and mathematical formulas into an auditable, verifiable knowledge graph.
        </p>
      </div>

      {/* Bento Grid */}
      <div className={styles.bentoGrid}>
        {/* Card 1 (Span 2) with Generated High-Res Cockpit Preview */}
        <div className={`${styles.card} ${styles.cardSpan2}`}>
          <div>
            <div className={styles.cardIcon}>
              <Image
                src="/assets/media/MnjpLyIUEC82E6LCfoqZrWa2hw8.svg"
                alt="Icon"
                width={24}
                height={24}
              />
            </div>
            <div className={styles.cardContent}>
              <h3>Strict Audio Alignment & Live Transcript Cockpit</h3>
              <p>
                Every lecture claim is anchored directly to its exact spoken audio timestamp and verbatim transcript quote. Jump to the exact second in the lecture audio stream with one click.
              </p>
            </div>
          </div>

          <div className={styles.cardImageWrap}>
            <Image
              className={styles.cardImage}
              src="/assets/media/verilearn-cockpit-preview.jpg"
              alt="VeriLearn Lecture Cockpit Interface Mockup"
              width={1024}
              height={768}
              priority
            />
          </div>
        </div>

        {/* Card 2 */}
        <div className={styles.card}>
          <div>
            <div className={styles.cardIcon}>
              <Image
                src="/assets/media/RMLMBoeg6AaBvvj9Ri5BysKkMc.svg"
                alt="Icon"
                width={24}
                height={24}
              />
            </div>
            <div className={styles.cardContent}>
              <h3>Uncertainty & Gap Detection</h3>
              <p>
                When a query touches on topics omitted by the instructor, VeriLearn explicitly alerts you with an unsupported indicator rather than fabricating convincing answers.
              </p>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem', background: '#191b24', border: '1px solid #282d3d', borderRadius: '8px', padding: '0.85rem' }}>
            <span style={{ color: '#ef4444', fontSize: '0.75rem', fontFamily: 'monospace', fontWeight: 600 }}>
              ⚠ UNVERIFIED IN RECORDING
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className={styles.card}>
          <div>
            <div className={styles.cardIcon}>
              <Image
                src="/assets/media/0Dur4d2rG8qfu8zK1d9S3JR3E.svg"
                alt="Icon"
                width={24}
                height={24}
              />
            </div>
            <div className={styles.cardContent}>
              <h3>LaTeX & Formula Parsing</h3>
              <p>
                Mathematical equations, matrix operations, and derivations are rendered with complete typographical fidelity, never corrupted by plain-text truncation.
              </p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className={styles.card}>
          <div>
            <div className={styles.cardIcon}>
              <Image
                src="/assets/media/4SciwYsyXC0yLiPYsrnxSDjigic.svg"
                alt="Icon"
                width={24}
                height={24}
              />
            </div>
            <div className={styles.cardContent}>
              <h3>Cross-Lecture Indexing</h3>
              <p>
                Synthesize insights across multiple semesters, courses, and textbook chapters. Connect prerequisite concepts to advanced derivations seamlessly.
              </p>
            </div>
          </div>
        </div>

        {/* Card 5 */}
        <div className={styles.card}>
          <div>
            <div className={styles.cardIcon}>
              <Image
                src="/assets/media/nQbVHjQEyOn9PRs3XCGu7mS6qgU.svg"
                alt="Icon"
                width={24}
                height={24}
              />
            </div>
            <div className={styles.cardContent}>
              <h3>Active Recall Studio</h3>
              <p>
                Practice with diagnostic spaced-repetition flashcards and concept mastery trees linked directly back to original lecture moments.
              </p>
            </div>
          </div>
        </div>

        {/* Card 6 */}
        <div className={styles.card}>
          <div>
            <div className={styles.cardIcon}>
              <Image
                src="/assets/media/nGUf0SfYhzz7uk1mg5An9qw0yo.svg"
                alt="Icon"
                width={24}
                height={24}
              />
            </div>
            <div className={styles.cardContent}>
              <h3>Auditable Grounding Seams</h3>
              <p>
                Inspect the exact evidence behind every generated summary bullet. Click any citation chip to view the verified audio segment and quote.
              </p>
            </div>
          </div>
        </div>

        {/* Card 7 (Span 2) */}
        <div className={`${styles.card} ${styles.cardSpan2}`}>
          <div>
            <div className={styles.cardIcon}>
              <Image
                src="/assets/media/HOgyomO2bZmHfywbxIvwoLAYR1c.svg"
                alt="Icon"
                width={24}
                height={24}
              />
            </div>
            <div className={styles.cardContent}>
              <h3>Slide & PDF Multi-Modal Synchronization</h3>
              <p>
                View technical slide decks side-by-side with lecture transcripts, mathematical derivations, and verified AI synthesis notes in real time.
              </p>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <span style={{ background: '#1c2130', color: '#60a5fa', border: '1px solid #253350', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 600 }}>
              📄 PDF Slide OCR
            </span>
            <span style={{ background: '#162b24', color: '#34d399', border: '1px solid #1e4538', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 600 }}>
              🎙 Audio Timecode Alignment
            </span>
            <span style={{ background: '#251a32', color: '#c084fc', border: '1px solid #3c2656', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 600 }}>
              ∑ LaTeX Formula Extraction
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
