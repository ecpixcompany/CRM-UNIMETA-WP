---
name: conectar-strapi
description: Conecta una pagina HTML del CRM (dashboard, mensajeria, seguimiento, tableros, configuracion) a Strapi siguiendo el mismo patron que ya tiene la carpeta leads/. El estudiante solo aporta los datos de Strapi; la skill se encarga del resto.
---

# Conectar una pagina del CRM a Strapi

Esta skill replica la estructura de la carpeta `leads/` para cualquier otra pagina del proyecto. El estudiante **solo** tiene que dar los datos de Strapi; todo lo demas se genera automaticamente.

## Como funciona el patron leads/

La pagina `leads.html` se conecta a Strapi usando 5 archivos dentro de `leads/`:

| Archivo | Rol |
|---|---|
| `config.js` | URL de Strapi, token, endpoints, catalogos estaticos y META (labels/clases) |
| `peticiones-strapi.js` | Solo `fetch` a la API (GET / POST / PUT) |
| `pintar-datos.js` | Normaliza datos de Strapi y los pinta en el DOM |
| `formularios.js` | Abre modales, lee `<form>`, envia a Strapi |
| `main.js` | Punto de entrada: arma todo y engancha eventos |

En el HTML hay UNA sola linea:

```html
<script type="module" src="<carpeta>/main.js"></script>
```

## Que preguntar al estudiante

Antes de crear nada, pregunta EXACTAMENTE esto (en este orden) y espera respuesta:

1. **Nombre de la pagina** (sin `.html`). Ej: `dashboard`, `mensajeria`, `seguimiento`, `tableros`, `configuracion`.
2. **Endpoints de Strapi** que usa esa pagina. Ej: `mensajes`, `plantillas`, `conversaciones`. Uno o varios.
3. **Campos de cada endpoint** en Strapi (tal como estan escritos alla, respetando MAYUSCULAS). Ej para `mensajes`: `TEXTO`, `FECHA`, `lead` (relacion), `estado_del_mensaje` (relacion).
4. **Relaciones** (si aplica). Ej: `lead` apunta a un lead, mostrar `lead.NOMBRES`.
5. **Que debe mostrar la pagina** en texto plano (tabla, tarjetas, detalle, formulario de crear, etc.).

Si el estudiante no sabe algun dato, pidele que abra el panel de Strapi y revise. No inventes nombres de campos.

## Reglas al generar el codigo

- **NUNCA** tocar `funcionalidad.js`, `peticiones.js` ni la carpeta `leads/`. Son del patron viejo o ya estan hechos.
- Crear carpeta `<pagina>/` al lado de `<pagina>.html` con los 5 archivos.
- Copiar el estilo de comentarios de `leads/` (en espanol, tono explicativo para principiantes, banner `// ====` arriba de cada archivo).
- `config.js` de la nueva pagina DEBE reutilizar la MISMA URL y token de `leads/config.js`. Si cambian, solo se toca un archivo (idealmente en el futuro se extraera a un config compartido, pero por ahora copiar literal).
- `peticiones-strapi.js`: usar el wrapper `{ data: payload }` en POST/PUT (Strapi v4/v5).
- `pintar-datos.js`: siempre exportar una funcion `normalizar<Entidad>(item)` que convierte nombres de Strapi (`NOMBRES`) a nombres simples (`nombres`).
- `main.js`: solo orquesta. `await Promise.all([...])` para cargar datos en paralelo, luego pinta.
- En el HTML de la pagina: borrar cualquier `<script src="funcionalidad.js">` o `<script src="peticiones.js">` y dejar SOLO `<script type="module" src="<pagina>/main.js"></script>`.
- Si la pagina tiene un `<script>` inline con `window.CRM_CONFIG` o similar, borrarlo.
- Si algun catalogo no vive en Strapi todavia, ponerlo en `CATALOGOS` en `config.js` con un comentario `// TODO: mover a Strapi`.

## Flujo paso a paso

1. Pregunta los 5 puntos de arriba.
2. Lee `leads/config.js`, `leads/peticiones-strapi.js`, `leads/pintar-datos.js`, `leads/formularios.js`, `leads/main.js` como plantilla.
3. Lee el `<pagina>.html` del estudiante para ver que IDs tienen los elementos (tabla, botones, modales, inputs).
4. Genera los 5 archivos adaptados. Si algun archivo no aplica (ej. la pagina no tiene formulario), omitelo y documentalo en un comentario en `main.js`.
5. Edita el HTML para dejar solo el `<script type="module">` final.
6. Entrega un resumen corto al estudiante:
   - Que archivos se crearon.
   - Donde se cambia el token/URL (spoiler: en el `config.js` nuevo, o mejor aun en `leads/config.js` si deciden compartirlo).
   - Como probar: abrir la pagina en el navegador y revisar la consola.

## Que NO hacer

- No inventar endpoints, campos o relaciones de Strapi. Si falta info, preguntar.
- No meter logica de negocio en `peticiones-strapi.js`. Solo `fetch`.
- No mezclar pintado con fetch. Cada archivo tiene UN rol.
- No agregar frameworks, bundlers ni dependencias. El proyecto usa JS vanilla + modulos ES.
- No borrar archivos del proyecto. Solo crear carpeta nueva y editar el HTML correspondiente.
- No llenar el codigo de comentarios largos ni docstrings. Copiar el tono de `leads/` (corto, en espanol, explicativo).

## Ejemplo de pregunta bien hecha al estudiante

> Para conectar `mensajeria.html` a Strapi necesito que me digas:
> 1. Que endpoints de Strapi usa (ej: `mensajes`, `plantillas`).
> 2. Que campos tiene cada uno (respetando mayusculas como aparecen en Strapi).
> 3. Si alguno tiene relaciones (ej: un mensaje apunta a un lead).
> 4. Que quieres mostrar en la pagina (lista de mensajes, detalle, formulario de crear).
>
> Si no sabes alguno, abre el panel de Strapi y revisa la coleccion antes de responder.
