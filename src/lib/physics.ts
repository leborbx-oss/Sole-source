export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export const GRAVITY = -9.81;
export const BALL_RADIUS = 0.12;

export const applyPhysics = (
  pos: Vector3,
  vel: Vector3,
  dt: number,
  onFloorCollision?: () => void
) => {
    // 1. Apply gravity
    vel.y += GRAVITY * dt;

    // 2. Update position
    pos.x += vel.x * dt;
    pos.y += vel.y * dt;
    pos.z += vel.z * dt;

    // 3. Floor collision
    if (pos.y < BALL_RADIUS) {
        pos.y = BALL_RADIUS;
        vel.y = Math.abs(vel.y) * 0.8; // Bounciness factor
        if (onFloorCollision) onFloorCollision();
    }
};

export const checkPlayerBallCollision = (
    playerPos: Vector3,
    ballPos: Vector3,
    ballVel: Vector3,
    isShooting: boolean = false
) => {
    const dx = ballPos.x - playerPos.x;
    const dz = ballPos.z - playerPos.z;
    const dy = ballPos.y - (playerPos.y + 1); // Approx center of mass
    const distSq = dx*dx + dy*dy + dz*dz;
    const playerRadius = 0.5;

    if (distSq < (playerRadius + BALL_RADIUS) ** 2) {
        if (isShooting) {
            // Shoot towards the hoop (at [0, 3.05, -7.5])
            const targetX = 0 - ballPos.x;
            const targetY = 3.5 - ballPos.y; // Higher than rim for arc
            const targetZ = -7.5 - ballPos.z;
            const dist = Math.sqrt(targetX**2 + targetY**2 + targetZ**2);

            ballVel.x = (targetX / dist) * 8;
            ballVel.y = (targetY / dist) * 12;
            ballVel.z = (targetZ / dist) * 8;
        } else {
            // Simple kick-away logic on collision
            const dist = Math.sqrt(distSq);
            ballVel.x += (dx / dist) * 0.5;
            ballVel.z += (dz / dist) * 0.5;
            ballVel.y += 0.2;
        }
    }
};

export const checkScoring = (ballPos: Vector3, ballVel: Vector3): boolean => {
    // Rim is at [0, 3.05, -7.1] approximately
    const rimPos = { x: 0, y: 3.05, z: -7.1 };
    const dx = ballPos.x - rimPos.x;
    const dy = ballPos.y - rimPos.y;
    const dz = ballPos.z - rimPos.z;
    const distSq = dx*dx + dz*dz;

    // Ball passing down through the hoop
    if (distSq < 0.225**2 && Math.abs(dy) < 0.1 && ballVel.y < 0) {
        return true;
    }
    return false;
};
