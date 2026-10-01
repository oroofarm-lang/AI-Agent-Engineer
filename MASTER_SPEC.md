AI AGENT ENGINEER
Personal Learning OS
Complete Master Specification for Codex
Document Version: 1.0 Curriculum Baseline: September 2026 Course Duration Target: 16 weeks Study Rhythm: 5 days per week Maximum Study Allocation: ~4 hours per day Total Maximum: ~320 hours Learning Philosophy: Build → Understand → Break → Debug → Rebuild → Prove

PART I — INITIAL INSTRUCTIONS FOR CODEX
You are acting as a senior full-stack engineer, AI systems architect, product designer, curriculum-platform engineer, QA engineer, and technical documentation specialist.
Your job is to build a complete local-first interactive learning platform called:
AI Agent Engineer
Personal Learning OS
This is NOT a simple course website.
It is a serious technical learning environment designed to take a beginner from basic coding knowledge to the ability to independently design, build, test, secure, evaluate, and deploy production-grade AI agent systems.

1. START WITH A CLEAN REPOSITORY
Start this project in a brand-new, clean repository.
Do not reuse:
unrelated applications;
existing product codebases;
boilerplate-heavy starter projects;
previous experiments.
The goal is to keep the architecture clean and intentional from the beginning.

2. DO NOT IMMEDIATELY GENERATE THE ENTIRE APPLICATION
Before substantial implementation:
inspect the repository;
understand the environment;
propose the architecture;
define the technology stack;
propose the folder structure;
define curriculum schemas;
define the database approach;
define AI Mentor architecture;
define Curriculum Auditor architecture;
define implementation phases.
Only after this planning step should implementation begin.
Do not dump hundreds of files into the repository before validating the foundation.

3. BUILD INCREMENTALLY
Preserve a working state throughout development.
After each significant milestone:
run the application;
run lint;
run type checking;
run relevant unit tests;
run relevant integration tests;
inspect failures;
repair them before continuing.
Do not leave:
broken routes;
fake buttons;
placeholder-only core features;
obviously unfinished navigation;
misleading simulated functionality.
Prefer a smaller correctly implemented feature over a fake complete-looking feature.

4. CREATE PEDAGOGICAL SOURCE OF TRUTH
Create:
docs/master-curriculum-spec.md
This document should contain the curriculum specification from PART II of this master document.
Treat it as the pedagogical source of truth.
It defines:
what must be taught;
teaching sequence;
skills;
projects;
Boss Levels;
mastery criteria;
learning philosophy;
graduation criteria;
curriculum update behavior.

5. CREATE TECHNICAL SOURCE OF TRUTH
Create:
docs/ARCHITECTURE.md
This should describe how the application implements the requirements in PART III of this document.
The distinction is:
docs/master-curriculum-spec.md
= WHAT the learner must learn and why.
docs/ARCHITECTURE.md
= HOW the application is designed to deliver that learning experience.
If conflicts occur:
pedagogical/content decisions follow the Curriculum Specification;
application architecture follows the Product Build Specification.

6. DO NOT HARDCODE THE CURRICULUM INTO UI COMPONENTS
Curriculum must live as structured, versioned content/data.
It must be possible to:
update lessons;
version lessons;
diff changes;
migrate progress;
audit references;
connect lessons to skills;
connect projects to lessons;
connect technology updates to affected lessons.
Progress must rely on stable IDs, not lesson titles.

7. STABLE IDENTIFIERS
Use stable IDs for:
lessons;
skills;
projects;
Boss Levels;
assessments;
technologies;
curriculum versions.
Example lesson ID:
W03D13_AGENT_LOOP
Do not casually change IDs after release.
Titles may change.
Stable IDs should not.

8. NEVER FAKE FUNCTIONALITY
If a requested feature cannot yet be fully implemented, clearly indicate that it is incomplete.
Do not build buttons that appear functional but perform no meaningful action.
Do not show simulated AI output without clearly labeling it as demo/mock output.
Do not pretend tests passed if they were not executed.

9. FINAL OBJECTIVE
The objective is not simply to build a course website.
Build a:
Maintainable
Versioned
AI-assisted
Mastery-driven
Self-auditing
Learning Operating System for AI Agent Engineering.

PART II — MASTER CURRICULUM SPECIFICATION
1. END GOAL
A graduate must be capable of receiving a vague real-world problem such as:
Build an AI system that receives customer requests, investigates missing information, accesses company knowledge, calls external services, delegates specialist tasks, requests human approval before risky actions, and measures whether its decisions are correct.
The graduate must independently transform that problem into a production architecture.
They must be able to:
determine whether AI is needed;
determine whether an agent is needed;
determine whether multi-agent architecture is justified;
choose deterministic vs agentic steps;
design tools;
design state;
design memory;
integrate databases;
integrate APIs;
build retrieval systems;
implement human approval;
create eval datasets;
trace agent behavior;
debug failures;
mitigate prompt injection;
control permissions;
manage latency;
manage cost;
deploy;
monitor;
explain architectural decisions.
Completion of lessons alone does not constitute graduation.
Graduation requires demonstrated engineering mastery.

