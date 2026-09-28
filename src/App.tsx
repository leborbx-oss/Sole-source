import { useCallback, useEffect, useRef, useState } from 'react';
import { CirclePause, Crosshair, RotateCcw, Zap } from 'lucide-react';

type Point = { x: number; y: number };

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export default function App() {
  const [player, setPlayer] = useState<Point>({ x: 50, y: 69 });
  const [score, setScore] = useState(1240);
  const [webs, setWebs] = useState(18);
  const [combo, setCombo] = useState(3);
  const [paused, setPaused] = useState(false);
  const [message, setMessage] = useState('TAP A BUILDING TO SWING');
  const hold = useRef<null | { x: number; y: number }>(null);

  const move = useCallback((dx: number, dy: number) => {
    if (paused) return;
    setPlayer(p => ({ x: clamp(p.x + dx, 14, 86), y: clamp(p.y + dy, 36, 76) }));
  }, [paused]);

  const swing = useCallback(() => {
    if (paused || webs <= 0) return;
    setWebs(n => n - 1);
    setScore(n => n + 150 * combo);
    setCombo(n => Math.min(n + 1, 9));
    setPlayer(p => ({ x: clamp(p.x + (p.x < 50 ? 11 : -11), 14, 86), y: clamp(p.y - 14, 28, 76) }));
    setMessage('PERFECT SWING! +' + (150 * combo));
    window.setTimeout(() => setMessage('TAP A BUILDING TO SWING'), 1100);
  }, [paused, webs, combo]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (['ArrowUp', 'w', 'W'].includes(e.key)) move(0, -3);
      if (['ArrowDown', 's', 'S'].includes(e.key)) move(0, 3);
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) move(-3, 0);
      if (['ArrowRight', 'd', 'D'].includes(e.key)) move(3, 0);
      if (e.key === ' ') { e.preventDefault(); swing(); }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [move, swing]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!paused) setWebs(n => Math.min(18, n + 1));
    }, 3500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const startHold = (x: number, y: number) => { hold.current = { x, y }; };
  const drag = (x: number, y: number) => {
    if (!hold.current) return;
    move((x - hold.current.x) / 24, (y - hold.current.y) / 24);
    hold.current = { x, y };
  };

  return (
    <main className="game-shell" onPointerMove={e => drag(e.clientX, e.clientY)} onPointerUp={() => hold.current = null}>
      <section className="game" onPointerDown={e => startHold(e.clientX, e.clientY)}>
        <div className="sun" /><div className="cloud cloud-a" /><div className="cloud cloud-b" />
        <div className="topbar">
          <div className="brand"><span className="brand-mark">✦</span><div><b>SPIDER</b><strong>VERSE</strong></div></div>
          <button className="pause" aria-label="Pause game" onClick={() => setPaused(p => !p)}>{paused ? <Zap size={19}/> : <CirclePause size={21}/>}</button>
        </div>
        <div className="hud"><div><small>SCORE</small><b>{score.toLocaleString()}</b></div><div><small>WEB FLUID</small><span className="web-fluid">{Array.from({length: 6}, (_, i) => <i key={i} className={i < Math.ceil(webs / 3) ? 'full' : ''}/>)}</span></div><div><small>COMBO</small><b className="combo">x{combo}</b></div></div>

        <div className="skyline far">{[16,22,13,28,19,31,18,25,15].map((h,i) => <div key={i} style={{height: `${h}%`}} />)}</div>
        <div className="skyline near">{[39,28,49,34,56,31,43].map((h,i) => <div key={i} className={i===3?'tower':''} style={{height: `${h}%`}} />)}</div>
        <button className="building building-left" onClick={swing} aria-label="Swing left"><span className="windows" /></button>
        <button className="building building-right" onClick={swing} aria-label="Swing right"><span className="windows" /></button>
        <button className="building building-center" onClick={swing} aria-label="Swing center"><span className="windows" /></button>
        <div className="web-line one" /><div className="web-line two" />
        <div className="spider" style={{ left: `${player.x}%`, top: `${player.y}%` }}><span className="head"><i/><i/></span><span className="body"/><span className="leg l1"/><span className="leg l2"/><span className="leg l3"/><span className="leg l4"/></div>
        <div className="mission"><Crosshair size={16}/><span>{message}</span></div>
        {paused && <div className="pause-panel"><h2>PAUSED</h2><button onClick={() => setPaused(false)}>RESUME</button><button onClick={() => {setScore(0);setCombo(1);setWebs(18);setPlayer({x:50,y:69});}}><RotateCcw size={16}/> RESTART</button></div>}
        <div className="controls"><button onClick={() => move(-5, 0)}>‹</button><button className="swing-button" onClick={swing}><span>SWING</span><em>{webs}</em></button><button onClick={() => move(5, 0)}>›</button></div>
        <p className="tip">DRAG TO DODGE &nbsp;•&nbsp; TAP BUILDINGS TO WEB-SWING</p>
      </section>
    </main>
  );
}
