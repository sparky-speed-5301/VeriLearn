import Image from 'next/image';
import styles from './Process.module.css';

export default function Process() {
  return (
    <section className={styles.process} id="pipeline">
      <div className={styles.r1}>
        <div className={styles.r2}>
          <div className={styles.dektop}>
            <div className={styles.tag} data-border="true">
              <div className={styles.icon}>
                <div className={styles.r6}>
                  <Image className={styles.r7} src="/assets/media/YgL07mB2LboyYkJm8HS8kaxOFSs.svg" alt="Icon" width={20} height={20} />
                </div>
              </div>
              <div className={styles.text}>
                <p className={styles.r9}>
                  Provenance Pipeline
                </p>
              </div>
            </div>
            <div className={styles.textContainer}>
              <div className={styles.heading}>
                <h2 className={styles.r12}>
                  From Raw Audio to Exam Mastery
                </h2>
              </div>
              <div className={styles.paragraph}>
                <p className={styles.r14}>
                  Our four-stage pipeline transforms messy recordings and complex technical slides into verifiable, reviewable study studios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.container}>
          {/* Phase 01 */}
          <div className={styles.r1}>
            <div className={styles.r17}>
              <div className={styles.processCard} data-border="true">
                <div className={styles.container2}>
                  <div className={styles.iconContainer} data-border="true">
                    <div className={styles.icon2}>
                      <div className={styles.r22}>
                        <Image className={styles.r23} src="/assets/media/I4qdMNXue1p7N7fimLTPeZE.svg" alt="Icon" width={24} height={24} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.subContainer2} data-border="true">
                    <div className={styles.text2}>
                      <p className={styles.r26}>
                        Phase 01
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.textContainer2}>
                  <div className={styles.heading2}>
                    <h3 className={styles.r29}>
                      Ingest & Time-Align
                    </h3>
                  </div>
                  <div className={styles.paragraph2}>
                    <p className={styles.r31}>
                      Drop lecture recordings, video links, or slide PDFs. Audio is transcribed and aligned to exact milliseconds.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 02 */}
          <div className={styles.r1}>
            <div className={styles.r17}>
              <div className={styles.processCard} data-border="true">
                <div className={styles.container2}>
                  <div className={styles.iconContainer} data-border="true">
                    <div className={styles.icon2}>
                      <div className={styles.r22}>
                        <Image className={styles.r32} src="/assets/media/hY7tjN0T8GAXzSXi4thY2IeLd0.svg" alt="Icon" width={25} height={24} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.subContainer2} data-border="true">
                    <div className={styles.text2}>
                      <p className={styles.r26}>
                        Phase 02
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.textContainer2}>
                  <div className={styles.heading2}>
                    <h3 className={styles.r29}>
                      Extract & Ground
                    </h3>
                  </div>
                  <div className={styles.paragraph2}>
                    <p className={styles.r31}>
                      The model extracts technical claims, LaTeX equations, and definitions, citing verbatim spoken quotes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 03 */}
          <div className={styles.r1}>
            <div className={styles.r33}>
              <div className={styles.processCard2} data-border="true">
                <div className={styles.container3}>
                  <div className={styles.iconContainer} data-border="true">
                    <div className={styles.icon2}>
                      <div className={styles.r22}>
                        <Image className={styles.r32} src="/assets/media/Y917zvo2ALM8DB8WfZlf1MWAUE4.svg" alt="Icon" width={25} height={24} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.subContainer2} data-border="true">
                    <div className={styles.text2}>
                      <p className={styles.r26}>
                        Phase 03
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.textContainer3}>
                  <div className={styles.heading2}>
                    <h3 className={styles.r29}>
                      Active Recall Drills
                    </h3>
                  </div>
                  <div className={styles.paragraph3}>
                    <p className={styles.r38}>
                      Generate diagnostic flashcards and spaced-repetition matrices directly linked to verified claims.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phase 04 */}
          <div className={styles.r1}>
            <div className={styles.r17}>
              <div className={styles.processCard} data-border="true">
                <div className={styles.container2}>
                  <div className={styles.iconContainer} data-border="true">
                    <div className={styles.icon2}>
                      <div className={styles.r22}>
                        <Image className={styles.r23} src="/assets/media/fgzxp2DC7PUET0DtyWv87GILM.svg" alt="Icon" width={24} height={24} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.subContainer2} data-border="true">
                    <div className={styles.text2}>
                      <p className={styles.r26}>
                        Phase 04
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.textContainer2}>
                  <div className={styles.heading2}>
                    <h3 className={styles.r29}>
                      Interrogate with Proof
                    </h3>
                  </div>
                  <div className={styles.paragraph2}>
                    <p className={styles.r31}>
                      Chat with your study studio, click citations to jump directly to audio timestamps, and ace exams.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner inside Process */}
        <div className={styles.card} data-border="true">
          <div className={styles.textContainer5}>
            <div className={styles.text3}>
              <p className={styles.r47}>
                Ready to elevate your study sessions?
              </p>
            </div>
            <div className={styles.r1}>
              <div className={styles.heading3}>
                <h3 className={styles.r49}>
                  Master university lectures with
                  <span className={styles.r50}>
                    {" "}zero hallucinations{" "}
                  </span>
                  and
                  <span className={styles.r50}>
                    {" "}complete provenance.
                  </span>
                </h3>
              </div>
            </div>
          </div>
          <div className={styles.r51}>
            <a className={styles.iconLeftRight} href="http://localhost:5173/workspace">
              <div className={styles.text4}>
                <p className={styles.r54}>
                  Open Workspace
                </p>
              </div>
              <div className={styles.iconRight}>
                <div className={styles.icon2}>
                  <div className={styles.r22}>
                    <Image className={styles.r56} src="/assets/media/Z4EozQtdVmroG1HDLS4zKFJeGo.svg" alt="Icon" width={20} height={20} />
                  </div>
                </div>
              </div>
              <div className={styles.shine} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
