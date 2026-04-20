// =====================================================================
// CONFIG GLOBAL DEL MODULO MENSAJERIA
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
    mensajeria: "mensajeria",
    plantillas: "plantillas",
  },
};

// Catalogos estaticos mientras no vengan de la API.
// TODO: llenar cuando el estudiante defina catalogos estaticos.
export const CATALOGOS = {};

// Etiquetas y clases CSS para pintar badges y selects de forma bonita.
// TODO: labels y clases CSS de badges.
export const META = {};
