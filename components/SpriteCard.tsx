import React, { useState } from 'react';
import { type AnimationFrame } from '../types';
import Spinner from './Spinner';

interface SpriteCardProps {
  frame: AnimationFrame;
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  isDependencyReady: boolean;
  dependencyName: string | null;
  onGenerate: () => void;
  onEdit: (editPrompt: string) => void;
  onDownload: () => void;
}

const SpriteCard: React.FC<SpriteCardProps> = ({ 
  frame, 
  imageUrl, 
  isLoading, 
  error,
  isDependencyReady,
  dependencyName,
  onGenerate,
  onEdit,
  onDownload
}) => {
  const [editPrompt, setEditPrompt] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  const handleEdit = () => {
    if (!editPrompt) return;
    onEdit(editPrompt);
    setEditPrompt(''); // Clear prompt on success
  };
  
  const generateButtonDisabled = isLoading || !isDependencyReady;

  return (
    <div className="bg-gray-800 border-2 border-gray-600 p-4 rounded-lg shadow-lg flex flex-col gap-4">
      <h3 className="text-sm font-bold text-center text-gray-300 tracking-wider">{frame.name}</h3>
      
      <div className="w-40 h-40 mx-auto bg-gray-900/50 border-2 border-gray-700 flex items-center justify-center rounded-md relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <Spinner />
          </div>
        )}
        {imageUrl ? (
          <img src={imageUrl} alt={frame.name} className="w-full h-full object-contain" style={{ imageRendering: 'pixelated' }} />
        ) : (
          <div className="text-gray-500 text-xs text-center">Generate Sprite</div>
        )}
      </div>

      <button
        onClick={() => setShowPrompt(!showPrompt)}
        className="text-xs text-cyan-400 hover:text-cyan-300 text-center"
      >
        {showPrompt ? 'Hide' : 'Show'} Prompt
      </button>

      {showPrompt && (
        <p className="text-xs text-gray-400 bg-gray-900 p-2 rounded border border-gray-700 max-h-24 overflow-y-auto">
          {frame.prompt}
        </p>
      )}

      {error && <p className="text-xs text-red-400 bg-red-900/50 p-2 rounded border border-red-700">{error}</p>}
      
      {!isDependencyReady && (
        <p className="text-xs text-yellow-400 bg-yellow-900/50 p-2 rounded border border-yellow-700 text-center">
          Generate '{dependencyName}' first
        </p>
      )}

      <button
        onClick={onGenerate}
        disabled={generateButtonDisabled}
        className="w-full bg-blue-600 text-white text-xs py-2 rounded-md hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
      >
        {imageUrl ? 'Regenerate' : 'Generate'}
      </button>

      {imageUrl && (
        <div className="flex flex-col gap-2 pt-4 border-t-2 border-gray-700">
           <input
            type="text"
            value={editPrompt}
            onChange={(e) => setEditPrompt(e.target.value)}
            placeholder="e.g., add a red cape"
            disabled={isLoading}
            className="w-full bg-gray-900 text-white text-xs p-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleEdit}
            disabled={isLoading || !editPrompt}
            className="w-full bg-purple-600 text-white text-xs py-2 rounded-md hover:bg-purple-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            Edit Image
          </button>
          <button
            onClick={onDownload}
            disabled={isLoading}
            className="w-full bg-green-600 text-white text-xs py-2 rounded-md hover:bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default SpriteCard;