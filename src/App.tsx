import React, { useEffect, useMemo, useState } from 'react';

type ServerId = 'normal' | 'master' | 'free';
type Phase = 'select' | 'studio' | 'runway' | 'results';
type Category = 'tops' | 'bottoms' | 'dresses' | 'jackets' | 'shoes' | 'hair' | 'makeup' | 'faces' | 'accessories' | 'jewelry' | 'bags' | 'hats' | 'props';

type WardrobeItem = {
  id: string;
  name: string;
  category: Category;
  texture: string;
  tags: string[];
  value: number;
  premium?: boolean;
};

type Outfit = Record<Category, string | null>;
type Competitor = { id: string; name: string; personality: string; skill: number; outfit: Outfit; score: number; isPlayer?: boolean };

type SaveData = {
  stars: number;
  streak: number;
  badgeUnlocked: boolean;
  savedOutfits: { name: string; outfit: Outfit; createdAt: string }[];
  achievements: string[];
  dailyRewardDate?: string;
};

const categories: Category[] = ['tops', 'bottoms', 'dresses', 'jackets', 'shoes', 'hair', 'makeup', 'faces', 'accessories', 'jewelry', 'bags', 'hats', 'props'];

const emptyOutfit = (): Outfit => Object.fromEntries(categories.map((category) => [category, null])) as Outfit;

const normalThemes = ['Celebrity Gala', 'Beach Vacation', 'Y2K Fashion', 'Fantasy Princess', 'Business Executive', 'Rockstar', 'Streetwear', 'Futuristic Fashion'];
const masterThemes = ['Avant-Garde Couture', 'Gothic Royalty', 'Cyberpunk Elite', 'Met Gala Inspired', 'High Fashion Editorial', 'Luxury Runway', 'Dark Fantasy', 'Futuristic Royalty'];

const rankTiers = [
  { min: 0, max: 10, label: 'Beginner Stylist' },
  { min: 11, max: 25, label: 'Fashion Explorer' },
  { min: 26, max: 50, label: 'Trend Setter' },
  { min: 51, max: 100, label: 'Rising Designer' },
  { min: 101, max: 200, label: 'Elite Designer' },
  { min: 201, max: 350, label: 'Runway Star' },
  { min: 351, max: 500, label: 'Fashion Icon' },
  { min: 501, max: 750, label: 'Couture Master' },
  { min: 751, max: 1000, label: 'Supermodel Legend' },
  { min: 1001, max: Number.POSITIVE_INFINITY, label: 'Ultimate Fashion Royalty' },
];

