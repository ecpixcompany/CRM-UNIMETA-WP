// =====================================================================
// PINTAR DATOS EN EL HTML
// ---------------------------------------------------------------------
// Aqui van SOLO funciones que reciben datos y los muestran en el DOM:
// tabla de leads, detalle del lead, timeline, badges, selects.
// =====================================================================

import { META } from "./config.js";

// ------------------ HELPERS DE DATOS ------------------

// Normaliza un lead crudo de Strapi al formato que usa el UI.
// Strapi devuelve: NOMBRES, APELLIDOS, CORREO, NUMERO, programa.nombre, etc.
export function normalizarLead(item) {
  return {
    id: item.id,
    documentId: item.documentId || "",
    nombres: item.NOMBRES || "",
    apellidos: item.APELLIDOS || "",
    correo: item.CORREO || "",
    celular: item.NUMERO || "",
    cedula: item.IDENTIFICACION || "",
    ciudad: item.CIUDAD || "",
    fuente: item.FUENTE_CONTACTO || "",
    asesor: item.ASESOR || "",
    programa: item.programa?.nombre || "Sin programa",
    estado: item.estado_del_lead?.NOMBRE_ESTADO || "nuevo",
    prioridad: item.PRIORIDAD || "media",
    notas: item.NOTAS || "",
    fecha_ultimo_contacto: item.fecha_ultimo_contacto || item.updatedAt || "",
    fecha_proxima_accion: item.fecha_proxima_accion || "",
    tipo_proxima_accion: item.tipo_proxima_accion || "",
    actividades: Array.isArray(item.actividades) ? item.actividades : [],
  };
}

export function getNombreCompleto(lead) {
  return `${lead.nombres || ""} ${lead.apellidos || ""}`.trim() || "Nuevo lead";
}

export function getIniciales(lead) {
  const iniciales = `${lead.nombres?.[0] || ""}${lead.apellidos?.[0] || ""}`.toUpperCase();
  return iniciales || "--";
}

export function getEtiquetaEstado(estado) {
  return META.estados[estado] || META.estados.nuevo;
}

export function getEtiquetaFuente(fuente) {
  return META.fuentes[fuente] || "Sin fuente";
}

export function getEtiquetaPrioridad(prioridad) {
  return META.prioridades[prioridad] || META.prioridades.media;
}

export function getEtiquetaTipoAccion(tipo) {
  return META.tiposAccion[tipo] || "Sin definir";
}

function formatearFecha(valor) {
  if (!valor) return "Sin registro";
  const fecha = new Date(valor);
  if (Number.isNaN(fecha.getTime())) return "Sin registro";
  return new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(fecha);
}

// ------------------ BADGES Y ELEMENTOS REUTILIZABLES ------------------

function crearBadgeEstado(estado) {
  const meta = getEtiquetaEstado(estado);
  const badge = document.createElement("span");
  badge.className = `status-badge ${meta.className}`;
  const icon = document.createElement("i");
  icon.className = `fas ${meta.icon}`;
  const text = document.createElement("span");
  text.textContent = meta.label;
  badge.append(icon, text);
  return badge;
}

function crearBadgePrioridad(prioridad) {
  const meta = getEtiquetaPrioridad(prioridad);
  const badge = document.createElement("span");
  badge.className = `priority-badge ${meta.className}`;
  badge.textContent = meta.label;
  return badge;
}

// Llena un <select> con opciones. Si se le pasa `etiquetasMeta`
// (ej. META.fuentes), muestra la etiqueta bonita pero guarda la clave.
export function pintarOpcionesSelect(select, valores, placeholder, seleccionado = "", etiquetasMeta = null) {
  if (!select) return;
  select.replaceChildren();

  const op = document.createElement("option");
  op.value = "";
  op.textContent = placeholder;
  select.appendChild(op);

  valores.forEach((valor) => {
    const opcion = document.createElement("option");
    opcion.value = valor;
    if (etiquetasMeta && etiquetasMeta[valor]) {
      const meta = etiquetasMeta[valor];
      opcion.textContent = typeof meta === "string" ? meta : meta.label;
    } else {
      opcion.textContent = valor;
    }
    if (valor === seleccionado) opcion.selected = true;
    select.appendChild(opcion);
  });
}

// ------------------ TABLA DE LEADS ------------------

