---
title: "Docker Best Practices"
tags: 
  - docker
  - guidelines
  - best-practices
  - note
---

base rules for using docker images in enterprise prod, in no particular order.

1. Multi-stage always. If interpreted, build static interpreter, portable interpreter or find a suitable alternative. Final layer should be distroless.
2. Have the following 3 Dockerfiles.
    1. `Dockerfile` - The main distroless dockerfile
    2. `Dockerfile.test` - Does everything similar to the main Dockerfile, with the key difference being the entrypoint and base image, use slim for this.
    3. `Dockerfile.dev` - Same as main Dockerfile, final image is not distroless. This image is not built in CI, and used in local systems.
3. Keep the images completely read-only. Do not use the file system inside the container, your project and design must accommodate for this.
4. Test project completely **BEFORE** deploying through a CI-built container.
5. Copy `cargo.toml`, `package.json`, `pnpm-lock.yaml`, `pyproject.toml` etc. files, install deps before copying application code.
6. Use GPG, sha256sum, cksum, etc. tools as needed to ensure file is downloaded correctly.
7. Use ADD + sha-hash for online files, however remember that this will add a new layer with the file, and that takes up space. Not okay for final stage build.
8. Use `BUILDKIT` and health-checks. Make sure your project contains a health-check that covers all external dependencies, including connecting to the database, checking if all the required hosts are accessible and we can perform all the functions we need to. Just checking if the application is online is not a valid health-check.
9. Do not use filesystem for logging, use `stdout` and `stderr` for their intended purpose. Use the orchestration platform (such as Kubernetes, OpenShift etc.) or work with the logs on the host system. `docker run --log-driver local --log-opt max-size=10m --log-opt max-file=3 myapp`
10. Support arbitrary UIDs when running, as some platforms (esp. OpenShift) will assign a random UID at runtime. Always use non-root users. Allow read permissions to the root group `(g=0)`. `chgrp -R 0 /app` & `chmod -R g=u /app`. Simulate with `docker run --user 123456 myapp`
11. Use build-args and secrets. `ARG` for non-sensitive build values like version or env-name. Use `--mount=type=secret=<name>` for a step, secret is available at `/run/secrets/<name>`. Pass into image as `docker build --secret id=<name>,src=/host/file/secret` or replace `src=*` with `env=ENV_VAR` for values in current environment, pretty useful for login credentials for Artifactory or custom indexes.
12. Use OCI-standard labels. Read through <https://github.com/opencontainers/image-spec/blob/main/annotations.md> to understand the required labels. Quay has `quay.expire-after` to auto-delete the container image after a interval mentioned, use these things, they make life easier.

Some links below, that might be useful.

- 