2. EDUCATIONAL PHILOSOPHY
Do NOT teach:
Theory → Theory → Theory → Project.
Every major concept follows:
BUILD
Create something functional quickly.
UNDERSTAND
Study what actually happened.
BREAK
Introduce errors, adversarial input, malformed data and edge cases.
DEBUG
Use logs, traces and tests to diagnose the failure.
REBUILD
Improve the architecture.
PROVE
Complete an independent challenge without step-by-step instructions.
The student must encounter working agents during Week 1.

3. COURSE CONTENT STABILITY
Curriculum content belongs to three stability classes.
FOUNDATION
Slow-changing concepts.
Examples:
Python
HTTP
JSON
APIs
databases
async programming
software architecture
testing
authentication
authorization
concurrency
state machines
Foundation content must not be rewritten because a vendor launches a new product.

AGENT ENGINEERING
Moderately changing concepts.
Examples:
context engineering
tool calling
agent loops
memory
RAG
orchestration
multi-agent systems
evaluation
human-in-the-loop
guardrails
These should periodically be reviewed.

ECOSYSTEM
Fast-changing implementation details.
Examples:
OpenAI APIs
Agents SDK
Agents API
LangGraph
MCP implementations
hosted tools
model selection
current best practices
These must be versioned and updateable.

4. COURSE STRUCTURE
16 weeks.
5 learning days per week.
80 learning days.
Approximately 4 hours per day maximum.
Time is not artificially filled.
If mastery is achieved early, student advances.

5. DAILY LESSON STRUCTURE
Each day includes:
Mission
What the learner should be capable of doing.
Build First
Practical implementation.
Concepts
Underlying theory.
Mental Model
Simple architecture or conceptual diagram.
Deep Dive
Optional advanced layer.
Failure Lab
Intentional failure.
Challenge
Independent variation.
Mastery Check
Proof of learning.
Documentation
Primary sources.
Engineering Notes
Student notes.

WEEK 1 — ZERO TO WORKING AI SOFTWARE
Day 1 — Your First AI Program
Mission
Go from an empty folder to a working Python application communicating with an AI model.
Learn
terminal basics;
directories;
Python execution;
packages;
virtual environments;
environment variables;
API keys;
request/response basics;
Git basics.
Build
CLI:
python app.py
User asks a question.
Application sends request to model.
Application prints response.
Deep Dive
Understand:
SDK;
HTTP;
API;
model;
application.
Mastery
Student recreates project from an empty folder.

Day 2 — Python for Agent Builders I
Learn:
variables;
strings;
numbers;
booleans;
lists;
dictionaries;
conditions;
loops;
functions.
Build
Command router supporting:
research;
summarize;
extract.
Challenge
Add another capability independently.

Day 3 — Python for Agent Builders II
Learn:
functions;
types;
classes basics;
imports;
packages;
exceptions;
files;
JSON.
Build
Save and load conversations.
Failure Lab
Handle:
corrupted JSON;
missing files;
missing properties.

Day 4 — HTTP & APIs
Understand:
client;
server;
request;
response;
endpoint;
HTTP method;
headers;
request body;
authentication;
status codes;
rate limits.
Build
Call multiple APIs.
Normalize results.
Mastery
Explain what happens from application code to external service and back.

Day 5 — PROJECT
Agent Zero
Requirements:
receives a task;
uses one external function;
returns structured output;
handles failures;
logs steps.

WEEK 2 — LLM ENGINEERING
Day 6 — How LLM Applications Work
Learn:
tokens;
context;
instructions;
model inputs;
outputs;
reasoning;
latency;
costs;
context limits.
Experiment
Change context and observe behavior.

Day 7 — Context Engineering
Learn:
system/developer/user instructions;
task context;
examples;
constraints;
irrelevant information;
context pollution.
Build
Three versions of the same AI application using different context architectures.

Day 8 — Structured Outputs
Learn:
JSON Schema;
validation;
typed data;
required fields;
optional fields;
enums.
Build
Free text customer inquiry →
validated Lead object.

Day 9 — Model Reliability
Learn:
hallucination;
grounding;
uncertainty;
verification;
deterministic components;
fallback logic.
Build
System that outputs:
KNOWN
UNKNOWN
NEEDS VERIFICATION

Day 10 — PROJECT
Intelligent Intake Engine
Input:
text;
file;
form.
Output:
validated structured record.
Includes:
schema;
validation;
error handling;
logs;
uncertainty handling.

WEEK 3 — AGENT LOOP FROM SCRATCH
Day 11 — What Makes Something an Agent?
Distinguish:
LLM call;
chatbot;
automation;
workflow;
agent;
multi-agent system.
Exercise
Classify systems.
Explain why some should NOT be agentic.

