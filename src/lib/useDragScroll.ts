'use client';

import { useRef, useEffect, useCallback, useState } from 'react';

interface DragScrollOptions {
  friction?: number;    // 0-1, deceleration per frame (higher = slides longer, default 0.97)
  sensitivity?: number; // drag multiplier (default 1)
}

export function useDragScroll(options: DragScrollOptions = {}) {
  const { friction = 0.97, sensitivity = 1 } = options;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const state = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    velocity: 0,
    animationId: 0,
    hasMoved: false,
    // Velocity tracking — last 4 samples for smooth average
    samples: [] as { x: number; t: number }[],
  });

  const startDrag = useCallback((clientX: number) => {
    const el = scrollRef.current;
    if (!el) return;

    cancelAnimationFrame(state.current.animationId);
    state.current.isDown = true;
    state.current.hasMoved = false;
    state.current.startX = clientX;
    state.current.scrollLeft = el.scrollLeft;
    state.current.velocity = 0;
    state.current.samples = [{ x: clientX, t: Date.now() }];
    setIsDragging(true);
  }, []);

  const moveDrag = useCallback((clientX: number) => {
    if (!state.current.isDown) return;
    const el = scrollRef.current;
    if (!el) return;

    // Record sample for velocity averaging
    const now = Date.now();
    state.current.samples.push({ x: clientX, t: now });
    // Keep only last 4 samples
    if (state.current.samples.length > 4) {
      state.current.samples.shift();
    }

    const walk = (clientX - state.current.startX) * sensitivity;
    if (Math.abs(walk) > 3) {
      state.current.hasMoved = true;
    }

    el.scrollLeft = state.current.scrollLeft - walk;
  }, [sensitivity]);

  const endDrag = useCallback(() => {
    if (!state.current.isDown) return;
    state.current.isDown = false;

    const el = scrollRef.current;
    const samples = state.current.samples;

    if (!el || samples.length < 2) {
      setIsDragging(false);
      return;
    }

    // Calculate velocity from averaged samples
    const first = samples[0];
    const last = samples[samples.length - 1];
    const dt = last.t - first.t;

    if (dt < 1 || dt > 300) {
      // Too slow or stale — no momentum
      setIsDragging(false);
      return;
    }

    const dx = last.x - first.x;
    // Pixels per millisecond, then scale to per-frame (~16ms)
    let vel = -(dx / dt) * 16 * sensitivity;

    // Clamp max velocity for gentle feel
    const maxVel = 25;
    vel = Math.max(-maxVel, Math.min(maxVel, vel));

    if (Math.abs(vel) < 0.3) {
      setIsDragging(false);
      return;
    }

    const applyMomentum = () => {
      vel *= friction;
      if (Math.abs(vel) < 0.2) {
        setIsDragging(false);
        return;
      }
      el.scrollLeft += vel;
      state.current.animationId = requestAnimationFrame(applyMomentum);
    };

    state.current.animationId = requestAnimationFrame(applyMomentum);

    setTimeout(() => setIsDragging(false), 80);
  }, [friction, sensitivity]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      startDrag(e.clientX);
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!state.current.isDown) return;
      e.preventDefault();
      moveDrag(e.clientX);
    };

    const onMouseUp = () => {
      if (!state.current.isDown) return;
      el.style.cursor = '';
      el.style.userSelect = '';
      endDrag();
    };

    const onMouseLeave = () => {
      if (state.current.isDown) {
        el.style.cursor = '';
        el.style.userSelect = '';
        endDrag();
      }
    };

    const onClick = (e: MouseEvent) => {
      if (state.current.hasMoved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('click', onClick, true);

    const stateRef = state.current;
    return () => {
      cancelAnimationFrame(stateRef.animationId);
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('click', onClick, true);
    };
  }, [startDrag, moveDrag, endDrag]);

  const scrollTo = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 350;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  }, []);

  return { scrollRef, isDragging, scrollTo };
}
