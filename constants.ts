import { type SpriteData } from './types';

const genericFrames = {
  breathe1: { name: "Breathe 1", prompt: "Make the character breathe in, expanding the chest slightly forward." },
  breathe2: { name: "Breathe 2", prompt: "Make the character breathe out, contracting the chest slightly." },
  walk1: { name: "Walk 1", prompt: "Make the character take a step forward with their left leg." },
  walk2: { name: "Walk 2", prompt: "Make the character take a step backward with their left leg." },
  attack1: { name: "Attack 1", prompt: "Make the character wind up for an attack, gathering power." },
  attack2: { name: "Attack 2", prompt: "Make the character unleash their attack with full force while keeping the same color background." },
  flinch1: { name: "Flinch 1", prompt: "Make the character recoil from being hit by an attack." },
  flinch2: { name: "Flinch 2", prompt: "Make the character recover their stance after being hit." }
};

export const SPRITE_DATA: SpriteData = {
  factions: [
    {
      name: "DOTO FACTION",
      characters: [
        {
          id: "pock",
          name: "Pock (Sky Blue Wizard)",
          color: "#87CEEB",
          frames: [
            { name: "Base/Idle", prompt: "Create a 32x32 pixel art sprite of a wizard character facing right in side view. The wizard wears flowing sky blue robes with light blue highlights. They have a pointed wizard hat and hold a small glowing orb. The character has a calm, centered stance. Use a limited color palette with sky blue (#87CEEB) as the primary color. Use a solid magenta screen background (#FF00FF). Retro 16-bit JRPG style." },
            genericFrames.breathe1,
            genericFrames.breathe2,
            genericFrames.walk1,
            genericFrames.walk2,
            genericFrames.attack1,
            genericFrames.attack2,
            genericFrames.flinch1,
            genericFrames.flinch2,
          ]
        },
        {
          id: "rubock",
          name: "Rubock (Green Telekinetic)",
          color: "#00FF00",
          frames: [
            { name: "Base/Idle", prompt: "Create a 32x32 pixel art sprite of a telekinetic wizard facing right in side view. Wears flowing green robes (pure green #00FF00) with darker green shadows. Has an intense, focused expression. Arms slightly raised with hands showing telekinetic power (fingers spread). Small objects or energy particles floating around them. Use a solid magenta screen background (#FF00FF). 16-bit JRPG style." },
            genericFrames.breathe1,
            genericFrames.breathe2,
            genericFrames.walk1,
            genericFrames.walk2,
            genericFrames.attack1,
            genericFrames.attack2,
            genericFrames.flinch1,
            genericFrames.flinch2,
          ]
        },
        {
          id: "bloodrotter",
          name: "Bloodrotter (Dark Red Berserker)",
          color: "#7F0000",
          frames: [
            { name: "Base/Idle", prompt: "Create a 32x32 pixel art sprite of a blood-powered warrior facing right in side view. Wears tattered dark red armor (#7F0000) with blood-red highlights. Muscular build. Holds a jagged crimson blade. Dark red aura emanating from body. standing stance but controlled. Red eyes glowing. Use a solid green screen background (#00FF00). 16-bit style." },
            genericFrames.breathe1,
            genericFrames.breathe2,
            genericFrames.walk1,
            genericFrames.walk2,
            genericFrames.attack1,
            genericFrames.attack2,
            genericFrames.flinch1,
            genericFrames.flinch2,
          ]
        },
         {
          id: "ox",
          name: "Ox (Dark Red Berserker - Bulkier)",
          color: "#800000",
          frames: [
            { name: "Base/Idle", prompt: "Create a 32x32 pixel art sprite of a massive berserker warrior facing right in side view. Extremely muscular and bulky build. Wears minimal dark red armor (#800000) with bull motifs. Carries a huge two-handed axe. Intimidating presence. Calm before the storm expression. Red-brown skin tone. Use a solid green screen background (#00FF00). 16-bit style." },
            genericFrames.breathe1,
            genericFrames.breathe2,
            genericFrames.walk1,
            genericFrames.walk2,
            genericFrames.attack1,
            genericFrames.attack2,
            genericFrames.flinch1,
            genericFrames.flinch2,
          ]
        }
      ]
    },
    {
      name: "WIZERDS FACTION",
      characters: [
        {
          id: "starcall",
          name: "Starcall (Cyan Cosmic Mage)",
          color: "#00FFFF",
          frames: [
            { name: "Base/Idle", prompt: "Create a 32x32 pixel art sprite of a cosmic wizard facing right in side view. Wears flowing cyan robes (#00FFFF) with star patterns. Has an ethereal, otherworldly appearance. Staff topped with a glowing star. Small stars and cosmic particles orbiting around them. Serene but powerful expression. Use a solid magenta screen background (#FF00FF). 16-bit style." },
            genericFrames.breathe1,
            genericFrames.breathe2,
            genericFrames.walk1,
            genericFrames.walk2,
            genericFrames.attack1,
            genericFrames.attack2,
            genericFrames.flinch1,
            genericFrames.flinch2,
          ]
        }
      ]
    },
    {
        name: "ORACLES FACTION",
        characters: [
            {
                id: "gemekaa",
                name: "Gemekaa (Crimson Oracle)",
                color: "#DC143C",
                frames: [
                    { name: "Base/Idle", prompt: "Create a 32x32 pixel art sprite of a mysterious oracle facing right in side view. Wears flowing crimson robes (#DC143C) with mystical patterns. Has blindfold or closed eyes (seeing through prophecy). Holds a crystal orb showing swirling visions. Enigmatic expression. Use a solid green screen background (#00FF00). 16-bit style." },
                    genericFrames.breathe1,
                    genericFrames.breathe2,
                    genericFrames.walk1,
                    genericFrames.walk2,
                    genericFrames.attack1,
                    genericFrames.attack2,
                    genericFrames.flinch1,
                    genericFrames.flinch2,
                ]
            }
        ]
    },
    {
        name: "SAVIOURS FACTION",
        characters: [
            {
                id: "ares",
                name: "Ares (Red Warrior)",
                color: "#FF0000",
                frames: [
                    { name: "Base/Idle", prompt: "Create a 32x32 pixel art sprite of a heroic warrior facing right in side view. Wears red armor (#FF0000) with golden accents. Muscular but agile build. Dual-wields swords (one on shoulder, one lowered). Cape flowing behind. Heroic stance. Confident expression. Use a solid green screen background (#00FF00). 16-bit style." },
                    genericFrames.breathe1,
                    genericFrames.breathe2,
                    genericFrames.walk1,
                    genericFrames.walk2,
                    genericFrames.attack1,
                    genericFrames.attack2,
                    genericFrames.flinch1,
                    genericFrames.flinch2,
                ]
            }
        ]
    },
    {
        name: "MECHANICS FACTION",
        characters: [
            {
                id: "flappy",
                name: "Flappy (Green Goblin Engineer)",
                color: "#008000",
                frames: [
                    { name: "Base/Idle", prompt: "Create a 32x32 pixel art sprite of a goblin engineer facing right in side view. Wears green (#008000) mechanic overalls with tool belt. Short stature, large pointed ears. Holds a wrench or mechanical device. Goggles pushed up on forehead. Mischievous grin. Oil stains on clothing. Use a solid magenta screen background (#FF00FF). 16-bit style." },
                    genericFrames.breathe1,
                    genericFrames.breathe2,
                    genericFrames.walk1,
                    genericFrames.walk2,
                    genericFrames.attack1,
                    genericFrames.attack2,
                    genericFrames.flinch1,
                    genericFrames.flinch2,
                ]
            }
        ]
    }
  ]
};