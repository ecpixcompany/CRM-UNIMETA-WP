// =====================================================================
// PINTAR DATOS EN EL HTML
// ---------------------------------------------------------------------
// Aqui van SOLO funciones que reciben datos y los muestran en el DOM:
// tabla de mensajeria, detalle, resumen lateral, etc.
// =====================================================================

import { META } from "./config.js";

// ------------------ HELPERS DE DATOS ------------------

// Normaliza un mensaje/conversacion crudo de Strapi al formato que usa el UI.
export function normalizarMensajeria(item) {
  return {
    id: item.id,
    documentId: item.documentId || "",
    // TODO: mapear los campos de Strapi (NOMBRES, FECHA, etc.)
  };
}

// Normaliza una plantilla cruda de Strapi.
export function normalizarPlantilla(item) {
  return {
    id: item.id,
    documentId: item.documentId || "",
    // TODO: mapear los campos de Strapi (TITULO, CONTENIDO, etc.)
  };
}

// Pinta la lista de conversaciones en #conversationList.
export function pintarMensajerias(lista, onClickFila) {
  const contenedor = document.getElementById("conversationList");
  if (!contenedor) {
    // TODO: pintar en #conversationList
    console.log("mensajeria:", lista);
    return;
  }

  contenedor.replaceChildren();

  if (!lista.length) {
    const vacio = document.createElement("div");
    vacio.className = "empty-state";
    vacio.textContent = "No hay conversaciones para mostrar.";
    contenedor.appendChild(vacio);
    return;
  }

  lista.forEach((item) => {
    const row = document.createElement("div");
    row.className = "conversation-item";
    row.dataset.itemId = item.id;
    row.addEventListener("click", () => onClickFila?.(item));
    // TODO: completar estructura HTML
    contenedor.appendChild(row);
  });
}

// Pinta el detalle de una conversacion.
export function pintarDetalleMensajeria(item) {
  // TODO: llenar campos del panel de chat
  document.getElementById("chatContactName").textContent = "Sin conversacion";
  document.getElementById("chatContactProgram").textContent = "Selecciona una conversacion";
}

// Pinta el resumen lateral (#conversationSummary).
export function pintarResumenMensajeria(item) {
  // TODO: llenar #summaryStatus, #summaryChannel, #summaryCity, #summaryOwner, #conversationActivityList
}

// Pinta la lista de plantillas (si hay).
export function pintarPlantillas(lista) {
  // TODO: donde se muestran las plantillas (select, modal, etc.)
  console.log("plantillas:", lista);
}

// Navegacion lista / detalle.
export function mostrarDetalleChat() {
  const listView = document.getElementById("messagingModule")?.querySelector(".messaging-sidebar-panel");
  const chatPanel = document.getElementById("messagingModule")?.querySelector(".chat-panel");
  if (listView) listView.style.display = "none";
  if (chatPanel) chatPanel.classList.add("active");
}

export function mostrarLista() {
  const listView = document.getElementById("messagingModule")?.querySelector(".messaging-sidebar-panel");
  const chatPanel = document.getElementById("messagingModule")?.querySelector(".chat-panel");
  if (listView) listView.style.display = "flex";
  if (chatPanel) chatPanel.classList.remove("active");
}
