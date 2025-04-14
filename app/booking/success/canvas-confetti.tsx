"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export default function FireworkConfetti({
  children,
}: {
  children: React.ReactNode;
}) {
  const didExplode = useRef(false);

  useEffect(() => {
    if (didExplode.current) return;

    // Simulate fireworks by bursting in multiple directions
    const firework = (angle: number) => {
      confetti({
        angle,
        spread: 55,
        particleCount: 50,
        origin: { y: 0.7 },
      });
    };

    // Fire in different directions
    firework(60);
    firework(120);
    firework(90);

    didExplode.current = true;
  }, []);

  return <div>{children}</div>;
}
