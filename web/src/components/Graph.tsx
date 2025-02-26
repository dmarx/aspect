// web/src/components/Graph.tsx
import React, { useEffect, useRef } from 'react';

const Graph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sigmaRef = useRef<any>(null);
  
  useEffect(() => {
    // Ensure we have a container and it has dimensions
    if (!containerRef.current) return;
    
    // Set explicit dimensions before sigma initialization
    const container = containerRef.current;
    const updateSize = () => {
      container.style.width = '100%';
      container.style.height = '400px'; // Explicit height
    };
    updateSize();

    // Dynamic imports to ensure code only runs in browser
    const initGraph = async () => {
      try {
        const [
          { default: Sigma },
          { default: Graph },
          { circular },
          { default: FA2Layout },
          graphData
        ] = await Promise.all([
          import('sigma'),
          import('graphology'),
          import('graphology-layout'),
          import('graphology-layout-forceatlas2'),
          import('../data/vault-graph.json')
        ]);

        // Create graph instance
        const graph = new Graph();
        
        // Add nodes from pre-computed data
        graphData.nodes.forEach(node => {
          graph.addNode(node.id, {
            label: node.title,
            size: 5,
            color: '#4B91E2'
          });
        });
        
        // Add edges from pre-computed data
        graphData.edges.forEach(edge => {
          if (!graph.hasEdge(edge.source, edge.target)) {
            graph.addEdge(edge.source, edge.target, {
              size: 1,
              color: '#B4B4B4'
            });
          }
        });

        // Apply initial circular layout
        circular.assign(graph);
        
        // Create Sigma instance
        sigmaRef.current = new Sigma(graph, container, {
          minCameraRatio: 0.2,
          maxCameraRatio: 2,
          renderEdgeLabels: false,
          defaultNodeColor: '#4B91E2',
          defaultEdgeColor: '#B4B4B4',
          labelSize: 12,
          labelWeight: 'bold',
          allowInvalidContainer: true // Added for safety
        });

        // Apply ForceAtlas2 layout
        const fa2Layout = new FA2Layout(graph, {
          settings: {
            gravity: 1,
            scalingRatio: 4,
            slowDown: 2
          }
        });
        
        fa2Layout.start();
        setTimeout(() => fa2Layout.stop(), 2000);

        // Add hover events
        sigmaRef.current.on('enterNode', ({ node }) => {
          graph.setNodeAttribute(node, 'size', 8);
          graph.setNodeAttribute(node, 'color', '#1D4ED8');
        });

        sigmaRef.current.on('leaveNode', ({ node }) => {
          graph.setNodeAttribute(node, 'size', 5);
          graph.setNodeAttribute(node, 'color', '#4B91E2');
        });

        // Add click event for navigation with correct base URL
        sigmaRef.current.on('clickNode', ({ node }) => {
          window.location.href = `/aspect/notes/${node}`;
        });
      } catch (error) {
        console.error('Error initializing graph:', error);
      }
    };

    // Handle resize
    window.addEventListener('resize', updateSize);
    initGraph();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (sigmaRef.current) {
        sigmaRef.current.kill();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ width: '100%', height: '400px' }}
      className="bg-gray-50 rounded-lg"
    />
  );
};

export default Graph;
