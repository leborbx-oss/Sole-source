import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { applyPhysics, checkPlayerBallCollision, checkScoring, Vector3 } from '../../lib/physics';

interface GameState {
  playerPos: [number, number, number];
  ballPos: [number, number, number];
  score: number;
}

const GameContext = createContext<GameState | null>(null);

export const useGameState = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGameState must be used within a GameProvider');
  return context;
};

const GameLoop: React.FC<{ updateLogic: (dt: number) => void; fixedTimeStep: number }> = ({ updateLogic, fixedTimeStep }) => {
  const accumulatorRef = useRef(0);
  useFrame((_state, delta) => {
    const frameTime = Math.min(delta, 0.25);
    accumulatorRef.current += frameTime;
    while (accumulatorRef.current >= fixedTimeStep) {
      updateLogic(fixedTimeStep);
      accumulatorRef.current -= fixedTimeStep;
    }
  });
  return null;
};

interface GameEngineProps {
    children: React.ReactNode;
}

const LogicContext = createContext<{ updateLogic: (dt: number) => void; fixedTimeStep: number } | null>(null);

export const GameEngine: React.FC<GameEngineProps> = ({ children }) => {
  const fixedTimeStep = 0.00416; // 240 UPS logic (Stable & High Precision)

  const [state, setState] = useState<GameState>({
    playerPos: [0, 0, 0],
    ballPos: [0, 1, -2],
    score: 0
  });

  // Persistent physics state
  const playerPosRef = useRef<Vector3>({ x: 0, y: 0, z: 0 });
  const playerVelRef = useRef<Vector3>({ x: 0, y: 0, z: 0 });

  const ballPosRef = useRef<Vector3>({ x: 0, y: 1, z: -2 });
  const ballVelRef = useRef<Vector3>({ x: 0, y: 0, z: 0 });

  const scoreRef = useRef(0);
  const keys = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => (keys.current[e.code] = true);
    const onKeyUp = (e: KeyboardEvent) => (keys.current[e.code] = false);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const updateLogic = (dt: number) => {
    // Input handling
    const speed = 5;
    playerVelRef.current.x = 0;
    playerVelRef.current.z = 0;

    if (keys.current['KeyW']) playerVelRef.current.z -= speed;
    if (keys.current['KeyS']) playerVelRef.current.z += speed;
    if (keys.current['KeyA']) playerVelRef.current.x -= speed;
    if (keys.current['KeyD']) playerVelRef.current.x += speed;

    // Movement (simple kinematic integration for player)
    playerPosRef.current.x += playerVelRef.current.x * dt;
    playerPosRef.current.z += playerVelRef.current.z * dt;

    // Ball physics
    applyPhysics(ballPosRef.current, ballVelRef.current, dt);

    // Collision (Handling shooting)
    checkPlayerBallCollision(
        playerPosRef.current,
        ballPosRef.current,
        ballVelRef.current,
        keys.current['Space']
    );

    // Scoring
    if (checkScoring(ballPosRef.current, ballVelRef.current)) {
        scoreRef.current += 3;
        // Reset ball to center for next play
        ballPosRef.current = { x: 0, y: 3, z: 0 };
        ballVelRef.current = { x: 0, y: 0, z: 0 };
    }

    // Update state for rendering
    setState({
        playerPos: [playerPosRef.current.x, playerPosRef.current.y, playerPosRef.current.z],
        ballPos: [ballPosRef.current.x, ballPosRef.current.y, ballPosRef.current.z],
        score: scoreRef.current,
    });
  };

  return (
    <GameContext.Provider value={state}>
        <LogicContext.Provider value={{ updateLogic, fixedTimeStep }}>
            {children}
        </LogicContext.Provider>
    </GameContext.Provider>
  );
};

// This needs to be placed inside the Canvas
export const GameLoopProxy: React.FC = () => {
    const context = useContext(LogicContext);
    if (!context) return null;
    return <GameLoop updateLogic={context.updateLogic} fixedTimeStep={context.fixedTimeStep} />;
}
