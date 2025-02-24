# Python Project Structure

## web/scripts/build_graph.py
```python
class VaultGraphBuilder

    def __init__(self, vault_path: Path, output_path: Path)

    def extract_links(self, content: str) -> Set[str]
        """Extract wiki-style links from content."""

    def get_note_id(self, path: Path) -> str
        """Generate consistent ID for a note."""

    def build_graph(self) -> Dict
        """Analyze vault content and build graph structure."""

    def save_graph(self, graph_data: Dict) -> None
        """Save graph data as JSON."""


def main()
    """Main entry point."""

```
