// =====================================================================
// MAIN - PUNTO DE ENTRADA DE mensajeria.html
// ---------------------------------------------------------------------
// Este archivo SOLO ordena los pasos:
//   1. Al cargar la pagina, inicializa la barra lateral.
//   2. Pide los datos a Strapi (mensajeria, plantillas).
//   3. Los pinta en la lista.
//   4. Engancha el detalle.
// =====================================================================

import { obtenerMensajeria, obtenerPlantillas } from "./peticiones-strapi.js";
import {
  normalizarMensajeria,
  normalizarPlantilla,
  pintarMensajerias,
  pintarDetalleMensajeria,
  pintarResumenMensajeria,
  pintarPlantillas,
  mostrarDetalleChat,
  mostrarLista,
} from "./pintar-datos.js";

// Sidebar: menu lateral responsivo.
function iniciarSidebar() {
  const toggle = document.getElementById("toggleBtn");
  const sidebar = document.getElementById("sidebar");
  toggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar?.classList.toggle("active");
  });
}

// Cuando el usuario hace click en una conversacion, mostramos el detalle.
function alSeleccionarConversacion(item) {
  pintarDetalleMensajeria(item);
  pintarResumenMensajeria(item);
  mostrarDetalleChat();
}

// Filtro por texto, sobre la lista que ya tenemos en memoria.
function filtrar(items) {
  const texto = (document.getElementById("messagingSearchInput")?.value || "").toLowerCase();
  return items.filter((item) => {
    // TODO: mapear los campos reales de Strapi para la busqueda
    const busqueda = `${item.documentId}`.toLowerCase();
    return !texto || busqueda.includes(texto);
  });
}

// Arranque de la pagina.
async function iniciar() {
  iniciarSidebar();

  let mensajeriaCrudos = [];
  let plantillas = [];

  try {
    [mensajeriaCrudos, plantillas] = await Promise.all([
      obtenerMensajeria(),
      obtenerPlantillas(),
    ]);
  } catch (error) {
    console.error("Error cargando datos de Strapi:", error);
    alert("No se pudieron cargar los datos de Strapi. Revisa la consola.");
    return;
  }

  const mensajeria = mensajeriaCrudos.map(normalizarMensajeria);
  const plantillasNormalizadas = plantillas.map(normalizarPlantilla);

  pintarMensajerias(mensajeria, alSeleccionarConversacion);
  pintarPlantillas(plantillasNormalizadas);

  // Busqueda.
  document.getElementById("messagingSearchInput")?.addEventListener("input", () => {
    pintarMensajerias(filtrar(mensajeria), alSeleccionarConversacion);
  });

  // Tabs de filtro.
  document.querySelectorAll(".messaging-tab")?.forEach((tab) => {
    tab.addEventListener("click", () => {
      // TODO: filtrar por tab (todos, nuevos, seguimiento, sin-respuesta)
      document.querySelectorAll(".messaging-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  // Cerrar chat (si existe botón back).
  // document.getElementById("backBtn")?.addEventListener("click", mostrarLista);
}

document.addEventListener("DOMContentLoaded", iniciar);