const wardrobe: WardrobeItem[] = [
  { id: 'silk-blouse', name: 'Ivory Silk Blouse', category: 'tops', texture: 'silk', tags: ['Celebrity Gala', 'Business Executive', 'Luxury Runway', 'Met Gala Inspired'], value: 7 },
  { id: 'denim-corset', name: 'Stitched Denim Corset', category: 'tops', texture: 'denim', tags: ['Y2K Fashion', 'Streetwear'], value: 6 },
  { id: 'mesh-top', name: 'Cyber Mesh Top', category: 'tops', texture: 'metallic', tags: ['Cyberpunk Elite', 'Futuristic Fashion', 'Futuristic Royalty'], value: 8 },
  { id: 'cotton-tee', name: 'Layered Cotton Tee', category: 'tops', texture: 'cotton', tags: ['Streetwear', 'Beach Vacation'], value: 5 },
  { id: 'tailored-trousers', name: 'Tailored Wool Trousers', category: 'bottoms', texture: 'cotton', tags: ['Business Executive', 'High Fashion Editorial'], value: 6 },
  { id: 'leather-pants', name: 'Black Leather Pants', category: 'bottoms', texture: 'leather', tags: ['Rockstar', 'Gothic Royalty', 'Dark Fantasy'], value: 7 },
  { id: 'y2k-skirt', name: 'Low-Rise Denim Skirt', category: 'bottoms', texture: 'denim', tags: ['Y2K Fashion', 'Streetwear'], value: 6 },
  { id: 'gaga-dress', name: 'Luxury Gaga Dress', category: 'dresses', texture: 'crystal', tags: ['Celebrity Gala', 'Met Gala Inspired', 'Avant-Garde Couture', 'Luxury Runway'], value: 13, premium: true },
  { id: 'velvet-gown', name: 'Midnight Velvet Gown', category: 'dresses', texture: 'velvet', tags: ['Gothic Royalty', 'Dark Fantasy', 'Celebrity Gala'], value: 9 },
  { id: 'lace-princess', name: 'Lace Princess Gown', category: 'dresses', texture: 'lace', tags: ['Fantasy Princess', 'Futuristic Royalty'], value: 8 },
  { id: 'satin-slip', name: 'Pearl Satin Slip', category: 'dresses', texture: 'satin', tags: ['Beach Vacation', 'High Fashion Editorial'], value: 7 },
  { id: 'moto-jacket', name: 'Croc Leather Moto', category: 'jackets', texture: 'leather', tags: ['Rockstar', 'Streetwear', 'Gothic Royalty'], value: 8 },
  { id: 'couture-cape', name: 'Architectural Couture Cape', category: 'jackets', texture: 'velvet', tags: ['Avant-Garde Couture', 'Met Gala Inspired', 'Dark Fantasy'], value: 10 },
  { id: 'chrome-bolero', name: 'Chrome Light Bolero', category: 'jackets', texture: 'metallic', tags: ['Cyberpunk Elite', 'Futuristic Fashion', 'Futuristic Royalty'], value: 9 },
  { id: 'diamond-heels', name: 'Diamond Strap Heels', category: 'shoes', texture: 'metallic', tags: ['Celebrity Gala', 'Luxury Runway', 'Met Gala Inspired'], value: 7 },
  { id: 'combat-boots', name: 'Platform Combat Boots', category: 'shoes', texture: 'leather', tags: ['Rockstar', 'Gothic Royalty', 'Cyberpunk Elite'], value: 7 },
  { id: 'beach-sandals', name: 'Resort Shell Sandals', category: 'shoes', texture: 'satin', tags: ['Beach Vacation'], value: 5 },
  { id: 'platinum-waves', name: 'Platinum Hollywood Waves', category: 'hair', texture: 'silk', tags: ['Celebrity Gala', 'Luxury Runway'], value: 6 },
  { id: 'gothic-bob', name: 'Gothic Razor Bob', category: 'hair', texture: 'velvet', tags: ['Gothic Royalty', 'Dark Fantasy', 'Rockstar'], value: 7 },
  { id: 'neon-ponytail', name: 'Neon Fiber Ponytail', category: 'hair', texture: 'metallic', tags: ['Cyberpunk Elite', 'Futuristic Fashion'], value: 8 },
  { id: 'gloss-makeup', name: 'Gloss Editorial Makeup', category: 'makeup', texture: 'satin', tags: ['High Fashion Editorial', 'Celebrity Gala', 'Beach Vacation'], value: 6 },
  { id: 'gothic-makeup', name: 'Smoked Gothic Makeup', category: 'makeup', texture: 'velvet', tags: ['Gothic Royalty', 'Dark Fantasy'], value: 8 },
  { id: 'chrome-makeup', name: 'Chrome Graphic Liner', category: 'makeup', texture: 'metallic', tags: ['Cyberpunk Elite', 'Futuristic Fashion', 'Avant-Garde Couture'], value: 8 },
  { id: 'soft-face', name: 'Soft Glam Face', category: 'faces', texture: 'satin', tags: ['Celebrity Gala', 'Fantasy Princess', 'Business Executive'], value: 5 },
  { id: 'gothic-male-face', name: 'Gothic Male Face', category: 'faces', texture: 'velvet', tags: ['Gothic Royalty', 'Dark Fantasy', 'Rockstar'], value: 11, premium: true },
  { id: 'visor', name: 'Hologram Visor', category: 'accessories', texture: 'metallic', tags: ['Cyberpunk Elite', 'Futuristic Fashion'], value: 8 },
  { id: 'silk-scarf', name: 'Printed Silk Scarf', category: 'accessories', texture: 'silk', tags: ['Beach Vacation', 'Business Executive'], value: 5 },
  { id: 'crystal-choker', name: 'Crystal Choker', category: 'jewelry', texture: 'crystal', tags: ['Gothic Royalty', 'Celebrity Gala', 'Luxury Runway'], value: 7 },
  { id: 'gold-cuffs', name: 'Brushed Gold Cuffs', category: 'jewelry', texture: 'metallic', tags: ['Luxury Runway', 'Met Gala Inspired', 'Futuristic Royalty'], value: 7 },
  { id: 'micro-bag', name: 'Patent Micro Bag', category: 'bags', texture: 'leather', tags: ['Y2K Fashion', 'Celebrity Gala', 'High Fashion Editorial'], value: 6 },
  { id: 'executive-tote', name: 'Executive Leather Tote', category: 'bags', texture: 'leather', tags: ['Business Executive'], value: 6 },
  { id: 'tiara', name: 'Moonstone Tiara', category: 'hats', texture: 'crystal', tags: ['Fantasy Princess', 'Futuristic Royalty', 'Gothic Royalty'], value: 7 },
  { id: 'bucket-hat', name: 'Monogram Bucket Hat', category: 'hats', texture: 'denim', tags: ['Y2K Fashion', 'Streetwear', 'Beach Vacation'], value: 5 },
  { id: 'guitar', name: 'Crystal Electric Guitar', category: 'props', texture: 'metallic', tags: ['Rockstar', 'Met Gala Inspired'], value: 8 },
  { id: 'rose', name: 'Black Velvet Rose', category: 'props', texture: 'velvet', tags: ['Gothic Royalty', 'Dark Fantasy', 'Fantasy Princess'], value: 6 },
  { id: 'camera', name: 'Editorial Camera', category: 'props', texture: 'leather', tags: ['High Fashion Editorial', 'Free Play'], value: 5 },
];

