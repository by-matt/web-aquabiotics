import { useEffect, useRef, useState } from 'react';
import { CountUp } from 'countup.js';
import { useInView } from 'framer-motion';

export default function StatCounter({ value, label }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (isInView && !hasStarted && ref.current) {
            setHasStarted(true);
            // Extract numeric part
            const numMatch = value.match(/\d+/);

            if (numMatch) {
                const number = parseInt(numMatch[0], 10);
                const prefix = value.substring(0, numMatch.index);
                const suffix = value.substring(numMatch.index + numMatch[0].length);

                const countUp = new CountUp(ref.current, number, {
                    duration: 2.5,
                    prefix,
                    suffix,
                });

                if (!countUp.error) {
                    countUp.start();
                }
            } else {
                ref.current.textContent = value;
            }
        }
    }, [isInView, hasStarted, value]);

    return (
        <div className="border-t-2 border-aqua pt-6 p-4 rounded-b-xl hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl hover:shadow-aqua/10 bg-white group h-full">
            <div
                ref={ref}
                className="text-4xl md:text-5xl font-extrabold text-navy mb-3 group-hover:text-ocean transition-colors tracking-tight"
            >
                {(!hasStarted || !value.match(/\d+/)) ? value : ""}
            </div>
            <div className="text-gray-500 font-medium text-sm md:text-base uppercase tracking-wider">{label}</div>
        </div>
    );
}
