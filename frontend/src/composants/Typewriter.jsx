import { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 100, deleteSpeed = 50, delay = 0, loop = false, pause = 2000, className = "" }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        let timer;

        const handleTyping = () => {
            const currentLength = displayedText.length;
            const fullLength = text.length;

            if (!isDeleting) {
                // Typing phase
                if (currentLength < fullLength) {
                    setDisplayedText(text.substring(0, currentLength + 1));
                    timer = setTimeout(handleTyping, speed);
                } else {
                    // Finished typing, pause before deleting
                    if (loop) {
                        timer = setTimeout(() => setIsDeleting(true), pause);
                    }
                }
            } else {
                // Deleting phase
                if (currentLength > 0) {
                    setDisplayedText(text.substring(0, currentLength - 1));
                    timer = setTimeout(handleTyping, deleteSpeed);
                } else {
                    // Finished deleting, restart typing
                    setIsDeleting(false);
                    timer = setTimeout(handleTyping, speed);
                }
            }
        };

        timer = setTimeout(handleTyping, 100);

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, started, text, speed, deleteSpeed, loop, pause]);

    return (
        <span className={`${className} inline-block min-h-[1.5em]`}>
            {displayedText}
            <span className="animate-pulse ml-1">|</span>
        </span>
    );
};

export default Typewriter;
