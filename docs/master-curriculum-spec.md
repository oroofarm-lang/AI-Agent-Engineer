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

