---
title: "Python Notes"
tags: 
    - python
    - note
---

good to use libs, for things I commonly do.

<!-- TODO: Add code snippets to this page. -->

1. typer - cli
2. fastapi + sqlalchemy + sqlmodel - BE Service + DB thing, sqlmodel allows bridging SQLAlchemy and Pydantic
3. pydantic + pydantic-settings - pydantic for validation and pydantic-settings for config stuff
4. openpyxl - excel sheets, avoid pandas if you don't need the additional stuff.
5. paramiko + fabric - SSH client, pure python
6. rich - nice logs and console stuff. use Console() and work from there.
7. httpx2 - HTTP client, sync + async behind one API. Not `httpx`, that stopped at v0.28.1 in Dec 2024 and the tracker closed Feb 2026. Pydantic Services took it over with the original author, drop-in for common use. Starlette moved in May 2026.
8. psycopg (v3) - postgres. `psycopg[binary]` in images, bundles libpq.
9. dateparser - messy human dates, many languages. "last Tuesday", "vor 3 Tagen". Right tool when the source picks a different format every document.
10. whenever - dateparser makes datetimes out of strings, whenever replaces stdlib `datetime` with DST-correct arithmetic and separate aware/plain types. Parse with one, compute with the other.
11. alembic - migrations, works even when the app cannot run DDL. `alembic revision --autogenerate` against a throwaway DB, then `alembic upgrade head --sql > ddl.sql`. Models stay source of truth, platform team gets reviewable DDL. Autogenerate still needs some DB to diff against.
12. tenacity - retries with backoff and jitter. Worth it against flaky enterprise services and LLM APIs.
13. structlog - only if logs go to an aggregator. Pipeline, not a renderer, composes with rich rather than replacing it. Pretty on a TTY, JSON lines otherwise. Rich boxes are hostile inside Loki.
14. polars - dataframes. Only if you were about to reach for pandas. Reading a spreadsheet is still openpyxl.
15. pytest + pytest-cov + pytest-asyncio + ruff - test and lint base. Nothing in it type-checks. `--cov-fail-under` in CI or coverage is a number nobody reads.
16. mypy or pyright - the gap in 15.
17. testcontainers - real postgres instead of sqlite-that-lies. Matters once psycopg and SQLAlchemy are involved.
18. hypothesis - property based. Good for parsing, validation, extraction.
19. time-machine - freeze time, faster than freezegun.
20. pytest-randomly - finds tests that secretly depend on each other.
21. pytest-mock, pytest-xdist, pre-commit.
