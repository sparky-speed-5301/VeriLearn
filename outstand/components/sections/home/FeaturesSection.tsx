import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturesSection.module.css';

export default function FeaturesSection() {
  return (
    <section className={styles.featuresSection} id="features">
      <div className={styles.r1}>
        <div className={styles.r2}>
          <div className={styles.dektop}>
            <div className={styles.tag} data-border="true">
              <div className={styles.icon}>
                <div className={styles.r6}>
                  <Image className={styles.r7} src="/assets/media/GeiRPq7ay3bsEgoZEZhYSdzWk.png" alt="Icon" width={512} height={512} />
                </div>
              </div>
              <div className={styles.text}>
                <p className={styles.r9}>
                  Core Features
                </p>
              </div>
            </div>
            <div className={styles.textContainer}>
              <div className={styles.heading}>
                <h2 className={styles.r12}>
                  Engineered for Factual Rigor
                </h2>
              </div>
              <div className={styles.paragraph}>
                <p className={styles.r14}>
                  Discover how our evidence engine turns unstructured lecture speech into auditable, verifiable knowledge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.card} data-border="true">
          <div className={styles.container}>
            <div className={styles.textContainer2}>
              <div className={styles.heading2}>
                <h3 className={styles.r20}>
                  Master Complex Lectures with Verifiable Confidence
                </h3>
              </div>
              <div className={styles.paragraph2}>
                <p className={styles.r22}>
                  Every takeaway, concept definition, and quiz question is anchored directly to the instructor&apos;s exact words and timestamps.
                </p>
              </div>
            </div>
            <div className={styles.container2}>
              <div className={styles.subContainer2}>
                <div className={styles.icon2}>
                  <div className={styles.r26}>
                    <Image className={styles.r27} src="/assets/media/1dNFxWV0EEWbhb6n3h7QTD6XbI.svg" alt="Tick Icon" width={30} height={30} />
                  </div>
                </div>
                <div className={styles.text2}>
                  <p className={styles.r29}>
                    Millisecond Audio Alignment
                  </p>
                </div>
              </div>
              <div className={styles.subContainer3}>
                <div className={styles.icon2}>
                  <div className={styles.r26}>
                    <Image className={styles.r27} src="/assets/media/1dNFxWV0EEWbhb6n3h7QTD6XbI.svg" alt="Tick Icon" width={30} height={30} />
                  </div>
                </div>
                <div className={styles.text3}>
                  <p className={styles.r32}>
                    Zero Hallucination Flagging
                  </p>
                </div>
              </div>
              <div className={styles.subContainer4}>
                <div className={styles.icon2}>
                  <div className={styles.r26}>
                    <Image className={styles.r27} src="/assets/media/1dNFxWV0EEWbhb6n3h7QTD6XbI.svg" alt="Tick Icon" width={30} height={30} />
                  </div>
                </div>
                <div className={styles.text4}>
                  <p className={styles.r35}>
                    LaTeX Formula Preservation
                  </p>
                </div>
              </div>
              <div className={styles.subContainer5}>
                <div className={styles.icon2}>
                  <div className={styles.r26}>
                    <Image className={styles.r27} src="/assets/media/1dNFxWV0EEWbhb6n3h7QTD6XbI.svg" alt="Tick Icon" width={30} height={30} />
                  </div>
                </div>
                <div className={styles.text5}>
                  <p className={styles.r38}>
                    Grounded Recall Studio
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.r1}>
            <div className={styles.r39}>
              <a className={styles.iconLeftRight} data-border="true" href="http://localhost:5173/workspace">
                <div className={styles.text6}>
                  <p className={styles.r42}>
                    Launch Workspace
                  </p>
                </div>
                <div className={styles.iconRight}>
                  <div className={styles.icon}>
                    <div className={styles.r6}>
                      <Image className={styles.r44} src="/assets/media/lJSvGFGPhRLFfxcyPg1nppxYdA.svg" alt="" width={20} height={20} aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.container3}>
          <div className={styles.subContainer6}>
            <div className={styles.card2}>
              <div className={styles.icon3}>
                <div className={styles.r49}>
                  <Image className={styles.r50} src="/assets/media/jIcWuO1W1WaV9KooReW8RRQC76U.svg" alt="Icon" width={28} height={28} />
                </div>
              </div>
              <div className={styles.textContainer3}>
                <div className={styles.r1}>
                  <div className={styles.heading3}>
                    <h3 className={styles.r53}>
                      Verbatim Citations
                    </h3>
                  </div>
                </div>
                <div className={styles.paragraph3}>
                  <p className={styles.r55}>
                    Never wonder where an answer came from. Click any claim to inspect the source quote.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.line} data-border="true" />
            <div className={styles.card3}>
              <div className={styles.icon3}>
                <div className={styles.r49}>
                  <Image className={styles.r50} src="/assets/media/RMLMBoeg6AaBvvj9Ri5BysKkMc.svg" alt="Icon" width={28} height={28} />
                </div>
              </div>
              <div className={styles.textContainer4}>
                <div className={styles.r1}>
                  <div className={styles.heading3}>
                    <h3 className={styles.r53}>
                      Concept Mastery Matrix
                    </h3>
                  </div>
                </div>
                <div className={styles.paragraph4}>
                  <p className={styles.r60}>
                    Visualize prerequisites, core theorems, and practical applications in a structured graph.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.line2} data-border="true" />
          <div className={styles.subContainer7}>
            <div className={styles.card4}>
              <div className={styles.icon4}>
                <div className={styles.r65}>
                  <Image className={styles.r66} src="/assets/media/9ingRzlfybhYw4nDq2FEvLen0Q.svg" alt="Icon" width={28} height={28} />
                </div>
              </div>
              <div className={styles.textContainer3}>
                <div className={styles.r1}>
                  <div className={styles.heading3}>
                    <h3 className={styles.r53}>
                      Synchronized Slide Viewer
                    </h3>
                  </div>
                </div>
                <div className={styles.paragraph3}>
                  <p className={styles.r55}>
                    Inspect original lecture slides in sync with timecoded transcripts and AI notes.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.line3} data-border="true" />
            <div className={styles.card3}>
              <div className={styles.icon3}>
                <div className={styles.r49}>
                  <Image className={styles.r50} src="/assets/media/PHiP4RMipNd4mFhYxOMnCoaO3I8.svg" alt="Icon" width={28} height={28} />
                </div>
              </div>
              <div className={styles.textContainer4}>
                <div className={styles.r1}>
                  <div className={styles.heading3}>
                    <h3 className={styles.r53}>
                      Active Spaced Recall
                    </h3>
                  </div>
                </div>
                <div className={styles.paragraph4}>
                  <p className={styles.r60}>
                    Reinforce technical definitions with flashcards directly tied to lecture audio moments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
