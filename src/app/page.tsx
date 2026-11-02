"use client";

import React, { useState, useEffect } from "react";

interface LinkItem {
  url: string;
  label: string;
}

interface Task {
  id: string;
  phaseId: number;
  phaseName: string;
  title: string;
  feynmanConcept: string;
  action: string;
  feynmanCheck: string;
  warning?: string;
  links?: LinkItem[];
}

const ONBOARDING_TASKS: Task[] = [
  // FASE 1: POSTULACIÓN
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
    links: [{ url: "https://joinapp.exprealty.com/", label: "Abrir eXp Join App" }]
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

  // FASE 2: CONTRATO ICA
  {
    id: "2.1",
    phaseId: 2,
    phaseName: "Fase 2: Contrato ICA",
    title: "2.1 Comprender el Modelo 75/25, el Cap Anual y el 5% Post-Cap",
    feynmanConcept:
      'Tú eres dueño de tu negocio. De cada 100 que cobras, 75 son tuyos y 25 financian la nube de eXp. En cuanto esos 25 acumulan el tope anual de tu país ("Cap"), ya no te descuentan el 25%: únicamente se aplica un cobro por transacción del 5% por cada cierre subsecuente (te quedas con el 95% neto de la comisión).',
    action:
      "Abre el borrador de tu contrato ICA (Independent Contractor Agreement) que llega a tu correo y localiza cuatro datos: tu Cap anual, tu cuota mensual de tecnología, el split 75/25 y el cobro del 5% por transacción post-Cap.",
    feynmanCheck:
      '¿Puedes explicarle este modelo a un familiar en una sola oración?: "Gano el 75% hasta alcanzar mi tope anual (Cap); después de eso gano el 95% porque eXp solo cobra el 5% por transacción".',
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

  // FASE 3: ACTIVACIÓN Y COMUNIDAD
  {
    id: "3.1",
    phaseId: 3,
    phaseName: "Fase 3: Activación",
    title: "3.1 Tu Llave Digital: eXp Passport y Correo de País",
    feynmanConcept:
      "Es tu documento de identidad digital. En eXp CALA, cada país cuenta con su propio dominio oficial según la filial local (ej. @expcolombiaci.co en Colombia, @expchile.cl en Chile, @expmexico.mx en México, etc.). Con esta cuenta y tu eXp Passport accedes al ecosistema centralizado en Okta.",
    action:
      "Revisa tu correo personal, ubica la bienvenida de Onboarding donde viene tu usuario institucional local y actívalo iniciando sesión en Okta configurando la verificación en dos pasos en tu teléfono.",
    feynmanCheck:
      "Abre una ventana de incógnito en tu navegador e inicia sesión en Okta con tus credenciales de eXp Passport. ¿Entraste a la primera?",
    links: [{ url: "https://exprealty.okta.com/", label: "Log in to your Okta org" }]
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
    links: [{ url: "https://exp.workplace.com/", label: "Abrir eXp Workplace" }]
  },
  {
    id: "3.3",
    phaseId: 3,
    phaseName: "Fase 3: Activación",
    title: "3.3 Sesión de Despegue con tu Mentor GOLD",
    feynmanConcept:
      "Aprender a manejar no se logra leyendo el manual: se logra subiéndose al auto con un conductor experimentado al lado. Esta sesión fija tu rumbo para tus primeras ventas.",
    action:
      "Agenda tu reunión 1 a 1 de arranque con tu sponsor o líder designado de la Organización GOLD para crear tu plan de los primeros 30 días.",
    feynmanCheck:
      "¿Tienes ya escrita en papel una lista con tus primeros 20 contactos y la fecha exacta de tu primera capacitación de ventas?",
  },

  // FASE 4: HERRAMIENTAS DE GESTIÓN Y FINANZAS
  {
    id: "4.1",
    phaseId: 4,
    phaseName: "Fase 4: Finanzas y Negocio",
    title: "4.1 My eXp 3.0: Tu Tablero de Control Financiero",
    feynmanConcept:
      "Es el velocímetro y medidor de gasolina de tu empresa inmobiliaria. En una sola pantalla ves cuánto has vendido, cuánto te falta exactamente para completar tu Cap anual del 75/25 y cuánto dinero has generado por comisiones de equipo (Revenue Share).",
    action:
      "Ingresa a My eXp 3.0 desde tu panel de aplicaciones Okta/SSO con tu eXp Passport y revisa la sección 'My Dashboard' y el módulo de comisiones.",
    feynmanCheck:
      "¿Pudiste entrar a My eXp 3.0, ubicar el gráfico de tu Cap anual y corroborar que tu nombre y sponsor figuran correctamente?",
    links: [
      { url: "https://enterprise.exprealty.com/", label: "Abrir eXp Enterprise (My eXp)" },
      { url: "https://exprealty.okta.com/", label: "Acceso global vía Okta" }
    ]
  },
  {
    id: "4.2",
    phaseId: 4,
    phaseName: "Fase 4: Finanzas y Negocio",
    title: "4.2 Agent Stock Programs: Conviértete en Socio de eXp",
    feynmanConcept:
      "En lugar de solo recibir dinero en efectivo, eXp te permite comprar acciones de la compañía pública matriz (NASDAQ: EXPI) con un 10% de descuento directo sobre el precio de mercado, usando el 5% de tus comisiones ganadas.",
    action:
      "Abre el módulo 'Agent Stock Programs' en tu portal de trabajo y confirma tu inscripción al programa de compra de acciones con descuento para tus futuros cierres.",
    feynmanCheck:
      "¿Comprendes cómo el 10% de descuento en la compra de acciones EXPI se convierte en ganancia patrimonial instantánea y pudiste verificar tu estado activo en el programa?",
    links: [{ url: "https://enterprise.exprealty.com/", label: "Activar en eXp Enterprise" }]
  },
  {
    id: "4.3",
    phaseId: 4,
    phaseName: "Fase 4: Finanzas y Negocio",
    title: "4.3 Morgan Stanley at Work: Tu Bóveda de Acciones en Wall Street",
    feynmanConcept:
      "Es tu cuenta de custodia bursátil oficial en Estados Unidos. Las acciones que compras con descuento o que eXp te premia por metas de ventas se custodian aquí bajo tu propio número de cuenta regulada.",
    action:
      "Accede a Morgan Stanley at Work (Shareworks), completa el registro de seguridad inicial y valida tus datos de identidad para dejar activada tu cuenta de valores.",
    feynmanCheck:
      "¿Iniciaste sesión con éxito en Morgan Stanley at Work y puedes ver tu panel de portafolio patrimonial listo?",
    links: [{ url: "https://shareworks.solium.com/", label: "Abrir Morgan Stanley (Shareworks)" }]
  },

  // FASE 5: CAMPUS VIRTUAL, COMUNICACIÓN Y SOPORTE
  {
    id: "5.1",
    phaseId: 5,
    phaseName: "Fase 5: Campus y Soporte",
    title: "5.1 exp.world: Tu Oficina Virtual en el Metaverso 3D",
    feynmanConcept:
      "Olvídate de pagar arriendos o gastar gasolina para ir a una oficina física. exp.world es un campus 3D inmersivo donde caminas con tu propio avatar y entras a las oficinas del Broker, Contabilidad o Soporte en tiempo real.",
    action:
      "Descarga la aplicación exp.world en tu computador, personaliza tu avatar y navega hasta el auditorio o el salón de operaciones de tu país.",
    feynmanCheck:
      "¿Ingresaste a exp.world con tu avatar, encendiste tu micrófono y comprobaste que puedes escuchar e interactuar con el personal de soporte?",
    links: [{ url: "https://exp.world/", label: "Descargar / Entrar a eXp World" }]
  },
  {
    id: "5.2",
    phaseId: 5,
    phaseName: "Fase 5: Campus y Soporte",
    title: "5.2 eXp Hub: La Intranet y Tablón Global",
    feynmanConcept:
      "Es el periódico mural y centro de mando digital de la empresa. En lugar de buscar entre cientos de correos perdidos, aquí encuentras los comunicados oficiales, directivas corporativas y calendarios de eventos en un solo lugar.",
    action:
      "Abre 'eXp Hub' desde tu lanzador de aplicaciones y agrega a tus marcadores favoritos la sección de noticias y eventos correspondientes a la región CALA.",
    feynmanCheck:
      "¿Localizaste en el Hub la sección de noticias corporativas y el calendario de eventos globales?",
    links: [{ url: "https://exprealty.okta.com/", label: "Abrir eXp Hub (vía Okta)" }]
  },
  {
    id: "5.3",
    phaseId: 5,
    phaseName: "Fase 5: Campus y Soporte",
    title: "5.3 Zoho Mail: Correo Institucional de Filial Local",
    feynmanConcept:
      "Es tu buzón de correspondencia comercial formal con extensión de tu país (ej. @expchile.cl). Brinda la seriedad corporativa necesaria para enviar contratos, órdenes de corretaje y ofertas a clientes y bancos locales.",
    action:
      "Ingresa a Zoho Mail con tus credenciales asignadas de país, personaliza tu bandeja de entrada y crea tu firma electrónica con tus teléfonos y logos oficiales.",
    feynmanCheck:
      "¿Te enviaste un correo de prueba a tu cuenta personal desde Zoho Mail y confirmaste que sale con tu firma profesional completa?",
    links: [{ url: "https://mail.zoho.com/", label: "Acceder a Zoho Mail" }]
  },
  {
    id: "5.4",
    phaseId: 5,
    phaseName: "Fase 5: Campus y Soporte",
    title: "5.4 Agent Services: La Ventanilla Oficial de Ayuda y Tickets",
    feynmanConcept:
      "Es el centro de atención al cliente interno de eXp. Si tienes una consulta sobre el estado de pago de una comisión, acreditación de un contrato o necesitas asistencia técnica, abres un ticket formal aquí.",
    action:
      "Entra al portal de Agent Services y familiarízate con las opciones para radicar solicitudes de soporte administrativo, legal y financiero.",
    feynmanCheck:
      "¿Sabes exactamente en qué sección de Agent Services debes ingresar una consulta si necesitas dar seguimiento a una liquidación de comisión?",
    links: [{ url: "https://support.exprealty.com/", label: "Portal de Soporte eXp" }]
  },

  // FASE 6: FORMACIÓN Y CUMPLIMIENTO NORMATIVO
  {
    id: "6.1",
    phaseId: 6,
    phaseName: "Fase 6: Formación y Ética",
    title: "6.1 eXp University & International Training: Tu Universidad Inmobiliaria",
    feynmanConcept:
      "Es como tener una plataforma de streaming educativo con más de 80 horas semanales de clases en vivo y grabadas, dictadas exclusivamente por los agentes con mejores resultados de la industria sobre prospección, negociación y cierres.",
    action:
      "Accede a eXp University e International Training, revisa la parrilla horaria de clases en español de esta semana y selecciona al menos dos sesiones para tu agenda.",
    feynmanCheck:
      "¿Elegiste y agendaste ya en tu calendario dos capacitaciones comerciales de eXp University para esta semana?",
    links: [{ url: "https://expuniversity.com/", label: "Acceder a eXp University" }]
  },
  {
    id: "6.2",
    phaseId: 6,
    phaseName: "Fase 6: Formación y Ética",
    title: "6.2 Agent Compliance Self Service: Cursos Obligatorios de Ética y Ley",
    feynmanConcept:
      "Es el cinturón de seguridad legal de tu negocio. Son cursos breves pero mandatorios que te enseñan cómo evitar sanciones legales (como prevención de lavado de activos y transparencia publicitaria) para blindar tu patrimonio.",
    action:
      "Entra a 'Agent Compliance Self Service - Courses', ubica los módulos asignados a tu cuenta de agente y completa el primer curso mandatorio de inducción ética.",
    feynmanCheck:
      "¿Aprobaste tu primer módulo de compliance en la plataforma y comprobaste que el curso figura como completado en tu expediente?",
    links: [{ url: "https://exprealty.okta.com/", label: "Plataforma de Cursos (Okta)" }]
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
              Guía de Onboarding & Ecosistema de Herramientas
            </h1>
            <p className="text-xs text-slate-400">
              Paso a paso para incorporarte, habilitar tus finanzas, campus 3D y formación en eXp Realty.
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
              <span>{completed.length} de {total} pasos listos</span>
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

      {/* Selector de Fases y Módulos */}
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
            Todos ({total})
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
          <button
            onClick={() => setActiveTab(4)}
            className={`px-3 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === 4
                ? "bg-amber-500 text-slate-950 font-bold"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            Fase 4: Finanzas & Acciones (Pto 1)
          </button>
          <button
            onClick={() => setActiveTab(5)}
            className={`px-3 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === 5
                ? "bg-amber-500 text-slate-950 font-bold"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            Fase 5: Campus & Soporte (Pto 3)
          </button>
          <button
            onClick={() => setActiveTab(6)}
            className={`px-3 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              activeTab === 6
                ? "bg-amber-500 text-slate-950 font-bold"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            Fase 6: Formación & Ética (Pto 5)
          </button>
        </div>
      </div>

      {/* Lista de Tarjetas */}
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

                    {/* Explicación Feynman */}
                    <div className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                      <span className="text-amber-400 font-bold block mb-1 text-[11px] uppercase tracking-wider">
                        💡 ¿Qué significa esto en simple?
                      </span>
                      {task.feynmanConcept}
                    </div>

                    {/* Advertencia si aplica */}
                    {task.warning && !isDone && (
                      <div className="mt-3 text-xs text-rose-300 bg-rose-950/20 border border-rose-900/50 p-3 rounded-lg flex items-center gap-2">
                        <span>⚠️</span>
                        <span>{task.warning}</span>
                      </div>
                    )}

                    {/* Acción requerida y Botones de URL */}
                    <div className="mt-4 p-4 bg-slate-900/80 border border-slate-800/50 rounded-xl">
                      <div className="text-xs sm:text-sm text-slate-300">
                        <strong className="text-slate-200">Acción:</strong> {task.action}
                      </div>
                      
                      {/* Botones de Enlaces */}
                      {task.links && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {task.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 rounded-lg text-xs font-medium transition-colors"
                            >
                              {link.label}
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Test */}
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
                          Test
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

        {/* Felicitación al completar el 100% */}
        {progressPercent === 100 && (
          <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 text-center space-y-3 shadow-2xl">
            <span className="text-4xl block">🚀</span>
            <h2 className="text-2xl font-bold text-amber-400">¡Onboarding y Ecosistema 100% Configurado!</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Has completado todas las etapas de acreditación, activado tus plataformas financieras, tu presencia en el campus 3D y tu plan de capacitaciones en la{" "}
              <strong className="text-white">Organización GOLD by Virginia Restrepo</strong>.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}