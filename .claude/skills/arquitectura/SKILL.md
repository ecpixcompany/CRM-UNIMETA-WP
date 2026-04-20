---
name: arquitectura
description: Replica la arquitectura de la carpeta leads/ en otra pagina del CRM. Uso /arquitectura [nombre.html] (ej. /arquitectura mensajeria.html). Esta dividida en tareas pequenas y literales para que un modelo debil (Haiku) la pueda ejecutar paso a paso. Objetivo final es migrar todas las paginas (dashboard, mensajeria, seguimiento, tableros, configuracion) y luego borrar funcionalidad.js.
---

# Replicar arquitectura leads/ en otra pagina

Uso: `/arquitectura <nombre.html>` — ej. `/arquitectura mensajeria.html`.

El argumento que recibes es el nombre del archivo HTML. De ahi salen:
- `HTML` = argumento completo (ej. `mensajeria.html`)
- `PAGINA` = nombre sin extension (ej. `mensajeria`)
- Carpeta a crear: `<PAGINA>/`

Sigue las TAREAS en orden. No saltes pasos. No improvises. Al terminar cada tarea, confirma antes de pasar a la siguiente.

OBJETIVO FINAL: cuando TODAS las paginas (dashboard, mensajeria, seguimiento, tableros, configuracion) tengan su carpeta propia, se podra borrar `funcionalidad.js` y `peticiones.js`. NO los borres en esta skill.

---

## TAREA 0 - Validar argumento

1. Verifica que el argumento termine en `.html`. Si no, pide al estudiante que lo escriba correcto (ej. `/arquitectura mensajeria.html`).
2. Verifica con Glob que `<HTML>` existe en la raiz del proyecto. Si no existe, para y avisa.
3. Verifica que la carpeta `<PAGINA>/` NO exista ya. Si existe, pregunta al estudiante si quiere sobreescribir. Si dice no, para.

---

## TAREA 1 - Pedir datos minimos al estudiante

Pregunta y ESPERA respuesta:

1. Que endpoints de Strapi usa esta pagina. Ej para mensajeria: `mensajes`, `plantillas`.
2. Si la pagina tiene formulario de crear/editar (si/no).

Guarda:
- `ENDPOINTS` = array (ej. `["mensajes", "plantillas"]`)
- `TIENE_FORM` = true / false

Si no sabe los endpoints, pidele que abra el panel de Strapi. No inventes.

---

## TAREA 2 - Leer plantillas

Lee estos 5 archivos con Read (uno por uno):

1. `leads/config.js`
2. `leads/peticiones-strapi.js`
3. `leads/pintar-datos.js`
4. `leads/formularios.js`
5. `leads/main.js`

Son la plantilla. Copias la estructura y cambias los nombres.

---

## TAREA 3 - Leer el HTML objetivo

Lee `<HTML>` completo. Apunta:

- IDs de tabla, lista o contenedor principal donde van los datos.
- IDs de botones (crear, guardar, cancelar, editar, back).
- IDs de inputs y selects del formulario (si hay).
- IDs de modales.
- Si tiene `<script>` inline con `window.CRM_CONFIG` o similar.
- Si tiene `<script src="funcionalidad.js">` o `<script src="peticiones.js">`.

---

## TAREA 4 - Crear config.js

Escribe `<PAGINA>/config.js` con la estructura de `leads/config.js`:

- `STRAPI.baseUrl`, `STRAPI.apiPath`, `STRAPI.token`: COPIA LITERAL de `leads/config.js`.
- `STRAPI.endpoints`: objeto con un entry por cada endpoint en `ENDPOINTS`. Ej:
  ```js
  endpoints: {
    mensajes: "mensajes",
    plantillas: "plantillas",
  }
  ```
- `CATALOGOS`: `{}` vacio. Agrega un comentario `// TODO: llenar cuando el estudiante defina catalogos estaticos`.
- `META`: `{}` vacio. Agrega `// TODO: labels y clases CSS de badges`.

Mantiene banner `// ====` y tono de comentarios.

---

## TAREA 5 - Crear peticiones-strapi.js

Escribe `<PAGINA>/peticiones-strapi.js`. Copia TAL CUAL la parte de arriba de `leads/peticiones-strapi.js` (hasta antes de `// ------------------ ENDPOINTS ESPECIFICOS`):

- `import { STRAPI } from "./config.js";`
- Helpers `armarUrl`, `armarHeaders`, `get`, `post`, `put`.

Abajo agrega el bloque `// ------------------ ENDPOINTS ESPECIFICOS ------------------`.

Por cada endpoint en `ENDPOINTS`, genera estas 3 funciones:

```js
export async function obtener<Nombre>() {
  const json = await get(STRAPI.endpoints.<endpoint>, "populate=*");
  return json.data || [];
}

export async function crear<Nombre>(payload) {
  return post(STRAPI.endpoints.<endpoint>, { data: payload });
}

export async function actualizar<Nombre>(id, payload) {
  return put(STRAPI.endpoints.<endpoint>, id, { data: payload });
}
```

Donde `<Nombre>` es el endpoint en singular con mayuscula:
- `mensajes` -> `Mensaje`
- `plantillas` -> `Plantilla`
- `conversaciones` -> `Conversacion`

Si `TIENE_FORM` es false, omite `crear` y `actualizar` (solo lectura).

---

## TAREA 6 - Crear pintar-datos.js

Escribe `<PAGINA>/pintar-datos.js`:

1. Banner arriba igual al de `leads/pintar-datos.js`.
2. `import { META } from "./config.js";`
3. Por cada endpoint, exporta:
   ```js
   export function normalizar<Nombre>(item) {
     return {
       id: item.id,
       documentId: item.documentId || "",
       // TODO: mapear los campos de Strapi (NOMBRES, FECHA, etc.)
     };
   }
   ```
