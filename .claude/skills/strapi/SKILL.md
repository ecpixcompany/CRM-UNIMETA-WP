---
name: strapi
description: Agrega una conexion a un endpoint de Strapi siguiendo la arquitectura de leads/. Uso /strapi [endpoint] [method] — ej. /strapi mensajes GET, /strapi plantillas POST. El method define si es obtener (GET), crear (POST), actualizar (PUT) o eliminar (DELETE). Agrega la funcion en peticiones-strapi.js y registra el endpoint en config.js.
---

# Agregar endpoint de Strapi

Uso: `/strapi <endpoint> <method>`

Ejemplos:
- `/strapi mensajes GET` -> crea `obtenerMensajes()`
- `/strapi mensajes POST` -> crea `crearMensaje(payload)`
- `/strapi mensajes PUT` -> crea `actualizarMensaje(id, payload)`
- `/strapi mensajes DELETE` -> crea `eliminarMensaje(id)`

Sigue las TAREAS en orden.

---

## TAREA 0 - Parsear argumentos

El argumento tiene 2 palabras: `<endpoint> <method>`.

- `ENDPOINT` = primera palabra (ej. `mensajes`). Siempre en minusculas y plural como esta en Strapi.
- `METHOD` = segunda palabra en MAYUSCULAS. Debe ser uno de: `GET`, `POST`, `PUT`, `DELETE`.

Si faltan argumentos o METHOD no es valido, para y pide al estudiante:
`Uso: /strapi <endpoint> <GET|POST|PUT|DELETE>`

Deriva `NOMBRE` (singular, primera letra mayuscula):
- `mensajes` -> `Mensaje`
- `plantillas` -> `Plantilla`
- `conversaciones` -> `Conversacion`
- `estados` -> `Estado`
- `programas` -> `Programa`
- `leads` -> `Lead`

Si no sabes pluralizar, pregunta al estudiante como quiere que se llame la funcion.

---

## TAREA 1 - Preguntar en que pagina

Pregunta al estudiante: "En que pagina quieres agregar este endpoint?" (ej. `leads`, `mensajeria`, `dashboard`).

Guarda `PAGINA` (sin `.html`).

Verifica con Glob que existe `<PAGINA>/peticiones-strapi.js` y `<PAGINA>/config.js`. Si no existen, avisa al estudiante que primero debe correr `/arquitectura <PAGINA>.html`.

---

## TAREA 2 - Registrar endpoint en config.js

Lee `<PAGINA>/config.js`.

Busca el objeto `endpoints:` dentro de `STRAPI`.

Si `<ENDPOINT>` ya esta registrado, salta esta tarea.

Si no esta, agrega una linea dentro de `endpoints`:
```js
<endpoint>: "<endpoint>",
```

Ejemplo: en `endpoints: { mensajes: "mensajes", }`, para `/strapi plantillas GET` queda:
```js
endpoints: {
  mensajes: "mensajes",
  plantillas: "plantillas",
}
```

Usa Edit con un old_string que incluya contexto suficiente (la llave `endpoints:` y al menos el entry anterior o la llave de cierre).

---

## TAREA 3 - Agregar funcion en peticiones-strapi.js

Lee `<PAGINA>/peticiones-strapi.js`.

Segun `METHOD`, elige la funcion a agregar:

### GET
```js
// Devuelve la lista de <endpoint> con sus relaciones.
export async function obtener<Nombre>s() {
  const json = await get(STRAPI.endpoints.<endpoint>, "populate=*");
  return json.data || [];
}
```

Nota: para GET el nombre queda en plural (`obtenerMensajes`, `obtenerPlantillas`). Agrega una `s` al `<Nombre>` si no la tiene.

### POST
```js
// Crea un nuevo <nombre> en Strapi.
export async function crear<Nombre>(payload) {
  return post(STRAPI.endpoints.<endpoint>, { data: payload });
}
```

### PUT
```js
// Actualiza un <nombre> existente por su documentId (Strapi v5) o id.
export async function actualizar<Nombre>(id, payload) {
  return put(STRAPI.endpoints.<endpoint>, id, { data: payload });
}
```

### DELETE
Si el helper `del` NO existe en el archivo, primero agregalo arriba junto a los otros helpers (get, post, put):

```js
// DELETE generico.
async function del(endpoint, id) {
  const respuesta = await fetch(armarUrl(`${endpoint}/${id}`), {
    method: "DELETE",
    headers: armarHeaders(),
  });
  if (!respuesta.ok) {
    throw new Error(`Strapi respondio ${respuesta.status} en DELETE ${endpoint}/${id}`);
  }
  return respuesta.json();
}
```

Despues agrega la funcion exportada:
```js
// Elimina un <nombre> por su documentId (Strapi v5) o id.
export async function eliminar<Nombre>(id) {
  return del(STRAPI.endpoints.<endpoint>, id);
}
```

---

## TAREA 4 - Verificar

1. Grep en `<PAGINA>/peticiones-strapi.js` buscando el nombre de la funcion (`obtener<Nombre>s`, `crear<Nombre>`, etc.). Debe aparecer 1 vez.
2. Grep en `<PAGINA>/config.js` buscando `<endpoint>:`. Debe aparecer al menos 1 vez.
3. Si METHOD fue DELETE, grep buscando `async function del(` en `<PAGINA>/peticiones-strapi.js`. Debe aparecer 1 vez (no duplicada).

---

## TAREA 5 - Reportar al estudiante

Formato corto:

- Endpoint registrado: `<ENDPOINT>` en [<PAGINA>/config.js](<PAGINA>/config.js)
- Funcion agregada: `<nombre-de-la-funcion>` en [<PAGINA>/peticiones-strapi.js](<PAGINA>/peticiones-strapi.js)
- Como usarla (ejemplo):
  ```js
  import { <nombre-funcion> } from "./peticiones-strapi.js";
  // await <nombre-funcion>(...)
  ```
- Recordatorio: si vas a pintar estos datos, agrega una funcion `normalizar<Nombre>(item)` en [<PAGINA>/pintar-datos.js](<PAGINA>/pintar-datos.js).

---

## Reglas globales

- NO duplicar funciones. Si ya existe, avisa y no sobreescribas.
- Cada funcion en una sola linea de responsabilidad: solo `fetch`, nada de pintar DOM.
- Strapi v4/v5: POST/PUT/DELETE usan `documentId` o `id` en la URL. El body de POST/PUT va SIEMPRE envuelto en `{ data: payload }`.
- NO tocar `funcionalidad.js` ni `peticiones.js`.
- Respeta el estilo del archivo existente: espanol, comentarios cortos, banner arriba.
