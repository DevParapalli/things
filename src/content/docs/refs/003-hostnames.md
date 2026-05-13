---
title: "Hostname Naming Scheme"
tags:
    - refs
    - hostnames
    - naming
---

## Hostname Naming Scheme

### Rules

| Layer             | Theme                     | Example              |
| ----------------- | ------------------------- | -------------------- |
| Physical machines | Solar system planets      | `mars`               |
| VMs / Containers  | Moons of parent planet    | `phobos` (on `mars`) |
| Cloud instances   | Atmospheric / Noble gases | `argon`, `argonite`  |

---

### Physical Machines - Planets

| Hostname  | Body    | Notes                               |
| --------- | ------- | ----------------------------------- |
| `mercury` | Mercury | No moons - standalone only          |
| `venus`   | Venus   | No moons - standalone only          |
| `earth`   | Earth   | 1 moon                              |
| `mars`    | Mars    | 2 moons                             |
| `jupiter` | Jupiter | 95 moons - **current main machine** |
| `saturn`  | Saturn  | 292 moons                           |
| `uranus`  | Uranus  | 27 moons                            |
| `neptune` | Neptune | 16 moons                            |

> Mercury and Venus have no moons. Avoid assigning VMs to them, or use them for
> truly isolated machines.

---

### VMs / Containers - Moons (by parent planet)

#### Earth

| Hostname | Moon |
| -------- | ---- |
| `luna`   | Moon |

#### Mars

| Hostname | Moon   | Notes          |
| -------- | ------ | -------------- |
| `phobos` | Phobos | Larger, inner  |
| `deimos` | Deimos | Smaller, outer |

#### Jupiter ← _main machine_

| Hostname   | Moon     | Notes                         |
| ---------- | -------- | ----------------------------- |
| `ganymede` | Ganymede | Largest moon in solar system  |
| `callisto` | Callisto | 2nd largest Jovian            |
| `io`       | Io       | Most volcanically active body |
| `europa`   | Europa   | Subsurface ocean candidate    |
| `amalthea` | Amalthea | 5th largest Jovian            |
| `thebe`    | Thebe    |                               |
| `metis`    | Metis    | Innermost named moon          |
| `himalia`  | Himalia  | Largest irregular moon        |
| `elara`    | Elara    |                               |
| `pasiphae` | Pasiphae |                               |
| `carme`    | Carme    |                               |
| `ananke`   | Ananke   |                               |
| `leda`     | Leda     | Smallest named Jovian         |

#### Saturn

| Hostname     | Moon       | Notes                                            |
| ------------ | ---------- | ------------------------------------------------ |
| `titan`      | Titan      | 2nd largest moon in solar system, has atmosphere |
| `rhea`       | Rhea       | 2nd largest Saturnian                            |
| `iapetus`    | Iapetus    | Two-tone surface                                 |
| `dione`      | Dione      |                                                  |
| `tethys`     | Tethys     |                                                  |
| `enceladus`  | Enceladus  | Active ice geysers                               |
| `mimas`      | Mimas      | Death Star appearance                            |
| `hyperion`   | Hyperion   | Irregular shape                                  |
| `phoebe`     | Phoebe     | Likely captured body                             |
| `janus`      | Janus      | Co-orbital with Epimetheus                       |
| `epimetheus` | Epimetheus | Co-orbital with Janus                            |
| `prometheus` | Prometheus | Shepherd moon                                    |
| `pandora`    | Pandora    | Shepherd moon                                    |
| `atlas`      | Atlas      | Ring shepherd                                    |
| `pan`        | Pan        | Gap-clearing moon                                |
| `helene`     | Helene     | Trojan moon of Dione                             |
| `calypso`    | Calypso    | Trojan moon of Tethys                            |

#### Uranus

| Hostname  | Moon    | Notes                     |
| --------- | ------- | ------------------------- |
| `titania` | Titania | Largest Uranian moon      |
| `oberon`  | Oberon  | 2nd largest               |
| `umbriel` | Umbriel |                           |
| `ariel`   | Ariel   |                           |
| `miranda` | Miranda | Extreme terrain           |
| `puck`    | Puck    |                           |
| `portia`  | Portia  |                           |
| `juliet`  | Juliet  |                           |
| `caliban` | Caliban | Irregular                 |
| `sycorax` | Sycorax | Largest irregular Uranian |

> Uranian moons are named from Shakespeare and Alexander Pope.

#### Neptune

