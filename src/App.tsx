/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  X, 
  ChevronDown, 
  ArrowRight, 
  Star, 
  Lock, 
  ChevronRight, 
  BookOpen, 
  Clock, 
  ShoppingBag,
  UtensilsCrossed,
  LayoutGrid,
  Calendar,
  RefreshCcw,
  Coffee,
  Lightbulb,
  Zap,
  ArrowLeft
} from 'lucide-react';

// --- Components ---

const PurchaseNotification = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  const notifications = [
    { initial: "V", name: "Valentina M.", city: "Medellín", time: "Hace 2 minutos", message: "acaba de comprar +275 Recetas Fitness 🎉" },
    { initial: "J", name: "Juan D.", city: "Bogotá", time: "Hace 5 minutos", message: "acaba de comprar +275 Recetas Fitness 🎉" },
    { initial: "M", name: "María P.", city: "Cali", time: "Hace 8 minutos", message: "acaba de comprar +275 Recetas Fitness 🎉" },
    { initial: "S", name: "Santiago R.", city: "Barranquilla", time: "Hace 10 minutos", message: "acaba de comprar +275 Recetas Fitness 🎉" },
    { initial: "C", name: "Camila G.", city: "Cartagena", time: "Hace 12 minutos", message: "acaba de comprar +275 Recetas Fitness 🎉" },
    { initial: "A", name: "Andrés F.", city: "Bucaramanga", time: "Hace 14 minutos", message: "acaba de comprar +275 Recetas Fitness 🎉" },
    { initial: "L", name: "Laura S.", city: "Medellín", time: "Hace 15 minutos", message: "acaba de comprar +275 Recetas Fitness 🎉" },
    { initial: "D", name: "Diego M.", city: "Bogotá", time: "Hace 16 minutos", message: "acaba de comprar +275 Recetas Fitness 🎉" },
    { initial: "P", name: "Paula B.", city: "Cali", time: "Hace 17 minutos", message: "acaba de comprar +275 Recetas Fitness 🎉" },
    { initial: "K", name: "Kevin J.", city: "Barranquilla", time: "Hace 18 minutos", message: "acaba de comprar +275 Recetas Fitness 🎉" }
  ];

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const showNext = () => {
      setVisible(true);
      
      // Stay visible for 5 seconds
      timeoutId = setTimeout(() => {
        setVisible(false);
        
        // Wait 8-12 seconds before sharing next
        const nextDelay = Math.floor(Math.random() * (12000 - 8000 + 1)) + 8000;
        timeoutId = setTimeout(() => {
          setCurrentIdx((prev) => (prev + 1) % notifications.length);
          showNext();
        }, nextDelay);
      }, 5000);
    };

    // Initial delay
    timeoutId = setTimeout(showNext, 5000);

    return () => clearTimeout(timeoutId);
  }, [notifications.length]);

  const n = notifications[currentIdx];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="fixed bottom-4 left-4 z-50 bg-white rounded-xl shadow-2xl border-l-4 border-primary-green p-3 flex items-center gap-3 max-w-[280px] pointer-events-none"
        >
          <div className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center shrink-0 text-white font-black text-xl">
            {n.initial}
          </div>
          <div className="flex flex-col">
            <h5 className="font-display font-bold text-sm text-[#1A1A1A] leading-tight">{n.name}</h5>
            <p className="text-[11px] text-[#555] leading-tight mt-0.5">{n.message}</p>
            <p className="text-[10px] text-primary-green font-bold mt-1 uppercase tracking-tight">
              {n.time} · {n.city}
            </p>
          </div>
          <div className="absolute top-2 right-2 flex gap-0.5">
            <div className="w-1.5 h-1.5 bg-primary-green/30 rounded-full animate-pulse" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Button: React.FC<{ 
  children: ReactNode, 
  className?: string, 
  primary?: boolean, 
  onClick?: () => void, 
  showIcon?: boolean,
  disabled?: boolean
}> = ({ children, className = "", primary = true, onClick, showIcon = true, disabled = false }) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.03, boxShadow: "0 10px 15px -3px rgba(45, 134, 83, 0.3)" } : {}}
    whileTap={!disabled ? { scale: 0.98 } : {}}
    onClick={!disabled ? onClick : undefined}
    disabled={disabled}
    className={`w-full py-4 px-8 rounded-lg font-display font-bold uppercase tracking-wider text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
      primary 
        ? "bg-primary-green text-white hover:bg-dark-green" 
        : "bg-white text-primary-green border-2 border-primary-green hover:bg-bg-secondary"
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
  >
    {showIcon && <ArrowRight size={20} />}
    {children}
  </motion.button>
);

const Section: React.FC<{ children: ReactNode, className?: string, bgColor?: string, id?: string }> = ({ children, className = "", bgColor = "bg-white", id }) => (
  <section id={id} className={`py-12 px-4 ${bgColor} ${className}`}>
    <div className="max-w-[640px] mx-auto">
      {children}
    </div>
  </section>
);

const Separator = () => (
  <div className="flex justify-center py-4">
    <div className="w-[80%] border-b border-dashed border-border-soft"></div>
  </div>
);

const Card: React.FC<{ children: ReactNode, className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white p-6 rounded-xl border border-border-soft shadow-sm hover:shadow-md transition-shadow ${className}`}>
    {children}
  </div>
);

