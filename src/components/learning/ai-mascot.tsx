'use client';
import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { reducedMotion } from '@/lib/domain/motion';
import { Sparkles } from 'lucide-react';

/** Drop a lazy Spline/WebGL scene into `scene`; the CSS character remains the no-network fallback. */
export function AiMascot({
  compact = false,
  mood = 'curious',
  scene,
}: {
  compact?: boolean;
  mood?: 'curious' | 'happy';
  scene?: ReactNode;
}) {
  const rig = useRef<HTMLDivElement>(null);
  const [waving, setWaving] = useState(false);
  function track(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch' || reducedMotion()) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5,
      y = (event.clientY - rect.top) / rect.height - 0.5;
    rig.current?.style.setProperty('--look-x', `${x * 15}px`);
    rig.current?.style.setProperty('--look-y', `${y * 10}px`);
  }
  function reset() {
    rig.current?.style.setProperty('--look-x', '0px');
    rig.current?.style.setProperty('--look-y', '0px');
  }
  return (
    <div
      className={`mascot-stage ${compact ? 'compact' : ''} ${waving || mood === 'happy' ? 'is-happy' : ''}`}
      onPointerMove={track}
      onPointerLeave={reset}
      data-spline-slot="ai-companion"
    >
      <div className="mascot-grid" aria-hidden="true" />
      <div className="orbital orbital-one" aria-hidden="true" />
      <div className="orbital orbital-two" aria-hidden="true" />
      <div className="floating-symbol symbol-one" aria-hidden="true">
        {'{ }'}
      </div>
      <div className="floating-symbol symbol-two" aria-hidden="true">
        ✦
      </div>
      <div className="floating-symbol symbol-three" aria-hidden="true">
        ⌘
      </div>
      {scene ?? (
        <div
          ref={rig}
          className="mascot-rig"
          aria-hidden="true"
          style={{ '--look-x': '0px', '--look-y': '0px' } as CSSProperties}
        >
          <div className="bot-antenna">
            <i />
          </div>
          <div className="bot-shell">
            <div className="bot-highlight" />
            <div className="bot-face">
              <div className="bot-eyes">
                <i />
                <i />
              </div>
              <div className="bot-smile" />
            </div>
            <div className="bot-ear ear-left" />
            <div className="bot-ear ear-right" />
          </div>
          <div className="bot-body">
            <i />
            <i />
            <i />
          </div>
          <div className="bot-hand hand-left" />
          <div className="bot-hand hand-right" />
        </div>
      )}
      <div className="mascot-shadow" aria-hidden="true" />
      <button
        type="button"
        className="mascot-greeting"
        onClick={() => setWaving((value) => !value)}
        aria-pressed={waving}
      >
        <Sparkles size={14} />
        {waving ? 'היי! מוכנים לבנות?' : 'תגידו לי שלום'}
      </button>
      {!compact && (
        <span className="mascot-caption" dir="ltr">
          <i /> BYTE · YOUR ARCADE SIDEKICK
        </span>
      )}
    </div>
  );
}