Day 12 — Tool Calling
Learn:
tool definitions;
schemas;
arguments;
tool results;
tool choice;
validation.
Build
Tools such as:
calculator;
database lookup;
mocked external service.
Model chooses correct tool.

Day 13 — The Agent Loop
Implement manually:
GOAL ↓ MODEL ↓ TOOL CALL ↓ EXECUTION ↓ OBSERVATION ↓ MODEL ↓ STOP / CONTINUE
Do not use an agent framework.

Day 14 — Reliability & Failure Handling
Learn:
retries;
timeouts;
invalid arguments;
tool errors;
maximum iterations;
infinite loops;
budget constraints.
Failure Lab
Create a looping agent.
Add safeguards.

Day 15 — PROJECT
Agent From Scratch
Must contain:
multiple tools;
routing;
limits;
structured final result;
error recovery;
execution logs;
budgets.
Frameworks forbidden.

WEEK 4 — RESEARCH AGENTS
Day 16 — Task Decomposition
Convert broad research goals into:
subquestions;
actions;
evidence requirements.
Build
Research planner.

Day 17 — Search & Evidence
Learn:
source quality;
primary sources;
secondary sources;
freshness;
citations;
contradictions.

Day 18 — Iterative Research
Agent determines:
what is known;
what is missing;
whether further research is justified;
when research should stop.

Day 19 — Research Quality
Learn:
citation verification;
duplicate evidence;
disagreement;
missing evidence.
Build
Evidence table.

Day 20 — BOSS LEVEL 1
Research Agent
Student receives specification only.
Must build system that:
accepts research goal;
plans;
searches;
gathers evidence;
records sources;
detects contradiction;
performs follow-up research;
stops appropriately;
creates sourced report.
Mentor operates primarily in hint mode.

WEEK 5 — DATABASES, STATE & MEMORY
Day 21 — Databases
Learn:
SQL;
tables;
rows;
keys;
queries;
indexes;
transactions.
Start with SQLite.
Introduce PostgreSQL concepts.

Day 22 — State
Distinguish:
application state;
conversation state;
workflow state;
persistent data.
Build
Stateful conversation system.

Day 23 — Agent Memory
Distinguish:
short-term memory;
working state;
long-term memory;
semantic memory;
episodic memory;
user preferences.

Day 24 — Memory Quality
Problems:
incorrect memory;
stale memory;
duplicate memory;
privacy;
over-personalization.
Build
Memory write policy.

Day 25 — PROJECT
Personal Memory Agent
Supports:
remember;
retrieve;
update;
ignore;
delete.
All memory actions auditable.

WEEK 6 — RAG & KNOWLEDGE SYSTEMS
Day 26 — Embeddings
Understand semantic similarity.
Build embedding experiments.

Day 27 — Chunking & Vector Retrieval
Learn:
chunks;
metadata;
indexes;
vector search.
Test chunk sizes.

Day 28 — Hybrid Retrieval & Reranking
Learn:
filters;
lexical + semantic search;
top-k;
reranking;
context assembly.

Day 29 — RAG Failure Modes
Learn:
wrong retrieval;
missing retrieval;
false grounding;
retrieval contamination;
context overload.
Create retrieval eval dataset.

Day 30 — PROJECT
Knowledge Agent
Requirements:
ingest documents;
retrieve;
cite;
answer;
admit insufficient evidence;
expose supporting passages.

WEEK 7 — EXTERNAL SYSTEMS & MCP
Day 31 — Production APIs
Learn:
REST;
auth;
OAuth;
webhooks;
pagination;
rate limits.

Day 32 — Tool Design
Learn:
tool granularity;
names;
schemas;
permissions;
side effects.
Exercise
Refactor badly designed tool catalog.

Day 33 — MCP
Understand:
client;
server;
tools;
resources;
prompts;
authorization;
trust boundaries.

Day 34 — Side Effects & Permissions
Classify:
READ
WRITE
DESTRUCTIVE
HIGH IMPACT
Build
Approval policy.

Day 35 — PROJECT
Operations Agent
Example:
read request ↓ retrieve information ↓ inspect files ↓ prepare action ↓ request approval ↓ execute ↓ log

WEEK 8 — MODERN AGENT RUNTIMES
Day 36 — Responses API
Rebuild prior agent using direct model/tool integration.
Understand explicit orchestration.

Day 37 — Agents SDK
Learn:
Agent;
Runner;
tools;
sessions;
handoffs;
results;
tracing;
guardrails.

Day 38 — Managed / Durable Agent Runtime Concepts
Understand differences between:
direct API;
SDK runtime;
managed runtime;
durable environments.

Day 39 — LangGraph
Learn:
graphs;
nodes;
edges;
state;
checkpoints;
interrupts;
durable execution.

Day 40 — BOSS LEVEL 2
Build one system twice.
Version A:
direct/manual architecture.
Version B:
agent framework/runtime.
Write comparison covering:
complexity;
control;
observability;
persistence;
maintainability;
lock-in;
suitability.

