import { motion } from 'framer-motion';
import { useScrollAnimation, useStaggerAnimation, useParallaxAnimation } from '@/hooks/useScrollAnimation';
import { AnimationConfig } from '@/types/animations';
import { ReactNode, forwardRef } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  animation: AnimationConfig;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(({
  children,
  animation,
  className = "",
  as = "div"
}, forwardedRef) => {
  const { ref, variants, animate } = useScrollAnimation(animation);

  const MotionComponent = motion[as] as any;

  return (
    <MotionComponent
      ref={forwardedRef || ref}
      variants={variants}
      initial="hidden"
      animate={animate}
      className={className}
    >
      {children}
    </MotionComponent>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

// Componente para listas com animação escalonada
interface StaggeredListProps {
  children: ReactNode[];
  animation: AnimationConfig;
  staggerDelay?: number;
  className?: string;
  itemClassName?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const StaggeredList = ({
  children,
  animation,
  staggerDelay = 0.1,
  className = "",
  itemClassName = "",
  as = "div"
}: StaggeredListProps) => {
  const {
    containerRef,
    setItemRef,
    containerVariants,
    itemVariants,
    containerAnimate
  } = useStaggerAnimation(children.length, animation, staggerDelay);

  const MotionContainer = motion[as] as any;

  return (
    <MotionContainer
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={containerAnimate}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          ref={setItemRef(index)}
          variants={itemVariants}
          className={itemClassName}
        >
          {child}
        </motion.div>
      ))}
    </MotionContainer>
  );
};

// Componente para efeitos de parallax
interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const ParallaxSection = ({
  children,
  speed = 0.5,
  className = "",
  as = "div"
}: ParallaxSectionProps) => {
  const { ref, y } = useParallaxAnimation(speed);
  const MotionComponent = motion[as] as any;

  return (
    <MotionComponent
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

// Componente para animações em grid
interface AnimatedGridProps {
  children: ReactNode[];
  animation: AnimationConfig;
  staggerDelay?: number;
  columns?: number;
  className?: string;
  itemClassName?: string;
}

export const AnimatedGrid = ({
  children,
  animation,
  staggerDelay = 0.05,
  columns = 3,
  className = "",
  itemClassName = ""
}: AnimatedGridProps) => {
  const {
    containerRef,
    setItemRef,
    containerVariants,
    itemVariants,
    containerAnimate
  } = useStaggerAnimation(children.length, animation, staggerDelay);

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={containerAnimate}
      className={`grid grid-cols-1 md:grid-cols-${columns} gap-6 ${className}`}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          ref={setItemRef(index)}
          variants={itemVariants}
          className={itemClassName}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};