---
title: "Python + Docker Best Practices"
tags: 
    - docker
    - python
    - note
---

stuff to do when deploying a python project using docker

0. Follow [000-docker](/notes/000-docker)
1. `PYTHONDONTWRITEBYTECODE=1` or `-B` at runtime, but compile at build. `-B` does not skip compiling, only caching - python compiles every module on every import and throws it away. Read-only rootfs means there is nowhere to write a `.pyc` anyway, so compile at build or pay it on every start forever.
    1. Compile at build when the rootfs is read-only, the process restarts often (rolling deploys, HPA, scale-to-zero), the dependency tree is large (fastapi + sqlalchemy + pydantic is thousands of modules), or it is a CLI invoked repeatedly.
    2. Skip when image size is the constraint (`.pyc` roughly doubles the venv source footprint), it is a batch job that starts once and runs for hours, it is a dev image with bind-mounted source (stale `.pyc` is a confusing bug), or build time is tight and nobody is complaining about startup.
    3. `python -m compileall -q -j 0 --invalidation-mode unchecked-hash /app/.venv`, or `UV_COMPILE_BYTECODE=1`.
    4. `unchecked-hash` is the one that matters. Default is timestamp based, so identical source gives different bytes and the image is not reproducible. `-j 0` uses all cores.
    5. `compileall` exits non-zero if any file fails. Some packages still ship broken py2 files. Exclude with `-x`, not `|| true`, or you lose the signal.
    6. `-O` reads `.opt-1.pyc`. Compile the levels you run or skip `-O`.
2. `export PYTHONUNBUFFERED=1`, don't buffer stdout or stderr.
3. Prefer `uv` for dev + lockfile generation. Install into a venv, copy only the venv to the final stage. Skip the `requirements.txt` round-trip, it loses the hashes. Don't copy `uv` to the final image.

    ```dockerfile
    ENV UV_LINK_MODE=copy UV_COMPILE_BYTECODE=1
    RUN --mount=type=cache,target=/root/.cache/uv \
        --mount=type=bind,source=uv.lock,target=uv.lock \
        --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
        uv sync --locked --no-install-project --no-editable
    COPY . /app
    RUN --mount=type=cache,target=/root/.cache/uv uv sync --locked --no-editable
    ```

    Split the sync in two so deps land in a layer app code cannot invalidate. `UV_LINK_MODE=copy` stops hardlink warnings.
4. `PYTHONFAULTHANDLER=1`, always on crash reporting.
5. `python -m module`
6. `python -m pip --no-cache-dir --index-url '<url>' -r requirements.txt`, use pull-through index for enterprise, or set this up if you don't currently have it. `PIP_DISABLE_PIP_VERSION_CHECK=1` and `--only-binary=:all:` so a missing wheel fails loudly instead of building from source with a toolchain you never meant to ship.
7. `--require-hashes` by default. `--no-hashes` gives up supply chain verification. If the pull-through index rewrites them, write down that that is why.
8. Handle SIGTERM. uvicorn and gunicorn do it themselves. Spawn subprocesses or threads and you need a handler, or the platform SIGKILLs you and in-flight work is lost.
9. Distroless: base image plus a standalone interpreter, not `gcr.io/distroless/python3` which pins Google's Python version. `distroless/base-debian12` has glibc, libssl, ca-certificates, tzdata. Copy in a python-build-standalone interpreter and the venv.
    1. `base-nossl` breaks `ssl`. Anything doing HTTPS or Postgres over TLS needs SSL.
    2. `cc` not `base` if a wheel needs libstdc++. scipy and most ML stacks do.
    3. `static` will not work, no glibc.
    4. `ENV PATH="/app/.venv/bin:$PATH"`, don't try to activate anything.