const npcNames = ['Valentina Chrome', 'Mina Velvet', 'Jules Atelier', 'Sasha Nova', 'Kit Monroe', 'Aria Lace', 'Nico Saint', 'Bianca Volt'];
const personalities = ['trend obsessed', 'minimalist judge', 'dramatic couture lover', 'streetwear purist', 'luxury maximalist', 'editorial risk taker'];

const defaultSave: SaveData = { stars: 0, streak: 0, badgeUnlocked: false, savedOutfits: [], achievements: [], dailyRewardDate: undefined };

function loadSave(): SaveData {
  const raw = localStorage.getItem('fashionRoyaleSave');
  return raw ? { ...defaultSave, ...JSON.parse(raw) } : defaultSave;
}

function pick<T,>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function rankForStars(stars: number) {
  return rankTiers.find((tier) => stars >= tier.min && stars <= tier.max) ?? rankTiers[0];
}

function itemById(id: string | null) {
  return wardrobe.find((item) => item.id === id);
}

function scoreOutfit(outfit: Outfit, theme: string, skill = 0.75) {
  const chosen = Object.values(outfit).map(itemById).filter(Boolean) as WardrobeItem[];
  const coverage = chosen.length * 1.8;
  const themeHits = chosen.filter((item) => item.tags.includes(theme)).length * 7;
  const textureBonus = new Set(chosen.map((item) => item.texture)).size * 1.4;
  const quality = chosen.reduce((sum, item) => sum + item.value, 0) * skill;
  const judgeVariance = Math.random() * 7;
  return Math.round(Math.min(100, coverage + themeHits + textureBonus + quality + judgeVariance));
}

function buildNpcOutfit(theme: string, skill: number, unlockedPremium: boolean): Outfit {
  const outfit = emptyOutfit();
  categories.forEach((category) => {
    if (Math.random() < 0.13 && category !== 'shoes' && category !== 'hair') return;
    const pool = wardrobe.filter((item) => item.category === category && (!item.premium || unlockedPremium));
    const themed = pool.filter((item) => item.tags.includes(theme));
    outfit[category] = (Math.random() < skill && themed.length ? pick(themed) : pick(pool))?.id ?? null;
  });
  return outfit;
}

function serverConfig(server: ServerId | null) {
  if (server === 'master') return { label: 'Master Server', timer: 120, difficulty: 0.94, npcCount: 6, rewardBoost: 2, themes: masterThemes };
  if (server === 'free') return { label: 'Free Play Server', timer: 0, difficulty: 0.55, npcCount: 8, rewardBoost: 0, themes: ['Free Play'] };
  return { label: 'Normal Server', timer: 120, difficulty: 0.72, npcCount: 5, rewardBoost: 0, themes: normalThemes };
}

