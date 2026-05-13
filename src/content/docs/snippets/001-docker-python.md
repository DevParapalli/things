---
title: "Python + Docker Best Practices"
tags: 
    - docker
    - python
    - snippet
---

stuff to do when deploying a python project using docker

0. Follow [000-docker](/snippets/000-docker)
1. Use `-B` or `export PYTHONDONTWRITEBYTECODE=1`.
2. `export PYTHONUNBUFFERED=1`, don't buffer stdout or stderr.
3. Prefer `uv` for dev + lockfile generation, use `uv export --format requirements.txt --no-dev --no-hashes > requirements.txt` in a non-final layer to get this. Don't copy `uv` to final image.
4. `PYTHONFAULTHANDLER=1`, always on crash reporting.
5. `python -m module`
6. `python -m pip --no-cache-dir --index-url '<url>' -r requirements.txt`, use pull-through index for enterprise, or set this up if you don't currently have it.
