#!/usr/bin/env python3

# web/scripts/build_graph.py
from pathlib import Path
import json
import re
from typing import Dict, List, Set
import frontmatter

class VaultGraphBuilder:
    def __init__(self, vault_path: Path, output_path: Path):
        self.vault_path = vault_path
        self.output_path = output_path
        self.wiki_link_pattern = re.compile(r'\[\[(.*?)\]\]')
        
    def extract_links(self, content: str) -> Set[str]:
        """Extract wiki-style links from content."""
        matches = self.wiki_link_pattern.findall(content)
        # Handle cases where link text differs from target
        return {link.split('|')[0] if '|' in link else link for link in matches}
    
    def get_note_id(self, path: Path) -> str:
        """Generate consistent ID for a note."""
        return path.stem
    
    def build_graph(self) -> Dict:
        """Analyze vault content and build graph structure."""
        nodes: List[Dict] = []
        edges: List[Dict] = []
        note_ids: Set[str] = set()
        
        # First pass: collect all valid note IDs
        for md_file in self.vault_path.glob('*.md'):
            note_ids.add(self.get_note_id(md_file))
        
        # Second pass: build nodes and edges
        for md_file in self.vault_path.glob('*.md'):
            note_id = self.get_note_id(md_file)
            post = frontmatter.load(md_file)
            
            # Create node
            node_data = {
                'id': note_id,
                'title': post.get('title', note_id),
                'tags': post.get('tags', []),
            }
            nodes.append(node_data)
            
            # Extract and validate links
            content = post.content
            links = self.extract_links(content)
            
            # Create edges for valid links
            for target in links:
                if target in note_ids:  # Only create edges to existing notes
                    edges.append({
                        'source': note_id,
                        'target': target
                    })
        
        return {
            'nodes': nodes,
            'edges': edges,
            'metadata': {
                'nodeCount': len(nodes),
                'edgeCount': len(edges)
            }
        }
    
    def save_graph(self, graph_data: Dict) -> None:
        """Save graph data as JSON."""
        self.output_path.parent.mkdir(parents=True, exist_ok=True)
        with self.output_path.open('w') as f:
            json.dump(graph_data, f, indent=2)

def main():
    """Main entry point."""
    project_root = Path(__file__).parent.parent
    content_path = project_root / 'src' / 'content' / 'notes'
    output_path = project_root / 'src' / 'data' / 'vault-graph.json'
    
    builder = VaultGraphBuilder(content_path, output_path)
    graph_data = builder.build_graph()
    builder.save_graph(graph_data)

if __name__ == '__main__':
    main()
