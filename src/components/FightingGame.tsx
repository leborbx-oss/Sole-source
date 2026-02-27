import React, { useEffect, useRef, useState } from 'react';

const LOGIC_UPS = 10000;
const STEP = 1 / LOGIC_UPS;

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  vx: number;
  vy: number;
  health: number;
  isAttacking: boolean;
  attackTimer: number;
  side: 'left' | 'right';
}

export const FightingGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ups, setUps] = useState(0);
  const [fps, setFps] = useState(0);

  const gameState = useRef({
    p1: {
      x: 100, y: 300, width: 50, height: 100, color: '#39FF14', vx: 0, vy: 0, health: 100, isAttacking: false, attackTimer: 0, side: 'left' as const
    },
    p2: {
      x: 650, y: 300, width: 50, height: 100, color: '#FF0000', vx: 0, vy: 0, health: 100, isAttacking: false, attackTimer: 0, side: 'right' as const
    },
    keys: {} as Record<string, boolean>,
    lastTime: 0,
    accumulator: 0,
    frames: 0,
    updates: 0,
    fpsTimer: 0
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      gameState.current.keys[e.code] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      gameState.current.keys[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationFrameId: number;

    const gameLoop = (time: number) => {
      if (!gameState.current.lastTime) {
        gameState.current.lastTime = time;
      }

      const deltaTime = (time - gameState.current.lastTime) / 1000;
      gameState.current.lastTime = time;
      gameState.current.accumulator += deltaTime;
      gameState.current.fpsTimer += deltaTime;

      // Logic Updates (10,000 per second)
      while (gameState.current.accumulator >= STEP) {
        updateLogic(STEP);
        gameState.current.accumulator -= STEP;
        gameState.current.updates++;
      }

      // Render
      render();
      gameState.current.frames++;

      if (gameState.current.fpsTimer >= 1) {
        setFps(gameState.current.frames);
        setUps(gameState.current.updates);
        gameState.current.frames = 0;
        gameState.current.updates = 0;
        gameState.current.fpsTimer = 0;
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    const updateLogic = (dt: number) => {
      const { p1, p2, keys } = gameState.current;

      if (p1.health <= 0 || p2.health <= 0) return;

      // --- P1 Movement ---
      p1.vx = 0;
      if (keys['KeyA']) p1.vx = -400;
      if (keys['KeyD']) p1.vx = 400;
      if (keys['KeyW'] && p1.y === 280) p1.vy = -800;

      // --- P2 Movement ---
      p2.vx = 0;
      if (keys['ArrowLeft']) p2.vx = -400;
      if (keys['ArrowRight']) p2.vx = 400;
      if (keys['ArrowUp'] && p2.y === 280) p2.vy = -800;

      // Physics
      const GRAVITY = 2000;
      p1.vy += GRAVITY * dt;
      p2.vy += GRAVITY * dt;

      p1.x += p1.vx * dt;
      p1.y += p1.vy * dt;
      p2.x += p2.vx * dt;
      p2.y += p2.vy * dt;

      // Bounds & Ground
      if (p1.y > 280) { p1.y = 280; p1.vy = 0; }
      if (p2.y > 280) { p2.y = 280; p2.vy = 0; }

      p1.x = Math.max(0, Math.min(800 - p1.width, p1.x));
      p2.x = Math.max(0, Math.min(800 - p2.width, p2.x));

      // Orientation
      p1.side = p1.x < p2.x ? 'left' : 'right';
      p2.side = p2.x < p1.x ? 'left' : 'right';

      // --- Combat ---
      // P1 Attack
      if (keys['Space'] && !p1.isAttacking) {
        p1.isAttacking = true;
        p1.attackTimer = 0.1;

        // Hit detection
        const attackX = p1.side === 'left' ? p1.x + p1.width : p1.x - 40;
        const attackRect = { x: attackX, y: p1.y + 20, w: 40, h: 20 };
        if (checkCollision(attackRect, p2)) {
          p2.health = Math.max(0, p2.health - 5);
        }
      }

      if (p1.isAttacking) {
        p1.attackTimer -= dt;
        if (p1.attackTimer <= 0) p1.isAttacking = false;
      }

      // P2 Attack
      if (keys['Enter'] && !p2.isAttacking) {
        p2.isAttacking = true;
        p2.attackTimer = 0.1;

        // Hit detection
        const attackX = p2.side === 'right' ? p2.x - 40 : p2.x + p2.width;
        const attackRect = { x: attackX, y: p2.y + 20, w: 40, h: 20 };
        if (checkCollision(attackRect, p1)) {
          p1.health = Math.max(0, p1.health - 5);
        }
      }

      if (p2.isAttacking) {
        p2.attackTimer -= dt;
        if (p2.attackTimer <= 0) p2.isAttacking = false;
      }
    };

    const checkCollision = (rect: {x: number, y: number, w: number, h: number}, p: Player) => {
      return rect.x < p.x + p.width &&
             rect.x + rect.w > p.x &&
             rect.y < p.y + p.height &&
             rect.y + rect.h > p.y;
    };

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Floor
      ctx.fillStyle = '#333';
      ctx.fillRect(0, 380, canvas.width, 20);

      const { p1, p2 } = gameState.current;

      // Draw P1
      ctx.fillStyle = p1.color;
      ctx.fillRect(p1.x, p1.y, p1.width, p1.height);
      if (p1.isAttacking) {
        ctx.fillStyle = 'white';
        const attackX = p1.side === 'left' ? p1.x + p1.width : p1.x - 40;
        ctx.fillRect(attackX, p1.y + 20, 40, 20);
      }

      // Draw P2
      ctx.fillStyle = p2.color;
      ctx.fillRect(p2.x, p2.y, p2.width, p2.height);
      if (p2.isAttacking) {
        ctx.fillStyle = 'white';
        const attackX = p2.side === 'right' ? p2.x - 40 : p2.x + p2.width;
        ctx.fillRect(attackX, p2.y + 20, 40, 20);
      }

      // Health bars
      ctx.fillStyle = '#444';
      ctx.fillRect(50, 20, 300, 20);
      ctx.fillRect(450, 20, 300, 20);

      ctx.fillStyle = p1.color;
      ctx.fillRect(50, 20, 300 * (p1.health / 100), 20);
      ctx.fillStyle = p2.color;
      ctx.fillRect(450 + (300 * (1 - p2.health / 100)), 20, 300 * (p2.health / 100), 20);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-neutral-900 min-h-[600px] p-4 text-white">
      <div className="mb-4 text-center">
        <h2 className="text-4xl font-display text-neon-green mb-2">10000 FPS FIGHTER</h2>
        <div className="flex gap-4 justify-center text-xs font-mono mb-4">
          <span className="bg-black px-2 py-1 rounded border border-white/10">RENDER: {fps} FPS</span>
          <span className="bg-black px-2 py-1 rounded border border-white/10 text-neon-green">LOGIC: {ups.toLocaleString()} UPS</span>
        </div>
        <p className="text-neutral-400">P1: WASD + Space | P2: Arrows + Enter</p>
      </div>

      <div className="relative border-4 border-white/20 rounded-lg overflow-hidden shadow-2xl">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="bg-black"
        />
        { (gameState.current.p1.health <= 0 || gameState.current.p2.health <= 0) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80">
            <div className="text-center">
              <h3 className="text-6xl font-display mb-4">
                {gameState.current.p1.health <= 0 ? 'PLAYER 2 WINS!' : 'PLAYER 1 WINS!'}
              </h3>
              <button
                onClick={() => window.location.reload()}
                className="bg-white text-black px-8 py-3 font-bold hover:bg-neon-green transition-colors"
              >
                REMATCH
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
