import { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import GLOBE from 'vanta/dist/vanta.globe.min';
import * as THREE from 'three';

const VantaGlobe = () => {
  const { isDark } = useTheme();
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = GLOBE({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: isDark ? 0x9e4bba : 0x059669,
        color2: isDark ? 0x4c2a59 : 0x34d399,
        backgroundColor: isDark ? 0x1e1e2f : 0xd1fae5,
        size: 1.0,
        backgroundAlpha: 0,
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  // Update colors when theme changes
  useEffect(() => {
    if (vantaEffect.current) {
      vantaEffect.current.setOptions({
        color: isDark ? 0x9e4bba : 0x059669,
        color2: isDark ? 0x4c2a59 : 0x34d399,
        backgroundColor: isDark ? 0x1e1e2f : 0xd1fae5,
      });
    }
  }, [isDark]);

  return (
    <div 
      ref={vantaRef} 
      className="fixed inset-0 -z-10"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default VantaGlobe;
