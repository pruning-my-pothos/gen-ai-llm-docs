---
title: "Comparing Evaluation Runs and Reporting Regressions"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version: "1.0.0"
tags: ["evaluation", "regression", "testing", "reporting"]
last_reviewed: "2025-12-31"
---

# Comparing Evaluation Runs and Reporting Regressions

LLM development is an iterative process. You'll constantly be tweaking prompts, trying new models, or adjusting RAG components. To ensure these changes lead to improvements and don't introduce regressions, you need a systematic way to compare the performance of your application across different versions or runs.

:::info[The Goal: Detect Changes, Prevent Regressions]
The objective is to objectively track how changes to your LLM application impact its performance on a [golden prompts set](./golden-prompts-set.md), identifying both improvements and, critically, any unintended degradations.
:::

---

## The Problem: Drifting Performance

Without a robust comparison methodology, it's easy for LLM application performance to "drift" or subtly degrade over time. Manual checks are insufficient for catching regressions across a diverse set of test cases.

---

## The Solution: Comparative Evaluation

The process involves:
1.  **Baseline Run**: Evaluate your application using your [golden prompts set](./golden-prompts-set.md) and save the results (e.g., pass/fail scores, retrieval metrics). This is your reference point.
2.  **New Run**: Make a change (e.g., new prompt, different LLM, RAG update) and re-evaluate using the *exact same golden set*. Save these new results.
3.  **Compare**: Compare the new results against the baseline, focusing on changes in metrics and, more importantly, individual prompt performance shifts.

---

## Python Script for Comparing Pass/Fail Runs

This script loads two sets of results (e.g., from [Pass/Fail Scoring](./pass-fail-scoring.md)), compares them, and generates a report highlighting changes.

```python
import json
from typing import List, Dict, Any
import difflib # For text comparison

def load_results(filepath: str) -> Dict[str, Dict[str, Any]]:
    """
    Loads evaluation results from a JSON file and indexes them by prompt ID.
    Assumes results are a list of dicts, each with an 'id' key.
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        results_list = json.load(f)
    return {item['id']: item for item in results_list}

def compare_runs(
    baseline_filepath: str,
    new_run_filepath: str,
    output_report_filepath: str = "regression_report.json"
) -> None:
    """
    Compares two evaluation runs (baseline vs. new) and generates a regression report.
    """
    baseline_results = load_results(baseline_filepath)
    new_results = load_results(new_run_filepath)

    report = {
        "summary": {},
        "regressions": [],
        "improvements": [],
        "output_changes": [],
        "unmatched_prompts": {
            "baseline_only": list(set(baseline_results.keys()) - set(new_results.keys())),
            "new_only": list(set(new_results.keys()) - set(baseline_results.keys()))
        }
    }

    # Aggregate scores for overall summary
    baseline_pass_count = sum(1 for r in baseline_results.values() if r.get('human_score') == 'PASS')
    new_pass_count = sum(1 for r in new_results.values() if r.get('human_score') == 'PASS')
    
    report["summary"]["baseline_pass_rate"] = (baseline_pass_count / len(baseline_results)) * 100 if baseline_results else 0
    report["summary"]["new_pass_rate"] = (new_pass_count / len(new_results)) * 100 if new_results else 0
    report["summary"]["pass_rate_change"] = report["summary"]["new_pass_rate"] - report["summary"]["baseline_pass_rate"]


    for prompt_id, new_item in new_results.items():
        baseline_item = baseline_results.get(prompt_id)

        if not baseline_item:
            continue # Already handled in unmatched_prompts

        # Compare Pass/Fail scores
        baseline_score = baseline_item.get('human_score')
        new_score = new_item.get('human_score')

        if baseline_score == 'PASS' and new_score == 'FAIL':
            report["regressions"].append({
                "prompt_id": prompt_id,
                "question": new_item['question'],
                "baseline_output": baseline_item['llm_output'],
                "new_output": new_item['llm_output']
            })
        elif baseline_score == 'FAIL' and new_score == 'PASS':
            report["improvements"].append({
                "prompt_id": prompt_id,
                "question": new_item['question'],
                "baseline_output": baseline_item['llm_output'],
                "new_output": new_item['llm_output']
            })
        
        # Check for output content changes, even if score is same
        if baseline_item.get('llm_output') != new_item.get('llm_output'):
            diff = list(difflib.unified_diff(
                baseline_item.get('llm_output', '').splitlines(keepends=True),
                new_item.get('llm_output', '').splitlines(keepends=True),
                fromfile='baseline',
                tofile='new_run'
            ))
            report["output_changes"].append({
                "prompt_id": prompt_id,
                "question": new_item['question'],
                "baseline_output": baseline_item['llm_output'],
                "new_output": new_item['llm_output'],
                "diff": ''.join(diff)
            })
    
    with open(output_report_filepath, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2)
    
    print(f"\nRegression report generated: {output_report_filepath}")
    print(f"Baseline Pass Rate: {report['summary']['baseline_pass_rate']:.2f}%")
    print(f"New Run Pass Rate: {report['summary']['new_pass_rate']:.2f}%")
    print(f"Pass Rate Change: {report['summary']['pass_rate_change']:.2f}%")
    if report['regressions']:
        print(f"Detected {len(report['regressions'])} regressions. Review the report!")


if __name__ == "__main__":
    # Simulate saving evaluation results from two runs
    # In a real scenario, these would be the output files from pass-fail-scoring.md
    baseline_results_data = [
        {"id": "q1", "question": "Q1", "llm_output": "Correct answer for Q1.", "human_score": "PASS"},
        {"id": "q2", "question": "Q2", "llm_output": "Correct answer for Q2.", "human_score": "PASS"},
        {"id": "q3", "question": "Q3", "llm_output": "Incorrect for Q3.", "human_score": "FAIL"}
    ]
    with open("baseline_eval_results.json", "w", encoding="utf-8") as f:
        json.dump(baseline_results_data, f, indent=2)

    new_results_data = [
        {"id": "q1", "question": "Q1", "llm_output": "Correct answer for Q1.", "human_score": "PASS"},
        {"id": "q2", "question": "Q2", "llm_output": "Slightly different correct answer for Q2.", "human_score": "PASS"}, # Output changed, but still pass
        {"id": "q3", "question": "Q3", "llm_output": "Corrected answer for Q3.", "human_score": "PASS"}, # Improvement
        {"id": "q4", "question": "Q4", "llm_output": "New prompt output.", "human_score": "FAIL"} # New prompt, fails
    ]
    with open("new_run_eval_results.json", "w", encoding="utf-8") as f:
        json.dump(new_results_data, f, indent=2)

    compare_runs("baseline_eval_results.json", "new_run_eval_results.json")
```

---

:::tip[Use Version Control for Results]
Store your baseline evaluation results files (e.g., `baseline_eval_results.json`) under version control alongside your code. This allows you to easily track performance changes across different commits.
:::

:::warning[Review Regressions Manually]
Any detected regression, even if minor, should be manually reviewed. An automated metric might not capture the full context of why a particular output is now worse.
:::