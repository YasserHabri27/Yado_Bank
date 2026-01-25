import { useEffect, useRef, useState } from 'react';

const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(true); // Default to visible to prevent blank screen issues

    useEffect(() => {
        // Fail-safe: Force visible after delay if IO fails or loads weirdly
        const safetyTimer = setTimeout(() => {
            setIsVisible(true);
        }, 500);

        if (!window.IntersectionObserver) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0,
                rootMargin: "0px"
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            clearTimeout(safetyTimer);
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [delay]);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                } ${className}`}
        >
            {children}
        </div>
    );
};

export default RevealOnScroll;