WEEK 9 — ORCHESTRATION
Day 41 — Deterministic vs Agentic Workflow
Teach principle:
If traditional software can reliably make a decision, it often should.

Day 42 — Routers
Build request router.

Day 43 — Parallel Work
Learn:
async;
concurrency;
fan-out;
fan-in.
Build multiple parallel workers/agents.

Day 44 — Long-Running Workflows
Learn:
checkpoints;
resumability;
idempotency;
recovery.

Day 45 — PROJECT
Durable Workflow Agent
Start task.
Interrupt system.
Restart.
Resume correctly.

WEEK 10 — MULTI-AGENT SYSTEMS
Day 46 — When Multi-Agent Makes Sense
Benefits:
specialization;
isolation;
parallelism;
ownership.
Costs:
latency;
cost;
coordination complexity;
nondeterminism.

Day 47 — Manager Pattern
Manager remains responsible for outcome.
Specialists act as workers/tools.

Day 48 — Handoffs
Transfer ownership to specialist.
Compare:
manager vs handoff.

Day 49 — Shared State & Coordination
Learn:
contracts;
conflict resolution;
review patterns;
critic patterns.
Avoid pointless “agent debate”.

Day 50 — PROJECT
AI Company
Minimum:
Orchestrator;
Research Specialist;
Domain Specialist;
Execution Specialist;
Reviewer.
Requirements:
parallel task;
sequential task;
delegation;
shared contracts;
failure handling.

WEEK 11 — EVALS & OBSERVABILITY
Day 51 — Why Demos Lie
Define formal success criteria.

Day 52 — Evaluation Dataset Design
Include:
normal cases;
edge cases;
adversarial cases;
historical failures.

Day 53 — Graders
Learn:
deterministic graders;
AI graders;
human labels;
pairwise comparison.

Day 54 — Tracing
Observe:
model calls;
tools;
latency;
failures;
handoffs;
state transitions.

Day 55 — PROJECT
Agent Quality Lab
Take prior agent.
Create:
eval dataset;
baseline;
grader;
trace review;
failure taxonomy.
Improve agent.
Run again.
Demonstrate improvement.

WEEK 12 — SECURITY & HUMAN CONTROL
Day 56 — Prompt Injection
Learn:
direct injection;
indirect injection;
untrusted content.

Day 57 — Tool Attacks
Learn:
malicious arguments;
data exfiltration;
over-permissioning;
credential exposure.

Day 58 — Authentication & Authorization
Understand:
identity;
authentication;
authorization;
least privilege;
tenant isolation;
secrets.

Day 59 — Human-in-the-Loop
Implement:
approval;
edit;
reject;
resume.

Day 60 — BOSS LEVEL 3
Red Team
Attack AI Company with:
prompt injection;
malicious file instructions;
malicious tool argument;
privilege escalation;
secret extraction;
infinite loop;
bad API response.
Patch vulnerabilities.
Create regression tests.

WEEK 13 — PRODUCTION BACKEND
Day 61 — Backend APIs
Learn:
routes;
validation;
responses;
FastAPI or equivalent.

Day 62 — Production Databases
Learn:
PostgreSQL;
migrations;
transactions;
indexing.

Day 63 — Queues & Workers
Learn:
jobs;
background tasks;
retries;
dead-letter patterns.

Day 64 — Streaming
Learn:
streaming output;
events;
run status;
progress state.

Day 65 — PROJECT
Convert agent into API service.
Requirements:
authentication;
persistence;
job tracking;
error responses;
logs.

WEEK 14 — PRODUCT & DEPLOYMENT
Day 66 — Frontend Fundamentals
Learn:
React;
Next.js;
components;
state;
API interaction.

Day 67 — Agent UI
Build:
chat;
run view;
tool activity;
approvals.

Day 68 — Deployment
Learn:
Docker;
cloud environments;
environment variables;
domains;
HTTPS.

Day 69 — Production Concerns
Learn:
monitoring;
budgets;
usage;
caching;
latency;
rate limits;
model routing.

Day 70 — PROJECT
Agent SaaS
Contains:
frontend;
backend;
authentication;
persistent data;
agent;
tools;
deployment;
monitoring.

WEEK 15 — ADVANCED AGENTS
Day 71 — Browser & Computer Agents
Understand observation/action loops.

Day 72 — Code & Sandbox Agents
Learn:
files;
shell;
packages;
isolated execution;
security boundaries.

Day 73 — Dynamic Tools
Learn:
tool search;
large catalogs;
deferred tools;
dynamic capability discovery.

Day 74 — Agentic Coding
Learn loop:
Plan ↓ Edit ↓ Test ↓ Inspect ↓ Repair
Build controlled coding agent.

Day 75 — PROJECT
Autonomous Workflow
Must use several:
planning;
files;
external tools;
code;
browser;
validation;
human checkpoint;
artifact creation.

