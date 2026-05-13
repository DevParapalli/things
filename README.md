# Things

Consolidation of all things I've learned, thought deeply about, need quick reference to, or need a guide for. Might upgrade this to have quick setup scripts when needed.

Use `find . -name "[0-9][0-9][0-9]-*.md" -printf "%f\n" | sort` to find the list of all docs, in order.

## Planning

- AIKO architecture + AIKO sanitization & open-sourcing.
- Sanitized Case study: Cloud Migration for a networking devices manufacturing company, with R&D facilities across the world, with key requirements being global state, fragmented next-number logic for SN assignment per SKU, and US-intended devices to host their data on US soil.
- Sanitized case study: Financial document tagging and ingestion using Generative AI. Some documents might be scanned, each document containing different ways to write the same info. Schema-full extraction, with region based ingest schema requirements, EUR needs VAT, IN needs GST etc. Data extracted must be grounded against a database of known entities, OCR errors are common, and the system needs to be able to handle them gracefully. The system also needs to be able to handle new entities being added to the database, and new document types being added to the system.
- MCP Server for agentic querying of postgres databases. Exposes schemas, objects etc. to the agent, and uses a simplified query language.
- FastMCP server for healthcare related data, like drug info etc. Absolutely stateless.
- System design problem solution + PoC ? for a "doctor's assistant" generative AI agent. Patient data, RAG on resolved cases EMR/EHR, PII redaction without losing clinical meaning, trust boundaries for PII data. Has voice input, connects to FHIR (MCP much?), analysis of reports & test results too. Basically, a mini-EMR with a generative agent on top.
- Sanitized case study: Setting up a testing environment for various softwares to be installed and tested on newly manufactured devices. Testing was done manually, but the steps to setup and automate the installation of various applications was done automatically. Devices were left on overnight to make way for updates, code bundles were written to record and upload the logs & recordings from the devices.
- Key points to keep in mind when writing AI-enabled workflows
- Sanitized case study: Setting up a AI enabled case auto resolution workflow for different types of cases, each case having a different workflow. include system design on how the data is stored, how the agent is triggered, and what it really is. HITL for incomplete data, routed to a support person. Write about why run simple Kafka + runners for this project.
- Setting up a Jenkins CI pipeline for a non-standard software project. mainly some X software, which has its own build system (Using its own custom binaries and toolchains, hence the need for custom runners) and deployment process (using some cloud tool, which I might emulate in this case). The CI pipeline needs to be able to handle the build and deployment process, as well as run tests and static analysis tools. two versions of the X software, 5 and 6, each requiring a different way to build and deploy.