export default function App() {
  const [funnelStep, setFunnelStep] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([]);
  const [userName, setUserName] = useState('');
  const [goal, setGoal] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "¿Puedo comprar desde Colombia?", a: "Sí, aceptamos todas las tarjetas colombianas (Visa, Mastercard, American Express) y también PSE." },
    { q: "¿Cómo recibo el material?", a: "Inmediatamente después del pago te llega un email con el acceso. Sin espera." },
    { q: "¿Los ingredientes son fáciles de conseguir?", a: "Sí, todas las recetas usan ingredientes que encontrás en cualquier supermercado o tienda de barrio en Colombia." },
    { q: "¿Funciona si no voy al gym?", a: "Claro. Las recetas funcionan para cualquier persona que quiera comer más sano, vaya o no al gym." },
    { q: "¿Y si no me gusta?", a: "Tenés 7 días de garantia. Si no quedás contento, te devolvemos la plata completa." }
  ];

  const today = new Date();
  const formattedDate = today.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const totalSteps = 11;

  const nextStep = () => {
    setHistory([...history, funnelStep]);
    setFunnelStep(funnelStep + 1);
  };

  const prevStep = () => {
    if (history.length > 0) {
      const lastStep = history[history.length - 1];
      setHistory(history.slice(0, -1));
      setFunnelStep(lastStep);
    }
  };

  // Loading animation logic
  useEffect(() => {
    if (funnelStep === 9) { // Loading step
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setFunnelStep(10), 500); // Go to offer transition
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [funnelStep]);

  const motivationData = {
    'bajar de peso': "¿Sabías que es posible bajar de peso sin dejar de comer lo que amás? La clave no es sufrir — es saber elegir. Ahora te hacemos una pregunta importante...",
    'ganar músculo': "¿Sabías que es posible ganar músculo comiendo arroz, carne y hasta pan? No necesitás pollo con avena todos los días. Ahora te hacemos una pregunta importante...",
    'comer más sano': "¿Sabías que comer sano no significa abandonar tus comidas favoritas? Solo significa prepararlas de forma más inteligente. Ahora te hacemos una pregunta importante...",
    'más energía': "¿Sabías que la energía que sentís durante el día depende casi 80% de lo que comés? No tenés que cambiar todo — solo algunos hábitos. Ahora te hacemos una pregunta importante..."
  };

  const transitionData = {
    'bajar de peso': "Basado en tus respuestas, seleccionamos +275 recetas diseñadas para que pierdas peso comiendo lo que ya comés — sin pasar hambre y sin gastar más plata.",
    'ganar músculo': "Basado en tus respuestas, seleccionamos +275 recetas con la proteína que necesitás para ganar músculo sin abandonar el arroz, la carne y todo lo que te gusta.",
    'comer más sano': "Basado en tus respuestas, seleccionamos +275 recetas para que comas más sano sin complicaciones, con ingredientes de cualquier tienda de Colombia.",
    'más energía': "Basado en tus respuestas, seleccionamos +275 recetas que van a transformar tu energía durante el día — sin dietas extremas ni ingredientes raros."
  };

  const currentMotivation = motivationData[goal as keyof typeof motivationData] || motivationData['comer más sano'];
  const currentTransition = transitionData[goal as keyof typeof transitionData] || transitionData['comer más sano'];

  const quizQuestions = [
    {
      title: "¿Cuál es tu objetivo principal?",
      sub: "Esto nos ayuda a seleccionar las recetas perfectas para vos",
      options: [
        { text: "Quiero bajar de peso", emoji: "🔥", value: "bajar de peso" },
        { text: "Quiero ganar músculo", emoji: "💪", value: "ganar músculo" },
        { text: "Quiero comer más sano sin una meta específica", emoji: "🥗", value: "comer más sano" },
        { text: "Quiero tener más energía en el día", emoji: "⚡", value: "más energía" }
      ]
    },
    {
      title: "¿Cuál es tu mayor obstáculo hoy?",
      sub: "Sé honesto — esto es para ayudarte mejor",
      options: [
        { text: "No sé qué cocinar que sea sano y rico", emoji: "🤔" },
        { text: "Todo lo saludable me parece caro", emoji: "💸" },
        { text: "No tengo tiempo para cocinar", emoji: "⏰" },
        { text: "Empiezo dietas pero las abandono rápido", emoji: "😩" }
      ]
    },
    {
      title: "¿Cuánto querés bajar o transformar?",
      sub: "Para calibrar la intensidad de tu plan",
      options: [
        { text: "Entre 3 y 8 kilos", emoji: "📉" },
        { text: "Entre 8 y 15 kilos", emoji: "📊" },
        { text: "Más de 15 kilos", emoji: "🎯" },
        { text: "Solo quiero mantenerme y comer mejor", emoji: "⚖️" }
      ]
    },
    // Step 3 is Name Input
    {
      title: "¿Cuántas veces cocinás por semana?",
      sub: "Para mostrarte recetas que se adapten a tu ritmo de vida",
      options: [
        { text: "Casi nunca, como por fuera", emoji: "🏃" },
        { text: "2 o 3 veces", emoji: "🍳" },
        { text: "Casi todos los días", emoji: "👨‍🍳" },
        { text: "Todos los días sin falta", emoji: "🔥" }
      ]
    },
    // Step 5 is Motivation
    {
      title: "¿De qué comida no abrís mano?",
      sub: "No te vamos a pedir que abandones lo que te gusta — prometido",
      options: [
        { text: "Arroz y fríjoles", emoji: "🍚" },
        { text: "Carne y pollo", emoji: "🍗" },
        { text: "Pasta y pan", emoji: "🍝" },
        { text: "¡Todo lo anterior! (como buen colombiano)", emoji: "🎉" }
      ]
    },
    {
      title: "¿Cuánto tiempo tenés para cocinar al día?",
      sub: "Vamos a mostrarte recetas que entren perfecto en tu día",
      options: [
        { text: "Menos de 15 minutos", emoji: "⚡" },
        { text: "Entre 15 y 30 minutos", emoji: "⏱️" },
        { text: "Tengo hasta 1 hora", emoji: "🕐" }
      ]
    },
    {
      title: "¿Qué tan comprometido estás con cambiar tu alimentación?",
      sub: "Esta respuesta es solo para vos — sé honesto",
      options: [
        { text: "Estoy listo, solo necesito saber qué comer", emoji: "🚀" },
        { text: "Quiero intentarlo pero me da miedo no lograrlo", emoji: "💭" },
        { text: "Estoy explorando opciones todavía", emoji: "🔍" }
      ]
    }
  ];

  if (funnelStep < 11) {
    return (
      <div className="min-h-screen bg-bg-secondary flex flex-col items-center justify-center p-4 py-8">
        <style>
          {`
            @keyframes pulse-soft {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.05); opacity: 0.8; }
            }
            .animate-pulse-soft {
              animation: pulse-soft 2s ease-in-out infinite;
            }
          `}
        </style>

        {/* Progress Bar (Not for Loading or Transitions) */}
        {funnelStep < 9 && (
          <div className="w-full max-w-[480px] mb-8">
            <div className="flex justify-between items-center mb-2">
              <button 
                onClick={prevStep}
                className={`text-gray-400 hover:text-primary-green transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-widest ${funnelStep === 0 ? 'invisible' : 'visible'}`}
              >
                <ArrowLeft size={14} /> Volver
              </button>
              <span className="text-[10px] font-black text-primary-green uppercase tracking-[2px]">
                {Math.round((funnelStep + 1) / totalSteps * 100)}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-white rounded-full overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(funnelStep + 1) / totalSteps * 100}%` }}
                className="h-full bg-primary-green"
              />
            </div>
          </div>
        )}

        {/* Funnel Card */}
        <AnimatePresence mode="wait">
          {/* Questions 1-3 */}
          {funnelStep <= 2 && (
            <motion.div
              key="q1-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-[480px] bg-white rounded-3xl p-6 md:p-8 shadow-xl"
            >
              <h2 className="font-display font-[900] text-2xl text-[#1A1A1A] leading-tight text-center mb-2">
                {quizQuestions[funnelStep].title}
              </h2>
              <p className="text-gray-500 text-sm text-center mb-8 font-medium">
                {quizQuestions[funnelStep].sub}
              </p>
              <div className="flex flex-col gap-3">
                {quizQuestions[funnelStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (funnelStep === 0) setGoal(opt.value || opt.text.toLowerCase());
                      nextStep();
                    }}
                    className="w-full p-4 rounded-xl border-2 border-border-soft hover:border-primary-green hover:bg-green-50 transition-all text-left flex items-center gap-4 group"
                  >
                    <span className="text-2xl group-hover:scale-125 transition-transform">{opt.emoji}</span>
                    <span className="font-bold text-[#444] group-hover:text-primary-green transition-colors">{opt.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Name Input Step (Step 3) */}
          {funnelStep === 3 && (
            <motion.div
              key="name_input"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-[480px] bg-white rounded-3xl p-6 md:p-8 shadow-xl text-center"
            >
              <div className="mb-4">
                <span className="bg-primary-green/10 text-primary-green px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  ¡Vas muy bien!
                </span>
              </div>
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-primary-green/10 rounded-full flex items-center justify-center animate-pulse-soft">
                  <Star size={40} className="text-primary-green" fill="currentColor" />
                </div>
              </div>
              <h2 className="font-display font-[800] text-2xl text-[#1A1A1A] leading-tight mb-2">
                Tu plan está siendo preparado...
              </h2>
              <p className="text-gray-500 text-sm mb-8 font-medium">
                Para personalizar tus recetas, ¿cómo te llamás?
              </p>
              <input 
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Escribí tu nombre acá..."
                className="w-full p-4 rounded-xl border-2 border-border-soft mb-6 focus:border-primary-green focus:outline-none text-center font-bold text-lg"
              />
              <Button 
                onClick={() => {
                  setUserName(userName.charAt(0).toUpperCase() + userName.slice(1));
                  nextStep();
                }}
                disabled={userName.trim().length < 2}
                className={userName.trim().length < 2 ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Continuar con mi plan →
              </Button>
            </motion.div>
          )}

          {/* Question 4 (Step 4) */}
          {funnelStep === 4 && (
            <motion.div
              key="q4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-[480px] bg-white rounded-3xl p-6 md:p-8 shadow-xl"
            >
              <h2 className="font-display font-[900] text-2xl text-[#1A1A1A] leading-tight text-center mb-2">
                {quizQuestions[3].title}
              </h2>
              <p className="text-gray-500 text-sm text-center mb-8 font-medium">
                {quizQuestions[3].sub}
              </p>
              <div className="flex flex-col gap-3">
                {quizQuestions[3].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={nextStep}
                    className="w-full p-4 rounded-xl border-2 border-border-soft hover:border-primary-green hover:bg-green-50 transition-all text-left flex items-center gap-4 group"
                  >
                    <span className="text-2xl group-hover:scale-125 transition-transform">{opt.emoji}</span>
                    <span className="font-bold text-[#444] group-hover:text-primary-green transition-colors">{opt.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Motivational Transition (Step 5) */}
          {funnelStep === 5 && (
            <motion.div
              key="motivation"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-[480px] bg-[#E8F5EE] rounded-3xl p-6 md:p-8 shadow-xl text-center"
            >
              <div className="flex justify-center mb-6">
                <Lightbulb size={48} className="text-[#1F5E3A] animate-pulse-soft" />
              </div>
              <h2 className="font-display font-[800] text-xl text-[#1F5E3A] leading-tight mb-4">
                ¿Sabías que...
              </h2>
              <p className="font-sans text-[#555] leading-relaxed mb-8 text-[15px]">
                {currentMotivation}
              </p>
              <Button 
                onClick={nextStep}
                className="bg-primary-green text-white hover:bg-dark-green"
              >
                Sí, quiero saber más →
              </Button>
            </motion.div>
          )}

          {/* Questions 5-7 (Steps 6-8) */}
          {funnelStep >= 6 && funnelStep <= 8 && (
            <motion.div
              key={`q${funnelStep}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-[480px] bg-white rounded-3xl p-6 md:p-8 shadow-xl"
            >
              <h2 className="font-display font-[900] text-2xl text-[#1A1A1A] leading-tight text-center mb-2">
                {quizQuestions[funnelStep - 2].title}
              </h2>
              <p className="text-gray-500 text-sm text-center mb-8 font-medium">
                {quizQuestions[funnelStep - 2].sub}
              </p>
              <div className="flex flex-col gap-3">
                {quizQuestions[funnelStep - 2].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={nextStep}
                    className="w-full p-4 rounded-xl border-2 border-border-soft hover:border-primary-green hover:bg-green-50 transition-all text-left flex items-center gap-4 group"
                  >
                    <span className="text-2xl group-hover:scale-125 transition-transform">{opt.emoji}</span>
                    <span className="font-bold text-[#444] group-hover:text-primary-green transition-colors">{opt.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Loading Animation (Step 9) */}
          {funnelStep === 9 && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-[480px] text-center"
            >
              <div className="mb-12 flex flex-col items-center">
                <div className="w-24 h-24 bg-primary-green rounded-full flex items-center justify-center text-white font-black text-4xl mb-6 shadow-2xl animate-pulse-soft">
                  {userName.charAt(0) || "Y"}
                </div>
                <h2 className="font-display font-black text-2xl text-[#1A1A1A] mb-2 leading-tight">
                  Analizando tus respuestas, {userName}...
                </h2>
                <p className="text-gray-500 font-medium">Esto tomará solo un momento</p>
              </div>
              <div className="w-full bg-white h-4 rounded-full overflow-hidden shadow-inner border border-border-soft max-w-[320px] mx-auto relative">
                <motion.div 
                  className="bg-primary-green h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadingProgress}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-gray-400 drop-shadow-sm">
                  {loadingProgress}%
                </span>
              </div>
              <div className="mt-8 flex flex-col gap-3 max-w-[320px] mx-auto text-left">
                {[
                  { text: "Seleccionando mejores recetas", progress: 20 },
                  { text: "Calculando macros y calorías", progress: 50 },
                  { text: "Preparando bonos exclusivos", progress: 85 }
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center gap-3 text-sm transition-opacity duration-500 ${loadingProgress >= item.progress ? 'opacity-100' : 'opacity-20'}`}>
                    <Check size={16} className="text-primary-green" />
                    <span className="font-bold text-gray-600">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Transition to Offer (Step 10) */}
          {funnelStep === 10 && (
            <motion.div
              key="offer_transition"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="relative mb-8">
                <div className="w-28 h-28 bg-primary-green/10 rounded-full flex items-center justify-center animate-pulse-soft">
                  <div className="w-24 h-24 bg-primary-green rounded-full flex items-center justify-center text-white font-black text-4xl shadow-xl">
                    {userName.charAt(0) || "Y"}
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-accent-orange text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg uppercase tracking-widest whitespace-nowrap">
                  ¡Tu plan está listo!
                </div>
              </div>
              
              <h2 className="font-display font-[900] text-[26px] text-[#1A1A1A] leading-tight mb-4 max-w-[400px]">
                Encontramos el plan perfecto para vos, {userName}
              </h2>
              
              <p className="font-sans text-[#555] leading-relaxed mb-10 text-[15px] max-w-[450px]">
                {currentTransition}
              </p>
              
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Check size={18} className="text-primary-green" />
                  <span>Recetas para tu objetivo</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Check size={18} className="text-primary-green" />
                  <span>Con tus comidas favoritas</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <Check size={18} className="text-primary-green" />
                  <span>Acceso inmediato</span>
                </div>
              </div>
              
              <div className="w-full max-w-[400px]">
                <Button 
                  onClick={() => setFunnelStep(11)}
                  className="bg-primary-green text-white hover:bg-dark-green animate-pulse py-5 text-xl"
                  showIcon={false}
                >
                  👉 Ver mi plan personalizado
                </Button>
                <p className="mt-4 text-gray-400 text-xs font-medium">
                  Oferta exclusiva preparada para vos — válida por tiempo limitado
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PurchaseNotification />
      
      {/* SECCIÓN 1: BARRA DE URGÊNCIA (SIN TIMER) */}
      <div className="fixed top-0 left-0 w-full bg-accent-orange text-white py-2 z-50 shadow-md text-center">
        <div className="px-2 flex items-center justify-center gap-2 font-display text-[11px] sm:text-xs md:text-sm font-bold">
          <span>Esta promoción acaba hoy - {formattedDate}</span>
        </div>
      </div>

      <main className="pt-[40px]">
        
        {/* SECCIÓN 2: HERO */}
        <Section className="text-center pt-8 pb-12">
          <div className="max-w-[480px] mx-auto flex flex-col items-center">
            
            {/* 1. TÍTULO PRINCIPAL */}
            <h1 className="font-display font-[900] text-[32px] text-[#1A1A1A] leading-[1.15] mb-4">
              ¡Hola <span className="text-primary-green">{userName}!</span> No escapes más de la dieta y de una vida saludable
            </h1>

            {/* 2. SUBHEADLINE */}
            <div className="mb-6">
              <h2 className="font-display font-[800] text-[22px] leading-tight">
                +275 Recetas <span className="text-primary-green">Fitness</span>
              </h2>
              <p className="font-display font-[700] text-[16px] text-[#555] mt-1">
                Prácticas y Económicas
              </p>
            </div>

            {/* 3. IMAGEM DA CAPA */}
            <div className="w-full aspect-[4/3] rounded-[14px] overflow-hidden shadow-2xl mb-6 bg-border-soft">
              <img 
                src="/ebook_mockup.png" 
                alt="+275 Recetas Fitness Mockup" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800&q=80";
                }}
              />
            </div>

            {/* 4. PROVA SOCIAL */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="flex text-accent-orange">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <span className="font-display font-bold text-[14px]">+1.200 personas ya lo tienen</span>
              </div>
              <p className="font-sans italic text-[16px] text-[#555] leading-snug">
                Come rico, come sano y ahorra plata — sin complicaciones
              </p>
            </div>

            {/* 5. BOTÃO CTA */}
            <div className="w-full">
              <Button 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                showIcon={false}
                className="py-5 px-4 text-xl"
              >
                👉 QUIERO MIS RECETAS AHORA
              </Button>
            </div>

            {/* 6. MICROCOPY */}
            <p className="mt-4 text-[12px] text-gray-500 flex items-center justify-center gap-2">
              <span>🔒 Compra 100% segura</span>
              <span>·</span>
              <span>Acceso inmediato</span>
              <span>·</span>
              <span>Garantía 7 días</span>
            </p>
          </div>
        </Section>

        <Separator />

        {/* SECCIÓN 3: DORES */}
        <Section bgColor="bg-bg-secondary">
          <h2 className="text-3xl font-black text-accent-orange text-center mb-8">
            🔥 {userName}, ¿te pasa esto todos los días?
          </h2>
          <div className="flex flex-col gap-4 mb-8">
            {[
              "Comes siempre lo mismo: pollo, arroz, ensalada... y ya no aguantas más",
              "Quieres comer sano pero todo lo saludable te parece caro",
              "No tienes tiempo para cocinar recetas complicadas",
              "Las dietas que encuentras en internet usan ingredientes que no consigues en Colombia",
              "Empiezas una dieta y a los 3 días ya la dejaste porque es muy aburrida"
            ].map((pain, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <span className="text-xl shrink-0">❌</span>
                <p className="text-gray-700 leading-relaxed font-medium">{pain}</p>
              </div>
            ))}
          </div>
          <p className="text-center font-bold text-lg text-gray-800">
            Si te identificaste con alguno de estos puntos, este libro fue hecho exactamente para vos.
          </p>
        </Section>

        <Separator />

        {/* SECCIÓN 4: APRESENTAÇÃO */}
        <Section>
          <h2 className="text-3xl font-black text-center mb-10">
            ¿Qué hay dentro del libro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "📗", title: "+275 Recetas Organizadas", desc: "Desayunos, almuerzos, cenas y meriendas — todo clasificado por objetivo" },
              { icon: "🥗", title: "Ingredientes Reales", desc: "Solo ingredientes que encontrás en cualquier tienda o supermercado de Colombia" },
              { icon: "⏱️", title: "Listo en 30 Minutos", desc: "Recetas rápidas pensadas para personas ocupadas que no tienen horas para cocinar" },
              { icon: "💪", title: "Para Cualquier Objetivo", desc: "Bajar de peso, ganar músculo o simplemente comer más sano — acá está todo" }
            ].map((feature, idx) => (
              <Card key={idx} className="flex flex-col gap-3">
                <span className="text-5xl">{feature.icon}</span>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Separator />

        {/* SECCIÓN 5: GALERIA */}
        <Section bgColor="bg-bg-secondary">
          <h2 className="text-3xl font-black text-center mb-2">
            Mirá algunas recetas que vas a encontrar:
          </h2>
          <p className="text-center text-gray-500 mb-10 font-medium">Ricas, fáciles y con toda la info nutricional que necesitás</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                name: "Lasaña Fitness de Pollo y Espinaca", 
                time: "35 min", 
                img: "/Recetas fitness img/Lasagna_slice_lifted_from_dish_202605082329.jpeg",
                kcal: "430 kcal",
                prot: "39g prot"
              },
              { 
                name: "Pizza Fit de Pollo con Masa Integral", 
                time: "30 min", 
                img: "/Recetas fitness img/Fitness_pizza_on_wooden_board_202605082329.jpeg",
                kcal: "460 kcal",
                prot: "42g prot"
              },
              { 
                name: "Pollo Crocante \"Frito\" al Horno", 
                time: "25 min", 
                img: "/Recetas fitness img/Crispy_chicken_pieces_on_parchment_202605082329.jpeg",
                kcal: "380 kcal",
                prot: "44g prot"
              },
              { 
                name: "Bandeja Paisa Fitness", 
                time: "40 min", 
                img: "/Recetas fitness img/Bandeja_paisa_fitness_plate_202605082330.jpeg",
                kcal: "490 kcal",
                prot: "46g prot"
              },
              { 
                name: "Tacos Fitness de Carne y Aguacate", 
                time: "20 min", 
                img: "/Recetas fitness img/Three_rustic_corn_tacos_202605082330.jpeg",
                kcal: "410 kcal",
                prot: "35g prot"
              },
              { 
                name: "Burger Fit de Res con Pan Integral", 
                time: "20 min", 
                img: "/Recetas fitness img/Fitness_burger_on_slate_board_202605082331.jpeg",
                kcal: "440 kcal",
                prot: "40g prot"
              }
            ].map((recipe, idx) => (
              <div key={idx} className="bg-white p-3 rounded-2xl border border-border-soft shadow-sm flex flex-col">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <img 
                    src={recipe.img} 
                    alt={recipe.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-accent-orange text-white text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg capitalize">
                    <Clock size={10} /> {recipe.time}
                  </div>
                </div>
                <h4 className="font-bold text-sm leading-tight mb-4 px-1">{recipe.name}</h4>
                <div className="flex gap-2 px-1 mt-auto">
                  <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    🔥 {recipe.kcal}
                  </span>
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    💪 {recipe.prot}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center">
            <Button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="max-w-[400px]"
            >
              Quiero ver los planes
            </Button>
            <p className="text-center text-gray-400 text-[11px] italic mt-6">
              “Y esto es solo una pequeña muestra... adentro hay +275 recetas así.”
            </p>
          </div>
        </Section>

        <Separator />

        {/* SECCIÓN 6: BÔNUS */}
        <Section>
          <div className="flex justify-center mb-6">
            <span className="bg-accent-orange text-white px-4 py-1 rounded-full font-display font-bold text-xs uppercase tracking-widest overflow-hidden">
              🎁 BONUS GRATIS al comprar hoy
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {[
              { 
                image: "/bonos recetas/bonus1_new.webp", 
                title: "Guía de Meriendas Saludables y Económicos", 
                desc: "30 opciones de meriendas fit que cuestan menos que un tinto" 
              },
              { 
                image: "/bonos recetas/bonus2_new.webp", 
                title: "Plan de Organización Semanal", 
                desc: "Planificá toda tu semana de comidas en menos de 10 minutos" 
              },
              { 
                image: "/bonos recetas/bonus3_new.webp", 
                title: "Lista Inteligente de Sustituciones", 
                desc: "¿No tenés un ingrediente? Acá está la alternativa perfecta" 
              },
              { 
                image: "/bonos recetas/planner_bonus.webp", 
                title: "Planner de Comidas Imprimible", 
                desc: "Organizá tu semana visualmente y no falles en tu dieta, ¡está bacano!" 
              },
              { 
                image: "/bonos recetas/bonus5.webp", 
                title: "Guía de Cenas para Desinflamar", 
                desc: "Cenas ligeras para despertar con el abdomen plano y sin pesadez" 
              }
            ].map((bonus, idx) => (
              <div key={idx} className="relative bg-white border border-border-soft border-l-[6px] border-l-primary-green p-4 rounded-r-xl flex items-center gap-4">
                <span className="absolute top-2 right-3 text-[10px] font-black text-primary-green uppercase tracking-tighter">GRATIS</span>
                <div className="w-16 h-20 md:w-20 md:h-24 bg-border-soft rounded overflow-hidden flex items-center justify-center shrink-0 shadow-md">
                  <img 
                    src={bonus.image} 
                    alt={bonus.title} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=200&q=80";
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base leading-tight">{bonus.title}</h4>
                  <p className="text-gray-500 text-[11px] md:text-xs mt-1 italic leading-tight">{bonus.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Aprovechar bonos y comprar ahora
            </Button>
          </div>
        </Section>

        <Separator />

        {/* SECCIÓN 7: PREÇO (REDISEÑADA) */}
        <section id="pricing" className="py-20 px-4 bg-[#E8F5EE]">
          <div className="max-w-[800px] mx-auto">
            <h2 className="font-display font-[900] text-3xl text-[#1A1A1A] text-center mb-10">
              Elegí tu plan, <span className="text-primary-green">{userName}</span>
            </h2>
            
            <div className="flex flex-col md:flex-row gap-6 items-start justify-center">
              
              {/* PLAN COMPLETO */}
              <div className="flex-1 relative pt-4 max-w-[360px] w-full mx-auto md:mx-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-accent-orange text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1 uppercase tracking-widest whitespace-nowrap">
                    <Star size={10} fill="currentColor" /> MÁS POPULAR
                  </div>
                </div>
                <div className="bg-white rounded-[24px] border-2 border-primary-green p-8 flex flex-col shadow-xl min-h-[580px]">
                  <h3 className="font-display font-[800] text-lg text-center text-[#444] mb-8 tracking-wider uppercase">
                    COMPLETO
                  </h3>
                  
                  <ul className="flex flex-col gap-4 mb-10 grow">
                    <li className="flex items-center gap-2 text-sm font-bold text-[#444]">
                      <Check size={16} className="text-primary-green shrink-0" /> <span>+275 Recetas Fitness</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm font-bold text-[#444]">
                      <Check size={16} className="text-primary-green shrink-0" /> <span>Lista de compras inteligente</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm font-bold text-[#444]">
                      <Check size={16} className="text-primary-green shrink-0" /> <span>Cronograma de alimentación</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm font-bold text-[#444]">
                      <Check size={16} className="text-primary-green shrink-0" /> <span>Acceso de por vida</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm font-bold text-[#444]">
                      <span className="text-xl leading-none">🎁</span>
                      <span>Todos los 5 bonus</span>
                    </li>
                  </ul>
                  
                  <div className="text-center mb-8">
                    <p className="text-gray-300 line-through text-sm font-bold">$50.000</p>
                    <p className="text-5xl font-display font-black text-primary-green mb-1">$20.000</p>
                    <p className="text-[10px] font-bold text-[#555] tracking-widest uppercase">PESOS COLOMBIANOS</p>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = 'https://pay.hotmart.com/D105724335A?off=z7t9p2n3'}
                    className="w-full bg-primary-green hover:bg-dark-green text-white py-5 rounded-xl font-display font-black uppercase text-base shadow-lg shadow-primary-green/20"
                  >
                    ¡COMPRAR AHORA!
                  </motion.button>
                </div>
              </div>

              {/* PLAN BÁSICO */}
              <div className="flex-1 bg-white rounded-[24px] p-8 flex flex-col shadow-lg border border-border-soft max-w-[360px] w-full mx-auto md:mx-0 min-h-[580px] md:mt-4">
                <h3 className="font-display font-[800] text-lg text-center text-[#444] mb-8 tracking-wider uppercase">
                  BÁSICO
                </h3>
                
                <ul className="flex flex-col gap-4 mb-10 grow">
                  <li className="flex items-center gap-2 text-sm font-bold text-[#444]">
                    <Check size={16} className="text-primary-green shrink-0" /> <span>+275 Recetas Fitness</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm font-bold text-[#444]">
                    <Check size={16} className="text-primary-green shrink-0" /> <span>Lista de compras</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm font-bold text-[#444]">
                    <Check size={16} className="text-primary-green shrink-0" /> <span>Cronograma de alimentación</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm font-bold text-[#444]">
                    <Check size={16} className="text-primary-green shrink-0" /> <span>Acceso de por vida</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm font-bold text-gray-300">
                    <span className="text-gray-300 font-black w-4 text-center">X</span>
                    <span>Sin los bonus</span>
                  </li>
                </ul>
                
                <div className="text-center mb-8">
                  <p className="text-gray-300 line-through text-sm font-bold">$35.000</p>
                  <p className="text-5xl font-display font-black text-[#555] mb-1">$14.000</p>
                  <p className="text-[10px] font-bold text-[#555] tracking-widest uppercase">PESOS COLOMBIANOS</p>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = 'https://pay.hotmart.com/D105724335A?off=5u1btmc4'}
                  className="w-full py-5 rounded-xl font-display font-black uppercase text-primary-green bg-[#E8F5EE] hover:bg-[#D4EADE] transition-colors"
                >
                  COMPRAR BÁSICO
                </motion.button>
              </div>

            </div>
            
            <p className="mt-12 text-center text-[12px] text-gray-500 flex items-center justify-center gap-2">
              <Lock size={12} className="text-accent-orange" />
              <span>Compra segura · Acceso inmediato por e-mail · Garantía 7 días</span>
            </p>
          </div>
        </section>

        <Separator />

        {/* SECCIÓN 8: DEPOIMENTOS */}
        <Section>
          <h2 className="text-3xl font-black text-center mb-10">
            Lo que dicen quienes ya lo tienen:
          </h2>
          <div className="flex flex-col gap-6">
            {[
              { initial: "V", name: "Valentina M.", city: "Medellín", text: "Llevo 3 semanas usando las recetas y ya bajé 3 kilos. Lo mejor es que no gasté más en el mercado, al contrario." },
              { initial: "A", name: "Andrés C.", city: "Bogotá", text: "Tenía una relación pésima con la comida sana. Ahora disfruto cada plato. De una lo recomiendo a todos mis parceros del gym." },
              { initial: "L", name: "Laura P.", city: "Cali", text: "Con el plan semanal organicé toda mi alimentación en un domingo. Ahorro tiempo, plata y ya no como porquerías." }
            ].map((dep, idx) => (
              <Card key={idx}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center text-white font-bold font-display">
                    {dep.initial}
                  </div>
                  <div>
                    <div className="flex text-accent-orange mb-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-xs font-bold">{dep.name}, {dep.city}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic text-sm leading-relaxed">"{dep.text}"</p>
              </Card>
            ))}
          </div>
        </Section>

        <Separator />

        {/* SECCIÓN 9: GARANTIA */}
        <Section bgColor="bg-bg-secondary" className="text-center">
          <div className="mb-6 flex justify-center">
             <div className="p-4 bg-white rounded-full shadow-inner border-2 border-primary-green/20">
               <Lock size={48} className="text-primary-green" />
             </div>
          </div>
          <h2 className="text-3xl font-black mb-4">Garantía Total de 7 Días</h2>
          <p className="text-gray-700 leading-relaxed max-w-[500px] mx-auto">
            Si después de ver el contenido sentís que no valió la pena, te devolvemos el dinero completo. 
            Sin preguntas, sin enredos. Solo mandás un mensaje y listo. El riesgo es completamente nuestro.
          </p>
        </Section>

        <Separator />

        {/* SECCIÓN 10: FAQ */}
        <Section>
          <h2 className="text-3xl font-black text-center mb-10">Preguntas Frecuentes</h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-border-soft rounded-lg overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-bg-secondary transition-colors"
                >
                  <span className="font-bold pr-4">{faq.q}</span>
                  <ChevronDown className={`shrink-0 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} size={20} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 text-gray-600 text-sm border-t border-border-soft bg-white">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Section>

        {/* SECCIÓN 11: CTA FINAL */}
        <section className="bg-primary-green text-white py-16 px-4 text-center">
          <div className="max-w-[640px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-4">¿Listo para cambiar tu alimentación, {userName}?</h2>
            <p className="text-white/80 font-semibold mb-10">Más de 1.200 colombianos ya transformaron su forma de comer. ¿Y vos?</p>
            <div className="inline-block bg-white/10 px-6 py-2 rounded-full font-display font-black text-2xl mb-8">
              <span className="opacity-50 line-through mr-3">$50.000</span>
              <span>$20.000 COP</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-primary-green w-full py-5 px-8 rounded-lg font-display font-black text-xl uppercase tracking-widest shadow-xl flex items-center justify-center gap-3"
            >
              <ArrowRight size={24} /> Quiero mis recetas ahora
            </motion.button>
            <p className="mt-6 text-xs font-bold text-white/60 uppercase tracking-widest flex items-center justify-center gap-2">
              <Lock size={12} /> Compra segura · Acceso inmediato · Garantía 7 días
            </p>
          </div>
        </section>

      </main>

      {/* RODAPÉ */}
      <footer className="bg-[#1A1A1A] text-white py-12 px-4 text-center">
        <div className="max-w-[640px] mx-auto flex flex-col gap-8">
          <p className="opacity-60 text-sm">© 2025 Recetas Fit Colombia — Todos los derechos reservados</p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-white/40 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Soporte</a>
          </div>

        </div>
      </footer>

    </div>
  );
}
