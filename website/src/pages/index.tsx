import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {
  AcademicCapIcon,
  AutorenewIcon,
  BeakerIcon,
  BriefcaseIcon,
  CpuChipIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  ShieldCheckIcon,
} from '../components/Icons';

const sections = [
  {
    title: 'Why NNLP Exists',
    body: (
      <ul className="list-disc space-y-1.5 pl-5">
        <li><strong>Executable language</strong> demands structure to match speed.</li>
        <li><strong>Specification failures</strong>, not models, cause most AI issues.</li>
        <li><strong>Logic and systems thinking</strong> are non-negotiable.</li>
        <li><strong>Explicit constraints</strong> reduce drift and overreach.</li>
        <li><strong>Review discipline</strong> keeps outputs accountable.</li>
      </ul>
    ),
  },
  {
    title: 'What NNLP Teaches',
    body: (
      <ul className="list-disc space-y-1.5 pl-5">
        <li><strong>Express intent</strong> clearly.</li>
        <li><strong>Encode constraints</strong> explicitly.</li>
        <li><strong>Delegate safely</strong> to AI.</li>
        <li><strong>Review with evidence</strong>.</li>
        <li><strong>Operate within boundaries</strong> of business and systems.</li>
      </ul>
    ),
  },
  {
    title: 'What NNLP Is Not',
    body: (
      <ul className="list-disc space-y-1.5 pl-5">
        <li><strong>Prompt engineering</strong> shortcuts.</li>
        <li><strong>No-code automation</strong>.</li>
        <li><strong>Tool-specific</strong> playbooks.</li>
        <li><strong>Replacing engineering judgment</strong>.</li>
        <li><strong>Skipping review</strong> or accountability.</li>
      </ul>
    ),
  },
];

export default function Home(): JSX.Element {
  return (
    <Layout title="Nuanced Natural Language Programming" description="Program with language. Stay accountable.">
      <main className="bg-background text-foreground">
        <section className="container mx-auto px-6 py-12 md:py-18 lg:py-20 hero-gradient rounded-2xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Nuanced Natural Language Programming</p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Program with language.
                <br />
                Stay accountable.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-7">
                NNLP is a professional framework for building software, documentation, and systems using natural language, with AI as an execution partner. It treats language as a technical interface, not a chat prompt.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 rounded-md font-semibold" to="/docs/00-start-here/00-what-is-nnlp">
                  Get Started
                </Link>
                <Link className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-5 py-2.5 rounded-md font-semibold" to="/docs/00-start-here/03-the-nnlp-map">
                  View Map
                </Link>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm lg:ml-auto lg:max-w-[460px]">
              <div className="flex items-center justify-between mb-3 text-sm font-semibold text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  NNLP Loop
                </span>
                <Link className="text-primary hover:underline" to="/docs/03-nnlp-method/00-the-nnlp-loop">
                  Learn more →
                </Link>
              </div>
              <ol className="grid gap-2 text-foreground md:grid-cols-2">
                {['Discovery', 'Intent', 'Constraints', 'Delegation', 'Generation', 'Review', 'Acceptance', 'Iteration/Release'].map(
                  (step, idx) => (
                    <li key={step} className="flex items-center gap-3 rounded-lg border border-border bg-muted/60 px-3 py-2.5">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                        {idx + 1}
                      </span>
                      <span className="text-base">{step}</span>
                    </li>
                  )
                )}
              </ol>
              <p className="mt-3 text-sm text-muted-foreground leading-6">
                Each step produces a concrete artifact that can be reviewed independently. This keeps AI-assisted work professional.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-14 md:py-18 lg:py-22">
          <div className="mx-auto max-w-5xl space-y-12 prose dark:prose-dark">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Why NNLP Matters</h2>
              <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
                NNLP provides the structure and discipline to use AI in professional environments without sacrificing quality,
                safety, or accountability.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr not-prose">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="bg-card border border-border rounded-lg p-5 md:p-6 transition-transform hover:-translate-y-1 flex flex-col gap-3 h-full">
                  <h3 className="text-xl font-semibold leading-tight">{section.title}</h3>
                  <div className="text-[18px] leading-7 text-muted-foreground flex-1 min-h-[180px]">
                    {section.body}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-lg p-6 md:p-8 text-center">
              <h2 className="text-2xl font-semibold">The Core Idea</h2>
              <p className="mt-4 text-lg">
                Natural language becomes executable only when it is grounded in logic, language discipline, systems
                thinking, and sentence-level precision. NNLP formalizes this into a repeatable method.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 md:p-8 not-prose">
              <h2 className="text-2xl font-semibold text-center">How This Repo Is Structured</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {[
                  {label: 'Start Here', desc: 'What NNLP is and how to approach it', icon: HomeIcon, href: '/docs/00-start-here/00-what-is-nnlp'},
                  {label: 'Core Skills', desc: 'Logic, Language, Systems, Sentences', icon: AcademicCapIcon, href: '/docs/01-core-skills/00-core-skills-overview'},
                  {label: 'GenAI & LLM Fundamentals', desc: 'Enough theory to avoid misuse', icon: CpuChipIcon, href: '/docs/02-genai-llm-fundamentals/00-fundamentals-index'},
                  {label: 'NNLP Method', desc: 'How work flows from problem to acceptance', icon: AutorenewIcon, href: '/docs/03-nnlp-method/00-the-nnlp-loop'},
                  {
                    label: 'Execution Patterns & Scenarios',
                    desc: 'How NNLP applies in real roles',
                    icon: BriefcaseIcon,
                    href: '/docs/04-execution-patterns/00-pattern-index',
                  },
                  {
                    label: 'Guardrails & Evaluation',
                    desc: 'Safety, quality, and accountability',
                    icon: ShieldCheckIcon,
                    href: '/docs/07-guardrails-and-governance/00-guardrails-index',
                  },
                  {label: 'Experiments', desc: 'Evidence from real usage, including failures', icon: BeakerIcon, href: 'https://github.com/pruning-my-pothos/NNLP/tree/main/experiments'},
                  {label: 'Templates', desc: 'Ready-to-use artifacts', icon: DocumentDuplicateIcon, href: '/docs/09-templates/00-templates-index'},
                ].map((item) => (
                  <Link to={item.href} key={item.label} className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent transition-colors">
                    <item.icon className="h-6 w-6 flex-none text-primary" />
                    <div>
                      <p className="font-semibold">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link className="text-primary hover:underline" to="/docs/00-start-here/00-what-is-nnlp">
                  Explore the documentation →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
