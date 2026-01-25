import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Globe, CreditCard, ChevronRight, Mail, User, X } from 'lucide-react';
import { useAuth } from '../contexte/ContexteAuth';
import { useLangue } from '../contexte/ContexteLangue';
import RevealOnScroll from '../composants/RevealOnScroll';
import TiltCard from '../composants/TiltCard';
import FloatingShapes from '../composants/FloatingShapes';
import Typewriter from '../composants/Typewriter';
import { useEffect, useState } from 'react';


import CommentCaMarche from './CommentCaMarche';
import FAQ from './FAQ';

import ExperienceNumerique from './ExperienceNumerique';

// Imported Sections
import Services from './Services';
import Temoignages from './Temoignages';
import APropos from './APropos';
import Contact from './Contact';

const Accueil = () => {
    const { t } = useLangue();
    const { utilisateur } = useAuth();
    const navigate = useNavigate();
    const [showAdvisors, setShowAdvisors] = useState(false);

    // Redirect authenticated users to their dashboards
    useEffect(() => {
        if (utilisateur) {
            if (utilisateur.role === 'ROLE_ADMIN') {
                navigate('/admin/tableau-bord');
            } else if (utilisateur.role === 'ROLE_AGENT_GUICHET') {
                navigate('/agent/tableau-bord');
            } else if (utilisateur.role === 'ROLE_CLIENT') {
                navigate('/client/tableau-bord');
            }
        }
    }, [utilisateur, navigate]);

    if (utilisateur) return null; // Prevent flicker

    return (
        <div className="animate-fade-in">
            {/* ... Header ... */}

            {/* Services Section */}
            <section id="services" className="bg-slate-50 dark:bg-brand-900 transition-colors duration-300">
                <Services />
            </section>

            {/* Digital Experience Carousel */}
            <ExperienceNumerique />

            {/* Comment Ca Marche Section */}
            <CommentCaMarche />
            {/* Hero Section */}
            <section id="home" className="relative h-[700px] flex items-center overflow-hidden bg-[#003366]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#003366] via-[#003366]/90 to-[#001F3F]/80 z-10"></div>

                {/* 3D Floating Elements */}
                <FloatingShapes />

                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                <div className="container mx-auto px-6 relative z-20 pt-20">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <RevealOnScroll className="text-white">
                            <span className="inline-block py-1 px-3 rounded-full bg-brand-gold/20 text-brand-gold text-sm font-bold tracking-wider mb-6 border border-brand-gold/30 backdrop-blur-sm">
                                YASSER HABRI & DOHA ALLALI BANK
                            </span>
                            <div className="text-5xl md:text-7xl font-bold mb-6 leading-tight min-h-[160px]">
                                <Typewriter text={t('home.heroTitle')} speed={50} className="block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">
                                    <Typewriter text={t('home.heroTitleAccent')} speed={50} delay={1500} />
                                </span>
                            </div>
                            <div className="text-xl text-slate-200 mb-8 leading-relaxed max-w-lg min-h-[80px]">
                                <Typewriter
                                    text={t('home.heroDesc')}
                                    speed={30}
                                    delay={3000}
                                    loop={true}
                                    pause={6000}
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/connexion" className="bg-brand-gold hover:bg-white hover:text-brand-900 text-brand-900 font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-brand-gold/20 flex items-center justify-center gap-2 group hover:scale-105 transform duration-300">
                                    {t('home.accessAccount')}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                                </Link>
                                <a href="#services" className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl backdrop-blur-md border border-white/20 transition-all text-center hover:scale-105 transform duration-300">
                                    {t('home.discoverOffers')}
                                </a>
                            </div>
                        </RevealOnScroll>

                        {/* 3D Illustration / Tilt Card */}
                        <RevealOnScroll delay={200} className="hidden md:block">
                            <TiltCard className="relative z-10">
                                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-brand-gold/30 transition-colors"></div>
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-900 font-bold text-xl">
                                                Y
                                            </div>
                                            <div>
                                                <p className="text-xs text-white/60 uppercase tracking-widest">Yado Bank</p>
                                                <p className="text-white font-bold">Premium Card</p>
                                            </div>
                                        </div>
                                        <CreditCard className="w-8 h-8 text-white/80" />
                                    </div>
                                    <div className="space-y-6">
                                        <div className="text-2xl text-white font-mono tracking-widest">
                                            **** **** **** 4242
                                        </div>
                                        <div className="flex justify-between text-white/80 text-sm">
                                            <div>
                                                <p className="text-[10px] uppercase opacity-60">Card Holder</p>
                                                <p className="font-medium tracking-wider">Abdelilah Hssaini</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] uppercase opacity-60">Expires</p>
                                                <p className="font-medium">12/28</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="bg-slate-50 dark:bg-brand-900 transition-colors duration-300">
                <Services />
            </section>

            {/* Comment Ca Marche Section */}
            <CommentCaMarche />

            {/* A Propos Section */}
            <section id="apropos" className="bg-white dark:bg-[#001226] transition-colors duration-300">
                <APropos />
            </section>

            {/* Testimonials Section */}
            <section id="temoignages" className="bg-slate-50 dark:bg-brand-900 transition-colors duration-300">
                <Temoignages />
            </section>

            {/* FAQ Section */}
            <FAQ />

            {/* Contact Section */}
            <section id="contact" className="bg-white dark:bg-[#001226] transition-colors duration-300 mb-20">
                <Contact />
            </section>

            {/* Final CTA Footer-like */}
            <section className="py-20 bg-brand-dark relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-4">{t('home.readyTitle')}</h2>
                        <p className="text-slate-300 max-w-lg">
                            {t('home.readyDesc')}
                        </p>
                    </div>
                    <div>
                        <button
                            onClick={() => setShowAdvisors(true)}
                            className="bg-white text-brand-900 font-bold py-4 px-10 rounded-xl hover:bg-brand-gold hover:text-white transition-all shadow-xl inline-block cursor-pointer"
                        >
                            {t('home.contactAdvisor')}
                        </button>
                    </div>
                </div>
            </section>

            {/* Advisor Modal */}
            {showAdvisors && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="relative w-full max-w-4xl bg-[#0f172a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowAdvisors(false)}
                            className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="grid md:grid-cols-2">
                            {/* Advisor 1: Doha */}
                            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col items-center text-center relative overflow-hidden group hover:bg-white/5 transition-colors">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ring-2 ring-pink-500/30">
                                    <User className="w-10 h-10 text-pink-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1">Doha Allali</h3>
                                <p className="text-pink-400 text-sm tracking-widest uppercase font-bold mb-6">Expert Advisor</p>

                                <a href="mailto:dauphinellebleue@gmail.com" className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-pink-500/20 hover:border-pink-500/50 hover:text-pink-100 transition-all w-full justify-center group/btn">
                                    <Mail className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                    <span className="text-sm font-medium">dauphinellebleue@gmail.com</span>
                                </a>
                            </div>

                            {/* Advisor 2: Yasser */}
                            <div className="p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden group hover:bg-white/5 transition-colors">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ring-2 ring-blue-500/30">
                                    <User className="w-10 h-10 text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1">Yasser Habri</h3>
                                <p className="text-blue-400 text-sm tracking-widest uppercase font-bold mb-6">Senior Consultant</p>

                                <a href="mailto:yasser.habri.dev2@gmail.com" className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-100 transition-all w-full justify-center group/btn">
                                    <Mail className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                                    <span className="text-sm font-medium">yasser.habri.dev2@gmail.com</span>
                                </a>
                            </div>
                        </div>

                        <div className="bg-black/20 p-4 text-center text-slate-500 text-xs">
                            {t('home.advisorNote') || "Our team is available 24/7 to assist you."}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Accueil;
