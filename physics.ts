// src/lib/physics.ts

export interface Vector {
  x: number;
  y: number;
}

export interface Ball {
  id: number;
  position: Vector;
  velocity: Vector;
  radius: number;
  mass: number;
  color: string;
  pocketed?: boolean;
}

export const TABLE_WIDTH = 800;
export const TABLE_HEIGHT = 400;
export const BALL_RADIUS = 15;
const FRICTION = 0.985; // Multiplier to slow down balls each frame
const MIN_VELOCITY = 0.1; // Velocity below which a ball is considered stopped

// Pockets definitions (center coordinates and radius for detection)
export const POCKET_RADIUS = 25;
export const POCKETS = [
    { x: 0, y: 0 }, { x: TABLE_WIDTH / 2, y: 0 }, { x: TABLE_WIDTH, y: 0 },
    { x: 0, y: TABLE_HEIGHT }, { x: TABLE_WIDTH / 2, y: TABLE_HEIGHT }, { x: TABLE_WIDTH, y: TABLE_HEIGHT }
];

/**
 * The main physics update function.
 */
export function updatePhysics(balls: Ball[], deltaTime: number): { updatedBalls: Ball[]; pocketedBalls: Ball[] } {
    const pocketedBalls: Ball[] = [];
    const activeBalls = balls.filter(b => !b.pocketed);

    // 1. Update positions based on velocity
    for (const ball of activeBalls) {
        ball.position.x += ball.velocity.x * deltaTime;
        ball.position.y += ball.velocity.y * deltaTime;

        // 2. Apply friction
        ball.velocity.x *= FRICTION;
        ball.velocity.y *= FRICTION;

        // 3. Stop balls with very low velocity
        if (Math.sqrt(ball.velocity.x ** 2 + ball.velocity.y ** 2) < MIN_VELOCITY) {
            ball.velocity = { x: 0, y: 0 };
        }
    }

    // 4. Handle collisions
    handleCollisions(activeBalls);

    // 5. Handle pocketing
    for (const ball of activeBalls) {
        for (const pocket of POCKETS) {
            const dist = Math.sqrt((ball.position.x - pocket.x) ** 2 + (ball.position.y - pocket.y) ** 2);
            if (dist < POCKET_RADIUS && !ball.pocketed) {
                ball.pocketed = true;
                pocketedBalls.push(ball);
                break; // Ball can only be pocketed once
            }
        }
    }

    const remainingBalls = balls.filter(b => !b.pocketed);

    return { updatedBalls: remainingBalls, pocketedBalls };
}


function handleCollisions(balls: Ball[]) {
    // Ball-to-wall collisions
    for (const ball of balls) {
        if (ball.position.x - ball.radius < 0) {
            ball.position.x = ball.radius;
            ball.velocity.x *= -1;
        } else if (ball.position.x + ball.radius > TABLE_WIDTH) {
            ball.position.x = TABLE_WIDTH - ball.radius;
            ball.velocity.x *= -1;
        }

        if (ball.position.y - ball.radius < 0) {
            ball.position.y = ball.radius;
            ball.velocity.y *= -1;
        } else if (ball.position.y + ball.radius > TABLE_HEIGHT) {
            ball.position.y = TABLE_HEIGHT - ball.radius;
            ball.velocity.y *= -1;
        }
    }

    // Ball-to-ball collisions
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const ballA = balls[i];
            const ballB = balls[j];

            if (ballA.pocketed || ballB.pocketed) continue;

            const dx = ballB.position.x - ballA.position.x;
            const dy = ballB.position.y - ballA.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < ballA.radius + ballB.radius) {
                // Collision detected, perform elastic collision response

                // Normal vector
                const nx = dx / distance;
                const ny = dy / distance;

                // Tangent vector
                const tx = -ny;
                const ty = nx;

                // Dot product tangent
                const dpTan1 = ballA.velocity.x * tx + ballA.velocity.y * ty;
                const dpTan2 = ballB.velocity.x * tx + ballB.velocity.y * ty;

                // Dot product normal
                const dpNorm1 = ballA.velocity.x * nx + ballA.velocity.y * ny;
                const dpNorm2 = ballB.velocity.x * nx + ballA.velocity.y * ny;

                // Conservation of momentum in 1D
                const m1 = (dpNorm1 * (ballA.mass - ballB.mass) + 2 * ballB.mass * dpNorm2) / (ballA.mass + ballB.mass);
                const m2 = (dpNorm2 * (ballB.mass - ballA.mass) + 2 * ballA.mass * dpNorm1) / (ballA.mass + ballB.mass);

                // Update velocities
                ballA.velocity.x = tx * dpTan1 + nx * m1;
                ballA.velocity.y = ty * dpTan1 + ny * m1;
                ballB.velocity.x = tx * dpTan2 + nx * m2;
                ballB.velocity.y = ty * dpTan2 + ny * m2;

                // Separate balls to prevent sticking
                const overlap = ballA.radius + ballB.radius - distance;
                ballA.position.x -= overlap * (dx / distance) / 2;
                ballA.position.y -= overlap * (dy / distance) / 2;
                ballB.position.x += overlap * (dx / distance) / 2;
                ballB.position.y += overlap * (dy / distance) / 2;
            }
        }
    }
}
