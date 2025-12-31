---
title: "Cron and Scheduled LLM Jobs"
archetype: "code-snippet"
status: "active"
owner: "NNLP"
maintainer: "NNLP"
version": "1.0.0"
tags: ["automation", "scheduling", "cron", "batch-processing"]
last_reviewed: "2025-12-31"
---

# Cron and Scheduled LLM Jobs

Many LLM batch processing tasks—such as daily summarization of news articles, weekly report generation, or hourly data enrichment—need to run automatically at specific, predefined intervals. Job schedulers like `cron` (on Unix-like systems) are essential tools for orchestrating these automated workflows.

:::info[The Goal: Automated and Timely Execution]
The objective is to set up LLM-powered scripts to run reliably and without manual intervention at specified times, ensuring that your data processing pipelines are always up-to-date.
:::

---

## Why Use a Scheduler for LLM Jobs?

-   **Automation**: Eliminates manual intervention, reducing human error.
-   **Timeliness**: Ensures tasks run exactly when needed (e.g., end-of-day reports).
-   **Resource Efficiency**: Schedule heavy LLM tasks during off-peak hours.
-   **Scalability**: Supports continuous operation for long-running processes.

---

## 1. `cron` for Linux/macOS

`cron` is a time-based job scheduler in Unix-like operating systems. You define jobs in a special file called a `crontab`.

### `crontab` Syntax

A `crontab` entry has five time-and-date fields, followed by the command to be executed.

```
* * * * * command-to-be-executed
- - - - -
| | | | |
| | | | ----- Day of week (0 - 7) (Sunday is 0 or 7)
| | | ------- Month (1 - 12)
| | --------- Day of month (1 - 31)
| ----------- Hour (0 - 23)
------------- Minute (0 - 59)
```
-   `*`: Any value.
-   `,`: List separator (e.g., `1,15` for 1st and 15th minute).
-   `-`: Range separator (e.g., `9-17` for 9 AM to 5 PM).
-   `/`: Step values (e.g., `*/10` for every 10 minutes).

### Example `crontab` Entry

Let's say you have a Python script `process_daily_reports.py` located at `/home/user/llm_scripts/` that needs to run every day at 2:30 AM.

```bash
# Open your crontab for editing (first time will create it)
crontab -e
```

Add the following line to the editor that appears:

```crontab
# Min Hour Dom Mon Dow Command
30 2 * * * /usr/bin/python3 /home/user/llm_scripts/process_daily_reports.py >> /var/log/llm_reports.log 2>&1
```

**Explanation**:
-   `30`: Run at 30 minutes past the hour.
-   `2`: Run at 2 AM.
-   `* * *`: Every day of the month, every month, every day of the week.
-   `/usr/bin/python3`: Full path to the Python interpreter.
-   `/home/user/llm_scripts/process_daily_reports.py`: Full path to your script.
-   `>> /var/log/llm_reports.log 2>&1`: Redirects both standard output and standard error to a log file, appending to it. This is crucial for debugging.

### Python Script Considerations

Your Python script should:
-   **Use absolute paths**: File paths within the script should be absolute or derived from the script's location, as `cron` runs from `/`.
-   **Handle environment variables**: `cron` jobs often run with a minimal environment. Load `.env` files explicitly using `python-dotenv` (see [Secrets and Env Hygiene](./../15-safety-and-privacy/secrets-and-env-hygiene.md)).
-   **Log everything**: Ensure your script logs its progress, success, and failures to a file that the `cron` entry redirects to.
-   **Error Handling**: Implement robust `try-except` blocks.

---

## 2. Other Scheduling Options

### Windows Task Scheduler

The equivalent of `cron` on Windows, providing a graphical interface to schedule tasks. You can configure it to run programs or scripts at specific times or events.

### Advanced Workflow Orchestrators (Production)

For complex, interdependent workflows (e.g., an LLM task that depends on a database being updated, followed by another task, all with retry logic and monitoring), consider dedicated tools:
-   **Apache Airflow**: Open-source platform to programmatically author, schedule, and monitor workflows.
-   **Prefect / Dagster**: Modern data orchestration tools for building, running, and monitoring data pipelines.
-   **Cloud Schedulers**: AWS EventBridge, Google Cloud Scheduler, Azure Scheduler.

---

:::tip[Testing `cron` Jobs]
To test a `cron` job without waiting for its scheduled time, you can temporarily change the schedule to run in the next minute, or manually execute the command specified in your `crontab` entry directly in your shell.
:::

:::warning[Environment Variables]
`cron` jobs run in a very minimal shell environment. Crucial environment variables (like `PATH` or API keys) may not be set. Always ensure your script explicitly loads what it needs (e.g., using `load_dotenv()`) or provides full paths to executables.
:::