4. Una funcion `pintar<Nombre>s(lista, onClickFila)` que pinte la lista en el contenedor principal que viste en TAREA 3. Si no conoces el ID exacto, deja:
   ```js
   // TODO: pintar en #<ID-DEL-CONTENEDOR>
   console.log("<nombre>s:", lista);
   ```
5. Si el HTML tiene vista de detalle, agrega `pintarDetalle<Nombre>(item)` con TODOs.
6. Si tiene navegacion lista/detalle (como leads), exporta `mostrarDetalle()` y `mostrarLista()` con los IDs del HTML.

Estilo: funciones cortas, espanol, sin frameworks.

---

## TAREA 7 - Crear formularios.js

Si `TIENE_FORM` es `false`: crea `<PAGINA>/formularios.js` con solo el banner y un comentario:
```js
// =====================================================================
// FORMULARIOS
// ---------------------------------------------------------------------
// Esta pagina no tiene formularios por ahora.
// =====================================================================
```

Si `TIENE_FORM` es `true`: copia la estructura de `leads/formularios.js`:

- `const estado = { itemActual: null, ... }`.
- `export function inicializarFormularios({ ... })`.
- `llenarSelectsCreate()`, `llenarSelectsDetalle()` segun los selects que hayas visto en el HTML. Si no hay selects, omite.
- `abrirModalCrear()`, `cerrarModalCrear()` con los IDs del HTML.
- `activarModoEdicion()`, `desactivarModoEdicion()` si hay botones edit/save/cancel.
- `armarPayloadStrapi(datos)` con TODOs para los campos MAYUSCULAS de Strapi.
- `registrarEventos()` que engancha los submit de los `<form>` y llama `crear<Nombre>`/`actualizar<Nombre>`.
- `export function setItemActual(item)` (renombra segun la entidad principal).

Si hay varios endpoints y no es obvio cual es el "principal", pregunta al estudiante antes de continuar.

---

## TAREA 8 - Crear main.js

Escribe `<PAGINA>/main.js` con la estructura de `leads/main.js`:

```js
// Banner igual al de leads/main.js
import { obtener<Nombre1>, obtener<Nombre2>, ... } from "./peticiones-strapi.js";
import { normalizar<Nombre1>, pintar<Nombre1>s, ... } from "./pintar-datos.js";
// Si TIENE_FORM:
import { inicializarFormularios, setItemActual, desactivarModoEdicion } from "./formularios.js";

function iniciarSidebar() {
  const toggle = document.getElementById("toggleBtn");
  const sidebar = document.getElementById("sidebar");
  toggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    sidebar?.classList.toggle("active");
  });
}

async function iniciar() {
  iniciarSidebar();

  let data1 = [], data2 = [];
  try {
    [data1, data2] = await Promise.all([obtener<Nombre1>(), obtener<Nombre2>()]);
  } catch (error) {
    console.error("Error cargando datos de Strapi:", error);
    alert("No se pudieron cargar los datos de Strapi. Revisa la consola.");
    return;
  }

  const items1 = data1.map(normalizar<Nombre1>);
  // ...
  // Si TIENE_FORM: inicializarFormularios({ ... })
  pintar<Nombre1>s(items1, /* onClick opcional */);
}

document.addEventListener("DOMContentLoaded", iniciar);
```

Solo engancha eventos que EXISTAN en el HTML (busqueda, filtro, back, cancel). Si no sabes si existe, no lo enganches.

---

## TAREA 9 - Limpiar el HTML

Edita `<HTML>`:

1. Busca y borra cualquier `<script>` inline con `window.CRM_CONFIG` o similar (si existe).
2. Busca y borra `<script src="funcionalidad.js">` (si existe).
3. Busca y borra `<script src="peticiones.js">` (si existe).
4. Justo antes de `</body>` deja UNA sola linea:
   ```html
   <script type="module" src="<PAGINA>/main.js"></script>
   ```

NO toques nada mas del HTML.

---

## TAREA 10 - Verificar

1. Glob `<PAGINA>/*.js` - debe listar 5 archivos (config, peticiones-strapi, pintar-datos, formularios, main).
2. Grep en `<HTML>` buscar `<script` - debe haber solo UNO, el de `<PAGINA>/main.js`.
3. Grep `funcionalidad.js` y `peticiones.js` en `<HTML>` - no deben aparecer.

---

## TAREA 11 - Reportar al estudiante

Dale un resumen corto:

- Archivos creados (con links markdown).
- TODOs pendientes: campos de Strapi, IDs del HTML que no conocias.
- Como probar: abrir `<HTML>` en el navegador, F12, pestaña Consola, pestaña Network.
- Recordatorio: cuando TODAS las paginas (dashboard, mensajeria, seguimiento, tableros, configuracion, leads) tengan su carpeta, se puede borrar `funcionalidad.js` y `peticiones.js`. Preguntale al estudiante si ya estan todas migradas; si si, puede correr la skill manualmente despues.

---

## Reglas globales

- NO tocar `funcionalidad.js`, `peticiones.js`, `leads/`, ni otras paginas ya migradas.
- NO inventar campos de Strapi. Deja `// TODO` y pregunta.
- NO agregar dependencias ni frameworks.
- NO borrar archivos en esta skill (ni `funcionalidad.js` aunque sea el objetivo final).
- Copia el tono de `leads/`: espanol, banner `// ====`, comentarios cortos.
- Strapi v4/v5: POST/PUT siempre con `{ data: payload }`.
