---
title: "Software Naming Scheme"
tags:
    - refs
    - naming
    - software
---

## Software Naming Scheme

Companion to the [Hostname Naming Scheme](/refs/003-hostnames). That doc names
the machines. This one names the things that run on them.

### Why exoplanets

Every named exoplanet comes with two identities: a catalogue designation like
`51 Pegasi b`, and a proper name like `Dimidium`. That is the software model
exactly — a formal identifier you type into a manifest, and a friendly name you
say out loud in a standup.

Better, the IAU names the **host star** too, and the star and its planets are
almost always named from the same theme. `Solaris` hosts `Pirx` — both from
Stanisław Lem. `Muspelheim` hosts `Surt`, who rules it. `Komondor` hosts `Puli`,
both Hungarian dog breeds. That parent/child pairing is the same shape as the
planet/moon nesting in the hostname doc, and it means a project and its
components can be named as a set without inventing anything.

So:

| Thing                                      | Gets                              | Example       |
| ------------------------------------------ | --------------------------------- | ------------- |
| A project, suite, or monorepo              | Host star proper name             | `cervantes`   |
| A component, service, or library inside it | Its planet proper name            | `rocinante`   |
| A standalone tool                          | Any planet name, no parent needed | `poltergeist` |

---

### Rules

1. **Simple, knowable names only.** If you cannot spell it after hearing it
   once, or pronounce it after reading it once, skip it. Roughly two thirds of
   the IAU list fails this — anything carrying diacritics, glottal stops, or
   four unfamiliar syllables is out. The tables below are already filtered.
2. **Lowercase ASCII is the real name.** `Poltergeist` is the display name,
   `poltergeist` is the package, the repo, the binary, the container tag.
3. **Check the registry before committing.** Several of these are ordinary
   words elsewhere — `bran`, `puli`, `banksia`, `petra` are plausibly taken on
   npm, PyPI, and crates.io. Check, then scope it if needed.
4. **A name is spent once.** Reusing a name across two projects defeats the
   entire point. Record it in the tables below when you claim it.
5. **The star names a project, not a machine.** Keeping software on exoplanets
   and infrastructure on the solar system means a sentence like *"regoc is down
   on argonite-2"* has exactly one reading.

---

### Suites - stars with more than one named planet

Five systems have multiple named planets. These are the only real suites
available, so spend them on things that genuinely have components.

#### Copernicus - `55 Cancri A`

Astronomers and lensmakers. Five slots, the largest suite available.

| Name        | Designation | Eponym             |
| ----------- | ----------- | ------------------ |
| `galileo`   | 55 Cancri b | Italian astronomer |
| `brahe`     | 55 Cancri c | Danish astronomer  |
| `lipperhey` | 55 Cancri d | Dutch lensmaker    |
| `janssen`   | 55 Cancri e | Dutch astronomer   |
| `harriot`   | 55 Cancri f | English astronomer |

#### Cervantes - `Mu Arae`

The author, hosting his own characters. Four slots. The nicest fit for a
monorepo where one component clearly leads.

| Name        | Designation | Eponym                    |
| ----------- | ----------- | ------------------------- |
| `quijote`   | Mu Arae b   | Don Quixote               |
| `dulcinea`  | Mu Arae c   | Don Quixote               |
| `rocinante` | Mu Arae d   | Don Quixote               |
| `sancho`    | Mu Arae e   | Don Quixote               |

#### Lich - `PSR B1257+12`

Planets orbiting a pulsar, named for the undead. Three slots. Reserve for
security tooling, chaos testing, or anything that reanimates state.

| Name          | Designation    | Eponym          |
| ------------- | -------------- | --------------- |
| `draugr`      | PSR B1257+12 A | Norse myth      |
| `poltergeist` | PSR B1257+12 B | German folklore |
| `phobetor`    | PSR B1257+12 C | Greek myth      |

#### Titawin - `Upsilon Andromedae`

Muslim astronomers. Three slots.

| Name      | Designation          | Eponym            |
| --------- | -------------------- | ----------------- |
| `saffar`  | Upsilon Andromedae b | Muslim astronomer |
| `samh`    | Upsilon Andromedae c | Muslim astronomer |
| `majriti` | Upsilon Andromedae d | Muslim astronomer |

> The fifth system, `Chalawan` (47 Ursae Majoris), holds `Taphao Thong` and
> `Taphao Kaew`. Both are two words, so both fail rule 1. Listed for
> completeness, not for use.

---

### Pairs - one star, one planet

Single-planet systems where the star and planet are thematically linked. Take
both when a project has exactly one main component, or take just the planet.

