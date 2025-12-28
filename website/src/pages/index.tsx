import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import {
  AcademicCapIcon,
  AutorenewIcon,
  BeakerIcon,
  BriefcaseIcon,
  CpuChipIcon,
  DocumentDuplicateIcon,
  HomeIcon,
  ShieldCheckIcon,
} from "../components/Icons";

type Block = {
  title: string;
  body: React.ReactNode;
};

const standardBlocks: Block[] = [
  {
    title: "Status of This Standard",
    body: (
      <div className="space-y-3">
        <p>
          NNLP is an <strong>open community standard</strong> for professional
          work with GenAI and LLMs. It defines how natural language can be used
          as a <strong>technical interface</strong> to produce software,
          documentation, and systems while keeping accountability human.
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Scope:</strong> AI-assisted work that impacts users,
            systems, or business outcomes.
          </li>
          <li>
            <strong>Non-goal:</strong> prompt tricks, tool-specific hacks, or
            replacing engineering judgment.
          </li>
          <li>
            <strong>Stability:</strong> evolving draft until the core
            requirements and conformance criteria are finalized.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Abstract",
    body: (
      <div className="space-y-3">
        <p>
          Large language models generate plausible outputs quickly, but they do
          not guarantee correctness. In practice, most failures are not model
          failures. They are <strong>specification failures</strong> and{" "}
          <strong>review failures</strong>.
        </p>
        <p>
          NNLP standardizes a repeatable method for expressing intent, encoding
          constraints, delegating safely to AI tools, and verifying outputs with
          evidence before acceptance.
        </p>
      </div>
    ),
  },
  {
    title: "Scope",
    body: (
      <div className="space-y-3">
        <p>NNLP applies when natural language is used to create or modify:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Software and infrastructure (code, IaC, pipelines, configs)</li>
          <li>
            Documentation and operational knowledge (runbooks, procedures,
            specs)
          </li>
          <li>
            System designs and workflows (agents, orchestration, policies,
            governance)
          </li>
        </ul>
        <p className="mt-2">
          NNLP does not attempt to define model architectures, training, or tool
          vendor guidance. It defines the human operating discipline required to
          use these systems professionally.
        </p>
      </div>
    ),
  },
  {
    title: "Definitions",
    body: (
      <ul className="list-disc space-y-1.5 pl-5 grid gap-2 md:grid-cols-2 md:space-y-0 md:[&>li]:mb-2 md:[&>li]:break-inside-avoid">
        <li>
          <strong>Intent:</strong> the outcome and success criteria for the
          work.
        </li>
        <li>
          <strong>Constraints:</strong> boundaries the solution must not violate
          (technical, security, compliance, cost, time).
        </li>
        <li>
          <strong>Delegation:</strong> assigning a scoped subtask to an AI tool
          to produce a draft artifact.
        </li>
        <li>
          <strong>Artifact:</strong> a concrete output that can be reviewed
          independently (spec, plan, code, tests, doc).
        </li>
        <li>
          <strong>Verification:</strong> evidence-based checks that an artifact
          meets intent and constraints.
        </li>
        <li>
          <strong>Acceptance:</strong> an explicit human decision to adopt or
          ship an artifact.
        </li>
        <li>
          <strong>Accountability:</strong> responsibility for outcomes remains
          with the human owner, not the tool.
        </li>
      </ul>
    ),
  },
  {
    title: "Normative Requirements",
    body: (
      <div className="space-y-3">
        <p>
          The keywords <strong>MUST</strong>, <strong>MUST NOT</strong>,{" "}
          <strong>SHOULD</strong>, and <strong>MAY</strong> indicate requirement
          levels for conformance to this standard.
        </p>
        <ul className="list-disc space-y-1.5 pl-5 grid gap-2 md:grid-cols-2 lg:grid-cols-3 md:space-y-0 md:[&>li]:mb-2 md:[&>li]:break-inside-avoid">
          <li>
            Work <strong>MUST</strong> define intent and success criteria before
            generation.
          </li>
          <li>
            Work <strong>MUST</strong> encode constraints explicitly (security,
            safety, compliance, business limits).
          </li>
          <li>
            AI outputs <strong>MUST</strong> be treated as drafts and reviewed
            before acceptance.
          </li>
          <li>
            Verification <strong>MUST</strong> produce evidence (tests, checks,
            references, diffs, evaluations).
          </li>
          <li>
            Acceptance <strong>MUST</strong> be a human decision with an
            identified owner.
          </li>
          <li>
            Delegation <strong>SHOULD</strong> be scoped to a single artifact or
            a single decision at a time.
          </li>
          <li>
            The process <strong>SHOULD</strong> record assumptions and decisions
            when impact is non-trivial.
          </li>
          <li>
            The workflow <strong>MUST NOT</strong> claim correctness without
            verification.
          </li>
        </ul>
      </div>
    ),
  },
];

const processSteps = [
  {
    name: "Discovery",
    output: "Problem statement, stakeholders, context",
    risk: "Solving the wrong problem",
  },
  {
    name: "Intent",
    output: "Success criteria, definition of done",
    risk: "Ambiguity and scope drift",
  },
  {
    name: "Constraints",
    output: "Boundaries, policies, non-functional requirements",
    risk: "Overreach and unsafe changes",
  },
  {
    name: "Delegation",
    output: "Task split, tool selection, prompts as specs",
    risk: "Delegating judgment instead of execution",
  },
  {
    name: "Generation",
    output: "Draft artifacts (code, docs, plans)",
    risk: "Plausible but incorrect outputs",
  },
  {
    name: "Review",
    output: "Evidence, tests, diffs, factual checks",
    risk: "Skipping verification",
  },
  {
    name: "Acceptance",
    output: "Approved decision, ownership, release plan",
    risk: "Premature shipping",
  },
  {
    name: "Iteration/Release",
    output: "Hardened workflow, updated templates, learnings",
    risk: "Repeating the same failures",
  },
];

const conformanceBlocks: Block[] = [
  {
    title: "Conformance",
    body: (
      <div className="space-y-3">
        <p>
          A workflow conforms to NNLP when it consistently produces reviewable
          artifacts and enforces verification before acceptance.
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Minimum conformance:</strong> intent, constraints,
            verification evidence, and a named human owner.
          </li>
          <li>
            <strong>Strong conformance:</strong> artifact contracts, reusable
            templates, logged assumptions, and repeatable evaluations.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "How to Use This Repository",
    body: (
      <div className="space-y-3">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            New to NNLP: start with{" "}
            <Link to="/docs/00-start-here/00-introduction">Start Here</Link>{" "}
            and then{" "}
            <Link to="/docs/03-nnlp-method/00-the-nnlp-loop">
              the NNLP Loop
            </Link>
            .
          </li>
          <li>
            Applying NNLP at work: use{" "}
            <Link to="/docs/09-templates/00-templates-index">Templates</Link>{" "}
            and{" "}
            <Link to="/docs/07-guardrails-and-governance/guardrails-index">
              Guardrails
            </Link>
            .
          </li>
          <li>
            Building role playbooks: start with{" "}
            <Link to="/docs/04-execution-patterns/00-pattern-index">
              Execution Patterns
            </Link>{" "}
            and backfill skills as needed.
          </li>
        </ul>
      </div>
    ),
  },
];

const heroInside = [
  {
    title: "Lifecycle Guides",
    blurb: "Document strategy, architecture decisions, evaluation, and governance for GenAI products.",
    insight:
      "Stage-gated lifecycle docs: Buy/Boost/Build decisions, data contracts, evaluation scorecards, rollback criteria.",
  },
  {
    title: "Role Playbooks",
    blurb: "How PMs, Platform/Infra, Tech Writers, and Risk teams work with stochastic systems.",
    insight:
      "Role-specific checklists for PM, Platform/Infra, Tech Writers, Risk: required docs pre/post milestones with owners.",
  },
  {
    title: "Governance & Guardrails",
    blurb: "Security, safety, compliance, data boundaries, red teaming, accountability models.",
    insight:
      "Ready-to-run controls: data boundaries, red-team playbooks, accountability models, audit trails aligned to NIST AI RMF.",
  },
  {
    title: "Templates (Embedded)",
    blurb: "PRDs, scorecards, system cards, decision records—usable in-doc, no separate downloads.",
    insight:
      "Copy-ready artifacts (PRDs, scorecards, system cards, ADRs) embedded next to guidance; no separate downloads.",
  },
];

const heroInsideColors = [
  "hover:bg-primary/10",
  "hover:bg-amber-100 dark:hover:bg-amber-900/30",
  "hover:bg-emerald-100 dark:hover:bg-emerald-900/30",
  "hover:bg-sky-100 dark:hover:bg-sky-900/30",
];

const mustRules = [
  "Define intent and success criteria before generation.",
  "Encode constraints explicitly (security, safety, compliance, business limits).",
  "Treat AI outputs as drafts and review before acceptance.",
  "Produce verification evidence (tests, checks, references, diffs, evaluations).",
  "Make acceptance a human decision with an identified owner.",
  "Do not claim correctness without verification.",
];

const shouldRules = [
  "Scope delegation to a single artifact or single decision at a time.",
  "Record assumptions and decisions when impact is non-trivial.",
];

const mayRules = [
  "Use discretionary adaptations that do not weaken review, verification, or accountability.",
];

export default function Home(): JSX.Element {
  return (
    <Layout
      title="NNLP Standard"
      description="An open community standard for professional AI-assisted work."
    >
      <main className="bg-background text-foreground">
        {/* Hero Section */}
        <section className="relative border-b border-border/40 bg-background py-14 md:py-16 lg:py-18">
          <div className="container mx-auto px-6">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="space-y-6 max-w-2xl">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                  Open Community Standard v0.1.0
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  NNLP Standard
                  <span className="block text-primary">
                    Natural language, made professional.
                  </span>
                </h1>
                <p className="text-base md:text-lg leading-7 text-muted-foreground">
                  NNLP defines how to use natural language to design, steer, and
                  verify AI-assisted work. It formalizes intent, constraints,
                  delegation, and evidence-based review so that outcomes remain
                  accountable.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    to="/docs/00-start-here/00-introduction"
                  >
                    Read the Standard
                  </Link>
                  <Link
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-semibold shadow-sm hover:bg-accent hover:text-accent-foreground"
                    to="/docs/03-nnlp-method/00-the-nnlp-loop"
                  >
                    View Process Model
                  </Link>
                </div>
              </div>

              <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg lg:ml-auto lg:max-w-[520px]">
                <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-muted-foreground">What’s inside</div>
              <Link className="text-primary text-sm hover:underline" to="/docs/00-start-here/00-introduction">
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

        {/* Core Framework */}
        <section className="container mx-auto px-6 py-16 space-y-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Core Framework
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Scope, definitions, and the normative baseline for professional NNLP practice.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Scope */}
            <div className="bg-card/70 border border-border rounded-2xl p-6 shadow-sm h-full flex flex-col space-y-3 hover:-translate-y-1 hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold text-primary">{standardBlocks[2].title}</h3>
              <div className="text-sm text-muted-foreground leading-relaxed flex-1">
                {standardBlocks[2].body}
              </div>
            </div>

            {/* Definitions */}
            <div className="bg-card/70 border border-border rounded-2xl p-6 shadow-sm h-full flex flex-col space-y-3 hover:-translate-y-1 hover:shadow-md transition-all">
              <h3 className="text-xl font-semibold text-primary">{standardBlocks[3].title}</h3>
              <div className="text-sm text-muted-foreground leading-relaxed flex-1">
                {standardBlocks[3].body}
              </div>
            </div>
          </div>
        </section>

        {/* Normative Requirements */}
        <section className="container mx-auto px-6 pb-16">
          <div className="mx-auto max-w-3xl text-center mb-8">
            <h3 className="text-2xl font-bold">Normative Requirements</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Requirement levels for conformance to this standard.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-rose-50/80 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl p-6 shadow-sm flex flex-col hover:-translate-y-1 hover:shadow-md transition-all">
              <h4 className="text-lg font-semibold mb-3 text-rose-700 dark:text-rose-200">MUST</h4>
              <ul className="space-y-2 text-sm text-foreground/90 leading-relaxed">
                {mustRules.map((rule) => (
                  <li key={rule} className="pl-3 border-l-2 border-rose-400/70 dark:border-rose-300/50">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/80 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 shadow-sm flex flex-col hover:-translate-y-1 hover:shadow-md transition-all">
              <h4 className="text-lg font-semibold mb-3 text-amber-700 dark:text-amber-200">SHOULD</h4>
              <ul className="space-y-2 text-sm text-foreground/90 leading-relaxed">
                {shouldRules.map((rule) => (
                  <li key={rule} className="pl-3 border-l-2 border-amber-400/70 dark:border-amber-300/50">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50/80 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 shadow-sm flex flex-col hover:-translate-y-1 hover:shadow-md transition-all">
              <h4 className="text-lg font-semibold mb-3 text-emerald-700 dark:text-emerald-200">MAY</h4>
              <ul className="space-y-2 text-sm text-foreground/90 leading-relaxed">
                {mayRules.map((rule) => (
                  <li key={rule} className="pl-3 border-l-2 border-emerald-400/70 dark:border-emerald-300/50">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Process Model Section */}
        <section className="bg-muted/30 py-18 md:py-20 border-y border-border/40">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                The NNLP Loop
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A control loop from problem to acceptance. Each step produces a
                reviewable artifact with ownership.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((s, idx) => (
                <div
                  key={s.name}
                  className="group relative bg-background transition-all border border-border rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {idx + 1}
                    </span>
                    <h3 className="font-semibold text-lg">{s.name}</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="space-y-1">
                      <span className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold block">
                        Output
                      </span>
                      <p className="text-foreground/90 leading-snug min-h-[44px] flex items-center font-medium">
                        {s.output}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold block">
                        Risk
                      </span>
                      <p className="text-red-600/80 dark:text-red-400/80 leading-snug min-h-[44px] flex items-center font-mono font-semibold">
                        {s.risk}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                to="/docs/03-nnlp-method/00-the-nnlp-loop"
              >
                View the full process
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
                Navigate the standard, supporting skills, and evidence.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  label: "Start Here",
                  desc: "Core definitions and how to approach NNLP",
                  icon: HomeIcon,
                  href: "/docs/00-start-here/00-introduction",
                },
                {
                  label: "Core Skills",
                  desc: "Prerequisites: logic, language, systems, sentences",
                  icon: AcademicCapIcon,
                  href: "/docs/01-core-skills/00-core-skills-overview",
                },
                {
                  label: "Minimum Necessary Fundamentals",
                  desc: "Enough GenAI and LLM theory to avoid misuse",
                  icon: CpuChipIcon,
                  href: "/docs/02-genai-llm-fundamentals/00-fundamentals-index",
                },
                {
                  label: "NNLP Method",
                  desc: "Normative process model and artifact contracts",
                  icon: AutorenewIcon,
                  href: "/docs/03-nnlp-method/00-the-nnlp-loop",
                },
                {
                  label: "Execution Patterns & Scenarios",
                  desc: "Role-based application patterns",
                  icon: BriefcaseIcon,
                  href: "/docs/04-execution-patterns/00-pattern-index",
                },
                {
                  label: "Guardrails & Governance",
                  desc: "Safety, quality, compliance, accountability",
                  icon: ShieldCheckIcon,
                  href: "/docs/07-guardrails-and-governance/guardrails-index",
                },
                {
                  label: "Experiments",
                  desc: "Evidence from real usage, including failures",
                  icon: BeakerIcon,
                  href: "https://github.com/pruning-my-pothos/NNLP/tree/main/experiments",
                },
                {
                  label: "Templates",
                  desc: "Reference implementations of artifacts and checklists",
                  icon: DocumentDuplicateIcon,
                  href: "/docs/09-templates/00-templates-index",
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
              {conformanceBlocks[0].body}
            </div>
            <Link
              className="text-primary font-semibold hover:underline"
              to="/docs/00-start-here/00-introduction"
            >
              Read the full Conformance Criteria →
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
