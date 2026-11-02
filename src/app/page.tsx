"use client";

import React, { useState } from "react";

// Tipos para el flujo de eXp Realty CALA
type PhaseId = "fase1" | "fase2" | "fase3";
type AgentStatus = "Submitted" | "Waiting for Agent" | "Broker Review" | "Active" | "SLA Warning";

interface Agent {
  id: string;
  name: string;
  email: string;
  country: string;
  phase: PhaseId;
  status: AgentStatus;
  sponsor: string;
  daysInProcess: number;
  slaDaysLimit: number;
  tasksCompleted: number;
  totalTasks: number;
  checklist: { id: string; label: string; done: boolean }[];
}

const INITIAL_AGENTS: Agent[] = [
  {
    id: "EXP-101",
    name: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    country: "México",
    phase: "fase1",
    status: "Submitted",
    sponsor: "Roberto Gómez (eXp MX)",
    daysInProcess: 4,
    slaDaysLimit: 30,
    tasksCompleted: 3,
    totalTasks: 4,
    checklist: [
      { id: "c1", label: "Formulario de postulación completo", done: true },
      { id: "c2", label: "Validación de patrocinador / Sponsor activo", done: true },
      { id: "c3", label: "Carga de documento de identidad oficial", done: true },
      { id: "c4", label: "Validación de antecedentes legales", done: false },
    ],
  },
  {
    id: "EXP-102",
    name: "Mariana Restrepo",
    email: "mariana.r@email.com",
    country: "Colombia",
    phase: "fase2",
    status: "SLA Warning",
    sponsor: "Diana Castro (eXp CO)",
    daysInProcess: 6,
    slaDaysLimit: 5, // SLA ICA crítico: 5 días hábiles
    tasksCompleted: 2,
    totalTasks: 4,
    checklist: [
      { id: "c1", label: "Generación de contrato ICA independiente", done: true },
      { id: "c2", label: "Envío para firma digital (DocuSign)", done: true },
      { id: "c3", label: "Firma completada por el agente", done: false },
      { id: "c4", label: "Aprobación final de Legal / Broker titular", done: false },
    ],
  },
  {
    id: "EXP-103",
    name: "Sebastián Vidal",
    email: "s.vidal@email.com",
    country: "Chile",
    phase: "fase3",
    status: "Waiting for Agent",
    sponsor: "Rodrigo Parra (eXp CL)",
    daysInProcess: 12,
    slaDaysLimit: 45,
    tasksCompleted: 3,
    totalTasks: 5,
    checklist: [
      { id: "c1", label: "Aprovisionamiento correo @exprealty.com", done: true },
      { id: "c2", label: "Activación de licencia eXp World", done: true },
      { id: "c3", label: "Alta en Workplace y grupos oficiales CALA", done: true },
      { id: "c4", label: "Asignación de mentor de inducción", done: false },
      { id: "c5", label: "Sesión de bienvenida completada", done: false },
    ],
  },
  {
    id: "EXP-104",
    name: "Ana Sofía Herrera",
    email: "ana.herrera@email.com",
    country: "Panamá",
    phase: "fase3",
    status: "Active",
    sponsor: "Carlos Morales (eXp PA)",
    daysInProcess: 18,
    slaDaysLimit: 120,
    tasksCompleted: 5,
    totalTasks: 5,
    checklist: [
      { id: "c1", label: "Aprovisionamiento correo @exprealty.com", done: true },
      { id: "c2", label: "Activación de licencia eXp World", done: true },
      { id: "c3", label: "Alta en Workplace y grupos oficiales CALA", done: true },
      { id: "c4", label: "Asignación de mentor de inducción", done: true },
      { id: "c5", label: "Sesión de bienvenida completada", done: true },
    ],
  },
];

