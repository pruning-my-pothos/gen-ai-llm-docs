import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import {
  AcademicCapIcon,
  BeakerIcon,
  BriefcaseIcon,
  CpuChipIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  ShieldCheckIcon,
} from "../components/Icons";

const heroInside = [
  {
    title: "LLM Fundamentals",
    blurb: "Understand the core concepts of Large Language Models and how they work.",
    insight:
      "Learn about context windows, token economics, and the difference between prompting and specifying.",
  },
  {
    title: "Execution Patterns",
    blurb: "Practical patterns for using LLMs in your daily workflow.",
    insight:
      "Discover patterns for scaffolding a new project, refactoring code, designing APIs, and more.",
  },
  {
    title: "Guardrails & Governance",
    blurb: "Learn how to use LLMs safely and responsibly.",
    insight:
      "Understand the risks and how to mitigate them with proper guardrails and governance.",
  },
  {
    title: "Templates",
    blurb: "Ready-to-use templates for common tasks.",
    insight:
      "Jumpstart your work with templates for intent specifications, acceptance criteria, and more.",
  },
];

const heroInsideColors = [
  "hover:bg-primary/10",
  "hover:bg-amber-100 dark:hover:bg-amber-900/30",
  "hover:bg-emerald-100 dark:hover:bg-emerald-900/30",
  "hover:bg-sky-100 dark:hover:bg-sky-900/30",
];

const bestPractices = [
  "Write constraints before you generate.",
  "Ask for diffs and small increments, not giant rewrites.",
  "Treat language as a spec, not a chat message.",
  "Always define acceptance criteria.",
  "Verify outputs with evidence and tests.",
  "Delegate tasks, not accountability.",
];

export default function Home(): JSX.Element {
  return (
    <Layout
      title="GenAI & LLM Handbook"
      description="A practical guide to using Generative AI and LLMs in software development."
    >
      <main className="bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative border-b border-border/40 bg-background py-14 md:py-16 lg:py-18">
          <div className="container mx-auto px-6">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="space-y-6 max-w-2xl">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                  Version 0.1.0
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  GenAI & LLM Handbook
                  <span className="block text-primary">
                    AI-assisted development, made practical.
                  </span>
                </h1>
                <p className="text-base md:text-lg leading-7 text-muted-foreground">
                  GenAI & LLM Handbook defines how to use natural language to design, steer, and verify AI-assisted work. It formalizes intent, constraints, delegation, and evidence-based review so that outcomes remain accountable.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    to="/docs/00-handbook-introduction/scope-and-applicability"
                  >
                    Get Started
                  </Link>
                  <Link
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-accent hover:text-accent-foreground"
                    to="/docs/foundations/02-llm-deep-dive/fundamentals/00-fundamentals-index"
                  >
                    View Fundamentals
                  </Link>
                </div>
              </div>

              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg lg:ml-auto lg:max-w-[520px]">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold text-muted-foreground">What’s inside</div>
                  <Link className="text-primary text-sm hover:underline" to="/docs/00-handbook-introduction/standard-core">
                    View structure →
                  </Link>
                </div>
                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                  {heroInside.map((item, idx) => (
                    <div
                      key={item.title}
                      className={`group relative rounded-lg border border-border bg-muted/50 px-3 py-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 ${heroInsideColors[idx % heroInsideColors.length]}`}
                      style={{ minHeight: "142px" }}
                    >
                      <div className="text-sm font-semibold text-foreground">{item.title}</div>
                      <div className="text-[13px] text-muted-foreground leading-5 mt-1">
                        {item.blurb}
                      </div>
                      <div
                        className="mt-2 text-[12px] text-foreground/90 leading-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-semibold"
                        style={{ minHeight: "36px" }}
                      >
                        {item.insight}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Concepts Section */}
        <section className="bg-muted/30 py-18 md:py-20 border-y border-border/40">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Core Concepts
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A set of principles and best practices for working with LLMs.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bestPractices.map((practice) => (
                <div
                  key={practice}
                  className="group relative bg-background transition-all border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                  <p className="text-foreground/90 leading-snug flex items-center font-medium">
                    {practice}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                to="/docs/foundations/02-llm-deep-dive/fundamentals/00-fundamentals-index"
              >
                Learn the Fundamentals
              </Link>
            </div>
          </div>
        </section>

        {/* Repository Structure */}
        <section className="container mx-auto px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">
                Repository Structure
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Navigate the documentation, patterns, and guides.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  label: "Start Here",
                  desc: "Orientation, scope, and how to use this handbook",
                  icon: HomeIcon,
                  href: "/docs/00-handbook-introduction/what-is-genai-llm",
                },
                {
                  label: "Handbook Method",
                  desc: "The end-to-end loop for planning, delegating, and reviewing",
                  icon: CpuChipIcon,
                  href: "/docs/01-handbook-method/01-overview",
                },
                {
                  label: "Execution Patterns",
                  desc: "Practical patterns for day-to-day AI-assisted work",
                  icon: BriefcaseIcon,
                  href: "/docs/02-execution-patterns/00-pattern-index",
                },
                {
                  label: "Professional Scenarios",
                  desc: "Role- and domain-specific playbooks",
                  icon: AcademicCapIcon,
                  href: "/docs/03-professional-scenarios/00-scenarios-index",
                },
                {
                  label: "Responsible AI",
                  desc: "Guardrails, governance, and risk mitigation",
                  icon: ShieldCheckIcon,
                  href: "/docs/05-responsible-ai/guardrails-index",
                },
                {
                  label: "Templates",
                  desc: "Copy/paste specs, checklists, and review guides",
                  icon: DocumentDuplicateIcon,
                  href: "/docs/06-templates/00-templates-index",
                },
                {
                  label: "Experiments",
                  desc: "Runnable projects: RAG KBs, vector stores, knowledge graphs",
                  icon: BeakerIcon,
                  href: "/docs/experiments/00-index",
                },
              ].map((item) => (
                <Link
                  to={item.href}
                  key={item.label}
                  className="flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-border hover:bg-accent/50 transition-all"
                >
                  <div className="mt-1 rounded-lg bg-primary/10 p-2 text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA / Conformance */}
        <section className="border-t border-border/40 bg-muted/10 py-16">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Conformance</h2>
            <div className="text-muted-foreground mb-8 text-lg">
              NNLP defines how to use natural language to design, steer, and verify AI-assisted work. It formalizes intent, constraints, delegation, and evidence-based review so that outcomes remain accountable.
            </div>
            <Link
              className="text-primary font-semibold hover:underline"
              to="/docs/00-handbook-introduction/scope-and-applicability"
            >
              Read the full Conformance Criteria →
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
