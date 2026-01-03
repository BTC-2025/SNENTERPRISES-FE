import { useEffect, useRef } from 'react';

/**
 * Custom hook for parallax scroll effects
 * @param {Object} options - Configuration options
 * @param {number} options.speed - Parallax speed/intensity (0.1 to 1, lower is slower)
 * @returns {Object} ref - Ref to attach to element
 */
export const useParallax = (options = {}) => {
    const { speed = 0.5 } = options;
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const viewportHeight = window.innerHeight;

            // Only apply parallax when element is in viewport
            if (scrolled + viewportHeight > elementTop && scrolled < elementTop + elementHeight) {
                const yPos = -(scrolled - elementTop) * speed;
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        // Set initial transform and will-change for performance
        element.style.willChange = 'transform';

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateParallax(); // Initial call

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (element) {
                element.style.willChange = 'auto';
            }
        };
    }, [speed]);

    return ref;
};

export default useParallax;
