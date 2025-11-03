
import React from 'react';
import { type SpriteData } from '../types';

interface SidebarProps {
  spriteData: SpriteData;
  selectedCharacterId: string;
  onSelectCharacter: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ spriteData, selectedCharacterId, onSelectCharacter }) => {
  return (
    <aside className="bg-gray-800 text-gray-200 w-full md:w-64 lg:w-72 p-4 border-r-4 border-gray-600 overflow-y-auto">
      <h2 className="text-lg mb-4 text-center">Factions</h2>
      {spriteData.factions.map((faction) => (
        <div key={faction.name} className="mb-6">
          <h3 className="text-md uppercase tracking-wider text-gray-400 mb-2">{faction.name}</h3>
          <ul>
            {faction.characters.map((character) => (
              <li key={character.id}>
                <button
                  onClick={() => onSelectCharacter(character.id)}
                  style={{'--character-color': character.color} as React.CSSProperties}
                  className={`w-full text-left p-2 text-sm rounded transition-all duration-200 ease-in-out mb-1
                    ${selectedCharacterId === character.id 
                      ? 'bg-gray-600 text-[var(--character-color)] border-l-4 border-[var(--character-color)]' 
                      : 'hover:bg-gray-700 hover:text-[var(--character-color)]'
                    }`}
                >
                  {character.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
