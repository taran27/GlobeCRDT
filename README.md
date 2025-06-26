# GlobeCRDT

> **A 300-line, dependency-free CRDT engine for lightning-fast, offline-first collaborative text editing.**

[![made with TypeScript](https://img.shields.io/badge/made%20with-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![license: MIT](https://img.shields.io/badge/license-MIT-green)
![minzipped](https://img.shields.io/bundlephobia/minzip/globe-crdt?label=minzipped)

GlobeCRDT lets you build Google-Docs-level real-time editing without servers, merges, or conflicts. Each peer keeps editing while offline and exchanges <1 kB binary patches when connectivity returns.

---

## ✨ Features

| ⚡  | Ultra-low-latency local ops (sub-ms)                     |
| --- | -------------------------------------------------------- |
| 📦  | Tiny (<1 kB minzipped) & framework-agnostic              |
| 🔐  | Transport-agnostic—drop in your own E2EE                 |
| 🌍  | Works in browsers, Node, Electron, React Native          |
| 📡  | Ships only the deltas the peer needs via version vectors |

---

## 🎯 Quick Start

```bash
pnpm add globe-crdt   # or npm i, yarn add
```

```ts
import { GlobeCRDT } from "globe-crdt";

// Alice edits offline …
const alice = new GlobeCRDT();
alice.insert(0, "Hello");

// Bob receives patch
const bob = new GlobeCRDT();
bob.merge(alice.diff(bob.getVector()));

bob.insert(5, " world");

// Sync back to Alice
alice.merge(bob.diff(alice.getVector()));
console.log(alice.toString()); // → "Hello world"
```

> **Tip:** Transport is up to you—WebRTC, WebSocket, BroadcastChannel, BLE, Sneakernet. If you can `send`/`receive` JSON, you can sync GlobeCRDT.

---

## 🛠️ API

| Method                   | Description                                                  |
| ------------------------ | ------------------------------------------------------------ |
| `new GlobeCRDT(siteId?)` | Instantiate a doc (siteId auto-generated if omitted)         |
| `insert(index, text)`    | Insert `text` at visible `index`                             |
| `delete(index, len?)`    | Delete `len` (default = 1) visible chars starting at `index` |
| `diff(peerVector)`       | Return ops the peer hasn’t seen yet                          |
| `merge(ops)`             | Apply remote ops deterministically                           |
| `toString()`             | Return plaintext of visible atoms                            |
| `getVector()`            | Export causal version vector                                 |

---

## 🧬 How It Works (1-minute overview)

1. **Site ID** – Every peer gets an 8-hex char id.
2. **Op ID** – Each local mutation is tagged `<siteId>:<counter>` (monotonic).
3. **Atoms** – Characters are atoms with `left`/`right` refs, forming a linked list that merges deterministically—no tombstones.
4. **Vector Clock** – Per-site counters let us compute exactly which ops a peer still needs.

Result: ⬇️ tiny diff payloads, ⬆️ instant convergence, 🚫 zero conflicts.

---

## 🚀 Roadmap

- [ ] **Rust/WASM core** for 10× throughput
- [ ] **Rich-text marks** & OT-style attribute lambdas
- [ ] **IndexedDB / SQLite persistence** plug-ins
- [ ] **Yjs / Automerge adapter** for interop

Want to help? → PRs welcome!

---

## 🧪 Development & Testing

```bash
git clone https://github.com/yourname/globe-crdt
cd globe-crdt
pnpm i
pnpm test          # Vitest
```

Run the playground:

```bash
pnpm dev           # Vite + TypeScript hot-reload demo
```

---

## 📄 License

MIT © 2025 TJ

Commercial use permitted—attribution appreciated but not required. This software ships _as-is_ with **no warranty of any kind**. For high-security applications, commission a professional cryptography review.
