# ROADMAP — IMMERSIVE PIZZA PLATFORM

## Objetivo

Construir una plataforma web inmersiva, modular y personalizable para pizzerías, basada en imágenes, vídeo, composición 2.5D, máscaras, transiciones y WebGL/shaders ligeros cuando aporten valor. No se utilizará 3D como base de producto.

La plataforma tendrá cinco módulos principales:

1. Horno interactivo
2. Pizza Roulette
3. Pizza Trivial / Quiz con tres modos
4. Build Your Pizza
5. Pizza Table

La prioridad no es completar todos los módulos lo antes posible, sino validar primero el lenguaje visual, el rendimiento y la lógica de composición reutilizable.

---

# PRINCIPIO DE DESARROLLO

Cada fase debe cerrar con una DEMO NAVEGABLE y un checkpoint de validación visual.

No se avanza a la siguiente fase si el módulo anterior funciona técnicamente pero no alcanza el nivel visual esperado.

Orden:

Foundation → Visual Lab → Horno → Ruleta → Trivial → Build Your Pizza → Pizza Table → Integración → Personalización → Optimización → Demo final

---

# FASE 0 — FOUNDATION / SISTEMA BASE

## Objetivo
Crear el esqueleto técnico de la plataforma sin intentar todavía producir la experiencia final.

## Construir
- Next.js + React + TypeScript.
- Sistema de rutas.
- Diseño responsive desktop/mobile.
- Configuración por restaurante.
- Catálogo de pizzas desacoplado de la UI.
- Sistema de assets de imagen y vídeo.
- Feature flags para activar/desactivar módulos.
- Componentes UI base.
- Capa de analytics preparada.
- Preferencias de sonido y reduced-motion.
- Fallbacks para dispositivos de baja potencia.

## Entregable
Una web mínima navegable en la que podamos cambiar nombre, logo, colores, pizzas y módulos desde configuración.

## Criterio de salida
La aplicación debe demostrar que una segunda pizzería puede reutilizar la misma base sin reescribir componentes.

---

# FASE 1 — IMMERSIVE VISUAL LAB

## Objetivo
Antes de desarrollar los cinco módulos, crear un laboratorio visual para probar las técnicas que sostendrán toda la experiencia.

## Pruebas
- vídeo fullscreen y seamless loop;
- imagen multicapa;
- parallax suave;
- máscaras CSS/canvas;
- recortes transparentes;
- profundidad 2.5D;
- foreground/background;
- blur y focus transitions;
- light overlays;
- heat distortion;
- smoke/fire overlays;
- particle overlays ligeras;
- shader/WebGL puntual;
- transición de producto hacia primer plano;
- intercambio de assets durante oclusión;
- comportamiento táctil móvil.

## Entregable
Una página `/lab` con botones para activar y comparar efectos.

## Criterio de salida
Seleccionar el stack visual mínimo que consiga el efecto premium sin 3D y con buen rendimiento.

---

# FASE 2 — HERO / HORNO INTERACTIVO

## Objetivo
Construir la experiencia central de la plataforma.

## Flujo objetivo

Usuario selecciona pizza → horno reacciona → pala entra → pizza se recoge/compone → pala sale → pizza seleccionada aparece en primer plano → ficha y CTA.

## Desarrollo
- Hero fullscreen.
- Vídeo loop del horno.
- Estados idle / active / delivery.
- Selector de pizza.
- Coreografía de pala.
- Sistema de intercambio/composición de la pizza.
- Oclusiones y máscaras para ocultar cambios de asset.
- Ficha de producto.
- CTA de pedido.
- Audio opcional.
- Mobile fallback.

## POC crítico
Demostrar si podemos reutilizar una misma animación de horno y pala para entregar distintas pizzas sin generar un vídeo completo por producto.

## Entregable
Demo real con mínimo tres pizzas diferentes.

## Criterio de salida
El usuario debe percibir que el horno realmente entrega la pizza seleccionada.

---

# FASE 3 — PIZZA ROULETTE

## Objetivo
Convertir el catálogo en una experiencia lúdica y promocional.

## Desarrollo
- Pizza circular compuesta por porciones.
- Cada porción representa una pizza real.
- Giro con aceleración, inercia y desaceleración.
- Selector final.
- Separación visual de la porción ganadora.
- Movimiento hacia primer plano.
- Conversión en ficha de producto.
- CTA.
- Sistema opcional de premios/promociones.
- Probabilidades configurables.

## Entregable
Ruleta totalmente funcional con catálogo configurable.