WEEK 16 — CAPSTONE
No tutorials.
Day 76 — Discovery
Receive business problem.
Produce:
requirements;
constraints;
risks;
success metrics.

Day 77 — Architecture
Answer:
why AI?
why agent?
why this runtime?
why these tools?
where is state?
where is approval?
how does failure recovery work?

Day 78 — Build
Implement core system.

Day 79 — Harden
Run:
security checks;
evals;
performance tests;
trace review;
failure recovery tests.

Day 80 — FINAL BOSS
Demonstrate full solution.
Student must:
run live scenarios;
explain traces;
handle failure;
show eval results;
justify architecture;
adapt system to one changed requirement live.

REQUIRED PORTFOLIO
Agent Zero
Intelligent Intake Engine
Agent From Scratch
Research Agent
Personal Memory Agent
Knowledge Agent
Operations Agent
Durable Workflow Agent
AI Company
Agent Quality Lab
Agent SaaS
Autonomous Workflow
Final Capstone

MASTERY MODEL
Each skill has four levels.
0 — Unseen
Not studied.
1 — Understand
Can explain.
2 — Implement
Can build with references.
3 — Master
Can independently design, implement and debug.

CORE SKILL TREE
Programming
Python Git HTTP/APIs JSON/Schemas Async/Concurrency
LLM Engineering
Context Engineering Structured Outputs Grounding Model Selection Cost & Latency
Agent Engineering
Tool Calling Agent Loop Planning Stopping Conditions State Memory
Knowledge
Embeddings Retrieval RAG Reranking
Orchestration
Workflows Routers Parallelization Durable Execution
Multi-Agent
Manager Handoffs Specialization Coordination
Reliability
Testing Evals Tracing Observability
Security
Prompt Injection Authorization Guardrails Human Approval
Production
Backend Database Queues Deployment Monitoring
Advanced
MCP Computer Use Sandbox Agents Coding Agents Dynamic Tools

GRADUATION CRITERIA
Graduate must demonstrate:
Architecture
Can design system independently.
Coding
Can implement without tutorial.
Tools
Can integrate external systems safely.
State
Can design persistence and memory.
Reliability
Can evaluate and debug.
Security
Can identify common agent risks.
Production
Can deploy.
Judgment
Can recognize when NOT to use agents.
Adaptability
Can read unfamiliar documentation and implement a new capability.

FINAL LEARNING GOAL
The most important result is not remembering today's SDK.
The learner must reach the point where a new AI technology appears and they can:
read the documentation;
map it to concepts they already know;
judge whether it is useful;
prototype it;
evaluate it;
integrate it safely.

PART III — PRODUCT & TECHNICAL BUILD SPECIFICATION
1. PRODUCT GOAL
Build:
AI Agent Engineer — Personal Learning OS
The application must allow a learner to open the platform and immediately understand:
where they are;
what to learn next;
what to build next;
why it matters;
what they have mastered;
what remains weak;
what changed in the AI ecosystem.

2. PRIMARY USER
Single user initially.
Profile:
beginner/basic AI developer;
willing to learn coding;
wants deep understanding;
prefers practical learning;
studies ~5 days/week;
up to ~4 hours/day;
may progress faster.
Course must be mastery-driven, not timer-driven.

3. LANGUAGE
Default:
Hebrew.
Locale:
he-IL
Direction:
RTL.
Technical terminology and code may stay English.
Code blocks always LTR.
Architecture must allow future English localization.

4. DESIGN DIRECTION
Premium developer learning environment.
Design qualities:
minimal;
sophisticated;
calm;
technical;
high information density;
strong hierarchy;
excellent typography;
dark mode primary;
optional light mode.
Conceptual inspiration:
Linear;
Raycast;
Vercel;
GitHub;
modern developer tools.
Do not copy proprietary designs.
Avoid childish gamification.

5. RECOMMENDED STACK
Preferred stack:
Frontend
Next.js React TypeScript Tailwind CSS Accessible component library
Backend
Next.js server routes or clean server layer.
AI calls server-side only.
Database
SQLite initially.
ORM:
Prisma or Drizzle.
Make PostgreSQL migration easy.
Validation
Zod.
AI
OpenAI API.
Provider abstraction.
Testing
Vitest/Jest.
Playwright.
Curriculum
MDX / Markdown + structured metadata.

6. MAIN NAVIGATION
Dashboard
Learn
Skill Tree
Projects
Boss Levels
Engineering Journal
Failure Library
What's New
Curriculum Health
Settings
Global AI Mentor.

7. DASHBOARD
Show:
Current Position
Week Day Lesson Project Mastery
Main CTA
Continue Learning
Secondary:
Resume Project Review Weak Skill Ask Mentor Check for AI Updates
Metrics:
Course Progress Engineering Mastery Current Week Curriculum Freshness Recent Achievements Weak Skills Latest Updates Active Project

