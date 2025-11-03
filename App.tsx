
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import CharacterView from './components/CharacterView';
import Header from './components/Header';
import { SPRITE_DATA } from './constants';
import { type Character } from './types';

const App: React.FC = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>(
    SPRITE_DATA.factions[0]?.characters[0]?.id || ''
  );

  const selectedCharacter = useMemo<Character | null>(() => {
    for (const faction of SPRITE_DATA.factions) {
      const found = faction.characters.find(c => c.id === selectedCharacterId);
      if (found) return found;
    }
    return null;
  }, [selectedCharacterId]);

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        <Sidebar
          spriteData={SPRITE_DATA}
          selectedCharacterId={selectedCharacterId}
          onSelectCharacter={setSelectedCharacterId}
        />
        <CharacterView character={selectedCharacter} />
      </div>
    </div>
  );
};

export default App;
