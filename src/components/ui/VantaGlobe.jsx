import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Vortex } from './vortex';

const VortexHeroBackground = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none w-full h-full">
      <Vortex
        isDark={isDark}
        backgroundColor="transparent"
        particleCount={isDark ? 450 : 250}
        baseHue={isDark ? 260 : 160}
        baseSpeed={0.1}
        rangeSpeed={1.5}
        baseRadius={1}
        rangeRadius={2}
        containerClassName="w-full h-full"
      />
    </div>
  );
};

export default VortexHeroBackground;