## Criterio de salida
No debe sentirse como una ruleta HTML tradicional: debe sentirse como una pizza física interactiva construida con media y composición.

---

# FASE 4 — PIZZA TRIVIAL / QUIZ

## Objetivo
Crear un motor de descubrimiento basado en porciones de pizza.

## MODO A — Pizza Quiz
Preguntas con respuesta correcta sobre ingredientes, cultura, restaurante o producto.

## MODO B — Descubre tu Pizza
Preguntas de preferencia que funcionan como recomendador progresivo.

Ejemplos:
- picante / no picante;
- carne / vegetal;
- tomate / cremosa;
- clásica / experimental;
- ligera / contundente.

## MODO C — Pizza Challenge
Juego de varias preguntas con puntuación, desbloqueo de porciones y posible recompensa o resultado compartible.

## Desarrollo común
- Pizza incompleta/oculta.
- Sistema de preguntas configurable.
- Estado de porciones.
- Revelado animado.
- Motor de scoring/recomendación.
- Resultado final.
- CTA a producto/pedido.

## Entregable
Los tres modos funcionando sobre un único motor reutilizable.

## Criterio de salida
Una nueva pizzería debe poder cambiar preguntas, respuestas y pizzas sin cambiar código.

---

# FASE 5 — BUILD YOUR PIZZA

## Objetivo
Permitir que el usuario construya visualmente su propia pizza.

## Desarrollo
- Base de pizza visual.
- Ingredientes seleccionables.
- Entrada/caída/colocación de ingredientes mediante composición 2D/2.5D.
- Capas y máscaras.
- Precio dinámico.
- Restricciones y extras.
- CTA “Hornear”.
- Integración narrativa con el Horno.
- Resultado final.
- Añadir al carrito.

## Entregable
Constructor funcional con ingredientes y precios configurables.

## Criterio de salida
Debe ser fácil de usar en móvil y no convertirse en un editor complejo.

---

# FASE 6 — PIZZA TABLE

## Objetivo
Integrar la quinta experiencia desarrollada en paralelo.

## Regla
No redefinir este módulo sin revisar primero la implementación/especificación existente.

## Trabajo
- Auditar la versión existente.
- Detectar dependencias.
- Adaptarla al catálogo común.
- Unificar lenguaje visual y navegación.
- Integrar CTAs, carrito y analytics.
- Crear fallback mobile si es necesario.

## Entregable
Pizza Table integrada como módulo oficial de la plataforma.

---

# FASE 7 — UNIFICACIÓN DEL PIZZA UNIVERSE

## Objetivo
Convertir cinco demos en una única experiencia coherente.

## Desarrollo
- Home / entrada.
- Navegación entre experiencias.
- Transiciones compartidas.
- Persistencia de selección de pizza.
- Estado común del carrito.
- Recomendaciones cruzadas.
- Sistema de sonido común.
- Animaciones de entrada/salida.
- Deep links.

## Flujo deseado
Discover → Play → Select → Oven → Order.

No todos los usuarios recorrerán todas las experiencias.

---

# FASE 8 — PERSONALIZATION ENGINE

## Objetivo
Demostrar que el producto es una plataforma y no una web única.

## Configuración
- marca;
- logo;
- colores;
- tipografías;
- hero assets;
- horno;
- pizzas;
- ingredientes;
- precios;
- promociones;
- preguntas;
- premios;
- textos;
- módulos activos;
- orden de navegación;
- enlaces de pedido/reserva.

## Prueba obligatoria
Crear dos skins de pizzerías radicalmente distintas utilizando el mismo código.

## Entregable
Tenant/demo A + tenant/demo B.

---

# FASE 9 — COMMERCE / OPERACIÓN

## Objetivo
Conectar la experiencia con el negocio real.

Según el caso:
- carrito propio;
- enlace a plataforma de delivery;
- WhatsApp;
- pedido para recoger;
- reserva;
- integración POS/API futura.

El motor de experiencia debe permanecer desacoplado de la solución comercial.

---

# FASE 10 — PERFORMANCE / QA / ACCESSIBILITY

## Objetivo
Que la espectacularidad no destruya la experiencia real.

## Validaciones
- desktop;
- tablet;
- iPhone;
- Android;
- conexiones lentas;
- reduced motion;
- autoplay restrictions;
- carga progresiva;
- poster images;
- lazy loading;
- compresión vídeo;
- WebM/MP4;
- SEO;
- accesibilidad;
- Core Web Vitals;
- errores de interacción;
- orientación portrait/landscape.

