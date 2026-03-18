# CRM UNIMETA

Plataforma web de gestion comercial y seguimiento de aspirantes para la Corporacion Universitaria del Meta.

## Portada

```text
 CRM UNIMETA
 Gestion de leads, seguimiento comercial y trazabilidad institucional

 Universidad: Corporacion Universitaria del Meta
 Ciudad base: Villavicencio, Meta, Colombia
 Canal principal proyectado: WhatsApp Business API
 Arquitectura objetivo: Fuentes -> n8n -> Strapi -> CRM Web
```

## Tabla de contenido

- [Vision general](#vision-general)
- [Problema que resuelve](#problema-que-resuelve)
- [Objetivos del producto](#objetivos-del-producto)
- [Arquitectura funcional](#arquitectura-funcional)
- [Que es n8n y que es Strapi](#que-es-n8n-y-que-es-strapi)
- [Stack tecnico](#stack-tecnico)
- [Estado actual](#estado-actual)
- [Instalacion y uso](#instalacion-y-uso)
- [Despliegue](#despliegue)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Paginas del CRM](#paginas-del-crm)
- [Modelo de datos](#modelo-de-datos)
- [Design system](#design-system)
- [Convenciones de desarrollo](#convenciones-de-desarrollo)
- [Integraciones futuras](#integraciones-futuras)
- [Roadmap](#roadmap)
- [Buenas practicas](#buenas-practicas)
- [FAQ rapido](#faq-rapido)

## Vision general

CRM UNIMETA es una aplicacion web pensada para apoyar al equipo comercial y de admisiones en el seguimiento de aspirantes. La meta es centralizar la informacion de los leads, evitar que se pierdan conversaciones importantes y preparar una base solida para automatizacion e integraciones futuras.

El proyecto esta construido con una filosofia simple:

- frontend liviano
- archivos directos en navegador
- sin frameworks pesados
- logica clara y mantenible
- crecimiento progresivo hacia una arquitectura conectada con automatizacion y backend

## Problema que resuelve

UNIMETA recibe interesados desde distintos canales como formularios, WhatsApp, campanas y contacto directo. Cuando esos leads no quedan centralizados ni clasificados a tiempo, el equipo pierde trazabilidad, seguimiento y oportunidades reales de conversion.

Este CRM busca resolver:

- dispersion de la informacion
- falta de seguimiento uniforme
- dificultad para saber en que estado va cada aspirante
- dependencia de procesos manuales
- perdida de contexto entre asesor, canal y conversacion

## Objetivos del producto

- centralizar los leads en una sola interfaz
- permitir seguimiento comercial ordenado
- preparar integraciones con WhatsApp, formularios y automatizaciones
- facilitar visualizacion de KPIs y actividad operativa
- construir una base escalable para admisiones y trazabilidad institucional

## Arquitectura funcional

### Flujo de alto nivel

```text
Fuentes de datos
(WhatsApp / Meta Ads / Formularios / Correo / Llamadas)
        |
        v
      n8n
 Automatiza, transforma y enruta datos
        |
        v
    Strapi
 Guarda y expone la informacion por API
        |
        v
   CRM Web UNIMETA
 Consulta, muestra y actualiza la operacion
        |
        v
   Asesores
 Gestionan el seguimiento del aspirante
```

### Rol de cada componente

| Componente | Rol |
|---|---|
| Fuentes | Generan eventos, mensajes y formularios |
| n8n | Automatiza flujos, orquesta integraciones y mueve datos |
| Strapi | Funciona como backend, CMS y API |
| CRM Web | Es la interfaz de trabajo del asesor |

## Que es n8n y que es Strapi

### Strapi

Strapi es el backend planeado del proyecto. Sirve para guardar datos y ofrecer una API para que el CRM pueda consultar y actualizar informacion.

En este proyecto, Strapi deberia manejar:

- leads
- asesores
- programas academicos
- estados del proceso
- notas de seguimiento
- conversaciones o eventos relevantes

### n8n

n8n es la capa de automatizacion. Sirve para conectar sistemas y ejecutar flujos automaticamente.

Ejemplos de uso en este CRM:

- crear un lead cuando llega un formulario
- actualizar un lead cuando entra un mensaje de WhatsApp
- enviar respuestas automaticas
- disparar tareas internas
- sincronizar informacion desde Meta Ads o Google Sheets

### Forma simple de entenderlo

- Strapi guarda los datos
- n8n mueve y automatiza esos datos
- este CRM muestra esos datos y permite operarlos

## Stack tecnico

- HTML5
- CSS3
- Vanilla JavaScript
- `fetch()` nativo
- CSS custom properties
- ES6+

No se usa:

- React
- Vue
- Angular
- jQuery
- Bootstrap
- Tailwind
- bundlers

## Estado actual

El proyecto esta en una fase de frontend funcional con preparacion para backend.

### Lo que ya existe

- layout base con sidebar y topbar
- design system compartido en `estilos.css`
- logica comun en `funcionalidad.js`
- dashboard visual con KPIs de ejemplo
- modulo de mensajeria con estructura visual
- modulo de leads con flujo local de listar, abrir, editar y crear
- preparacion para Strapi, pero con conexion desactivada

### Lo que aun esta pendiente

- conexion real a Strapi
- integraciones con n8n
- pipeline en `seguimiento.html`
- reportes en `tableros.html`
- configuraciones en `configuracion.html`
- trazabilidad real de conversaciones y eventos

### Estado del modulo de leads

Hoy el modulo de leads trabaja con mock data. Ya esta organizado para que despues se pueda activar el backend sin rehacer toda la interfaz.

## Instalacion y uso

### Requisitos

No necesitas instalar dependencias ni levantar un servidor especial para la version actual del proyecto.

Solo necesitas:

- navegador moderno
- acceso a los archivos del proyecto

### Ejecucion local

1. Abre la carpeta `CRM-UNIMETA-WP`.
2. Ingresa a cualquiera de las paginas HTML.
3. Abre el archivo directamente en el navegador.

Paginas recomendadas para empezar:

- `dashboard.html`
- `leads.html`
- `mensajeria.html`

### Flujo recomendado de prueba

1. Abre `leads.html`.
2. Revisa el listado mock.
3. Abre un lead.
4. Prueba la edicion.
5. Crea un nuevo lead desde el modal.

## Despliegue

Como es una aplicacion estatica, puede desplegarse de varias formas simples:

- hosting estatico
- servidor institucional
- carpeta publica en un servidor web
- GitHub Pages si se desea una demo estatica

### Recomendacion de despliegue por etapas

| Etapa | Despliegue recomendado |
|---|---|
| Prototipo | Archivos estaticos abiertos en navegador |
| Demo interna | Hosting estatico o servidor institucional |
| Integracion real | Frontend estatico + Strapi desplegado + n8n operativo |
| Produccion | Dominio institucional, backend seguro y automatizaciones auditadas |

### Cuando se conecte a backend

En la etapa conectada, el despliegue ideal seria:

```text
Frontend estatico
        +
Strapi desplegado
        +
n8n desplegado
        +
Canales externos conectados
```

## Estructura del proyecto

```text
CRM-UNIMETA-WP/
|-- README.md
|-- configuracion.html
|-- dashboard.html
|-- estilos.css
|-- funcionalidad.js
|-- leads.html
|-- mensajeria.html
|-- seguimiento.html
`-- tableros.html
```

## Paginas del CRM

### `dashboard.html`

Proposito:

- mostrar KPIs
- resumir actividad
- servir como vista general del equipo

Estado:

- estructura visual avanzada
- datos aun de ejemplo

Vista esperada:

```text
Topbar
KPIs
Resumen operativo
Actividad reciente
```

### `leads.html`

Proposito:

- administrar leads
- abrir hoja de vida
- editar informacion
- crear registros nuevos

Estado:

- modulo mas avanzado del proyecto
- preparado para conexion futura a Strapi
- actualmente usa mocks

Vista esperada:

```text
Listado de leads
 -> click en lead
Detalle del lead
 -> editar / guardar / cancelar
Modal para crear lead
```

### `mensajeria.html`

Proposito:

- centralizar conversaciones
- visualizar actividad de mensajeria
- apoyar seguimiento por canal

Estado:

- estructura visual y layout base
- aun sin datos reales

Vista esperada:

```text
KPIs de mensajeria
Lista de conversaciones
Panel de chat o detalle
```

### `seguimiento.html`

Proposito:

- representar el pipeline comercial por estados
- mover leads entre etapas

Estado:

- pendiente de construccion

Vista sugerida:

```text
Kanban por estados
Nuevo -> Contactado -> Calificado -> Matriculado / Perdido
```

### `tableros.html`

Proposito:

- mostrar analitica y reportes
- apoyar gestion del equipo y toma de decisiones

Estado:

- pendiente de construccion

Vista sugerida:

```text
Graficos
Conversiones
Rendimiento por asesor
Tendencias por canal
```

### `configuracion.html`

Proposito:

- administrar catalogos y configuraciones
- preparar integraciones y parametros del sistema

Estado:

- pendiente de construccion

Vista sugerida:

```text
Programas
Asesores
Estados
Integraciones
```

## Modelo de datos

### Lead

Modelo de referencia:

```js
{
  id: "string",
  nombre: "string",
  apellido: "string",
  email: "string",
  telefono: "string",
  ciudad: "string",
  municipio: "string",
  programa_interes: "string",
  estado: "nuevo|contactado|calificado|matriculado|perdido|inactivo",
  fuente: "whatsapp|formulario|meta_ads|google_sheets|correo|llamada",
  asesor_asignado: "string",
  fecha_creacion: "ISO string",
  fecha_ultimo_contacto: "ISO string",
  notas: "string",
  conversaciones: []
}
```

### Campos funcionales importantes

| Campo | Uso |
|---|---|
| `estado` | controla seguimiento comercial |
| `fuente` | ayuda a medir origen del lead |
| `asesor_asignado` | permite trazabilidad operativa |
| `fecha_ultimo_contacto` | apoya prioridades de seguimiento |
| `conversaciones` | conecta el CRM con mensajeria |

## Design system

El proyecto usa un sistema visual compartido desde `estilos.css`.

### Identidad visual

- azul institucional UNIMETA como base
- naranja institucional como acento
- sidebar fija
- topbar superior
- componentes consistentes

### Variables clave

- `--brand-900` a `--brand-50`
- `--accent-400`
- `--gray-*`
- `--surface`
- `--page-bg`

### Estados previstos para leads

- `nuevo`
- `contactado`
- `calificado`
- `matriculado`
- `perdido`
- `inactivo`

## Convenciones de desarrollo

### Reglas base

- usar solo HTML, CSS y JavaScript puro
- cargar `estilos.css` y `funcionalidad.js` en cada pagina
- no hardcodear colores si ya existe variable CSS
- preferir `textContent` para datos dinamicos
- validar formularios en cliente
- usar `try/catch` en todos los fetch
- escribir comentarios en espanol
- centralizar mocks en `funcionalidad.js`

### Reglas de seguridad

- evitar `innerHTML` con datos de usuario
- sanitizar informacion externa
- no mezclar logica de negocio con markup improvisado
- controlar errores de red y errores funcionales con mensajes claros

## Integraciones futuras

### Strapi

La idea es activarlo como backend oficial.

Pasos esperados:

1. definir el collection type de `Lead`
2. mapear campos del CRM
3. configurar endpoints
4. activar wrapper de API
5. reemplazar mocks por datos reales

### n8n

La idea es usarlo como orquestador de flujos.

Casos esperados:

- alta automatica de leads
- actualizacion por mensajes entrantes
- alertas internas
- sincronizacion con formularios y campanas
- respuestas automaticas

## Roadmap

| Fase | Objetivo | Estado |
|---|---|---|
| Fase 1 | Definir identidad visual y layout base | Completado |
| Fase 2 | Construir dashboard y mensajeria inicial | En progreso |
| Fase 3 | Consolidar CRUD de leads con mocks | En progreso |
| Fase 4 | Completar seguimiento, tableros y configuracion | Pendiente |
| Fase 5 | Conectar Strapi | Pendiente |
| Fase 6 | Integrar n8n y canales externos | Pendiente |
| Fase 7 | Trazabilidad real de WhatsApp y automatizaciones | Pendiente |

### Prioridades recomendadas

- alinear `funcionalidad.js` con las convenciones base del proyecto
- completar vistas faltantes
- estabilizar el modelo de datos
- definir estructura de Strapi
- activar integraciones gradualmente

## Buenas practicas

- mantener componentes simples y legibles
- reutilizar clases y helpers existentes
- documentar cambios funcionales relevantes
- no introducir dependencias innecesarias
- construir pensando en el flujo real del asesor
- separar claramente mocks, logica y futura capa API

## FAQ rapido

### Este proyecto ya usa backend real

No. Hoy esta preparado para backend, pero todavia funciona principalmente con datos mock en el modulo de leads.

### Se necesita Node o npm

No para la version actual. Los archivos pueden abrirse directamente en el navegador.

### Por que no usar frameworks

Porque el proyecto fue definido para ser liviano, facil de mantener y compatible con una estructura simple de archivos HTML, CSS y JS.

### Cuando entran Strapi y n8n

En la siguiente etapa de integracion. Primero se esta consolidando el frontend y el flujo funcional.

## Cierre

Este README esta pensado como documento de entrada para negocio, diseno y desarrollo. Debe actualizarse cada vez que cambie el modelo de datos, la arquitectura, el estado de integracion o el alcance funcional de una pagina.

Si el proyecto crece, la recomendacion es complementar este archivo con:

- un documento de arquitectura tecnica
- un documento de modelo de datos
- una guia de integraciones
- una bitacora de cambios por version
