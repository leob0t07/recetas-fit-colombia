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
  Coffee
} from 'lucide-react';

// --- Components ---

const Button: React.FC<{ children: ReactNode, className?: string, primary?: boolean, onClick?: () => void }> = ({ children, className = "", primary = true, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(45, 134, 83, 0.3)" }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full py-4 px-8 rounded-lg font-display font-bold uppercase tracking-wider text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
      primary 
        ? "bg-primary-green text-white hover:bg-dark-green" 
        : "bg-white text-primary-green border-2 border-primary-green hover:bg-bg-secondary"
    } ${className}`}
  >
    <ArrowRight size={20} />
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

  return (
    <div className="min-h-screen">
      
      {/* SECCIÓN 1: BARRA DE URGÊNCIA (SIN TIMER) */}
      <div className="fixed top-0 left-0 w-full bg-accent-orange text-white py-2 z-50 shadow-md text-center">
        <div className="px-2 flex items-center justify-center gap-2 font-display text-[11px] sm:text-xs md:text-sm font-bold">
          <span>Esta promoción acaba hoy - {formattedDate}</span>
        </div>
      </div>

      <main className="pt-[40px]">
        
        {/* SECCIÓN 2: HERO */}
        <Section className="text-center">
          <div className="flex flex-col gap-8 items-center">
            {/* Headline y Sub ocupando todo el ancho arriba */}
            <div className="w-full flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                +275 Recetas <span className="text-primary-green">Fitness</span>
              </h1>
              <p className="text-lg md:text-xl font-bold text-gray-700">
                Prácticas y Económicas
              </p>
              <p className="text-gray-600 italic">
                Come rico, come sano y ahorra plata — sin complicaciones
              </p>
              <div className="flex items-center justify-center gap-1 text-accent-orange">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                <span className="text-xs md:text-sm text-gray-500 ml-2 font-bold">+1.200 personas ya lo tienen</span>
              </div>
            </div>

            {/* Imagem do Ebook centralizada */}
            <div className="w-full max-w-[500px] mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative group bg-border-soft">
                <img 
                  src="/ebook_mockup.png" 
                  alt="+275 Recetas Fitness Mockup" 
                  className="w-full h-auto block"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback if the image is not found
                    e.currentTarget.src = "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-primary-green/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            {/* Botão de ação principal */}
            <div className="w-full">
              <Button 
                className="mt-2"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Quiero mis recetas ahora
              </Button>
              <p className="mt-3 text-[10px] md:text-xs text-gray-400 flex items-center justify-center gap-1">
                <Lock size={12} /> Compra 100% segura · Acceso inmediato · Garantía 7 días
              </p>
            </div>
          </div>
        </Section>

        <Separator />

        {/* SECCIÓN 3: DORES */}
        <Section bgColor="bg-bg-secondary">
          <h2 className="text-3xl font-black text-accent-orange text-center mb-8">
            🔥 ¿Te pasa esto todos los días?
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
                name: "Arepas Proteicas con Huevo", 
                time: "15 min", 
                img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&q=80",
                kcal: "320 kcal",
                prot: "22g prot"
              },
              { 
                name: "Ensalada de Pollo con Aguacate", 
                time: "20 min", 
                img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
                kcal: "380 kcal",
                prot: "34g prot"
              },
              { 
                name: "Bowl de Atún con Quinua", 
                time: "25 min", 
                img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
                kcal: "410 kcal",
                prot: "38g prot"
              },
              { 
                name: "Tortilla Fitness de Avena", 
                time: "10 min", 
                img: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80",
                kcal: "290 kcal",
                prot: "18g prot"
              },
              { 
                name: "Sopa de Lentejas con Pollo", 
                time: "30 min", 
                img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
                kcal: "360 kcal",
                prot: "31g prot"
              },
              { 
                name: "Wraps de Lechuga con Carne Magra", 
                time: "20 min", 
                img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80",
                kcal: "340 kcal",
                prot: "29g prot"
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
        <Section id="pricing" bgColor="bg-price-block" className="px-2">
          <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center">
            
            {/* PLAN COMPLETO (DESTACADO) */}
            <div className="flex-1 relative bg-white border-2 border-orange-500 rounded-2xl shadow-xl flex flex-col overflow-visible max-w-[340px] mx-auto md:mx-0">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap z-10">
                MÁS POPULAR
              </div>
              <div className="bg-orange-500 text-white py-3 px-4 text-center font-display font-black text-sm uppercase tracking-wider rounded-t-[14px]">
                SUPER OFERTA
              </div>
              
              <div className="p-6 flex flex-col grow">
                <h3 className="text-primary-green font-display font-black text-center text-sm mb-4">
                  + de 275 variedad de Recetas<br/>
                  <span className="text-xl">COMPLETO</span>
                </h3>
                
                <div className="flex flex-col gap-2 mb-6">
                  {[
                    "Recetas Fitness (para secar o ganar masa)",
                    "Lista de compras inteligente",
                    "Cronograma de alimentación",
                    "Acceso de por vida + Actualizaciones",
                    "Entrega inmediata por e-mail"
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2 items-start text-[11px] font-medium text-gray-700">
                      <Check size={14} className="text-primary-green shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 mb-8">
                  {[
                    "Guía de Meriendas Saludables y Económicas",
                    "Plan de Organización Semanal",
                    "Lista Inteligente de Sustituciones",
                    "Planner de Comidas Imprimible",
                    "Guía de Cenas para Desinflamar"
                  ].map((bonus, i) => (
                    <div key={i} className="bg-orange-50/50 p-2 rounded-lg flex gap-2 items-center text-[10px] font-bold text-gray-700 border border-orange-100">
                      <span className="shrink-0">🎁</span>
                      <span className="leading-tight">{bonus}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto text-center">
                  <p className="text-red-500 line-through text-[10px] font-bold opacity-60">$50.000</p>
                  <p className="text-gray-500 text-[10px] font-medium -mt-1">Pago único</p>
                  <p className="text-4xl font-display font-black text-primary-green my-1">$20.000</p>
                  <p className="text-[10px] font-bold text-gray-400 mb-4">PESOS COLOMBIANOS</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = 'https://pay.hotmart.com/D105724335A?off=z7t9p2n3'}
                    className="w-full bg-gradient-to-r from-primary-green to-yellow-500 text-white font-display font-black py-4 rounded-full text-sm uppercase tracking-widest shadow-lg mb-3"
                  >
                    ¡COMPRAR AHORA!
                  </motion.button>
                  
                  <div className="flex justify-center gap-4 text-[9px] font-bold text-gray-400 uppercase">
                    <span className="flex items-center gap-1"><Lock size={10} /> Compra Segura</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> Garantía 7 días</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PLAN BÁSICO */}
            <div className="flex-1 bg-white border border-border-soft rounded-2xl shadow-lg flex flex-col max-w-[340px] mx-auto md:mx-0">
              <div className="bg-blue-500 text-white py-3 px-4 text-center font-display font-black text-sm uppercase tracking-wider rounded-t-2xl">
                OFERTA BÁSICA
              </div>
              
              <div className="p-6 flex flex-col grow">
                <h3 className="text-primary-green font-display font-black text-center text-sm mb-4">
                  + de 275 variedad de Recetas
                </h3>
                
                <div className="flex flex-col gap-3 mb-8">
                  {[
                    "Recetas Fitness (para secar o ganar masa)",
                    "Lista de compras",
                    "Cronograma de alimentación",
                    "Acceso de por vida",
                    "Entrega inmediata por e-mail"
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2 items-start text-[11px] font-medium text-gray-700">
                      <Check size={14} className="text-primary-green shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto text-center">
                  <p className="text-red-500 line-through text-[10px] font-bold opacity-60">$35.000</p>
                  <p className="text-gray-500 text-[10px] font-medium -mt-1">Pago único</p>
                  <p className="text-4xl font-display font-black text-primary-green my-1">$14.000</p>
                  <p className="text-[10px] font-bold text-gray-400 mb-4">PESOS COLOMBIANOS</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = 'https://pay.hotmart.com/D105724335A?off=5u1btmc4'}
                    className="w-full bg-gradient-to-r from-primary-green to-yellow-500 text-white font-display font-black py-4 rounded-full text-sm uppercase tracking-widest shadow-lg mb-3"
                  >
                    ¡COMPRAR AHORA!
                  </motion.button>
                  
                  <div className="flex justify-center gap-4 text-[9px] font-bold text-gray-400 uppercase">
                    <span className="flex items-center gap-1"><Lock size={10} /> Compra Segura</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> Garantía 7 días</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Section>

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
            <h2 className="text-3xl md:text-4xl font-black mb-4">¿Listo para cambiar tu alimentación?</h2>
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
          <div className="pt-4 border-t border-white/10">
            <p className="text-xs font-black uppercase tracking-[3px] opacity-20">Powered by Hotmart</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