8. COURSE PROGRESS VS MASTERY
Keep separate.
Example:
Course Progress: 43%
Engineering Mastery: 27%
Opening or reading a lesson does not equal mastery.

9. SKILL TREE
Interactive Skill Tree.
Each skill displays:
description;
current level;
prerequisites;
downstream skills;
relevant lessons;
relevant projects;
updates affecting the skill.

10. LESSON PAGE
Header:
Week;
Day;
lesson;
effort;
skills;
mastery state;
last verification.
Sections:
Mission
Build First
Concepts
Mental Model
Deep Dive
Failure Lab
Challenge
Mastery Check
Documentation
Engineering Notes
Ask Mentor
Buttons:
Mark Build Complete
Run Mastery Check
Ask Mentor
Give Me a Hint
Explain This
Review My Code
Why Did This Fail?
Challenge Me
Quiz Me

11. LEARNING MODES
Support:
Tutorial Mode
High guidance.
Builder Mode
Goal + constraints + docs.
Interview Mode
No hints until submission.

12. AI MENTOR
Persistent side panel/drawer.
Mentor knows:
current lesson;
project;
mastered skills;
weak skills;
failures;
journal;
current challenge;
curriculum version.
Mentor must not immediately solve challenges.
Help ladder:
Level 1 — Socratic Hint
Level 2 — Direction
Level 3 — Analogous Example
Level 4 — Guided Repair
Level 5 — Full Solution
Mentor modes:
Explain
Hint
Debug
Review
Quiz
Challenge
Architecture Review

13. AI MENTOR IMPLEMENTATION
Server-side OpenAI API.
Environment:
OPENAI_API_KEY=
Never expose secrets to browser.
Use service/provider abstraction.
Persist mentor conversations.
Separate lesson-level threads and optional global mentor thread.

14. CODE CONTEXT
Allow learner to:
paste code;
upload selected file;
provide explicitly selected project files.
Never silently read the full computer filesystem.

15. PROJECTS SECTION
Each project includes:
brief;
business context;
requirements;
skills;
extensions;
acceptance criteria;
test checklist;
architecture notes;
submission;
mentor review;
reflection;
mastery impact.

16. BOSS LEVELS
Boss Level 1:
Research Agent.
Boss Level 2:
Integrated Agent Architecture.
Boss Level 3:
Red Team.
Final Boss:
Capstone.
Boss Levels provide much less guidance.

17. ENGINEERING JOURNAL
Prompt after substantial builds:
What did I build?
What failed?
Why?
What design decision did I make?
What tradeoff did I accept?
What would I change?
What did I learn?
Persist data.
Mentor may use entries.

18. FAILURE LIBRARY
Failure categories include:
invalid schema;
tool timeout;
wrong tool;
bad retrieval;
context failure;
prompt injection;
handoff loop;
duplicate action;
permission issue;
API issue;
false assumption;
agent loop;
context overflow.
Store:
title
description
root cause
fix
related skill
related project
test created
Failures can become eval cases.

19. CURRICULUM FILE STRUCTURE
Recommended:
/content
/content/curriculum
curriculum.json
skills.json
dependencies.json
/weeks
/lessons
/projects
/boss-levels
/sources
changelog.json
Equivalent structure allowed if clearly better.

20. CURRICULUM VERSIONING
Store:
version
releaseDate
lastVerified
majorChanges
minimumMigrationVersion
Initial:
1.0.0
Baseline:
September 2026.

21. GLOBAL UPDATE BUTTON
Create:
Check for AI Updates
Show:
Curriculum Version
Last Verified
Next Recommended Check
Freshness Score

22. CURRICULUM AUDITOR
Workflow:
DISCOVER ↓ VERIFY ↓ COMPARE ↓ CLASSIFY ↓ DEPENDENCY ANALYSIS ↓ PROPOSE ↓ USER APPROVAL ↓ APPLY ↓ VALIDATE ↓ VERSION
Never silently rewrite course.

23. TRUSTED SOURCE PRIORITY
Official standards/specs
Official vendor docs
Official SDK repos
Official release notes
Official technical guides
Framework documentation
Research papers where relevant
Do not rely on low-quality blogs or social media to trigger important updates.

24. TECHNOLOGY REGISTRY
Machine-readable registry.
Track technologies such as:
OpenAI APIs
OpenAI Agents SDK
OpenAI managed agent runtimes
MCP
LangGraph
Next.js
FastAPI
PostgreSQL
Fields:
technologyId
name
category
officialDocs
versionStrategy
lesson IDs
lastChecked
status
notes

25. UPDATE SEVERITY
CRITICAL
Broken, removed or unsafe teaching.
HIGH
Significant architectural change.
MEDIUM
Best practice changed.
LOW
Syntax or example changed.
INFORMATIONAL
No required curriculum action.

26. UPDATE ACTION
ADD
UPDATE
DEPRECATE
REPLACE
WATCH

