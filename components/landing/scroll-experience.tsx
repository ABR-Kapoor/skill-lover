'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { SceneHero } from './3d/scene-hero';
import { SceneRoadmap } from './3d/scene-roadmap';
import { SceneATS } from './3d/scene-ats';
import { SceneResources } from './3d/scene-resources';
import { SceneCredits } from './3d/scene-credits';
import { SceneDashboardTransition } from './3d/scene-dashboard-transition';

export function ScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden perspective-1000">
        <SceneHero progress={scrollYProgress} range={[0, 0.2]} />
        <SceneRoadmap progress={scrollYProgress} range={[0.2, 0.4]} />
        <SceneATS progress={scrollYProgress} range={[0.4, 0.6]} />
        <SceneResources progress={scrollYProgress} range={[0.6, 0.8]} />
        <SceneCredits progress={scrollYProgress} range={[0.8, 0.9]} />
        <SceneDashboardTransition progress={scrollYProgress} range={[0.9, 1]} />
      </div>
    </div>
  );
}
