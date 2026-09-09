import { useEffect, useRef, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';

const SCALE = 3;
const FRAME = 32;

export function MochiPlaceholder() {
  const [blinkFrame, setBlinkFrame] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  // Reveal the native window only after this component has painted,
  // avoiding the transparent-window white/black flash on Windows.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      invoke('reveal_window').catch((err) =>
        console.error('[Mochi] reveal failed', err)
      );
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Simple 4-frame idle "breathing" cycle, no sprite sheet needed yet.
  useEffect(() => {
    const id = setInterval(() => setBlinkFrame((f) => (f + 1) % 4), 250);
    return () => clearInterval(id);
  }, []);

  const handlePointerDown = async () => {
    try {
      await invoke('drag_window');
    } catch (err) {
      console.error('[Mochi] drag failed', err);
    }
  };

  // Cheap procedural "breathing" squash/stretch across the 4 frames
  const scaleY = [1, 1.04, 1, 0.97][blinkFrame];
  const eyeHeight = blinkFrame === 2 ? 1 : 6; // blink on frame index 2

  return (
    <div
      ref={rootRef}
      onPointerDown={handlePointerDown}
      style={{
        width: FRAME * SCALE,
        height: FRAME * SCALE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'grab',
        userSelect: 'none',
      }}
    >
      <svg
        width={FRAME * SCALE * 0.75}
        height={FRAME * SCALE * 0.75}
        viewBox="0 0 32 32"
        style={{
          imageRendering: 'pixelated',
          transform: `scaleY(${scaleY})`,
          transformOrigin: 'bottom center',
        }}
      >
        {/* Body: soft rounded pixel-blob in blocky steps, no anti-aliasing */}
        <rect x="8" y="10" width="16" height="14" fill="#FDEBD3" />
        <rect x="6" y="12" width="2" height="10" fill="#FDEBD3" />
        <rect x="24" y="12" width="2" height="10" fill="#FDEBD3" />
        <rect x="8" y="24" width="16" height="2" fill="#F3D3AE" />

        {/* Eyes */}
        <rect x="12" y="15" width="2" height={eyeHeight} fill="#4A3B32" />
        <rect x="18" y="15" width="2" height={eyeHeight} fill="#4A3B32" />

        {/* Blush */}
        <rect x="10" y="19" width="2" height="2" fill="#F5B7B1" opacity="0.7" />
        <rect x="20" y="19" width="2" height="2" fill="#F5B7B1" opacity="0.7" />
      </svg>
    </div>
  );
}