## Entregable
Matriz QA y lista de degradaciones aceptables.

---

# FASE 11 — DEMO PREMIUM / PRODUCTIZACIÓN

## Objetivo
Crear la versión que podamos enseñar o vender.

## Resultado
- landing principal;
- cinco experiencias;
- catálogo real;
- sistema configurable;
- mobile;
- analytics;
- documentación;
- demo pública;
- vídeo demo;
- screenshots;
- sistema de personalización demostrado.

---

# ORDEN DE PRIORIDAD REAL

P0 — Foundation
P0 — Visual Lab
P0 — Horno POC
P1 — Horno final
P1 — Ruleta
P1 — Trivial
P2 — Build Your Pizza
P2 — Pizza Table integration
P2 — Unified navigation
P2 — Personalization
P3 — Commerce integrations
P3 — Productization

El mayor riesgo técnico y visual del proyecto está en el Horno. Debe resolverse pronto. Si la entrega de pizzas mediante composición funciona, gran parte del lenguaje de la plataforma queda validado.

---

# QUÉ NECESITAMOS DEL DIRECTOR DEL PROYECTO

No todo es necesario desde el primer día.

## NECESARIO PARA FASES 0–2

### 1. Dirección visual inicial
Elegir una primera pizzería ficticia o real como caso piloto.

Necesitamos:
- nombre provisional;
- logo, si existe;
- estilo deseado;
- referencias de ambiente;
- tradicional / premium / urbana / artesanal / napolitana / experimental, etc.

Si no existe todavía, se puede trabajar con una marca demo provisional.

### 2. Tres pizzas piloto
Para el primer POC del horno:
- nombre;
- ingredientes;
- precio opcional;
- imagen de referencia, si existe.

No necesitamos inicialmente el menú completo.

### 3. Validación de assets generados
Higgsfield u otras herramientas pueden producir:
- horno;
- pala;
- pizzas;
- loops;
- foregrounds;
- overlays.

El director debe aprobar/rechazar visualmente los assets clave antes de integrarlos como lenguaje definitivo.

### 4. Pizza Table
Cuando la quinta pata alcance un estado reutilizable, necesitamos:
- repo/rama/ruta;
- demo;
- documentación disponible;
- decisiones ya tomadas.

---

# NECESARIO MÁS ADELANTE

### Catálogo
- pizzas;
- ingredientes;
- precios;
- alérgenos;
- fotos.

### Trivial
- preguntas de marca o contenido propio, si se desea.

### Promociones
- premios reales y probabilidades.

### Commerce
- sistema objetivo de pedidos/reservas/delivery.

### Marca definitiva
- identidad visual real de la pizzería o sistema white-label.

---

# LO QUE NO NECESITAMOS AHORA

No necesitamos esperar a tener:
- menú completo;
- cliente real;
- POS;
- delivery API;
- CMS final;
- todas las imágenes;
- todas las preguntas;
- todos los vídeos.

Para comenzar necesitamos únicamente una marca demo, tres pizzas y producir los assets suficientes para validar el Visual Lab y el Horno POC.

---

# CHECKPOINTS DE VALIDACIÓN

## Gate A — Skeleton
¿La plataforma es realmente configurable?

## Gate B — Visual Language
¿La inmersión funciona sin 3D?

## Gate C — Oven Proof
¿La pala puede entregar diferentes pizzas de forma creíble?

## Gate D — Interaction System
¿Ruleta y Trivial se sienten como parte del mismo universo?

## Gate E — Product Experience
¿Build Your Pizza y Pizza Table aportan utilidad además de espectáculo?

## Gate F — White Label
¿Podemos transformar la experiencia en otra pizzería sin reconstruirla?

## Gate G — Real World
¿Funciona bien en móvil, carga rápido y termina en una acción comercial?

---

# DEFINICIÓN DE ÉXITO

El proyecto estará realmente validado cuando podamos demostrar:

1. Cinco experiencias coherentes.
2. Ninguna depende de 3D.
3. El horno entrega correctamente diferentes pizzas.
4. El contenido se cambia por configuración.
5. Dos pizzerías pueden usar el mismo motor con apariencias diferentes.
6. Funciona correctamente en móvil y desktop.
7. Cada experiencia conduce hacia selección, pedido, reserva o conversión.
8. Una nueva IA o desarrollador puede continuar el proyecto leyendo README + docs sin necesitar reconstruir el contexto.