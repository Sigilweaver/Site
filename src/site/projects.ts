/**
 * The Sigilweaver project catalog.
 *
 * Single source of truth for every project the site lists: the homepage,
 * the docs hub, the generated project landing pages, navigation, sitemaps,
 * llms.txt and Open Graph images all read from here.
 *
 * Every statement in this file must be backed by the project's public
 * repository (README, CHANGELOG, manifests) or its published packages.
 * Versions are the latest published release on the named registries, not
 * an unreleased version in the repository.
 */

export type CategoryId = 'platform' | 'mass-spec' | 'business' | 'life-sciences';

export interface Category {
    id: CategoryId;
    title: string;
    blurb: string;
}

export const CATEGORIES: Category[] = [
    {
        id: 'platform',
        title: 'Data pipelines',
        blurb: 'A self-hosted visual tool for building and running data workflows.',
    },
    {
        id: 'mass-spec',
        title: 'Mass spectrometry',
        blurb:
            'Readers for vendor raw files from six instrument makers, a shared mzML and Arrow layer, and a columnar store. No vendor SDKs or Windows-only DLLs.',
    },
    {
        id: 'business',
        title: 'Business and analytics formats',
        blurb:
            'Clean-room specifications and readers for closed formats used by Alteryx, Qlik, QuickBooks and SAP SQL Anywhere.',
    },
    {
        id: 'life-sciences',
        title: 'Genomics and medical imaging',
        blurb: 'Variant storage, MRI reconstruction and a DICOM tag registry.',
    },
];

export type License = 'Apache-2.0' | 'GPL-3.0-only' | 'AGPL-3.0-only';

export const LICENSE_URLS: Record<License, string> = {
    'Apache-2.0': 'https://www.apache.org/licenses/LICENSE-2.0',
    'GPL-3.0-only': 'https://www.gnu.org/licenses/gpl-3.0.html',
    'AGPL-3.0-only': 'https://www.gnu.org/licenses/agpl-3.0.html',
};

export interface Package {
    registry: 'PyPI' | 'crates.io';
    name: string;
}

export interface Project {
    /** URL directory: the landing page is served at /<slug>/. */
    slug: string;
    name: string;
    category: CategoryId;
    /** One sentence for cards and meta descriptions. */
    tagline: string;
    /** Landing page heading. Text inside [brackets] is highlighted. */
    headline: string;
    /** Opening paragraph of the landing page. */
    summary: string;
    /** Who the project is for. */
    audience: string;
    /** File types the project reads or writes, shown as chips. */
    formats?: string[];
    highlights: string[];
    /** Current status and the most important known limitations. */
    status: string;
    /** Short label for projects the repository marks as early or unstable. */
    badge?: 'Pre-release' | 'Alpha' | 'In development';
    languages: string[];
    license: License;
    /** Latest published version, or null when nothing is published yet. */
    version: string | null;
    repo: string;
    /** Docs path when the project deploys a Docusaurus site on sigilweaver.app. */
    docs?: string;
    packages: Package[];
    /** Shell commands shown under Install. */
    install: string[];
    /** Note shown under the install commands. */
    installNote?: string;
    /** Slugs of related projects. */
    related?: string[];
    /** Set when the project has its own page instead of the generic project template. */
    customPage?: boolean;
}

const gh = (name: string) => `https://github.com/Sigilweaver/${name}`;

