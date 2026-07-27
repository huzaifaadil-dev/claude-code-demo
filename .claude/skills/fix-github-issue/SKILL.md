---
description: Review a GitHub issue, solve the issue, and submit a PR fix.
---
Follow this approach to fix GitHub issues:

- Fetch context: Run gh issue view [number] to understand the problem.
- Create a branch: Use git checkout -b fix/issue-[number].
- Solve the issue: Follow project guidelines and standards.
- Write tests: You must write regression tests. The work is not complete until the test suite passes.
- Format: Run composer run format to ensure code style consistency.
- Commit: Use the convention fix-issue-[number].
- Submit PR: Use gh pr create with a clear summary of the changes.
- Respond: Provide a summary of changes and a link to the PR.