// Pinta la tabla de leads (#leadsTableBody).
// `onClickFila` se llama con el lead cuando el usuario hace click en una fila.
export function pintarTablaLeads(leads, onClickFila) {
  const tbody = document.getElementById("leadsTableBody");
  if (!tbody) return;

  tbody.replaceChildren();

  if (!leads.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 6;
    cell.className = "text-center";
    cell.textContent = "No hay leads para mostrar.";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  leads.forEach((lead) => {
    const row = document.createElement("tr");
    row.className = "lead-list-row";
    row.dataset.leadId = lead.id;
    row.addEventListener("click", () => onClickFila?.(lead));

    const avatar = document.createElement("td");
    avatar.className = "lead-list-avatar";
    avatar.textContent = getIniciales(lead);

    const leadCell = document.createElement("td");
    const name = document.createElement("div");
    name.className = "lead-list-name";
    name.textContent = getNombreCompleto(lead);
    const phone = document.createElement("div");
    phone.className = "lead-list-phone";
    phone.textContent = lead.celular || "Sin celular";
    leadCell.append(name, phone);

    const programCell = document.createElement("td");
    programCell.className = "lead-list-program";
    programCell.textContent = lead.programa;

    const sourceCell = document.createElement("td");
    sourceCell.className = "lead-list-city";
    sourceCell.textContent = getEtiquetaFuente(lead.fuente);

    const ownerCell = document.createElement("td");
    ownerCell.className = "lead-list-city";
    ownerCell.textContent = lead.asesor || "Sin asignar";

    const statusCell = document.createElement("td");
    statusCell.className = "lead-list-status";
    statusCell.appendChild(crearBadgeEstado(lead.estado));

    row.append(avatar, leadCell, programCell, sourceCell, ownerCell, statusCell);
    tbody.appendChild(row);
  });
}

// ------------------ DETALLE DEL LEAD ------------------

// Pinta los campos del formulario de detalle con los datos del lead
// y actualiza las tarjetas resumen (fuente, asesor, prioridad, etc).
export function pintarDetalleLead(lead) {
  const campos = {
    nombres: lead.nombres,
    apellidos: lead.apellidos,
    programa: lead.programa,
    estado: lead.estado,
    cedula: lead.cedula,
    celular: lead.celular,
    correo: lead.correo,
    ciudad: lead.ciudad,
    fuente: lead.fuente,
    asesor: lead.asesor,
    prioridad: lead.prioridad,
    fecha_ultimo_contacto: lead.fecha_ultimo_contacto?.slice(0, 10) || "",
    fecha_proxima_accion: lead.fecha_proxima_accion?.slice(0, 10) || "",
    tipo_proxima_accion: lead.tipo_proxima_accion,
    notas: lead.notas,
  };

  Object.entries(campos).forEach(([id, valor]) => {
    const input = document.getElementById(id);
    if (input) input.value = valor || "";
  });

  // Encabezado del panel izquierdo.
  document.getElementById("leadAvatar").textContent = getIniciales(lead);
  document.getElementById("leadNameDisplay").textContent = getNombreCompleto(lead);
  document.getElementById("leadProgramDisplay").textContent = lead.programa || "Sin programa";

  // Tarjetas resumen a la derecha.
  document.getElementById("leadDetailSource").textContent = getEtiquetaFuente(lead.fuente);
  document.getElementById("leadDetailOwner").textContent = lead.asesor || "Sin asignar";
  document.getElementById("leadDetailPriority").textContent = getEtiquetaPrioridad(lead.prioridad).label;
  document.getElementById("leadDetailNextAction").textContent = lead.fecha_proxima_accion
    ? `${getEtiquetaTipoAccion(lead.tipo_proxima_accion)} - ${formatearFecha(lead.fecha_proxima_accion)}`
    : "Sin proxima accion";

  // Chips de meta.
  const chips = document.getElementById("leadMetaChips");
  if (chips) {
    chips.replaceChildren();
    chips.appendChild(crearBadgeEstado(lead.estado));
    chips.appendChild(crearBadgePrioridad(lead.prioridad));
    const fuente = document.createElement("span");
    fuente.className = "meta-chip";
    fuente.textContent = getEtiquetaFuente(lead.fuente);
    chips.appendChild(fuente);
  }

  pintarTimeline(lead.actividades);
}

// Pinta la lista de actividades (trazabilidad) del lead.
export function pintarTimeline(actividades = []) {
  const lista = document.getElementById("leadTimelineList");
  if (!lista) return;
  lista.replaceChildren();

  if (!actividades.length) {
    const vacio = document.createElement("div");
    vacio.className = "empty-state";
    vacio.textContent = "Este lead aun no tiene trazabilidad registrada.";
    lista.appendChild(vacio);
    return;
  }

  actividades.forEach((act) => {
    const item = document.createElement("div");
    item.className = `timeline-item ${act.tipo || "note"}`;

    const content = document.createElement("div");
    content.className = "timeline-content";

    const title = document.createElement("div");
    title.className = "timeline-title";
    title.textContent = act.titulo || "Actividad";

    const desc = document.createElement("div");
    desc.className = "timeline-description";
    desc.textContent = act.descripcion || "";

    content.append(title, desc);
    item.appendChild(content);
    lista.appendChild(item);
  });
}

// ------------------ NAVEGACION LISTA / DETALLE ------------------

export function mostrarDetalle(lead) {
  document.getElementById("leadsListView").style.display = "none";
  document.getElementById("leadDetailView").classList.add("active");
  const titulo = document.getElementById("pageTitle");
  if (titulo) titulo.textContent = `Hoja de vida - ${getNombreCompleto(lead)}`;
}

export function mostrarLista() {
  document.getElementById("leadsListView").style.display = "flex";
  document.getElementById("leadDetailView").classList.remove("active");
  const titulo = document.getElementById("pageTitle");
  if (titulo) titulo.textContent = "Leads";
}
