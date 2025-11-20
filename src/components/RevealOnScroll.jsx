import React, { useState, useEffect, useRef } from 'react';

// Hook: Intersection Observer
export const useOnScreen = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [ref, options]);

    return [ref, isVisible];
};

// Component Wrapper
const RevealOnScroll = ({ children, className = "" }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${className}`}
        >
            {children}
        </div>
    );
};

export default RevealOnScroll;
