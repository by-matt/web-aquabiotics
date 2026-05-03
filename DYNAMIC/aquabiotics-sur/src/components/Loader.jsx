import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate minimum loading time for smooth transition
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-navy flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Decorative Background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal/5 rounded-full blur-[100px] animate-blob" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-coral/5 rounded-full blur-[80px] animate-blob animation-delay-2000" />
                    
                    {/* Inner Content */}
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Logo Ring Animation */}
                        <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                            <motion.div 
                                className="absolute inset-0 rounded-full border border-teal/20"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div 
                                className="absolute inset-2 rounded-full border border-teal/40 border-t-teal"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                            <img src={logo} alt="Aquabiotics Sur" className="w-16 h-16 object-contain z-10 opacity-90" />
                        </div>
                        
                        {/* Loading Text */}
                        <motion.div 
                            className="flex flex-col items-center gap-3"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="font-mono text-[10px] tracking-[0.3em] text-teal uppercase">Biotech 4.0</span>
                            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-teal/50 to-transparent relative overflow-hidden">
                                <motion.div 
                                    className="absolute inset-0 w-1/2 bg-teal"
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
