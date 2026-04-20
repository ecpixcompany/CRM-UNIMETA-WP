// =====================================================================
// MAIN - PUNTO DE ENTRADA DE leads.html
// ---------------------------------------------------------------------
// Este archivo SOLO ordena los pasos:
//   1. Al cargar la pagina, inicializa la barra lateral.
//   2. Pide los datos a Strapi (leads, estados, programas).
//   3. Los pinta en la tabla.
//   4. Engancha el detalle y los formularios.
// =====================================================================

import { obtenerLeads, obtenerEstados, obtenerProgramas } from "./peticiones-strapi.js";
import {
  normalizarLead,
  pintarTablaLeads,
  pintarDetalleLead,
  mostrarDetalle,
  mostrarLista,
} from "./pintar-datos.js";
import { inicializarFormularios, setLeadActual, desactivarModoEdicion } from "./formularios.js";

// Sidebar: menu lateral responsivo.
function iniciarSidebar() {
  const toggle = document.getElementById("toggleBtn");
  const sidebar = document.getElementById("sidebar");
  toggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar?.classList.toggle("active");
  });
}

// Cuando el usuario hace click en una fila, mostramos el detalle.
function alSeleccionarLead(lead) {
  setLeadActual(lead);
  pintarDetalleLead(lead);
  mostrarDetalle(lead);
  desactivarModoEdicion();
}

// Filtro por texto y estado, sobre la lista que ya tenemos en memoria.
function filtrar(leads) {
  const texto = (document.getElementById("leadSearchInput")?.value || "").toLowerCase();
  const estado = document.getElementById("leadStateFilter")?.value || "";
  return leads.filter((lead) => {
    const busqueda = `${lead.nombres} ${lead.apellidos} ${lead.programa} ${lead.ciudad} ${lead.asesor}`.toLowerCase();
    const coincideTexto = !texto || busqueda.includes(texto);
    const coincideEstado = !estado || lead.estado === estado;
    return coincideTexto && coincideEstado;
  });
}

// Arranque de la pagina.
async function iniciar() {
  iniciarSidebar();

  let leadsCrudos = [];
  let estados = [];
  let programas = [];

  try {
    [leadsCrudos, estados, programas] = await Promise.all([
      obtenerLeads(),
      obtenerEstados(),
      obtenerProgramas(),
    ]);
  } catch (error) {
    console.error("Error cargando datos de Strapi:", error);
    alert("No se pudieron cargar los datos de Strapi. Revisa la consola.");
    return;
  }

  const leads = leadsCrudos.map(normalizarLead);

  inicializarFormularios({ leads, estados, programas });

  pintarTablaLeads(leads, alSeleccionarLead);

  document.getElementById("leadSearchInput")?.addEventListener("input", () => {
    pintarTablaLeads(filtrar(leads), alSeleccionarLead);
  });
  document.getElementById("leadStateFilter")?.addEventListener("change", () => {
    pintarTablaLeads(filtrar(leads), alSeleccionarLead);
  });
  document.getElementById("backToListBtn")?.addEventListener("click", mostrarLista);
  document.getElementById("cancelBtn")?.addEventListener("click", desactivarModoEdicion);
}

document.addEventListener("DOMContentLoaded", iniciar);
