'use client';

import { useRef, useEffect, useCallback, useState } from 'react';

interface DragScrollOptions {
  momentum?: number;    // 0-1, how much momentum to carry (default 0.92)
  friction?: number;    // deceleration per frame (default 0.95)
}

export function useDragScroll(options: DragScrollOptions = {}) {
  const { momentum = 0.92, friction = 0.95 } = options;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Internal state refs (no re-renders)
  const state = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    lastX: 0,
    velocity: 0,
    animationId: 0,
    hasMoved: false,
    lastTime: 0,
  });

  const startDrag = useCallback((clientX: number) => {
    const el = scrollRef.current;
    if (!el) return;

    cancelAnimationFrame(state.current.animationId);
    state.current.isDown = true;
    state.current.hasMoved = false;
    state.current.startX = clientX;
    state.current.scrollLeft = el.scrollLeft;
    state.current.lastX = clientX;
    state.current.velocity = 0;
    state.current.lastTime = Date.now();
    setIsDragging(true);
  }, []);

  const moveDrag = useCallback((clientX: number) => {
    if (!state.current.isDown) return;
    const el = scrollRef.current;
    if (!el) return;

    const now = Date.now();
    const dt = Math.max(now - state.current.lastTime, 1);
    const dx = clientX - state.current.lastX;

    // Track velocity with time-weighted smoothing
    state.current.velocity = dx / dt * 16; // normalize to ~60fps
    state.current.lastX = clientX;
    state.current.lastTime = now;

    const walk = clientX - state.current.startX;
    if (Math.abs(walk) > 3) {
      state.current.hasMoved = true;
    }

    el.scrollLeft = state.current.scrollLeft - walk;
  }, []);

  const endDrag = useCallback(() => {
    if (!state.current.isDown) return;
    state.current.isDown = false;

    // Apply momentum
    const el = scrollRef.current;
    if (!el || Math.abs(state.current.velocity) < 0.5) {
      setIsDragging(false);
      return;
    }

    let vel = state.current.velocity * -8; // amplify and reverse direction

    const applyMomentum = () => {
      if (Math.abs(vel) < 0.5) {
        setIsDragging(false);
        return;
      }
      el.scrollLeft += vel;
      vel *= friction;
      state.current.animationId = requestAnimationFrame(applyMomentum);
    };

    state.current.animationId = requestAnimationFrame(applyMomentum);

    // Delayed isDragging reset for click prevention
    setTimeout(() => setIsDragging(false), 100);
  }, [friction]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      // Only left click
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
      el.style.cursor = 'grab';
      el.style.userSelect = '';
      endDrag();
    };

    const onMouseLeave = () => {
      if (state.current.isDown) {
        el.style.cursor = 'grab';
        el.style.userSelect = '';
        endDrag();
      }
    };

    // Touch events (for mobile momentum — native scroll handles basic touch)
    const onTouchStart = (e: TouchEvent) => {
      startDrag(e.touches[0].clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!state.current.isDown) return;
      moveDrag(e.touches[0].clientX);
    };

    const onTouchEnd = () => {
      endDrag();
    };

    // Prevent click on children after drag
    const onClick = (e: MouseEvent) => {
      if (state.current.hasMoved) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.style.cursor = 'grab';

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
    const amount = 420;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  }, []);

  return { scrollRef, isDragging, scrollTo };
}