27. UPDATE REVIEW SCREEN
Show:
Title
Severity
Affected Lessons
Affected Skills
Previous Teaching
New Information
Why It Matters
Evidence
Confidence
Migration Effort
Recommended Action
Buttons:
View Diff
Apply Selected
Ignore for Now
Watch

28. NEVER RESET PROGRESS
If learner mastered a skill on old version:
Do not reset.
Example:
Tool Calling
Mastered on v1.1
Update Supplement Available
20 min
After completion:
Current ✓

29. WHAT'S NEW PAGE
Filters:
New
Updated
Deprecated
Security
Framework
Models
Tools
Since My Last Visit
Each item shows:
change
date
importance
affected lesson
learner action required

30. CURRICULUM FRESHNESS
Display a score.
But explain it.
Example:
Curriculum Freshness: 96%
13 technologies recently verified
1 MEDIUM update pending
0 CRITICAL issues
2 stale references
Do not present false scientific precision.

31. DEPENDENCY GRAPH
Create directed dependency graph.
Example:
Structured Outputs ↓ Tool Calling ↓ Agent Loop ↓ Agent SDK ↓ Multi-Agent ↓ Production
If underlying implementation changes significantly, check downstream lessons.

32. PROGRESS PRESERVATION
Curriculum migrations must preserve:
lesson completion
skill mastery
projects
journal entries
failure history
assessments
mentor history where applicable.

33. CURRICULUM UPDATE SAFETY
Auditor must NEVER:
silently delete content;
silently downgrade mastery;
rewrite foundational knowledge due to vendor marketing;
use one weak source as proof;
replace architecture automatically.
Human approval required for meaningful curriculum changes.

34. UPDATE VALIDATION
After approved update:
validate schemas;
validate stable IDs;
validate dependencies;
validate navigation;
validate curriculum integrity;
run tests;
create changelog;
bump version.
Rollback if validation fails.

35. SOURCE METADATA
Fast-changing lessons must store:
title
URL
source type
vendor
last verified
lesson IDs
technology IDs
Avoid copying entire external documentation into course content.

36. DOCUMENTATION MODE
From Week 3 onward, increasingly direct students to primary documentation.
By Capstone, documentation should be the default reference.
The course should teach how to learn from docs.

37. FAILURE-DRIVEN LEARNING
When student encounters a real error:
allow adding it to Failure Library.
Later suggest converting it to:
regression test;
eval case;
security test;
edge case.

38. MASTERY CHECKS
Prefer practical assessments.
Examples:
Explain why this should not use multiple agents.
Fix this tool loop.
Design the schema.
Add a tool safely.
Create retries.
Write eval cases.
Identify an injection path.
Choose architecture and justify it.
Do not rely mostly on multiple-choice quizzes.

39. QUIZZES
Use quizzes only for reinforcement.
Question styles:
scenario;
debugging;
architecture;
tradeoffs;
conceptual distinctions.

40. LOCAL-FIRST EXPERIENCE
Easy local setup:
clone
install
copy .env.example
setup database
run app
Ideal:
npm install
npm run db:setup
npm run dev
Include:
README
.env.example
seed command
test command
build command.

41. NO-API MODE
Without API key:
course works;
progress works;
Skill Tree works;
projects work;
journal works;
Failure Library works.
Mentor shows setup instructions.
Mock responses must be explicitly labeled.

42. DATABASE ENTITIES
Consider:
User
CourseProgress
LessonProgress
Skill
UserSkillMastery
Project
ProjectProgress
JournalEntry
FailureEntry
MentorThread
MentorMessage
CurriculumVersion
CurriculumUpdate
TechnologyReference
SourceReference
BossLevelAttempt
AssessmentResult
Settings

43. DATA SAFETY
No destructive reset without confirmation.
Allow user export.
Start with JSON backup/export.

44. GLOBAL SEARCH
Search across:
lessons
skills
projects
journal
failure library
concepts

45. COMMAND PALETTE
Highly desirable.
Shortcut:
Cmd/Ctrl + K
Actions:
Go to Lesson
Search Skill
Ask Mentor
Open Project
Check AI Updates
Open What's New

46. KEYBOARD USABILITY
Support keyboard navigation.
Code blocks:
copy button
good formatting
LTR direction
optional wrap.

47. ACCESSIBILITY
Use semantic HTML.
Keyboard-accessible interactions.
Strong focus states.
Reasonable contrast.

48. RESPONSIVE DESIGN
Desktop-first.
Mobile/tablet should work for reading and reviewing progress.
For coding-heavy work, recommend desktop.

49. LOCAL ANALYTICS
Track locally:
completion;
mastery;
project status;
assessment attempts;
weak skills.
Do not send external analytics by default.

50. FOCUS SESSION
Optional session mode.
Show:
today's mission
lesson
checklist
notes
Mentor
optional timer
Do not force timers.