export default function OnboardingDashboard() {
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [filterPhase, setFilterPhase] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const filteredAgents = agents.filter((agent) => {
    const matchesPhase = filterPhase === "all" || agent.phase === filterPhase;
    const matchesSearch =
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.country.toLowerCase().includes(search.toLowerCase()) ||
      agent.id.toLowerCase().includes(search.toLowerCase());
    return matchesPhase && matchesSearch;
  });

  const toggleChecklist = (taskId: string) => {
    if (!selectedAgent) return;
    const updatedChecklist = selectedAgent.checklist.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );
    const completedCount = updatedChecklist.filter((t) => t.done).length;

    const updatedAgent: Agent = {
      ...selectedAgent,
      checklist: updatedChecklist,
      tasksCompleted: completedCount,
      status: completedCount === selectedAgent.totalTasks && selectedAgent.phase === "fase3" ? "Active" : selectedAgent.status,
    };

    setSelectedAgent(updatedAgent);
    setAgents(agents.map((a) => (a.id === updatedAgent.id ? updatedAgent : a)));
  };

  const advancePhase = (agent: Agent) => {
    let nextPhase: PhaseId = agent.phase;
    if (agent.phase === "fase1") nextPhase = "fase2";
    else if (agent.phase === "fase2") nextPhase = "fase3";

    const updated = {
      ...agent,
      phase: nextPhase,
      status: nextPhase === "fase3" ? ("Waiting for Agent" as AgentStatus) : ("Submitted" as AgentStatus),
    };
    setSelectedAgent(updated);
    setAgents(agents.map((a) => (a.id === updated.id ? updated : a)));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Barra superior de navegación */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-lg">
            eXp
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              Onboarding OS <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded">CALA Region</span>
            </h1>
            <p className="text-xs text-slate-400">Plataforma de Integración y Acreditación de Agentes</p>
          </div>
        </div>

        {/* Vigencias informativas por país */}
        <div className="hidden lg:flex items-center gap-3 text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
          <span className="text-slate-500 font-medium">Vigencias CALA:</span>
          <span className="bg-slate-800 px-2 py-0.5 rounded">🇲🇽 México: 30d</span>
          <span className="bg-slate-800 px-2 py-0.5 rounded">🇨🇴 Colombia: 45d</span>
          <span className="bg-slate-800 px-2 py-0.5 rounded">🇨🇱 Chile: 45d</span>
          <span className="bg-slate-800 px-2 py-0.5 rounded">🇵🇦 Panamá: 120d</span>
        </div>
      </header>

      {/* Contenedor principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Tarjetas de métricas rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <span className="text-xs text-slate-400 uppercase font-semibold">Postulación Activa</span>
            <div className="text-2xl font-bold mt-1 text-white">
              {agents.filter((a) => a.phase === "fase1").length}
            </div>
            <p className="text-xs text-blue-400 mt-1">Fase 01: Precalificación y Sponsor</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <span className="text-xs text-slate-400 uppercase font-semibold">Contratos en Trámite</span>
            <div className="text-2xl font-bold mt-1 text-amber-400">
              {agents.filter((a) => a.phase === "fase2").length}
            </div>
            <p className="text-xs text-amber-400/80 mt-1">Fase 02: SLA 5 días hábiles ICA</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <span className="text-xs text-slate-400 uppercase font-semibold">Activación y Cierre</span>
            <div className="text-2xl font-bold mt-1 text-emerald-400">
              {agents.filter((a) => a.phase === "fase3").length}
            </div>
            <p className="text-xs text-emerald-400/80 mt-1">Fase 03: eXp World & Workplace</p>
          </div>
          <div className="bg-slate-900 border border-rose-900/40 p-4 rounded-xl bg-gradient-to-br from-slate-900 to-rose-950/20">
            <span className="text-xs text-rose-400 uppercase font-semibold">Alertas de SLA</span>
            <div className="text-2xl font-bold mt-1 text-rose-400">
              {agents.filter((a) => a.status === "SLA Warning").length}
            </div>
            <p className="text-xs text-rose-400/80 mt-1">Requieren atención de Broker</p>
          </div>
        </div>

        {/* Filtros y buscador */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setFilterPhase("all")}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${
                filterPhase === "all" ? "bg-amber-500 text-slate-950 font-semibold" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Todos ({agents.length})
            </button>
            <button
              onClick={() => setFilterPhase("fase1")}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${
                filterPhase === "fase1" ? "bg-amber-500 text-slate-950 font-semibold" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              01 Postulación
            </button>
            <button
              onClick={() => setFilterPhase("fase2")}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${
                filterPhase === "fase2" ? "bg-amber-500 text-slate-950 font-semibold" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              02 Contrato ICA
            </button>
            <button
              onClick={() => setFilterPhase("fase3")}
              className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${
                filterPhase === "fase3" ? "bg-amber-500 text-slate-950 font-semibold" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              03 Activación
            </button>
          </div>

          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Buscar por agente, país o ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-lg px-3 py-2 outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Tabla de postulantes */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/60 text-xs uppercase text-slate-400 border-b border-slate-800 font-semibold">
                <tr>
                  <th className="px-6 py-3">Agente / ID</th>
                  <th className="px-6 py-3">País</th>
                  <th className="px-6 py-3">Fase Actual</th>
                  <th className="px-6 py-3">Progreso</th>
                  <th className="px-6 py-3">SLA / Tiempo</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredAgents.map((agent) => (
                  <tr key={agent.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{agent.name}</div>
                      <div className="text-xs text-slate-500 font-mono">{agent.id} • {agent.email}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-200">{agent.country}</td>
                    <td className="px-6 py-4">
                      {agent.phase === "fase1" && <span className="text-xs text-blue-400 font-medium">01 Postulación</span>}
                      {agent.phase === "fase2" && <span className="text-xs text-amber-400 font-medium">02 Contrato ICA</span>}
                      {agent.phase === "fase3" && <span className="text-xs text-emerald-400 font-medium">03 Activación</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-28 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full transition-all"
                          style={{ width: `${(agent.tasksCompleted / agent.totalTasks) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 mt-1 block">
                        {agent.tasksCompleted} de {agent.totalTasks} tareas
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono">
                      {agent.daysInProcess}d / {agent.slaDaysLimit}d límite
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          agent.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : agent.status === "SLA Warning"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        {agent.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedAgent(agent)}
                        className="bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white text-xs px-3 py-1.5 rounded font-medium transition"
                      >
                        Gestionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal interactivo de auditoría y gestión de agente */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedAgent.name}</h3>
                <p className="text-xs text-slate-400 font-mono">{selectedAgent.id} • {selectedAgent.country} • Sponsor: {selectedAgent.sponsor}</p>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Checklist de la fase actual */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Checklist de Control (
                {selectedAgent.phase === "fase1"
                  ? "Fase 01: Precalificación"
                  : selectedAgent.phase === "fase2"
                  ? "Fase 02: Contrato y Aprobación"
                  : "Fase 03: Credenciales eXp World"}
                )
              </h4>
              <div className="space-y-2">
                {selectedAgent.checklist.map((task) => (
                  <label
                    key={task.id}
                    className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded-lg cursor-pointer hover:border-slate-700 transition"
                  >
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleChecklist(task.id)}
                      className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700 focus:ring-0"
                    />
                    <span className={`text-xs ${task.done ? "line-through text-slate-500" : "text-slate-200"}`}>
                      {task.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800">
              <button
                onClick={() => setSelectedAgent(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 rounded-lg transition"
              >
                Cerrar
              </button>

              {selectedAgent.phase !== "fase3" && (
                <button
                  onClick={() => advancePhase(selectedAgent)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 rounded-lg transition"
                >
                  Avanzar a Siguiente Fase →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}