// =====================================================================
// MANEJO DE FORMULARIOS
// ---------------------------------------------------------------------
// Aqui se abren/cierran modales, se llenan los selects, se leen los
// inputs y se envian los datos a Strapi. Nada de pintar tabla ni nada
// que no tenga que ver con los <form> del HTML.
// =====================================================================

import { CATALOGOS, META } from "./config.js";
import { crearLead, actualizarLead } from "./peticiones-strapi.js";
import {
  pintarOpcionesSelect,
  getIniciales,
  getNombreCompleto,
} from "./pintar-datos.js";

// Estado compartido del lead que se esta viendo/editando.
const estado = {
  leadActual: null,
  leads: [],
  estadosStrapi: [],
  programasStrapi: [],
};

// El main.js llama esto al inicio para compartir los datos ya cargados.
export function inicializarFormularios({ leads, estados, programas }) {
  estado.leads = leads;
  estado.estadosStrapi = estados;
  estado.programasStrapi = programas;

  llenarSelectsCreate();
  llenarSelectsDetalle();
  registrarEventos();
}

// ------------------ LLENADO DE SELECTS ------------------

function nombresEstados() {
  return estado.estadosStrapi.map((e) => e.NOMBRE_ESTADO).filter(Boolean);
}

function nombresProgramas() {
  return estado.programasStrapi.map((p) => p.nombre).filter(Boolean);
}

function llenarSelectsCreate() {
  pintarOpcionesSelect(document.getElementById("estado_create"), nombresEstados(), "Selecciona un estado");
  pintarOpcionesSelect(document.getElementById("programa_create"), nombresProgramas(), "Selecciona un programa");
  pintarOpcionesSelect(document.getElementById("fuente_create"), CATALOGOS.fuentes, "Selecciona una fuente", "", META.fuentes);
  pintarOpcionesSelect(document.getElementById("asesor_create"), CATALOGOS.asesores, "Selecciona un asesor");
  pintarOpcionesSelect(document.getElementById("prioridad_create"), CATALOGOS.prioridades, "Selecciona una prioridad", "media", META.prioridades);
  pintarOpcionesSelect(document.getElementById("tipo_proxima_accion_create"), CATALOGOS.tiposAccion, "Selecciona una accion", "", META.tiposAccion);
}

function llenarSelectsDetalle() {
  pintarOpcionesSelect(document.getElementById("estado"), nombresEstados(), "Selecciona un estado");
  pintarOpcionesSelect(document.getElementById("programa"), nombresProgramas(), "Selecciona un programa");
  pintarOpcionesSelect(document.getElementById("fuente"), CATALOGOS.fuentes, "Selecciona una fuente", "", META.fuentes);
  pintarOpcionesSelect(document.getElementById("asesor"), CATALOGOS.asesores, "Selecciona un asesor");
  pintarOpcionesSelect(document.getElementById("prioridad"), CATALOGOS.prioridades, "Selecciona una prioridad", "media", META.prioridades);
  pintarOpcionesSelect(document.getElementById("tipo_proxima_accion"), CATALOGOS.tiposAccion, "Selecciona una accion", "", META.tiposAccion);

  // Tambien el filtro de la tabla.
  pintarOpcionesSelect(document.getElementById("leadStateFilter"), nombresEstados(), "Todos los estados");
}

// ------------------ MODAL DE CREAR LEAD ------------------

function abrirModalCrear() {
  const modal = document.getElementById("leadCreateModal");
  const form = document.getElementById("leadFormCreate");
  form?.reset();
  llenarSelectsCreate();
  document.getElementById("leadNameDisplay_create").textContent = "Nuevo lead";
  document.getElementById("leadAvatar_create").textContent = "--";
  modal?.classList.add("active");
  document.getElementById("nombres_create")?.focus();
}

function cerrarModalCrear() {
  document.getElementById("leadCreateModal")?.classList.remove("active");
}

// ------------------ MODO EDICION DETALLE ------------------

function activarModoEdicion() {
  document.querySelectorAll("#leadForm .form-input").forEach((input) => (input.disabled = false));
  document.getElementById("editBtn").style.display = "none";
  document.getElementById("saveBtn").style.display = "flex";
  document.getElementById("cancelBtn").style.display = "flex";
}

export function desactivarModoEdicion() {
  document.querySelectorAll("#leadForm .form-input").forEach((input) => (input.disabled = true));
  document.getElementById("editBtn").style.display = "flex";
  document.getElementById("saveBtn").style.display = "none";
  document.getElementById("cancelBtn").style.display = "none";
}

// ------------------ LECTURA DE DATOS DEL FORM ------------------

// Convierte los datos del <form> al formato que acepta Strapi.
function armarPayloadStrapi(datos) {
  return {
    NOMBRES: datos.nombres || "",
    APELLIDOS: datos.apellidos || "",
    NUMERO: datos.celular || "",
    CORREO: datos.correo || "",
    IDENTIFICACION: datos.cedula || "",
    CIUDAD: datos.ciudad || "",
    FUENTE_CONTACTO: datos.fuente || "",
    ASESOR: datos.asesor || "",
    PRIORIDAD: datos.prioridad || "",
    NOTAS: datos.notas || "",
    programa: datos.programa || "",
    estado_del_lead: datos.estado || "",
  };
}

// ------------------ EVENTOS ------------------

function registrarEventos() {
  document.getElementById("createLeadBtn")?.addEventListener("click", abrirModalCrear);
  document.getElementById("modalCloseBtn")?.addEventListener("click", cerrarModalCrear);
  document.getElementById("modalOverlay")?.addEventListener("click", cerrarModalCrear);
  document.getElementById("cancelBtnCreate")?.addEventListener("click", cerrarModalCrear);
  document.getElementById("editBtn")?.addEventListener("click", activarModoEdicion);

  // Submit crear lead.
  document.getElementById("leadFormCreate")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const datos = Object.fromEntries(new FormData(event.target).entries());

    if (!datos.nombres || !datos.apellidos || !datos.programa) {
      alert("Completa nombres, apellidos y programa.");
      return;
    }

    try {
      await crearLead(armarPayloadStrapi(datos));
      cerrarModalCrear();
      alert("Lead creado correctamente.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("No se pudo crear el lead en Strapi.");
    }
  });

  // Submit editar lead.
  document.getElementById("leadForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!estado.leadActual) return;

    const datos = {};
    ["nombres", "apellidos", "programa", "estado", "cedula", "celular",
     "correo", "ciudad", "fuente", "asesor", "prioridad",
     "tipo_proxima_accion", "notas"].forEach((id) => {
      datos[id] = document.getElementById(id)?.value || "";
    });

    try {
      const idStrapi = estado.leadActual.documentId || estado.leadActual.id;
      await actualizarLead(idStrapi, armarPayloadStrapi(datos));
      alert("Lead actualizado correctamente.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar el lead en Strapi.");
    }
  });

  // Preview en vivo del modal (avatar + nombre) cuando escriben.
  ["nombres_create", "apellidos_create"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", () => {
      const lead = {
        nombres: document.getElementById("nombres_create")?.value || "",
        apellidos: document.getElementById("apellidos_create")?.value || "",
      };
      document.getElementById("leadAvatar_create").textContent = getIniciales(lead);
      document.getElementById("leadNameDisplay_create").textContent = getNombreCompleto(lead);
    });
  });
}

// Llamado desde main cuando se abre el detalle de un lead, para saber
// a quien estamos editando al hacer submit.
export function setLeadActual(lead) {
  estado.leadActual = lead;
  desactivarModoEdicion();
}
