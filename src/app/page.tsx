"use client";

import React, { useState, useEffect } from "react";

interface Task {
  id: string;
  phaseId: number;
  phaseName: string;
  title: string;
  feynmanConcept: string;
  action: string;
  feynmanCheck: string;
  warning?: string;
}

const ONBOARDING_TASKS: Task[] = [
  // FASE 1
  {
    id: "1.1",
    phaseId: 1,
    phaseName: "Fase 1: Postulación",
    title: "1.1 Blindaje del Patrocinador (Sponsor)",
    feynmanConcept:
      "Imagina que vas a una fiesta exclusiva con lista en la puerta: si no dices quién te invitó antes de entrar, la puerta se cierra y te asignan a otra mesa de por vida. En eXp, tu patrocinador es permanente y no se puede corregir después.",
    action:
      'Al completar tu postulación (Join App), busca el campo "Who is your sponsor?" y escribe con exactitud el nombre completo y correo de tu sponsor directo dentro de la Organización GOLD by Virginia Restrepo.',
    feynmanCheck:
      '¿Le enviaste una captura de pantalla a tu sponsor confirmando su nombre en esa casilla antes de hacer clic en "Enviar"?',
    warning: "Si envías sin sponsor o con un error tipográfico, no pertenecerás al equipo de Virginia Restrepo.",
  },
  {
    id: "1.2",
    phaseId: 1,
    phaseName: "Fase 1: Postulación",
    title: "1.2 Expediente Legal y Fiscal (Sin Jerga)",
    feynmanConcept:
      "La compañía necesita verificar que eres una persona real, con facultades comerciales en tu país y con una cuenta bancaria lista para recibir transferencias legales de comisiones.",
    action:
      "Prepara en formato PDF legible tu documento de identidad vigente (DNI/Cédula/RUT), constancia fiscal de tu país (SAT en México, DIAN en Colombia, SII en Chile, etc.) y certificado bancario a tu nombre.",
    feynmanCheck:
      "Si abres cada archivo en la pantalla de tu teléfono a oscuras, ¿se leen todos los números y letras sin hacer esfuerzo visual?",
  },
  // FASE 2
  {
    id: "2.1",
    phaseId: 2,
    phaseName: "Fase 2: Contrato ICA",
    title: "2.1 Comprender el Modelo 80/20 y el Cap Anual",
    feynmanConcept:
      'Tú eres dueño de tu negocio. De cada 100 que cobras, 80 son tuyos y 20 financian la nube de eXp. En cuanto esos 20 suman la cuota tope anual de tu país ("Cap"), eXp ya no retiene nada y te llevas el 100% de tus comisiones.',
    action:
      "Abre el borrador de tu contrato ICA (Independent Contractor Agreement) que llega a tu correo y localiza tres números: tu Cap anual, tu cuota mensual de tecnología y el split 80/20.",
    feynmanCheck:
      '¿Puedes explicarle este modelo a un familiar de 10 años en una sola oración sencilla sin trabarte?',
  },
  {
    id: "2.2",
    phaseId: 2,
    phaseName: "Fase 2: Contrato ICA",
    title: "2.2 Firma Digital y Validación de Broker",
    feynmanConcept:
      "Es el apretón de manos formal. Al firmar digitalmente, el Broker Titular de tu país verifica tus antecedentes y coloca el sello oficial de entrada en el sistema.",
    action:
      "Firma todas las iniciales y campos requeridos vía DocuSign o SignNow. Revisa tu bandeja de entrada hasta que el documento cambie a estado completado.",
    feynmanCheck:
      '¿Tienes en tu correo el PDF final con el sello que dice "Completed / Signed by all parties"?',
  },
  // FASE 3
  {
    id: "3.1",
    phaseId: 3,
    phaseName: "Fase 3: Activación",
    title: "3.1 Tu Llave Digital: eXp Passport y Correo Oficial",
    feynmanConcept:
      "Es tu documento de identidad digital. Una sola contraseña te abre la oficina virtual, la intranet, las capacitaciones y el correo corporativo en todo el mundo.",
    action:
      "Activa tu cuenta de Google Workspace con tu nuevo correo corporativo (@exprealty.com) y configura la contraseña con verificación en dos pasos en tu teléfono.",
    feynmanCheck:
      "Abre una ventana de incógnito en tu navegador e inicia sesión en Gmail con tu usuario @exprealty.com. ¿Entraste a la primera?",
  },
  {
    id: "3.2",
    phaseId: 3,
    phaseName: "Fase 3: Activación",
    title: "3.2 Ingreso a Workplace y a la Comunidad GOLD",
    feynmanConcept:
      "Workplace es el edificio de oficinas pero en formato red social. Aquí conviven las noticias del corporativo y la sala de estrategia privada del equipo GOLD.",
    action:
      "Descarga la app Workplace en tu teléfono y computadora. Ingresa con tu eXp Passport y pide acceso a los grupos de tu país y al grupo oficial Organización GOLD by Virginia Restrepo.",
    feynmanCheck:
      '¿Escribiste tu mensaje de presentación en el grupo GOLD diciendo tu nombre, país y quién es tu sponsor?',
  },
  {
    id: "3.3",
    phaseId: 3,
    phaseName: "Fase 3: Activación",
    title: "3.3 Entrada al Campus Virtual (eXp World)",
    feynmanConcept:
      "El campus de eXp no tiene cemento ni ladrillos: está en una aplicación 3D. Entras como un avatar para hablar con contabilidad, soporte técnico o brokers en tiempo real.",
    action:
      "Descarga el software de eXp World en tu ordenador, crea tu avatar y visita la sala de operaciones del Broker de tu país.",
    feynmanCheck:
      "¿Caminaste con tu avatar hasta el auditorio principal y confirmaste que tu micrófono y auriculares funcionan?",
  },
  {
    id: "3.4",
    phaseId: 3,
    phaseName: "Fase 3: Activación",
    title: "3.4 Sesión de Despegue con tu Mentor GOLD",
    feynmanConcept:
      "Aprender a manejar no se logra leyendo el manual: se logra subiéndose al auto con un conductor experimentado al lado. Esta sesión fija tu rumbo para tus primeras ventas.",
    action:
      "Agenda tu reunión 1 a 1 de arranque con tu sponsor o líder designado de la Organización GOLD para crear tu plan de los primeros 30 días.",
    feynmanCheck:
      "¿Tienes ya escrita en papel una lista con tus primeros 20 contactos y la fecha exacta de tu primera capacitación de ventas?",
  },
];