51. ADAPTIVE PATH
If learner fails repeatedly:
recommend prerequisite.
If learner demonstrates mastery early:
allow skipping redundant practice.
Boss Levels cannot be skipped automatically.

52. LESSON STATES
Not Started
In Progress
Build Complete
Mastery Pending
Mastered
Completed Without Mastery

53. CAPSTONE SYSTEM
Stages:
Discovery
Requirements
Risk
Architecture
Implementation
Evaluation
Security
Deployment
Demo
Retrospective
Mentor behaves as senior reviewer.

54. CAPSTONE RUBRIC
Grade:
Architecture
Implementation
Tool Design
State & Persistence
Reliability
Security
Evaluation
Production Readiness
Judgment
Documentation
Adaptability
Do not grade framework choice.

55. PROJECT STARTER CODE
Major projects should include starter structure.
Possible:
README
empty functions
interfaces
tests
mock data
acceptance criteria
Do NOT provide finished project solution.

56. DEVELOPMENT PHASES
Phase 1 — Foundation
repository setup;
app setup;
database;
design system;
curriculum schema;
lesson rendering;
dashboard;
navigation;
progress.
Phase 2 — Learning System
mastery;
Skill Tree;
projects;
Boss Levels;
journal;
Failure Library.
Phase 3 — AI Mentor
server integration;
mentor threads;
lesson context;
help levels.
Phase 4 — Curriculum Intelligence
technology registry;
update checks;
proposed changes;
diff view;
changelog;
freshness.
Phase 5 — Polish
search;
command palette;
accessibility;
responsive;
testing;
README;
build validation.

57. TESTING REQUIREMENTS
Unit/integration tests for:
progress calculation;
mastery;
curriculum parsing;
version migration;
dependency graph;
update classification;
update application;
rollback;
mentor error handling.
E2E flows:
open dashboard;
start lesson;
complete Build;
update mastery;
open project;
write journal;
add failure;
trigger update check;
review curriculum proposal.

58. QUALITY GATE
Before saying project is complete:
run:
lint
typecheck
unit tests
critical E2E
production build
Repair failures.
Report exactly what was run.

59. README
README should explain:
product;
requirements;
setup;
environment;
database;
dev;
tests;
build;
Mentor setup;
Curriculum Auditor;
curriculum architecture;
adding lessons;
updating technology references;
versioning.

60. ENVIRONMENT
Create:
.env.example
Example:
OPENAI_API_KEY=
AI_MODEL=
DATABASE_URL=
Never include real secrets.

61. TECHNICAL DOCUMENTATION
Create:
docs/ARCHITECTURE.md
Explain:
frontend
backend
database
course content
AI Mentor
Auditor
versioning
security
data flow.

62. CURRICULUM CONTRIBUTION GUIDE
Create:
docs/CURRICULUM.md
Explain:
adding lesson
editing lesson
adding skill
editing dependency
adding project
technology-sensitive content
validation
releasing curriculum version.

63. INITIAL COURSE VERSION
Use:
1.0.0
Baseline:
September 2026.

64. FUNDAMENTAL TEACHING RULE
Teach mechanism before framework.
Example:
manual Agent Loop ↓ direct API orchestration ↓ Agents SDK ↓ graph/workflow runtime
Do not create a learner who only knows frameworks.

65. AGENT DESIGN RULE
Teach explicitly:
Not every AI application needs an agent.
Not every agent needs multiple agents.
Not every decision belongs to an LLM.
Keep deterministic logic deterministic whenever practical.

66. DEFINITION OF SUCCESS
The product succeeds if a motivated beginner can use it as their primary AI Agent Engineering learning environment and finish able to:
design agents;
code agents;
integrate APIs;
design tools;
build memory;
build retrieval;
build orchestration;
use multi-agent systems appropriately;
evaluate;
trace;
secure;
implement approvals;
deploy;
read unfamiliar documentation;
adapt to new tools.
The system must teach judgment, not API memorization.

PART IV — FINAL CODEX EXECUTION INSTRUCTION
Now implement this application.
Before writing substantial code:
inspect the repository;
produce a concise architecture proposal;
list proposed technologies;
list proposed folders/files;
define curriculum schemas;
define database models;
define AI Mentor architecture;
define Curriculum Auditor architecture;
define the implementation phases.
Then begin building.
Do not only explain what you would build.
Build it.
Maintain a working application throughout development.
At each major milestone:
run the application;
inspect the UI;
test key flows;
fix errors;
run automated checks.
When the project is complete, provide a final report containing:
What Was Built
Major features.
How to Run
Exact local commands.
Architecture
Important technical decisions.
Curriculum System
How content/versioning works.
AI Mentor
How it works and how to configure it.
Curriculum Auditor
How update checking works.
Tests Executed
Exact commands and outcomes.
Known Limitations
Anything unfinished or limited.
Recommended Next Improvements
Prioritized improvements.
Do not claim functionality or successful tests that were not actually verified.
The final application should feel like a serious, premium learning product rather than a generated prototype.
