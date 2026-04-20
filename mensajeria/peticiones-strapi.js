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

// Devuelve la lista de mensajeria desde Strapi.
export async function obtenerMensajeria() {
  const json = await get(STRAPI.endpoints.mensajeria, "populate=*");
  return json.data || [];
}

// Devuelve la lista de plantillas desde Strapi.
export async function obtenerPlantillas() {
  const json = await get(STRAPI.endpoints.plantillas, "populate=*");
  return json.data || [];
}
