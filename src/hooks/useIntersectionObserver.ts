import { useInView } from 'react-intersection-observer';

export const useIntersectionObserver = (options = {}) => {
  const { ref, inView, entry } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    ...options
  });

  return { ref, inView, entry };
};