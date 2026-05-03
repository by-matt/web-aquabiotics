import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykdeqla';

export default function ContactForm() {
    const { t } = useTranslation();
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

    // Basic schema allowing fallback string if translation misses
    const schema = z.object({
        name: z.string().min(2, { message: "Invalid name" }),
        email: z.string().email({ message: "Invalid email" }),
        message: z.string().min(5, { message: "Message too short" }),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        setStatus('loading');
        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    message: data.message,
                    _subject: 'New message from Aquabiotics Web',
                }),
            });
            if (res.ok) {
                setStatus('success');
                reset();
                setTimeout(() => setStatus('idle'), 8000);
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-ocean via-aqua to-teal" />

            {/* Honeypot anti-spam */}
            <input type="text" name="_gotcha" style={{ display: 'none' }} />

            <div>
                <label className="block text-sm font-bold text-navy mb-2">{t('contact_page.form.name')}</label>
                <input {...register('name')} type="text" placeholder={t('contact_page.form.name_ph')}
                    className="w-full px-4 py-3 rounded-xl border border-white/50 shadow-inner focus:ring-2 focus:ring-aqua focus:border-aqua outline-none transition-all bg-white/50 backdrop-blur-sm focus:bg-white/90" />
                {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{t('contact_page.form.name')} is missing</p>}
            </div>

            <div>
                <label className="block text-sm font-bold text-navy mb-2">{t('contact_page.form.email')}</label>
                <input {...register('email')} type="email" placeholder={t('contact_page.form.email_ph')}
                    className="w-full px-4 py-3 rounded-xl border border-white/50 shadow-inner focus:ring-2 focus:ring-aqua focus:border-aqua outline-none transition-all bg-white/50 backdrop-blur-sm focus:bg-white/90" />
                {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{t('contact_page.form.email')} is invalid</p>}
            </div>

            <div>
                <label className="block text-sm font-bold text-navy mb-2">{t('contact_page.form.message')}</label>
                <textarea {...register('message')} placeholder={t('contact_page.form.message_ph')}
                    className="w-full px-4 py-3 rounded-xl border border-white/50 shadow-inner focus:ring-2 focus:ring-aqua focus:border-aqua outline-none transition-all bg-white/50 backdrop-blur-sm focus:bg-white/90 h-32 resize-none" />
                {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{t('contact_page.form.message')} is too short</p>}
            </div>

            <button type="submit" disabled={status === 'loading'}
                className="w-full bg-gradient-to-r from-ocean to-teal text-white font-bold py-4 px-6 rounded-xl hover:from-ocean hover:to-aqua transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-[0_4px_15px_rgba(20,184,166,0.4)] transform hover:-translate-y-0.5 relative group overflow-hidden">
                <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-700 ease-in-out" />
                <span className="relative z-10 flex items-center justify-center">
                    {status === 'loading' ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            {t('contact_page.form.sending')}
                        </span>
                    ) : (
                        t('contact_page.form.send')
                    )}
                </span>
            </button>

            {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="text-center py-4 rounded-lg bg-emerald/10 text-emerald-800 font-bold border border-emerald/20">
                    {t('contact_page.form.success')}
                </motion.div>
            )}
            {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="text-center py-4 rounded-lg bg-red-50 text-red-800 font-bold border border-red-100">
                    {t('contact_page.form.error')}
                </motion.div>
            )}
        </form>
    );
}
