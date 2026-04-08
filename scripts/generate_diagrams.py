#!/usr/bin/env python3
"""
Generate Mermaid source files for course diagrams and optionally render PNGs.

Default behavior:
- write Mermaid `.mmd` sources into `scripts/generated/mermaid/`

Optional behavior:
- render `.png` files into `course-site/public/assets/diagrams/` when `mmdc`
  is installed locally
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
SPEC_PATH = ROOT / "scripts" / "diagram_specs.json"
MERMAID_CONFIG_PATH = ROOT / "scripts" / "mermaid-config.json"
MERMAID_OUTPUT_DIR = ROOT / "scripts" / "generated" / "mermaid"
PNG_OUTPUT_DIR = ROOT / "course-site" / "public" / "assets" / "diagrams"


@dataclass
class Node:
    id: str
    label: str
    col: int
    row: int
    tone: str = "default"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate Mermaid diagram sources and PNGs.")
    parser.add_argument(
        "--render-png",
        action="store_true",
        help="Render PNG assets with Mermaid CLI after writing .mmd files.",
    )
    return parser.parse_args()


def mermaid_label(value: str) -> str:
    return value.replace("\n", "<br/>").replace('"', "&quot;")


def class_name(tone: str) -> str:
    return "accent" if tone == "accent" else "defaultNode"


def render_mermaid(spec: dict[str, Any]) -> str:
    nodes = [Node(**node) for node in spec["nodes"]]
    rows = sorted({node.row for node in nodes})

    parts = [
        "%%{init: {'theme': 'base', 'flowchart': {'curve': 'basis'}, 'themeVariables': {'fontFamily': 'Inter, ui-sans-serif, system-ui', 'primaryTextColor': '#182033', 'lineColor': '#314056', 'tertiaryColor': '#fffdfa'}}}%%",
        "flowchart TB",
        f"%% {spec['title']}",
        f"%% {spec['subtitle']}",
        "classDef defaultNode fill:#fffdfa,stroke:#243042,stroke-width:2px,color:#182033;",
        "classDef accent fill:#dff3f7,stroke:#126e82,stroke-width:2px,color:#182033;",
        "classDef rowGroup fill:transparent,stroke:transparent,color:transparent;",
    ]

    for row in rows:
        row_nodes = sorted((node for node in nodes if node.row == row), key=lambda node: node.col)
        row_id = f"row_{row}"
        parts.append(f'subgraph {row_id}[" "]')
        parts.append("direction LR")
        for node in row_nodes:
            label = mermaid_label(node.label)
            parts.append(f'{node.id}["{label}"]:::{class_name(node.tone)}')
        parts.append("end")
        parts.append(f"class {row_id} rowGroup;")

    for edge in spec["edges"]:
        label = edge.get("label", "").strip()
        if label:
            parts.append(f'{edge["from"]} -->|{label}| {edge["to"]}')
        else:
            parts.append(f'{edge["from"]} --> {edge["to"]}')

    return "\n".join(parts) + "\n"


def find_mmdc() -> str | None:
    local_candidates = [
        ROOT / "course-site" / "node_modules" / ".bin" / "mmdc",
        ROOT / "course-site" / "node_modules" / ".bin" / "mmdc.cmd",
    ]
    if sys.platform.startswith("win"):
        local_candidates.reverse()

    candidates = [shutil.which("mmdc"), *(str(candidate) for candidate in local_candidates)]
    for candidate in candidates:
        if candidate and Path(candidate).exists():
            return candidate
    return None


def render_png(mmdc_path: str, source_path: Path, output_path: Path) -> None:
    command = [
        mmdc_path,
        "-i",
        str(source_path),
        "-o",
        str(output_path),
        "-c",
        str(MERMAID_CONFIG_PATH),
        "-b",
        "transparent",
        "-s",
        "2",
    ]
    subprocess.run(command, check=True)


def main() -> int:
    args = parse_args()
    specs = json.loads(SPEC_PATH.read_text(encoding="utf-8"))

    MERMAID_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PNG_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    generated_sources: list[Path] = []
    for spec in specs["diagrams"]:
        output_path = MERMAID_OUTPUT_DIR / f'{spec["slug"]}.mmd'
        output_path.write_text(render_mermaid(spec), encoding="utf-8")
        generated_sources.append(output_path)
        print(f"wrote {output_path.relative_to(ROOT)}")

    if not args.render_png:
        return 0

    mmdc_path = find_mmdc()
    if not mmdc_path:
        print(
            "Mermaid CLI not found.\n"
            "Install it in `course-site/` with:\n"
            "  npm install -D @mermaid-js/mermaid-cli\n"
            "Then rerun:\n"
            "  python3 scripts/generate_diagrams.py --render-png",
            file=sys.stderr,
        )
        return 1

    for source_path in generated_sources:
        output_path = PNG_OUTPUT_DIR / f"{source_path.stem}.png"
        render_png(mmdc_path, source_path, output_path)
        print(f"wrote {output_path.relative_to(ROOT)}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
