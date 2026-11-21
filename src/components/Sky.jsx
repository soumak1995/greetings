import { useEffect, useRef } from "react";

const PALETTE = ["#ffd166", "#ff7eb6", "#8ecaff", "#c69bff", "#ff9770"];

function makeRocket(x, H) {
  return {
    x,
    y: H,
    vy: -(H * 0.011 + Math.random() * H * 0.004),
    color: PALETTE[(Math.random() * PALETTE.length) | 0],
    targetY: H * (0.2 + Math.random() * 0.25),
  };
}

function makeSpark(x, y, angle, speed, color) {
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 1,
    color,
  };
}

function burstAt(sparks, x, y, color) {
  const n = 70 + ((Math.random() * 30) | 0);
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n + Math.random() * 0.1;
    const s = 1.6 + Math.random() * 3.2;
    sparks.push(makeSpark(x, y, a, s, Math.random() < 0.7 ? color : "#fff3e6"));
  }
}

/**
 * Animated night sky canvas.
 *
 * variant: "diwali" → warm stars + fireworks rockets
 *          "travel" → cool stars + shooting stars + drifting plane
 * celebrate: set to a truthy "celebration id" (e.g. Date.now()) to fire
 *            a battery of fireworks in the sky.
 */
export default function Sky({ variant = "diwali", celebrate }) {
  const canvasRef = useRef(null);
  const lastCelebrate = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const warm = variant === "diwali";

    const stars = Array.from({ length: 170 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.85,
      r: Math.random() * 1.4 + 0.3,
      tw: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.03,
    }));

    const sparks = [];
    const rockets = [];
    const shooting = [];
    const plane = { x: -60, y: 100, active: true };

    const shootTimer = setInterval(() => {
      if (!warm && Math.random() < 0.5) {
        shooting.push({
          x: Math.random() * W * 0.8,
          y: Math.random() * H * 0.35,
          vx: 6 + Math.random() * 5,
          vy: 2 + Math.random() * 2,
          life: 1,
        });
      }
    }, 1400);

    let raf;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      // stars
      for (const s of stars) {
        s.tw += s.speed;
        ctx.globalAlpha = 0.35 + Math.abs(Math.sin(s.tw)) * 0.55;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = warm ? "#ffe9c4" : "#dceaff";
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (warm) {
        // launch fireworks
        if (Math.random() < 0.02 && rockets.length < 3) {
          rockets.push(makeRocket(W * (0.15 + Math.random() * 0.7), H));
        }
        for (let i = rockets.length - 1; i >= 0; i--) {
          const r = rockets[i];
          r.y += r.vy;
          ctx.beginPath();
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x, r.y + 12);
          ctx.strokeStyle = r.color;
          ctx.lineWidth = 2;
          ctx.globalAlpha = 0.9;
          ctx.stroke();
          ctx.globalAlpha = 1;
          if (r.y <= r.targetY) {
            burstAt(sparks, r.x, r.y, r.color);
            rockets.splice(i, 1);
          }
        }
      } else {
        // shooting stars
        for (let i = shooting.length - 1; i >= 0; i--) {
          const p = shooting[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.02;
          ctx.globalAlpha = Math.max(p.life, 0);
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 44, p.y - 14);
          ctx.stroke();
          ctx.globalAlpha = 1;
          if (p.life <= 0) shooting.splice(i, 1);
        }

        // drifting plane
        if (plane.active) {
          plane.x += 1.8;
          ctx.font = "26px serif";
          ctx.fillText("🛫", plane.x, plane.y);
          if (plane.x > W + 60) {
            plane.active = false;
            setTimeout(() => {
              plane.active = true;
              plane.x = -60;
              plane.y = H * (0.1 + Math.random() * 0.25);
            }, 6000);
          }
        }
      }

      // celebration bursts
      if (celebrate && celebrate !== lastCelebrate.current) {
        lastCelebrate.current = celebrate;
        for (let i = 0; i < 8; i++) {
          setTimeout(
            () =>
              burstAt(
                sparks,
                W * (0.1 + Math.random() * 0.8),
                H * (0.15 + Math.random() * 0.3),
                PALETTE[(Math.random() * PALETTE.length) | 0]
              ),
            i * 260
          );
        }
      }

      // sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.035;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.life -= 0.012;
        if (p.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(shootTimer);
      window.removeEventListener("resize", resize);
    };
  }, [variant, celebrate]);

  return <canvas ref={canvasRef} className="fixed inset-0 h-full w-full" />;
}
