import { motion as Motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function ParallaxSection({ children, className, translateFrom = 0, translateTo = -100 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [translateFrom, translateTo]);

  return (
    <Motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </Motion.div>
  );
}

export default ParallaxSection;