| Hostname   | Moon     | Notes                                 |
| ---------- | -------- | ------------------------------------- |
| `triton`   | Triton   | Retrograde orbit, likely captured KBO |
| `proteus`  | Proteus  | 2nd largest Neptunian                 |
| `nereid`   | Nereid   | Highly eccentric orbit                |
| `larissa`  | Larissa  |                                       |
| `galatea`  | Galatea  | Shepherd moon                         |
| `despina`  | Despina  |                                       |
| `thalassa` | Thalassa |                                       |
| `naiad`    | Naiad    | Innermost named moon                  |

---

### Cloud Instances - Atmospheric Gases

#### Suffix Reference

Combine any noble gas base with a suffix to encode role/tier/purpose. Or use
base for network and suffixed for resources in that network. Or do whatever, I don't care.

| Suffix   | Chemical meaning                              | Suggested infra meaning                         |
| -------- | --------------------------------------------- | ----------------------------------------------- |
| _(bare)_ | Element itself                                | Primary / generic instance                      |
| `-ide`   | Binary compound - element bonded to one other | Paired instance, replica, read-replica, standby |
| `-ite`   | Salt of lower-oxidation acid                  | Secondary role, worker, lighter variant         |
| `-ate`   | Salt of higher-oxidation acid                 | Elevated role, primary in cluster, ingress      |
| `-ous`   | Lower-oxidation acid form                     | Legacy, deprecated, older-gen                   |
| `-ic`    | Higher-oxidation acid form                    | High-priority, production-grade                 |
| `-yl`    | Functional group / radical                    | Sidecar, agent, auxiliary process               |
| `-ane`   | Saturated stable compound                     | Long-running, persistent, stateful              |
| `-ene`   | Unsaturated / reactive compound               | Ephemeral, short-lived, CI runner               |
| `-one`   | Ketone group                                  | Singleton, sole instance of type                |
| `-ol`    | Hydroxyl / alcohol group                      | Observability, monitoring, logging node         |
| `-al`    | Aldehyde group                                | Batch job, scheduled task node                  |

#### Noble Gas Bases

Prefer noble gases - chemically inert, maps well to stateless cloud instances.

| Base      | Element | Weight          | Use suggestion                  |
| --------- | ------- | --------------- | ------------------------------- |
| `helium`  | He      | Lightest        | Tiny/nano instances, lambdas    |
| `neon`    | Ne      | Light           | Edge nodes, CDN, lightweight    |
| `argon`   | Ar      | Medium          | General compute                 |
| `krypton` | Kr      | Heavy           | Memory-heavy workloads          |
| `xenon`   | Xe      | Heaviest stable | GPU, high-compute               |
| `radon`   | Rn      | Heaviest        | Avoid - radioactive connotation |

#### Construction Pattern

```txt
<noble-gas><suffix>[-<number>]
```

Examples (do not treat this as some sort of standard):

| Hostname     | Decode                           |
| ------------ | -------------------------------- |
| `argon`      | Primary general compute instance |
| `argonide`   | Standby / replica of argon       |
| `argonite`   | Worker node                      |
| `argonate`   | Ingress / primary in cluster     |
| `argonene`   | Ephemeral CI runner              |
| `argonol`    | Monitoring / observability node  |
| `xenone`     | Ephemeral GPU job runner         |
| `kryptonane` | Persistent stateful DB host      |
| `neonyl`     | Sidecar / agent                  |
| `argonite-1` | First of multiple workers        |
| `argonite-2` | Second worker                    |

#### Non-noble gases (available if needed)

| Base       | Gas | Notes                       |
| ---------- | --- | --------------------------- |
| `nitrogen` | N₂  | High-availability, abundant |
| `oxygen`   | O₂  | Active/compute-heavy        |
| `hydrogen` | H₂  | Lightest - micro/serverless |
| `methane`  | CH₄ | Outer-layer / edge          |
| `ozone`    | O₃  | Security layer, WAF, proxy  |
| `carbon`   | C   | Data/storage nodes          |

---

### Example Fleet

```txt
jupiter          # main physical workstation
  ├── io         # VM - small, hot
  ├── europa     # VM - medium
  ├── ganymede   # VM - largest
  └── callisto   # VM - secondary large

mars             # secondary physical machine
  ├── phobos     # VM
  └── deimos     # VM

argon            # primary OCI compute
argonide         # OCI standby/replica
argonene         # ephemeral CI runner
xenone           # ephemeral GPU job
kryptonane       # persistent stateful DB
argonol          # monitoring node
neonyl           # sidecar agent
```

Turns out, your services can named this way too. It is fun calling out "Oh shit, hydrogen is down, requests cannot get to callisto."
