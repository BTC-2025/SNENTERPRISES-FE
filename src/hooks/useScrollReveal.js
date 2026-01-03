import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-reveal animations using Intersection Observer
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Percentage of element visibility to trigger (0-1)
 * @param {string} options.rootMargin - Margin around the root viewport
 * @returns {Array} [ref, isRevealed] - Ref to attach to element and revealed state
 */
export const useScrollReveal = (options = {}) => {
    const { threshold = 0.1, rootMargin = '0px' } = options;
    const ref = useRef(null);
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isRevealed) {
                    setIsRevealed(true);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [threshold, rootMargin, isRevealed]);

    return [ref, isRevealed];
};

export default useScrollReveal;