function App() {
  const [save, setSave] = useState<SaveData>(loadSave);
  const [phase, setPhase] = useState<Phase>('select');
  const [server, setServer] = useState<ServerId | null>(null);
  const [theme, setTheme] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [activeCategory, setActiveCategory] = useState<Category>('dresses');
  const [outfit, setOutfit] = useState<Outfit>(emptyOutfit);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [runwayIndex, setRunwayIndex] = useState(0);
  const [toast, setToast] = useState('Welcome to Fashion Royale');
  const [musicOn, setMusicOn] = useState(false);

  const config = serverConfig(server);
  const unlockedPremium = save.stars > 35;
  const rank = rankForStars(save.stars);
  const filteredWardrobe = wardrobe.filter((item) => item.category === activeCategory && (!item.premium || unlockedPremium));
  const selectedItems = useMemo(() => Object.values(outfit).map(itemById).filter(Boolean) as WardrobeItem[], [outfit]);

  useEffect(() => {
    localStorage.setItem('fashionRoyaleSave', JSON.stringify(save));
  }, [save]);

  useEffect(() => {
    if (phase !== 'studio' || server === 'free' || timeLeft <= 0) return;
    const timer = window.setInterval(() => setTimeLeft((time) => time - 1), 1000);
    return () => window.clearInterval(timer);
  }, [phase, server, timeLeft]);

  useEffect(() => {
    if (phase === 'studio' && server !== 'free' && timeLeft === 0) beginRunway();
  }, [timeLeft]);

  useEffect(() => {
    if (phase !== 'runway') return;
    const timer = window.setInterval(() => {
      setRunwayIndex((index) => {
        if (index >= competitors.length - 1) {
          window.clearInterval(timer);
          window.setTimeout(() => setPhase('results'), 900);
          return index;
        }
        return index + 1;
      });
    }, 3600);
    return () => window.clearInterval(timer);
  }, [phase, competitors.length]);

  function startServer(nextServer: ServerId) {
    const nextConfig = serverConfig(nextServer);
    const nextTheme = nextServer === 'free' ? 'Free Play' : pick(nextConfig.themes);
    setServer(nextServer);
    setTheme(nextTheme);
    setTimeLeft(nextConfig.timer);
    setOutfit(emptyOutfit());
    setCompetitors([]);
    setRunwayIndex(0);
    setPhase('studio');
    setToast(nextServer === 'free' ? 'Free Play opened: no timers, save looks and explore.' : `${nextTheme} theme assigned. Style before the runway!`);
  }

  function selectItem(item: WardrobeItem) {
    setOutfit((current) => ({ ...current, [item.category]: current[item.category] === item.id ? null : item.id }));
  }

  function generateCompetitors() {
    return Array.from({ length: config.npcCount }, (_, index) => {
      const skill = Math.min(0.99, Math.max(0.45, config.difficulty + (Math.random() - 0.5) * 0.18));
      const npcOutfit = buildNpcOutfit(theme, skill, unlockedPremium);
      return {
        id: `npc-${index}`,
        name: npcNames[index] ?? `NPC Stylist ${index + 1}`,
        personality: pick(personalities),
        skill,
        outfit: npcOutfit,
        score: scoreOutfit(npcOutfit, theme, skill),
      };
    });
  }

  function beginRunway() {
    const playerScore = scoreOutfit(outfit, theme, server === 'master' ? 0.98 : 0.9);
    const allCompetitors = [
      { id: 'player', name: 'You', personality: 'rising fashion royal', skill: 1, outfit, score: playerScore, isPlayer: true },
      ...generateCompetitors(),
    ].sort((a, b) => b.score - a.score);
    setCompetitors(allCompetitors);
    setRunwayIndex(0);
    setPhase('runway');
    setToast('Runway show live: judges are scoring texture, theme accuracy, and drama.');
  }

  function claimResults() {
    const place = competitors.findIndex((competitor) => competitor.isPlayer) + 1;
    const base = place === 1 ? 5 : place === 2 ? 3 : place === 3 ? 2 : 1;
    const streak = place === 1 ? save.streak + 1 : 0;
    const streakBonus = streak >= 3 ? 2 : 0;
    const earned = base + streakBonus + (server === 'master' && place <= 3 ? config.rewardBoost : 0);
    const nextStars = save.stars + earned;
    const newAchievements = new Set(save.achievements);
    if (place === 1) newAchievements.add('Runway Winner');
    if (server === 'master' && place <= 3) newAchievements.add('Master Podium');
    if (nextStars > 35) newAchievements.add('Fashion Elite');
    setSave((current) => ({ ...current, stars: nextStars, streak, badgeUnlocked: nextStars > 35, achievements: [...newAchievements] }));
    setToast(`Placed #${place}. Earned ${earned} stars${streakBonus ? ' including a streak bonus' : ''}.`);
    setPhase('select');
  }

  function saveOutfit() {
    const name = `Look ${save.savedOutfits.length + 1} - ${theme}`;
    setSave((current) => ({ ...current, savedOutfits: [{ name, outfit, createdAt: new Date().toLocaleString() }, ...current.savedOutfits].slice(0, 12) }));
    setToast(`${name} saved to your local wardrobe.`);
  }

  function loadOutfit(saved: SaveData['savedOutfits'][number]) {
    setOutfit(saved.outfit);
    setToast(`${saved.name} loaded.`);
  }

  function claimDailyReward() {
    const today = new Date().toISOString().slice(0, 10);
    if (save.dailyRewardDate === today) {
      setToast('Daily reward already claimed today.');
      return;
    }
    setSave((current) => ({ ...current, stars: current.stars + 2, dailyRewardDate: today, achievements: [...new Set([...current.achievements, 'Daily Devotee'])] }));
    setToast('Daily reward claimed: +2 stars.');
  }

  const currentRunway = competitors[runwayIndex];
  const playerPlace = competitors.findIndex((competitor) => competitor.isPlayer) + 1;

  return (
    <div className="game-shell">
      <div className="ambient-orb orb-one" />
      <div className="ambient-orb orb-two" />
      <header className="topbar">
        <div>
          <p className="eyebrow">Competitive runway styling game</p>
          <h1>Fashion Royale</h1>
        </div>
        <div className="player-card">
          <span>{rank.label}</span>
          <strong>★ {save.stars}</strong>
          {save.badgeUnlocked && <em>Fashion Elite</em>}
        </div>
      </header>

      <main>
        {phase === 'select' && (
          <section className="screen server-screen">
            <div className="hero-panel glass">
              <p className="eyebrow">Luxury studio access</p>
              <h2>Choose your server</h2>
              <p>Style realistic PBR-inspired fabrics, compete with AI NPC stylists, walk the animated catwalk, and climb from Beginner Stylist to Ultimate Fashion Royalty.</p>
              <div className="stat-grid">
                <button onClick={claimDailyReward}>Daily Reward +2★</button>
                <button onClick={() => setMusicOn((value) => !value)}>{musicOn ? 'Pause Lounge Music' : 'Play Lounge Music'}</button>
                <button onClick={() => setToast('Trading is disabled. Anti-cheat validates local runway rewards only after judging.')}>Anti-cheat / Trading Info</button>
              </div>
            </div>
            <div className="server-grid">
              <ServerCard title="Normal Server" subtitle="Medium AI, random theme, 2-minute timer" themes={normalThemes} onClick={() => startServer('normal')} />
              <ServerCard title="Master Server" subtitle="Elite AI, advanced themes, higher rewards" themes={masterThemes} onClick={() => startServer('master')} featured />
              <ServerCard title="Free Play Server" subtitle="No timer, photoshoots, roleplay, outfit saves" themes={['Luxury runway zone', 'Fashion studio', 'Photo area']} onClick={() => startServer('free')} />
            </div>
          </section>
        )}

        {phase === 'studio' && (
          <section className="screen studio-layout">
            <aside className="glass control-panel">
              <div className="server-status">
                <span>{config.label}</span>
                <strong>{theme}</strong>
                <b>{server === 'free' ? '∞ Free Play' : `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, '0')}`}</b>
              </div>
              <div className="category-list">
                {categories.map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}
              </div>
              <button className="primary" onClick={beginRunway}>{server === 'free' ? 'Host Photo Runway' : 'Start Runway Now'}</button>
              <button onClick={saveOutfit}>Save Outfit</button>
              <button onClick={() => startServer(server ?? 'normal')}>New Theme / Reset</button>
              <button onClick={() => setPhase('select')}>Back to Servers</button>
            </aside>

            <CharacterStage outfit={outfit} name="Your Model" subtitle={`${selectedItems.length} items styled`} />

            <aside className="glass wardrobe-panel">
              <div className="panel-heading">
                <span>{activeCategory}</span>
                <small>{unlockedPremium ? 'Exclusive rewards unlocked' : 'Earn more than 35 stars for Fashion Elite rewards'}</small>
              </div>
              <div className="item-grid">
                {filteredWardrobe.map((item) => (
                  <button key={item.id} className={`item-card ${outfit[item.category] === item.id ? 'selected' : ''}`} onClick={() => selectItem(item)}>
                    <span className={`texture-swatch ${item.texture}`} />
                    <strong>{item.name}</strong>
                    <small>{item.texture} · +{item.value}</small>
                    {item.tags.includes(theme) && <em>Theme match</em>}
                  </button>
                ))}
              </div>
              <div className="save-list">
                <strong>Saved Looks</strong>
                {save.savedOutfits.length === 0 && <small>No saved outfits yet.</small>}
                {save.savedOutfits.map((saved) => <button key={saved.createdAt} onClick={() => loadOutfit(saved)}>{saved.name}</button>)}
              </div>
            </aside>
          </section>
        )}

        {phase === 'runway' && currentRunway && (
          <section className="screen runway-screen">
            <div className="runway-camera">
              <div className="audience left" />
              <CharacterStage outfit={currentRunway.outfit} name={currentRunway.name} subtitle={`${currentRunway.personality} · score ${currentRunway.score}`} runway />
              <div className="audience right" />
            </div>
            <div className="score-strip">
              {competitors.map((competitor, index) => <span key={competitor.id} className={index === runwayIndex ? 'live' : ''}>#{index + 1} {competitor.name} · {competitor.score}</span>)}
            </div>
          </section>
        )}

        {phase === 'results' && (
          <section className="screen results-screen glass">
            <p className="eyebrow">Runway results</p>
            <h2>{playerPlace <= 3 ? 'Podium Finish!' : 'Judges submitted final scores'}</h2>
            <div className="leaderboard">
              {competitors.map((competitor, index) => <div key={competitor.id} className={competitor.isPlayer ? 'you' : ''}><span>#{index + 1}</span><strong>{competitor.name}</strong><em>{competitor.score} pts</em></div>)}
            </div>
            <button className="primary" onClick={claimResults}>Claim Stars & Continue</button>
          </section>
        )}
      </main>

      <footer className="hud glass">
        <span>{toast}</span>
        <span>Achievements: {save.achievements.length ? save.achievements.join(', ') : 'None yet'}</span>
      </footer>
    </div>
  );
}

function ServerCard({ title, subtitle, themes, onClick, featured = false }: { title: string; subtitle: string; themes: string[]; onClick: () => void; featured?: boolean }) {
  return (
    <button className={`server-card glass ${featured ? 'featured' : ''}`} onClick={onClick}>
      <span>{featured ? 'Exclusive' : 'Open'}</span>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      <small>{themes.slice(0, 4).join(' · ')}</small>
    </button>
  );
}

function CharacterStage({ outfit, name, subtitle, runway = false }: { outfit: Outfit; name: string; subtitle: string; runway?: boolean }) {
  const dress = itemById(outfit.dresses);
  const top = itemById(outfit.tops);
  const bottom = itemById(outfit.bottoms);
  const jacket = itemById(outfit.jackets);
  const shoes = itemById(outfit.shoes);
  const hair = itemById(outfit.hair);
  const makeup = itemById(outfit.makeup);
  const face = itemById(outfit.faces);
  const accessory = itemById(outfit.accessories);
  const jewelry = itemById(outfit.jewelry);
  const hat = itemById(outfit.hats);
  const prop = itemById(outfit.props);

  return (
    <section className={`stage ${runway ? 'runway-walk' : ''}`}>
      <div className="studio-lights" />
      <div className="model-card">
        <div className="model">
          <div className={`hair ${hair?.texture ?? 'silk'}`}>{hat && <span className={`hat ${hat.texture}`} />}</div>
          <div className={`head ${face?.id === 'gothic-male-face' ? 'goth-face' : ''}`}>
            <span className={`makeup ${makeup?.texture ?? 'satin'}`} />
            {jewelry && <span className={`earrings ${jewelry.texture}`} />}
          </div>
          <div className="neck" />
          <div className={`torso ${dress?.texture ?? top?.texture ?? 'cotton'}`}>
            {dress ? <span className={`dress ${dress.texture}`} /> : <span className={`top ${top?.texture ?? 'cotton'}`} />}
            {jacket && <span className={`jacket ${jacket.texture}`} />}
            {accessory && <span className={`accessory ${accessory.texture}`} />}
          </div>
          {!dress && <div className={`hips ${bottom?.texture ?? 'denim'}`} />}
          <div className="legs"><span /><span /></div>
          <div className={`shoes ${shoes?.texture ?? 'leather'}`}><span /><span /></div>
          {prop && <div className={`prop ${prop.texture}`} />}
        </div>
        <div className="reflection" />
      </div>
      <div className="model-caption">
        <strong>{name}</strong>
        <span>{subtitle}</span>
      </div>
    </section>
  );
}

export default App;
