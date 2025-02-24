// web/src/components/search/NoteSearch.jsx
import React, { useState, useMemo } from 'react';

const NoteSearch = ({ notes, onNoteSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // Get unique tags from all notes
  const allTags = useMemo(() => {
    const tagSet = new Set();
    notes.forEach(note => {
      note.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [notes]);

  // Filter notes based on search query and selected tags
  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const matchesSearch = 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = 
        selectedTags.length === 0 || 
        selectedTags.every(tag => note.tags?.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [notes, searchQuery, selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-4">
      <div className="form-control">
        <input
          type="text"
          placeholder="Search notes..."
          className="input input-bordered w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`badge badge-lg ${
              selectedTags.includes(tag) 
                ? 'badge-primary' 
                : 'badge-outline'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredNotes.map(note => (
          <div 
            key={note.id}
            className="card bg-base-200 shadow-xl cursor-pointer hover:bg-base-300"
            onClick={() => onNoteSelect(note)}
          >
            <div className="card-body">
              <h2 className="card-title">{note.title}</h2>
              <div className="flex gap-1">
                {note.tags?.map(tag => (
                  <span key={tag} className="badge badge-ghost">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteSearch;
