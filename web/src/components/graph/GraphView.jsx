// web/src/components/graph/GraphView.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Graph } from 'graphology';
import Sigma from 'sigma';
import ForceAtlas2Layout from 'graphology-layout-forceatlas2';
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";

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
    <div className="grid grid-cols-[1fr_250px] gap-4">
      <div ref={containerRef} className="h-[600px] rounded-lg border bg-card" />
      
      <Card>
        <CardHeader>
          <CardTitle>Graph Settings</CardTitle>
          <CardDescription>
            Customize the visualization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Node Size</label>
            <Slider
              value={[settings.nodeSize]}
              onValueChange={([value]) => updateSettings('nodeSize', value)}
              min={1}
              max={10}
              step={0.5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Edge Size</label>
            <Slider
              value={[settings.edgeSize]}
              onValueChange={([value]) => updateSettings('edgeSize', value)}
              min={0.1}
              max={2}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Gravity</label>
            <Slider
              value={[settings.gravity]}
              onValueChange={([value]) => updateSettings('gravity', value)}
              min={0.1}
              max={2}
              step={0.1}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={settings.colorByTags}
              onCheckedChange={(checked) => updateSettings('colorByTags', checked)}
            />
            <label className="text-sm font-medium">Color by Tags</label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tag Colors</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(tagColors).map(([tag, color]) => (
                <div 
                  key={tag}
                  className="flex items-center gap-2 text-sm"
                >
                  <div 
                    className="h-3 w-3 rounded-full" 
                    style={{ backgroundColor: color }} 
                  />
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GraphView;
