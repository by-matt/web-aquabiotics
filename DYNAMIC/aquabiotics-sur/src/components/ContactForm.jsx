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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-2xl shadow-xl shadow-navy/5 border border-gray-100 relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-ocean to-teal" />

            {/* Honeypot anti-spam */}
            <input type="text" name="_gotcha" style={{ display: 'none' }} />

            <div>
                <label className="block text-sm font-bold text-navy mb-2">{t('contact_page.form.name')}</label>
                <input {...register('name')} type="text" placeholder={t('contact_page.form.name_ph')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal focus:border-teal outline-none transition-all bg-gray-50 focus:bg-white" />
                {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{t('contact_page.form.name')} is missing</p>}
            </div>

            <div>
                <label className="block text-sm font-bold text-navy mb-2">{t('contact_page.form.email')}</label>
                <input {...register('email')} type="email" placeholder={t('contact_page.form.email_ph')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal focus:border-teal outline-none transition-all bg-gray-50 focus:bg-white" />
                {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{t('contact_page.form.email')} is invalid</p>}
            </div>

            <div>
                <label className="block text-sm font-bold text-navy mb-2">{t('contact_page.form.message')}</label>
                <textarea {...register('message')} placeholder={t('contact_page.form.message_ph')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal focus:border-teal outline-none transition-all bg-gray-50 focus:bg-white h-32 resize-none" />
                {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{t('contact_page.form.message')} is too short</p>}
            </div>

            <button type="submit" disabled={status === 'loading'}
                className="w-full bg-teal text-white font-bold py-3 px-6 rounded-lg hover:bg-ocean transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        {t('contact_page.form.sending')}
                    </span>
                ) : t('contact_page.form.send')}
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
