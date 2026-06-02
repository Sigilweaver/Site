/**
 * generate-llms.mjs
 *
 * Generates public/llms.txt at build time.
 * Do not commit public/llms.txt - it is produced by `bun run build`.
 *
 * Format follows the llmstxt.org spec: a Markdown file at the domain root
 * that describes the site and provides direct links to documentation for
 * AI assistants and LLM-powered tools.
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '../public');

const content = `\
# Sigilweaver

> Open-source libraries and tools for scientific file formats, bioinformatics, and data pipelines. Primarily Rust with Python bindings. All projects Apache-2.0 licensed unless otherwise noted.

Sigilweaver builds fast, portable implementations of proprietary and underdocumented binary formats used in mass spectrometry, genomics, medical imaging, and data analytics. Each project ships a clean-room Rust core with optional Python bindings (Polars, PyArrow, Pandas) and comprehensive documentation.

## Genomics

- [BioLance](https://sigilweaver.app/biolance/docs/): Columnar multi-sample variant store. Ingests VCFs into LanceDB (Arrow columns). Query, join against ClinVar, and compare variants across samples in a single process. No Spark, no cloud infrastructure.

## Mass Spectrometry

- [OpenTFRaw](https://sigilweaver.app/opentfraw/docs/): Rust and Python reader for Thermo Fisher .raw mass spectrometry files. No Thermo software required.
- [OpenWRaw](https://sigilweaver.app/openwraw/docs/): Rust and Python reader for Waters MassLynx RAW mass spectrometry files. No Waters software required.
- [OpenTimsTDF](https://sigilweaver.app/opentimstdf/docs/): Rust and Python reader for Bruker timsTOF TDF files. No Bruker software required.
- [OpenProteo](https://sigilweaver.app/openproteo/docs/): Open Rust stack for proteomics raw-file access. Read Thermo, Bruker, and Waters acquisitions through a single unified API.
- [ProLance](https://sigilweaver.app/prolance/docs/): Fast, columnar, memory-mapped mass spectrometry data store powered by Lance and Arrow. Designed for large-scale proteomics workflows.

## Medical Imaging

- [OpenKSpace](https://sigilweaver.app/openkspace/docs/): Rust library and CLI for Cartesian MRI k-space reconstruction from ISMRMRD .h5 files. Three crates: I/O, reconstruction primitives, and CLI.
- [DICOM Atlas](https://sigilweaver.app/dicom-atlas/docs/): Open registry of public and private DICOM tags compiled from vendor documentation. Rust and Python lookup library.

## Data Analytics and File Formats

- [OpenYXDB](https://sigilweaver.app/openyxdb/docs/): Read and write Alteryx YXDB binary files from Python with Polars, PyArrow, and Pandas support.
- [SigilYX](https://sigilweaver.app/sigilyx/docs/): Standalone Rust core and Python bindings (PyO3) for the Alteryx YXDB binary format. Full read/write support for E1 layout; experimental E2 read support.
- [OpenQVD](https://sigilweaver.app/openqvd/): Open specification and implementation of the Qlik QVD binary file format. Clean-room Rust reader/writer with Python bindings. No Qlik Designer required.
- [OpenQBW](https://sigilweaver.app/openqbw/docs/): Open specification and parser for the QuickBooks Desktop company file (.qbw) format. Preserves access to accounting data after QuickBooks Desktop end-of-life.
- [OpenSQLAnywhere](https://sigilweaver.app/opensqlanywhere/docs/): Reader and open specification for the SAP SQL Anywhere on-disk database format. Pure Rust implementation.

## Platform

- [Loom](https://sigilweaver.app/loom/docs/): Sigilweaver Loom - data management and processing platform.

## Blog

- [Sigilweaver Blog](https://sigilweaver.app/blog/): Engineering notes, project updates, and technical deep-dives.
`;

writeFileSync(join(publicDir, 'llms.txt'), content, 'utf8');
console.log('Generated public/llms.txt');
