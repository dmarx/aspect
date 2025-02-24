// web/src/components/graph/GraphView.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Graph } from 'graphology';
import Sigma from 'sigma';
import ForceAtlas2Layout from 'graphology-layout-forceatlas2';

const GraphView = ({ data, onNodeClick }) => {
  const containerRef = useRef(null);
  const [graph, setGraph] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [settings, setSettings] = useState({
    nodeSize: 5,
    edgeSize: 1,
    gravity: 1,
    scaling: 1.2,
    colorByTags: true
  });

  // Color palette for tags
  const tagColors = {
    'PKM': '#ff6b6b',
    'writing': '#4ecdc4',
    'productivity': '#45b7d1',
    'tools': '#96ceb4'
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const graph = new Graph();

    // Add nodes
    data.nodes.forEach(node => {
      graph.addNode(node.id, {
        label: node.title,
        size: settings.nodeSize,
        tags: node.tags,
        color: settings.colorByTags && node.tags?.[0] 
          ? tagColors[node.tags[0]] 
          : '#6c5ce7'
      });
    });

    // Add edges
    data.edges.forEach(edge => {
      graph.addEdge(edge.source, edge.target, {
        size: settings.edgeSize
      });
    });

    // Apply layout
    const fa2Layout = new ForceAtlas2Layout(graph, {
      settings: {
        gravity: settings.gravity,
        scalingRatio: settings.scaling
      }
    });
    fa2Layout.assign();

    // Initialize renderer
    const renderer = new Sigma(graph, containerRef.current, {
      renderEdgeLabels: false,
      defaultNodeColor: '#6c5ce7',
      defaultEdgeColor: '#e2e8f0'
    });

    renderer.on('clickNode', ({ node }) => {
      onNodeClick(node);
    });

    setGraph(graph);
    setRenderer(renderer);

    return () => {
      renderer?.kill();
    };
  }, [data, settings]);

  const updateSettings = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="grid grid-cols-[1fr_300px] gap-4">
      <div 
        ref={containerRef} 
        className="h-[600px] rounded-lg border bg-base-200" 
      />
      
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title">Graph Settings</h2>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Node Size</span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={settings.nodeSize}
              onChange={(e) => updateSettings('nodeSize', parseFloat(e.target.value))}
              className="range range-primary"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Edge Size</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={settings.edgeSize}
              onChange={(e) => updateSettings('edgeSize', parseFloat(e.target.value))}
              className="range range-primary"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Gravity</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={settings.gravity}
              onChange={(e) => updateSettings('gravity', parseFloat(e.target.value))}
              className="range range-primary"
            />
          </div>
