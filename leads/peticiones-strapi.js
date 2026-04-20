// =====================================================================
// PETICIONES A STRAPI
// ---------------------------------------------------------------------
// Aqui viven SOLO las llamadas a la API (fetch). Nada de pintar HTML,
// nada de manejar formularios. Cada funcion recibe/retorna datos crudos.
// =====================================================================

import { STRAPI } from "./config.js";

// Construye la URL completa de un endpoint.
function armarUrl(endpoint, query = "") {
  const q = query ? (query.startsWith("?") ? query : `?${query}`) : "";
  return `${STRAPI.baseUrl}${STRAPI.apiPath}/${endpoint}${q}`;
}

// Headers estandar para hablar con Strapi (token + json).
function armarHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${STRAPI.token}`,
  };
}

// GET generico.
async function get(endpoint, query = "") {
  const respuesta = await fetch(armarUrl(endpoint, query), {
    method: "GET",
    headers: armarHeaders(),
  });
  if (!respuesta.ok) {
    throw new Error(`Strapi respondio ${respuesta.status} en GET ${endpoint}`);
  }
  return respuesta.json();
}

// POST generico.
async function post(endpoint, body) {
  const respuesta = await fetch(armarUrl(endpoint), {
    method: "POST",
    headers: armarHeaders(),
    body: JSON.stringify(body),
  });
  if (!respuesta.ok) {
    throw new Error(`Strapi respondio ${respuesta.status} en POST ${endpoint}`);
  }
  return respuesta.json();
}

// PUT generico (usando documentId de Strapi v5 o id).
async function put(endpoint, id, body) {
  const respuesta = await fetch(armarUrl(`${endpoint}/${id}`), {
    method: "PUT",
    headers: armarHeaders(),
    body: JSON.stringify(body),
  });
  if (!respuesta.ok) {
    throw new Error(`Strapi respondio ${respuesta.status} en PUT ${endpoint}/${id}`);
  }
  return respuesta.json();
}

// ------------------ ENDPOINTS ESPECIFICOS ------------------

// Devuelve la lista de leads con sus relaciones (programa, estado).
export async function obtenerLeads() {
  const json = await get(STRAPI.endpoints.leads, "populate=*");
  return json.data || [];
}

// Devuelve la lista de estados configurados en Strapi.
export async function obtenerEstados() {
  const json = await get(STRAPI.endpoints.estados);
  return json.data || [];
}

// Devuelve la lista de programas academicos configurados en Strapi.
export async function obtenerProgramas() {
  const json = await get(STRAPI.endpoints.programas);
  return json.data || [];
}

// Crea un nuevo lead en Strapi.
// `payload` debe venir con la estructura que espera Strapi (NOMBRES, etc).
export async function crearLead(payload) {
  return post(STRAPI.endpoints.leads, { data: payload });
}

// Actualiza un lead existente por su documentId (Strapi v5) o id.
export async function actualizarLead(id, payload) {
  return put(STRAPI.endpoints.leads, id, { data: payload });
}
