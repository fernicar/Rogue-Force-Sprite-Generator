import React, { useState, useEffect } from 'react';
import { type Character, type AnimationFrame } from '../types';
import { generateImage, editImage } from '../services/geminiService';
import SpriteCard from './SpriteCard';

declare const JSZip: any;

interface CharacterViewProps {
  character: Character | null;
}

const getDependency = (frameName: string): string | null => {
  if (frameName === 'Base/Idle') {
    return null; // This is the root image
  }
  return 'Base/Idle'; // All other frames depend on the base
};

const CharacterView: React.FC<CharacterViewProps> = ({ character }) => {
  const [imageUrls, setImageUrls] = useState<Record<string, string | null>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [errorStates, setErrorStates] = useState<Record<string, string | null>>({});
  const [isZipping, setIsZipping] = useState(false);

  useEffect(() => {
    // Reset state when character changes
    setImageUrls({});
    setLoadingStates({});
    setErrorStates({});
  }, [character]);

  const handleGenerate = async (frame: AnimationFrame) => {
    setLoadingStates(prev => ({ ...prev, [frame.name]: true }));
    setErrorStates(prev => ({ ...prev, [frame.name]: null }));

    try {
      const dependencyName = getDependency(frame.name);
      let newImageUrl: string;

      if (dependencyName) {
        const sourceImageUrl = imageUrls[dependencyName];
        if (!sourceImageUrl) {
          throw new Error(`Please generate '${dependencyName}' first.`);
        }
        const parts = sourceImageUrl.split(',');
        const meta = parts[0].split(':')[1].split(';')[0];
        const base64Data = parts[1];
        newImageUrl = await editImage(base64Data, meta, frame.prompt);
      } else {
        newImageUrl = await generateImage(frame.prompt);
      }
      setImageUrls(prev => ({ ...prev, [frame.name]: newImageUrl }));
    } catch (err) {
      setErrorStates(prev => ({ ...prev, [frame.name]: err instanceof Error ? err.message : 'An unknown error occurred' }));
    } finally {
      setLoadingStates(prev => ({ ...prev, [frame.name]: false }));
    }
  };

  const handleEdit = async (frame: AnimationFrame, editPrompt: string) => {
    setLoadingStates(prev => ({ ...prev, [frame.name]: true }));
    setErrorStates(prev => ({ ...prev, [frame.name]: null }));

    try {
      const imageUrl = imageUrls[frame.name];
      if (!imageUrl) {
        throw new Error(`Generate this frame first before editing.`);
      }
      const parts = imageUrl.split(',');
      const meta = parts[0].split(':')[1].split(';')[0];
      const base64Data = parts[1];
      const newImageUrl = await editImage(base64Data, meta, editPrompt);
      setImageUrls(prev => ({ ...prev, [frame.name]: newImageUrl }));
    } catch (err) {
      setErrorStates(prev => ({ ...prev, [frame.name]: err instanceof Error ? err.message : 'An unknown error occurred' }));
    } finally {
      setLoadingStates(prev => ({ ...prev, [frame.name]: false }));
    }
  };

  const handleDownload = (imageUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadAll = async () => {
    if (!character) return;
    if (typeof JSZip === 'undefined') {
        alert('JSZip library not found. Cannot download all files.');
        return;
    }

    setIsZipping(true);

    try {
        const zip = new JSZip();
        const generatedImages = Object.entries(imageUrls).filter(([, url]) => url);

        if (generatedImages.length === 0) {
            alert("No images have been generated yet.");
            return;
        }

        for (const [frameName, imageUrl] of generatedImages) {
            if (imageUrl) {
                const base64Data = imageUrl.split(',')[1];
                const fileName = `${character.id}_${frameName.replace(/[\s/]/g, '_').toLowerCase()}.png`;
                zip.file(fileName, base64Data, { base64: true });
            }
        }
        
        const content = await zip.generateAsync({ type: 'blob' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = `${character.id}_sprites.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

    } catch (error) {
        console.error("Error creating zip file:", error);
        alert("Failed to create zip file. See console for details.");
    } finally {
        setIsZipping(false);
    }
  };


  if (!character) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center text-gray-400">
        <p>Select a character from the sidebar to begin.</p>
      </div>
    );
  }

  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
      <div className="mb-6 text-center flex flex-col sm:flex-row justify-center items-center gap-4">
        <h2 className="text-2xl font-bold uppercase tracking-widest" style={{ color: character.color }}>
          {character.name}
        </h2>
        <button
          onClick={handleDownloadAll}
          disabled={Object.values(imageUrls).every(url => !url) || isZipping}
          className="bg-green-600 text-white text-xs py-2 px-4 rounded-md hover:bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {isZipping ? 'Zipping...' : 'Download All Generated'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {character.frames.map((frame) => {
          const dependencyName = getDependency(frame.name);
          const isDependencyReady = dependencyName ? !!imageUrls[dependencyName] : true;
          return (
            <SpriteCard 
              key={frame.name} 
              frame={frame}
              imageUrl={imageUrls[frame.name] || null}
              isLoading={loadingStates[frame.name] || false}
              error={errorStates[frame.name] || null}
              isDependencyReady={isDependencyReady}
              dependencyName={dependencyName}
              onGenerate={() => handleGenerate(frame)}
              onEdit={(editPrompt) => handleEdit(frame, editPrompt)}
              onDownload={() => handleDownload(
                imageUrls[frame.name]!,
                `${character.id}_${frame.name.replace(/[\s/]/g, '_').toLowerCase()}.png`
              )}
            />
          );
        })}
      </div>
    </main>
  );
};

export default CharacterView;