| Star           | Planet        | The link                                        |
| -------------- | ------------- | ----------------------------------------------- |
| `solaris`      | `pirx`        | both Stanisław Lem                              |
| `aniara`       | `isagel`      | Isagel is a character in *Aniara*               |
| `absolutno`    | `makropulos`  | both Karel Čapek                                |
| `sterrennacht` | `nachtwacht`  | *Starry Night* and *The Night Watch*            |
| `komondor`     | `puli`        | both Hungarian dog breeds                       |
| `muspelheim`   | `surt`        | Surt rules Muspelheim                           |
| `tuiren`       | `bran`        | Bran is Tuiren's son                            |
| `amansinaya`   | `haik`        | Haik succeeded Aman Sinaya as god of the sea    |
| `lerna`        | `iolaus`      | Iolaus helped Heracles at Lerna                 |
| `gnomon`       | `astrolabos`  | ancient instruments; IAU writes *Astrolábos*    |
| `tonatiuh`     | `meztli`      | Aztec sun and moon                              |
| `xihe`         | `wangshu`     | Chinese sun and moon                            |
| `noquisi`      | `awohali`     | Cherokee star and eagle                         |
| `danfeng`      | `qingluan`    | two Chinese mythical birds                      |
| `dilmun`       | `tylos`       | two ancient names for Bahrain                   |
| `uruk`         | `babylonia`   | Mesopotamia                                     |
| `ebla`         | `ugarit`      | two ancient Syrian cities                       |
| `moriah`       | `jebus`       | two old names for Jerusalem                     |
| `petra`        | `wadirum`     | two Jordanian sites                             |
| `wattle`       | `banksia`     | two Australian plants                           |
| `mpingo`       | `tanzanite`   | Tanzanian tree and gemstone                     |
| `helvetios`    | `dimidium`    | the first planet found around a Sun-like star   |
| `libertas`     | `fortitudo`   | two Latin virtues                               |
| `veritate`     | `spe`         | truth and hope                                  |
| `musica`       | `arion`       | Arion was a poet and musician                   |
| `edasich`      | `hypatia`     | star of Draco, and the astronomer               |
| `stribor`      | `veles`       | two Slavic deities                              |
| `tangra`       | `bendida`     | two Thracian/Bulgarian deities                  |
| `kaveh`        | `kavian`      | *kavian* means "relating to Kaveh"              |

---

### Singles - standalone tools

Planet names worth using on their own, when there is no suite and no pairing to
honour.

| Name         | Designation     | Eponym                                          |
| ------------ | --------------- | ----------------------------------------------- |
| `dagon`      | Fomalhaut b     | Levantine fertility god                         |
| `caleuche`   | HD 164604 b     | ghost ship of Chilote mythology                 |
| `hiisi`      | HAT-P-38b       | sacred places and evil spirits, Finnic myth     |
| `trimobe`    | HD 153950 b     | rich ogre of Malagasy mythology                 |
| `boinayel`   | WASP-6b         | Taíno god of rain                               |
| `aumatex`    | HIP 12961 b     | Taíno god of the wind                           |
| `smertrios`  | HD 149026 b     | Gallic deity equated with Mars                  |
| `thestias`   | Pollux b        | Greek myth                                      |
| `arkas`      | 41 Lyncis b     | son of Zeus and Callisto                        |
| `eburonia`   | HD 49674 b      | the Eburones, a Celtic tribe                    |
| `viculus`    | WASP-32b        | "little village" in Latin                       |
| `equiano`    | HD 43197 b      | Olaudah Equiano, writer and abolitionist        |
| `finlay`     | BD−17 63 b      | Carlos Finlay, Cuban epidemiologist             |
| `onasilos`   | HD 168746 b     | oldest recorded doctor in Cyprus                |
| `krotoa`     | WASP-62b        | translator and educator, early Cape Colony      |
| `alef`       | HAT-P-9b        | first letter of the Hebrew alphabet             |
| `lete`       | HD 102195 b     | Lethe, the underworld river of fog              |
| `beirut`     | HD 192263 b     | capital of Lebanon                              |
| `bagan`      | HD 18742 b      | ancient city in Myanmar                         |
| `tadmor`     | Gamma Cephei Ab | old name for Palmyra                            |
| `eiger`      | HD 130322 b     | peak in the Bernese Alps                        |
| `halla`      | 8 UMi b         | highest mountain in South Korea                 |
| `levantes`   | HD 95086 b      | easterly Mediterranean winds                    |
| `vytis`      | HAT-P-40b       | national symbol of Lithuania                    |
| `tryzub`     | HAT-P-15b       | trident on Ukraine's coat of arms               |
| `guarani`    | HD 23079 b      | the Guaraní people                              |
| `sissi`      | HAT-P-14b       | character from the 1955 Austrian film           |
| `magor`      | HAT-P-2b        | ancestor of the Magyars                         |
| `iztok`      | WASP-38b        | character from a Fran Saleški Finžgar novel     |
| `viriato`    | HD 45652 b      | Lusitanian leader who resisted Rome             |
| `mastika`    | HD 179949 b     | "gem" in Malay                                  |
| `baiduri`    | HD 20868 b      | "opal" in Malay                                 |
| `khomsa`     | HD 192699 b     | palm-shaped amulet, Tunisia                     |
| `ramajay`    | HD 96063 b      | "to sing and make music", Trinidadian Creole    |
| `fold`       | HD 109246 b     | "earth/soil" in Old Icelandic                   |
| `abol`       | HD 16175 b      | first round of the Ethiopian coffee ceremony    |

---

### Retired names

Two named planets turned out not to exist. Good slots for software you have
archived rather than deleted.

| Name      | Designation   | What happened                                    |
| --------- | ------------- | ------------------------------------------------ |
| `orbitar` | 42 Draconis b | 2025: the signal was the host star, not a planet |
| `dagon`   | Fomalhaut b   | 2020: a debris cloud from an asteroid collision  |

> `dagon` appears in the singles table too. Use it either way, not both.

---

### Notes

A good number of the 2019 names come from living languages and cultures —
`krotoa`, `awasis`, `guarani`. Worth using for something you would put your name
on, not for a scratch script you will delete on Friday.

The full IAU list runs to 164 names across the 2015, 2019, and 2022
[NameExoWorlds](https://en.wikipedia.org/wiki/List_of_proper_names_of_exoplanets)
campaigns. The tables here are the subset that survives rule 1. If you need more,
go to the source — but the bar stays the same.
