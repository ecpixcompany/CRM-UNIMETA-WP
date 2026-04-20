// =====================================================================
// CONFIG GLOBAL DEL MODULO LEADS
// ---------------------------------------------------------------------
// Aqui viven todas las "variables globales": url de Strapi, token,
// endpoints y los catalogos que todavia no vienen de la API.
// Si cambia la URL de Strapi o el token, SOLO se toca este archivo.
// =====================================================================

export const STRAPI = {
  // URL base de Strapi (sin slash final).
  baseUrl: "https://strapi.ecpixcompany.com",

  // Prefijo de la API REST de Strapi.
  apiPath: "/api",

  // Token de autenticacion (Bearer). Se reemplaza cuando rote.
  token:
    "5df1a9e637ed81c2589aa624497e41847e16c0547f832c4c84fdf82ffca7f01a0d4fa06b789b5fa4367e4ead39c18d24748e847076b2b0579a0f92607fe1be09419c0fc880acecd1aa9c2c4994eebd698bfe0cc12634066204738ab1e542d20be4ba6dd1f06b48af303638dd7b43df0b3df175422d8a6a7185a49a1d22a4ec9b",

  // Nombres de los endpoints (colecciones) en Strapi.
  endpoints: {
    leads: "leads",
    estados: "estados",
    programas: "programas",
  },
};

// Catalogos estaticos mientras no vengan de la API.
// Cuando existan los endpoints en Strapi, se pasan a peticiones-strapi.js.
export const CATALOGOS = {
  fuentes: [
    "whatsapp",
    "formulario",
    "referidos",
    "evento",
    "llamada",
    "correo",
    "meta_ads",
  ],
  asesores: ["Andrea Cardenas", "Sofia Perez", "Carlos Ruiz", "Maria Rodriguez"],
  prioridades: ["alta", "media", "baja"],
  tiposAccion: ["llamada", "whatsapp", "correo", "visita", "seguimiento"],
};

// Etiquetas y clases CSS para pintar badges y selects de forma bonita.
export const META = {
  estados: {
    nuevo: { label: "Nuevo", className: "status-nuevo", icon: "fa-star" },
    interesado: {
      label: "Interesado",
      className: "status-interesado",
      icon: "fa-bullseye",
    },
    calificado: { label: "Calificado", className: "status-calificado", icon: "fa-check" },
    matriculado: {
      label: "Matriculado",
      className: "status-matriculado",
      icon: "fa-user-graduate",
    },
    perdido: { label: "Perdido", className: "status-perdido", icon: "fa-xmark" },
    inactivo: { label: "Inactivo", className: "status-inactivo", icon: "fa-pause" },
  },
  fuentes: {
    whatsapp: "WhatsApp",
    formulario: "Formulario",
    referidos: "Referidos",
    evento: "Evento",
    llamada: "Llamada",
    correo: "Correo",
    meta_ads: "Meta Ads",
  },
  prioridades: {
    alta: { label: "Alta", className: "priority-high" },
    media: { label: "Media", className: "priority-medium" },
    baja: { label: "Baja", className: "priority-low" },
  },
  tiposAccion: {
    llamada: "Llamada",
    whatsapp: "WhatsApp",
    correo: "Correo",
    visita: "Visita",
    seguimiento: "Seguimiento",
  },
};