export const PROJECTS: Project[] = [
    // ------------------------------------------------------------ platform
    {
        slug: 'loom',
        name: 'Loom',
        category: 'platform',
        tagline:
            'Visual data pipeline tool built on Polars: design workflows on a canvas, run them on your own hardware.',
        headline: 'Visual data pipelines on [your own infrastructure].',
        summary:
            'Loom has three parts: Studio, a visual workflow designer (React and Tauri); Server, the execution engine (FastAPI and Polars); and Hub, which adds central workflow storage, scheduling, multi-server management and team access.',
        audience:
            'Analysts and data engineers who want a drag-and-drop pipeline tool they can self-host, from a laptop to a server.',
        highlights: [
            'Polars lazy evaluation: pipelines compile to query plans instead of running step by step.',
            'Formula and Filter tools with no-code builders for common operations.',
            'Optional AI assistant in Studio; the application works fully without it.',
            'Studio and Server for single-user work; add Hub for scheduling and teams.',
        ],
        status: 'Loom has not had a v1.0 release yet; expect breaking changes between versions.',
        badge: 'Pre-release',
        languages: ['TypeScript', 'Python'],
        license: 'AGPL-3.0-only',
        version: null,
        repo: gh('Loom'),
        docs: '/loom/docs/',
        packages: [],
        install: [],
        customPage: true,
    },

    // ------------------------------------------------------------ mass spectrometry
    {
        slug: 'openmassspec',
        name: 'OpenMassSpec',
        category: 'mass-spec',
        tagline:
            'One Rust and Python API over six vendor raw formats, with mzML 1.1.0 conversion and Arrow output.',
        headline: 'One API for [six vendors] of mass spectrometry raw files.',
        summary:
            'OpenMassSpec reads Thermo, Bruker, Waters, Agilent, SCIEX and Shimadzu acquisitions through a single API, converts them to PSI-MS mzML 1.1.0, and streams them into Arrow. Each vendor is a feature you can turn on or off, so you only compile what you ship.',
        audience:
            'Proteomics and metabolomics developers who need vendor raw files on Linux, macOS or Windows without vendor software.',
        formats: ['.raw', '.d', '.wiff', '.lcd', '.qgd', '.mzML'],
        highlights: [
            '`vendor2mzml convert` writes indexed mzML 1.1.0 from any supported vendor format.',
            'Pre-built `vendor2mzml` binaries for Linux, macOS and Windows on every GitHub release, plus a Docker image.',
            'Python API (`openmassspec.to_mzml`) and the `openmassspec-io` Rust crate.',
            'Format auto-detection from the path or directory layout.',
        ],
        status:
            'Accuracy depends on the vendor reader underneath. Each reader documents its known issues; read them before using m/z values for identification.',
        languages: ['Rust', 'Python'],
        license: 'Apache-2.0',
        version: '2.0.0',
        repo: gh('OpenMassSpec'),
        docs: '/openmassspec/docs/',
        packages: [
            { registry: 'PyPI', name: 'openmassspec' },
            { registry: 'crates.io', name: 'openmassspec-io' },
        ],
        install: ['pip install openmassspec', 'cargo add openmassspec-io --features all'],
        related: ['opentfraw', 'opentimstdf', 'openwraw', 'openaraw', 'opensxraw', 'openszraw', 'openmassspec-core', 'speclance'],
    },
    {
        slug: 'opentfraw',
        name: 'OpenTFRaw',
        category: 'mass-spec',
        tagline: 'Rust and Python reader for Thermo Fisher .raw mass spectrometry files.',
        headline: 'Read Thermo Fisher [.raw] files in Rust and Python.',
        summary:
            'OpenTFRaw reads Thermo Fisher .raw files without Thermo software. It is tested on format versions 63, 64 and 66, from LTQ ion traps through Orbitrap Astral and TSQ Altis, against a public corpus of 291 files from 56 PRIDE datasets.',
        audience: 'Anyone who needs Thermo raw data outside Windows or outside the vendor SDK.',
        formats: ['.raw'],
        highlights: [
            'Spectra, chromatograms, scan filters and run metadata.',
            'Activation methods CID, HCD, ETD and EThcD are identified.',
            'mzML output through the shared OpenMassSpec writer.',
        ],
        status:
            'Scan metadata (MS level, polarity, analyzer, precursor) is misread on 34 of the 291 corpus files, mostly Orbitrap Fusion Lumos; peak m/z and intensity are not affected. See the README for the full list.',
        languages: ['Rust', 'Python'],
        license: 'Apache-2.0',
        version: '3.1.0',
        repo: gh('OpenTFRaw'),
        docs: '/opentfraw/docs/',
        packages: [
            { registry: 'PyPI', name: 'opentfraw' },
            { registry: 'crates.io', name: 'opentfraw' },
        ],
        install: ['pip install opentfraw', 'cargo add opentfraw'],
        related: ['openmassspec'],
    },
    {
        slug: 'opentimstdf',
        name: 'OpenTimsTDF',
        category: 'mass-spec',
        tagline: 'Rust and Python reader for Bruker timsTOF .d (TDF) acquisition bundles.',
        headline: 'Read Bruker [timsTOF] bundles in Rust and Python.',
        summary:
            'OpenTimsTDF reads timsTOF .d bundles: the SQLite analysis.tdf metadata file and the analysis.tdf_bin binary frame stream. It runs on Linux, macOS and Windows.',
        audience: 'timsTOF users and tool authors who want TDF data without the Bruker library.',
        formats: ['.d (TDF)'],
        highlights: [
            'Both frame compression codecs (codec 1 and codec 2).',
            'm/z from the bundle\'s stored calibration; reports which calibration model was used.',
            'Tested on timsTOF Pro, Pro 2 and SCP, DDA-PASEF and diaPASEF.',
        ],
        status:
            'Only TDF bundles are read (no TSF or BAF). timsTOF HT and Ultra, negative mode and MALDI data are untested. PRM-PASEF frames are not converted to spectra.',
        languages: ['Rust', 'Python'],
        license: 'Apache-2.0',
        version: '3.0.0',
        repo: gh('OpenTimsTDF'),
        docs: '/opentimstdf/docs/',
        packages: [
            { registry: 'PyPI', name: 'opentimstdf' },
            { registry: 'crates.io', name: 'opentimstdf' },
        ],
        install: ['pip install opentimstdf', 'cargo add opentimstdf'],
        related: ['openmassspec'],
    },
    {
        slug: 'openwraw',
        name: 'OpenWRaw',
        category: 'mass-spec',
        tagline: 'Rust and Python reader for Waters MassLynx .raw directories.',
        headline: 'Read Waters [MassLynx] data in Rust and Python.',
        summary:
            'OpenWRaw reads the Waters MassLynx .raw directory format on Linux, macOS and Windows, with no native or system dependencies.',
        audience: 'Waters users and tool authors who want MassLynx data outside the vendor SDK.',
        formats: ['.raw (directory)'],
        highlights: [
            'Headers, function inventories, scan indexes, chromatograms and spectra.',
            'Lock-mass scans available through the low-level decoder.',
            'mzML output through the shared OpenMassSpec writer.',
        ],
        status:
            'm/z is not lock-mass corrected and is typically 30 to 100 ppm off; recalibrate for accurate-mass work. Ion mobility (drift time) is not decoded.',
        languages: ['Rust', 'Python'],
        license: 'Apache-2.0',
        version: '4.0.0',
        repo: gh('OpenWRaw'),
        docs: '/openwraw/docs/',
        packages: [
            { registry: 'PyPI', name: 'openwraw' },
            { registry: 'crates.io', name: 'openwraw' },
        ],
        install: ['pip install openwraw', 'cargo add openwraw'],
        related: ['openmassspec'],
    },
    {
        slug: 'openaraw',
        name: 'OpenARaw',
        category: 'mass-spec',
        tagline: 'Rust and Python reader for Agilent MassHunter .d directories.',
        headline: 'Read Agilent [MassHunter] data in Rust and Python.',
        summary:
            'OpenARaw reads Agilent MassHunter .d directories with no Agilent SDK or software. It covers the modern AcqData layout across Q-TOF (profile and centroid) and QQQ (MRM) acquisitions.',
        audience: 'Agilent users and tool authors who want MassHunter data outside the vendor SDK.',
        formats: ['.d (MassHunter)'],
        highlights: [
            'Q-TOF profile and centroid spectra and QQQ MRM data.',
            'Applies each scan\'s stored mass calibration.',
            'mzML output through the shared OpenMassSpec writer.',
        ],
        status:
            'Q-TOF m/z accuracy depends on the run\'s own calibration; runs without reference-mass correction can be 10 to 20 ppm off. QQQ spectra report only the product m/z.',
        languages: ['Rust', 'Python'],
        license: 'Apache-2.0',
        version: '1.0.0',
        repo: gh('OpenARaw'),
        docs: '/openaraw/docs/',
        packages: [
            { registry: 'PyPI', name: 'openaraw' },
            { registry: 'crates.io', name: 'openaraw' },
        ],
        install: ['pip install openaraw', 'cargo add openaraw'],
        related: ['openmassspec'],
    },
    {
        slug: 'opensxraw',
        name: 'OpenSXRaw',
        category: 'mass-spec',
        tagline: 'Rust and Python reader for SCIEX .wiff / .wiff.scan legacy files.',
        headline: 'Read SCIEX [.wiff] files in Rust and Python.',
        summary:
            'OpenSXRaw reads SCIEX legacy .wiff and .wiff.scan files with no SCIEX SDK or software. It covers the TripleTOF and QTRAP instrument families.',
        audience: 'Tool authors working with SCIEX legacy data who can live with the limitations below.',
        formats: ['.wiff', '.wiff.scan'],
        highlights: [
            'Reads the .wiff container and its .wiff.scan scan file.',
            'Rust crate and Python wheel with no SCIEX software dependency.',
        ],
        status:
            'm/z values are not reliable on any instrument family: do not use them for identification or accurate-mass work. MS level is wrong on TripleTOF and ZenoTOF. The encrypted .wiff2 format is not supported.',
        badge: 'In development',
        languages: ['Rust', 'Python'],
        license: 'Apache-2.0',
        version: '0.4.0',
        repo: gh('OpenSXRaw'),
        docs: '/opensxraw/docs/',
        packages: [
            { registry: 'PyPI', name: 'opensxraw' },
            { registry: 'crates.io', name: 'opensxraw' },
        ],
        install: ['pip install opensxraw', 'cargo add opensxraw'],
        related: ['openmassspec'],
    },
    {
        slug: 'openszraw',
        name: 'OpenSZRaw',
        category: 'mass-spec',
        tagline: 'Rust and Python reader for Shimadzu LabSolutions .lcd, .qgd and .gcd files.',
        headline: 'Read Shimadzu [LabSolutions] data in Rust and Python.',
        summary:
            'OpenSZRaw reads Shimadzu LabSolutions raw data with no Shimadzu SDK or software: .qgd GC-MS (full-scan profile and MRM) and .lcd LC-MS from IT-TOF (profile) and QTOF (centroid) instruments.',
        audience: 'Shimadzu GC-MS users, and tool authors working with LabSolutions files.',
        formats: ['.qgd', '.lcd', '.gcd'],
        highlights: [
            'GC-MS .qgd: m/z consistent with unit-resolution GC-MS on the checked files.',
            'LC-MS QTOF .lcd: intensities decode correctly.',
            'mzML output through the shared OpenMassSpec writer.',
        ],
        status:
            'LC-MS QTOF m/z values are wrong and IT-TOF m/z values are not validated; do not use LC-MS m/z for identification. IT-TOF MS level and polarity are not decoded.',
        badge: 'In development',
        languages: ['Rust', 'Python'],
        license: 'Apache-2.0',
        version: '0.3.0',
        repo: gh('OpenSZRaw'),
        docs: '/openszraw/docs/',
        packages: [
            { registry: 'PyPI', name: 'openszraw' },
            { registry: 'crates.io', name: 'openszraw' },
        ],
        install: ['pip install openszraw', 'cargo add openszraw'],
        related: ['openmassspec'],
    },
    {
        slug: 'openmassspec-core',
        name: 'OpenMassSpecCore',
        category: 'mass-spec',
        tagline:
            'Vendor-neutral types, the mzML 1.1.0 writer and the Arrow bridge shared by every OpenMassSpec reader.',
        headline: 'The shared core of the [OpenMassSpec] readers.',
        summary:
            'openmassspec-core defines the SpectrumSource trait every reader implements, the SpectrumRecord and RunMetadata types, a streaming mzML 1.1.0 writer with optional indexed output, typed PSI-MS terms generated from psi-ms.obo, and a cross-vendor conformance harness. openmassspec-arrow turns spectrum streams into Arrow record batches.',
        audience: 'Authors of mass spectrometry readers and tools who want to plug into the OpenMassSpec stack.',
        highlights: [
            'One trait for all readers: write a SpectrumSource and get mzML and Arrow output.',
            'Indexed mzML with a SHA-1 footer.',
            'No unsafe code (`#![forbid(unsafe_code)]`).',
        ],
        status: 'Most users want OpenMassSpec or a vendor reader rather than this crate directly. Unreleased API breaks are in progress on main.',
        languages: ['Rust'],
        license: 'Apache-2.0',
        version: '3.0.0',
        repo: gh('OpenMassSpecCore'),
        docs: '/openmassspec/docs/',
        packages: [
            { registry: 'crates.io', name: 'openmassspec-core' },
            { registry: 'crates.io', name: 'openmassspec-arrow' },
        ],
        install: ['cargo add openmassspec-core'],
        related: ['openmassspec'],
    },
    {
        slug: 'speclance',
        name: 'SpecLance',
        category: 'mass-spec',
        tagline:
            'Columnar, memory-mapped mass spectrometry store built on Lance, meant as a faster drop-in for mzML.',
        headline: 'A columnar store for [mass spectrometry] runs.',
        summary:
            'SpecLance is a storage format, not an analysis framework. It ingests vendor files through OpenMassSpec, or mzML, into a Lance dataset with scalar indexes on retention time and m/z, holds many runs in one directory, and exports back to mzML.',
        audience: 'Proteomics developers who want faster reads and cheaper seeks than mzML, from Rust or Python.',
        formats: ['.mzML', '.raw', '.d'],
        highlights: [
            'Range queries on retention time and m/z.',
            'Python bindings that return PyArrow, Polars or Pandas data.',
            '`speclance export` writes mzML back out of a store.',
        ],
        status:
            'Alpha (0.2.0-alpha). Not yet published to PyPI or crates.io; build from source. The API and on-disk schema may change without notice before 1.0.',
        badge: 'Alpha',
        languages: ['Rust', 'Python'],
        license: 'Apache-2.0',
        version: null,
        repo: gh('SpecLance'),
        docs: '/speclance/docs/',
        packages: [],
        install: ['git clone https://github.com/Sigilweaver/SpecLance', 'cd SpecLance && cargo build --release'],
        related: ['openmassspec'],
    },

    // ------------------------------------------------------------ business formats
    {
        slug: 'sigilyx',
        name: 'SigilYX',
        category: 'business',
        tagline:
            'Standalone Rust reader and writer for Alteryx .yxdb files, with Python bindings for Polars, PyArrow and Pandas.',
        headline: 'Read and write Alteryx [.yxdb] files without Alteryx.',
        summary:
            'SigilYX is a standalone, cross-platform library for the native Alteryx Designer file format. The core is Rust; the Python package returns Polars, PyArrow or Pandas data from the same call.',
        audience: 'Analysts moving data out of, or into, Alteryx workflows from Python or Rust.',
        formats: ['.yxdb'],
        highlights: [
            'Full read and write for the original (E1) layout, all 17 field types.',
            'Experimental read support for the AMP engine (E2) layout.',
            'Streaming batched reads and Polars LazyFrame scans with projection pushdown.',
            'Spatial columns decoded to ISO WKB.',
        ],
        status: 'E1 read/write is complete. E2 read is experimental and does not yet cover every field type.',
        languages: ['Rust', 'Python'],
        license: 'Apache-2.0',
        version: '0.4.2',
        repo: gh('SigilYX'),
        docs: '/sigilyx/docs/',
        packages: [
            { registry: 'PyPI', name: 'sigilyx' },
            { registry: 'crates.io', name: 'sigilyx' },
        ],
        install: ['pip install sigilyx', 'cargo add sigilyx'],
        related: ['openyxdb'],
    },
    {
        slug: 'openyxdb',
        name: 'OpenYXDB',
        category: 'business',
        tagline:
            'Maintained, cross-platform fork of Alteryx\'s open-source C++ YXDB library, with Python bindings.',
        headline: 'Alteryx\'s own [YXDB] library, cross-platform and in Python.',
        summary:
            'OpenYXDB builds on Alteryx\'s official open-source YXDB implementation (GPLv3). It modernizes the build, fixes bugs, runs on Linux, macOS and Windows, and wraps the C++ core in a Python package.',
        audience:
            'Teams that want Alteryx\'s own implementation, a C++ library to link against, or GPLv3. For a permissive license, see SigilYX.',
        formats: ['.yxdb'],
        highlights: [
            'Python bindings via nanobind with PyArrow, Pandas, Polars and DuckDB integration.',
            'Reads both on-disk layouts, detected automatically; writes the original layout.',
            'Fixes the block index bug that broke files with more than 65,536 records.',
        ],
        status:
            'The newer E2 layout is only partly documented; unsupported variants fail with an error instead of returning guessed values.',
        languages: ['C++', 'Python'],
        license: 'GPL-3.0-only',
        version: '1.5.0',
        repo: gh('OpenYXDB'),
        docs: '/openyxdb/docs/',
        packages: [{ registry: 'PyPI', name: 'openyxdb' }],
        install: ['pip install openyxdb'],
        related: ['sigilyx'],
    },
    {
        slug: 'openqvd',
        name: 'OpenQVD',
        category: 'business',
        tagline: 'Clean-room specification and Rust reader/writer for Qlik .qvd files, with Python bindings.',
        headline: 'Read and write Qlik [.qvd] files without Qlik.',
        summary:
            'OpenQVD is an open specification and implementation of the Qlik QVD format, derived only from binary analysis of public sample files. The specification was developed against a corpus of about 1,100 public .qvd files.',
        audience: 'Analysts and engineers who need QVD data in Python, Rust or DuckDB without Qlik tooling.',
        formats: ['.qvd'],
        highlights: [
            'Rust reader and writer with semantic round-trip tests.',
            'Python bindings through the Arrow PyCapsule interface: PyArrow, Polars, Pandas and DuckDB.',
            '`openqvd` CLI: header summary, first rows, and CSV dump.',
            'Published format specification (SPEC.md).',
        ],
        status: 'Specification, Rust reader and writer, and Python bindings are complete; see NOTES.md for open observations.',
        languages: ['Rust', 'Python'],
        license: 'Apache-2.0',
        version: '2.0.0',
        repo: gh('OpenQVD'),
        docs: '/openqvd/docs/',
        packages: [
            { registry: 'PyPI', name: 'openqvd' },
            { registry: 'crates.io', name: 'openqvd' },
        ],
        install: ['pip install openqvd', 'cargo add openqvd'],
    },
    {
        slug: 'openqbw',
        name: 'OpenQBW',
        category: 'business',
        tagline:
            'Open specification and read-only Rust parser for QuickBooks Desktop .qbw company files, with a CLI and Python package.',
        headline: 'Get your data out of [QuickBooks Desktop] files.',
        summary:
            'Intuit has announced end-of-life for QuickBooks Desktop. OpenQBW reverse-engineers the .qbw company file from publicly available files, documents it as a specification, and ships a read-only parser so the accounting data a business already owns stays accessible.',
        audience:
            'People leaving QuickBooks Desktop, and anyone doing archival, audit or forensic work on .qbw files.',
        formats: ['.qbw'],
        highlights: [
            'Opens .qbw files: checks magic, version and page checksums, removes Intuit\'s page obfuscation.',
            'Reads the table catalogs and extracts transaction headers and line items.',
            'Exports transactions and line items to SQLite, CSV or IIF.',
            'Read-only: never writes .qbw files.',
        ],
        status:
            'In active development. Line-item values decode as exact decimals, but which table a page belongs to and whether a value is the line amount are not yet verified. IIF export needs placeholder accounts because account names are not decoded yet.',
        badge: 'In development',
        languages: ['Rust', 'Python'],
        license: 'Apache-2.0',
        version: '0.2.0',
        repo: gh('OpenQBW'),
        docs: '/openqbw/docs/',
        packages: [
            { registry: 'PyPI', name: 'openqbw' },
            { registry: 'crates.io', name: 'openqbw' },
            { registry: 'crates.io', name: 'openqbw-cli' },
        ],
        install: ['cargo install openqbw-cli', 'pip install openqbw'],
        related: ['opensqlanywhere'],
    },
    {
        slug: 'opensqlanywhere',
        name: 'OpenSQLAnywhere',
        category: 'business',
        tagline: 'Pure-Rust reader and open specification for SAP SQL Anywhere page-store files.',
        headline: 'Read [SQL Anywhere] databases without the SAP server.',
        summary:
            'OpenSQLAnywhere is a clean-room reader for the SAP SQL Anywhere on-disk page-store format, derived from the on-disk bytes and SAP\'s public documentation. It targets SA17 and ships no SAP code or binaries.',
        audience: 'Anyone who needs to inspect or recover data from a SQL Anywhere database file without SAP software.',
        formats: ['.db'],
        highlights: [
            'Page reading with CRC verification, page-type histograms and slot listings.',
            '`opensqlany` CLI: inspect, dump-page, slots.',
            'Removes the page obfuscation used by QuickBooks .qbw files; OpenQBW builds on it.',
            'Format specification (SPECIFICATION.md).',
        ],
        status: 'Targets SA17 (build 2182). Other SQL Anywhere versions are not covered.',
        languages: ['Rust'],
        license: 'Apache-2.0',
        version: '0.3.0',
        repo: gh('OpenSQLAnywhere'),
        docs: '/opensqlanywhere/docs/',
        packages: [
            { registry: 'crates.io', name: 'opensqlany' },
            { registry: 'crates.io', name: 'opensqlany-cli' },
        ],
        install: ['cargo install opensqlany-cli', 'cargo add opensqlany'],
        related: ['openqbw'],
    },

    // ------------------------------------------------------------ life sciences
    {
        slug: 'genolance',
        name: 'GenoLance',
        category: 'life-sciences',
        tagline:
            'Columnar multi-sample variant store on LanceDB: ingest VCFs and ClinVar, query by region or gene, compare samples.',
        headline: 'A columnar [variant store] in a single process.',
        summary:
            'GenoLance ingests sample VCFs, and annotation VCFs such as ClinVar, into a LanceDB directory where every field is an Arrow column. Variants can then be queried, joined against ClinVar and compared across samples from one process: no Spark, no cloud, no GenomicsDB.',
        audience: 'Researchers and bioinformaticians working with many single-sample VCFs on one machine.',
        formats: ['.vcf', '.vcf.gz'],
        highlights: [
            '`genolance ingest`: plain or BGZF-compressed VCF, multi-allelic sites split.',
            '`query`, `join`, `compare`, `screen` and `compound-het` commands.',
            '`genolance export` reconstructs a sample VCF; verified lossless on DeepVariant VCFs.',
            'Validated against DeepVariant WGS data (GRCh37, about 5.8M sites per sample).',
        ],
        status:
            'Not yet published to a package registry; build from source with pixi. BCF input is not supported.',
        languages: ['Rust'],
        license: 'Apache-2.0',
        version: null,
        repo: gh('GenoLance'),
        packages: [],
        install: ['git clone https://github.com/Sigilweaver/GenoLance', 'cd GenoLance && pixi install && cargo build --release'],
        installNote: 'pixi provides protoc, bcftools and samtools for the build.',
    },
    {
        slug: 'openkspace',
        name: 'OpenKSpace',
        category: 'life-sciences',
        tagline: 'Rust library and CLI for Cartesian MRI k-space reconstruction from ISMRMRD .h5 files.',
        headline: 'Reconstruct MRI [k-space] data in Rust.',
        summary:
            'OpenKSpace reads ISMRMRD HDF5 files and reconstructs Cartesian MRI data. Calibration passes and reconstruction strategies are pluggable, and the CLI writes PNG or NIfTI images.',
        audience: 'MRI researchers and developers working with raw k-space data.',
        formats: ['.h5 (ISMRMRD)', '.nii', '.png'],
        highlights: [
            'Reconstruction strategies: IFFT with root-sum-of-squares, GRAPPA, SENSE (with g-factor maps) and L1-wavelet compressed sensing.',
            'Noise pre-whitening, navigator phase correction, oversampling removal and partial-Fourier homodyne.',
            'Automatic 2D versus 3D detection.',
            '`openkspace info`, `probe` and `recon` commands.',
        ],
        status: 'Cartesian acquisitions only.',
        languages: ['Rust'],
        license: 'Apache-2.0',
        version: '0.2.0',
        repo: gh('OpenKSpace'),
        docs: '/openkspace/docs/',
        packages: [{ registry: 'crates.io', name: 'openkspace-cli' }],
        install: ['cargo install openkspace-cli'],
        related: ['dicom-atlas'],
    },
    {
        slug: 'dicom-atlas',
        name: 'DICOM Atlas',
        category: 'life-sciences',
        tagline:
            'Open registry of public and private DICOM tags, queryable from Rust, C or Python with no runtime dependencies.',
        headline: 'An open registry of [private DICOM tags].',
        summary:
            'DICOM Atlas compiles public and private DICOM tags from vendor conformance statements and the PS3.6 standard, with entries contributed by pydicom and GDCM. The shipped tags.dmap file holds 19,688 tags (14,559 private, 5,129 public) in 3.9 MB, with O(log n) lookups.',
        audience: 'Developers of DICOM viewers, converters and anonymizers who need names and VRs for private tags.',
        formats: ['tags.dmap', 'tags.csv'],
        highlights: [
            'Private tags scraped from Siemens, GE HealthCare, Philips, Canon and Acuson conformance statements.',
            '`dicom-map` library for Rust, Python and C, plus a `dicom-lookup` CLI.',
            'Optional embedded mode bakes the tag file into your binary.',
            'Tag data is dedicated to the public domain (CC0), with noted third-party exceptions.',
        ],
        status: 'See ROADMAP.md in the repository for the current state and planned work.',
        languages: ['Rust', 'Python', 'C'],
        license: 'Apache-2.0',
        version: '0.2.8',
        repo: gh('DICOM-Atlas'),
        docs: '/dicom-atlas/docs/',
        packages: [
            { registry: 'PyPI', name: 'dicom-map' },
            { registry: 'crates.io', name: 'dicom-map' },
        ],
        install: ['pip install dicom-map', 'cargo add dicom-map'],
        related: ['openkspace'],
    },
];

export function packageUrl(pkg: Package): string {
    return pkg.registry === 'PyPI'
        ? `https://pypi.org/project/${pkg.name}/`
        : `https://crates.io/crates/${pkg.name}`;
}

export function getProject(slug: string): Project {
    const project = PROJECTS.find((p) => p.slug === slug);
    if (!project) throw new Error(`Unknown project slug "${slug}"`);
    return project;
}

export function projectsIn(category: CategoryId): Project[] {
    return PROJECTS.filter((p) => p.category === category);
}

/** Public sample-file corpora used to develop the format readers. */
export const CORPORA = [
    { name: 'QVD-Sources', repo: gh('QVD-Sources'), description: 'Index of public .qvd files used to develop OpenQVD.' },
    { name: 'YXDB-Sources', repo: gh('YXDB-Sources'), description: 'Index of public .yxdb files used to develop the YXDB readers.' },
];