export default function GoldOnboardingGuide() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<number | "all">("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("gold_onboarding_feynman_progress");
    if (saved) {
      try {
        setCompleted(JSON.parse(saved));
      } catch {
        setCompleted([]);
      }
    }
  }, []);

  const toggleTask = (id: string) => {
    const updated = completed.includes(id)
      ? completed.filter((item) => item !== id)
      : [...completed, id];
    setCompleted(updated);
    localStorage.setItem("gold_onboarding_feynman_progress", JSON.stringify(updated));
  };

  const resetProgress = () => {
    if (confirm("¿Deseas reiniciar tu progreso en la guía?")) {
      setCompleted([]);
      localStorage.removeItem("gold_onboarding_feynman_progress");
    }
  };

  const total = ONBOARDING_TASKS.length;
  const progressPercent = Math.round((completed.length / total) * 100);

  const filteredTasks =
    activeTab === "all"
      ? ONBOARDING_TASKS
      : ONBOARDING_TASKS.filter((t) => t.phaseId === activeTab);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24">
      {/* Cabecera Principal */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Organización GOLD
              </span>
              <span className="text-xs text-slate-400 font-medium">by Virginia Restrepo</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-0.5">
              Guía de Onboarding Feynman
            </h1>
            <p className="text-xs text-slate-400">
              Paso a paso para incorporarte a eXp Realty sin tecnicismos ni confusiones.
            </p>
          </div>

          {/* Barra de progreso global */}
          <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl min-w-[240px]">
            <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
              <span className="text-slate-400">Progreso general</span>
              <span className="font-bold text-amber-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
              <span>{completed.length} de {total} completados</span>
              {completed.length > 0 && (
                <button
                  onClick={resetProgress}
                  className="text-slate-400 hover:text-rose-400 underline decoration-dotted transition"
                >
                  Reiniciar
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Selector de Fases */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 mt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === "all"
                ? "bg-amber-500 text-slate-950 font-bold"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            Todas las fases ({total})
          </button>
          <button
            onClick={() => setActiveTab(1)}
            className={`px-3 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === 1
                ? "bg-amber-500 text-slate-950 font-bold"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            Fase 1: Postulación
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`px-3 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === 2
                ? "bg-amber-500 text-slate-950 font-bold"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            Fase 2: Contrato ICA
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className={`px-3 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === 3
                ? "bg-amber-500 text-slate-950 font-bold"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            Fase 3: Activación
          </button>
        </div>
      </div>

      {/* Lista de Tareas Interactivas */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 mt-6 space-y-5">
        {filteredTasks.map((task) => {
          const isDone = completed.includes(task.id);
          return (
            <article
              key={task.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isDone
                  ? "bg-slate-900/40 border-emerald-900/40"
                  : "bg-slate-900 border-slate-800 hover:border-slate-700 shadow-xl"
              }`}
            >
              <div className="p-5 sm:p-6">
                {/* Cabecera del ítem */}
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    aria-label={`Marcar ${task.title}`}
                    className={`mt-1 flex-shrink-0 w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                      isDone
                        ? "bg-emerald-500 border-emerald-500 text-slate-950"
                        : "bg-slate-950 border-slate-700 hover:border-amber-400"
                    }`}
                  >
                    {isDone && (
                      <svg className="w-4 h-4 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        {task.phaseName}
                      </span>
                      {isDone && (
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.2 rounded font-semibold">
                          Completado
                        </span>
                      )}
                    </div>
                    <h2
                      onClick={() => toggleTask(task.id)}
                      className={`text-base sm:text-lg font-bold cursor-pointer transition ${
                        isDone ? "text-slate-400 line-through" : "text-white hover:text-amber-400"
                      }`}
                    >
                      {task.title}
                    </h2>

                    {/* Explicación en lenguaje simple (Método Feynman) */}
                    <div className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                      <span className="text-amber-400 font-bold block mb-1 text-[11px] uppercase tracking-wider">
                        💡 ¿Qué significa esto en simple?
                      </span>
                      {task.feynmanConcept}
                    </div>

                    {/* Alerta si aplica */}
                    {task.warning && !isDone && (
                      <div className="mt-3 text-xs text-rose-300 bg-rose-950/20 border border-rose-900/50 p-3 rounded-lg flex items-center gap-2">
                        <span>⚠️</span>
                        <span>{task.warning}</span>
                      </div>
                    )}

                    {/* Acción Requerida */}
                    <div className="mt-3 text-xs sm:text-sm text-slate-300">
                      <strong className="text-slate-200">Acción:</strong> {task.action}
                    </div>

                    {/* Pregunta de Verificación Feynman */}
                    <div
                      className={`mt-4 p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition ${
                        isDone
                          ? "bg-emerald-950/10 border-emerald-900/30 text-emerald-300"
                          : "bg-amber-950/20 border-amber-900/40 text-amber-200"
                      }`}
                    >
                      <span className="text-base shrink-0">🎯</span>
                      <div>
                        <span className="font-bold uppercase tracking-wider text-[10px] block mb-0.5">
                          Prueba de Control Feynman
                        </span>
                        <span>{task.feynmanCheck}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {/* Tarjeta de Felicitación al completar el 100% */}
        {progressPercent === 100 && (
          <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 text-center space-y-3 shadow-2xl">
            <span className="text-4xl block">🚀</span>
            <h2 className="text-2xl font-bold text-amber-400">¡Onboarding Oficialmente Completado!</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Has cubierto todos los pasos técnicos y operativos para pertenecer formalmente a la{" "}
              <strong className="text-white">Organización GOLD by Virginia Restrepo</strong> en eXp Realty.
            </p>
            <p className="text-xs text-amber-300/80 font-medium">
              Tu siguiente paso es asistir a la próxima reunión semanal de inducción y estrategia de equipo.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}