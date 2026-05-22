# Memoria del Proyecto: Fortaleza de Confort Invisible y Resiliencia Activa
## Residencia Rural Calzada de Oropesa (Toledo)

Este documento constituye la memoria técnica y el historial completo del proyecto de domótica avanzada y redes de alta disponibilidad. Ha sido creado en el directorio de trabajo para servir como **memoria persistente**. Cualquier agente de IA o desarrollador que abra esta carpeta en el futuro podrá leer este documento y estar plenamente al tanto del contexto, las decisiones de diseño, los innegociables técnicos y las correcciones de software realizadas desde la primera conversación.

---

## 1. Ficha del Proyecto y Dinámica de Ocupación

*   **Ubicación:** Calzada de Oropesa (Toledo, España). Entorno rural con clima continental extremo (verano caluroso >40ºC, invierno frío) y red eléctrica propensa a microcortes y fluctuaciones.
*   **Propiedad:** Vivienda rural de 300 m² con gruesos muros de piedra tradicional (alta atenuación de radiofrecuencias). Actualmente en fase de reformas (tabiquería y yeso).
*   **Usuarios:** Segunda residencia familiar para 6 adultos (padres jubilados, 2 hijos y 2 nueras).
*   **Dinámica de Visitas:** Estancias recurrentes pero cortas (típicamente hasta 4 días de duración), distribuidas principalmente en primavera y verano. Ausencias prolongadas que no superarán el mes en otoño e invierno.
*   **Prioridad Crítica Nº 1:** **Seguridad perimetral y física** (ante riesgos específicos de intrusión por bandas locales que vigilan viviendas vacías).
*   **Prioridad Nº 2:** **Confort Invisible** (70% confort / 30% eficiencia energética). Automatizaciones en segundo plano que no requieran que los usuarios (especialmente los mayores) interactúen con aplicaciones complejas.

---

## 2. Respuestas Estratégicas y Definición de Objetivos (NotebookLM)

El diseño se cimenta sobre las respuestas del usuario al interrogatorio estratégico inicial:
1.  **Hábitos de ocupación:** Visitas de fin de semana y vacaciones. Se prioriza la **pre-climatización predictiva basada en geofencing** para que la vivienda esté a temperatura de confort (inercia térmica controlada) antes de la llegada de la familia desde Madrid.
2.  **Seguridad perimetral:** El control de accesos se segmenta en dos barreras (Valla Exterior Peatonal y Puerta de Entrada Principal) con cerraduras seguras y videovigilancia local 24/7 sin cuotas.
3.  **Presupuesto y Prioridades:** 70% Confort / 30% Eficiencia. Se prefiere invertir en hardware robusto de grado industrial (Z-Wave 800, cableado Cat6A, contactores) antes que en soluciones de consumo básico.
4.  **Gestión de Pozos:** Control de nivel analógico en los dos pozos freáticos de la finca para riego y piscina, protegiendo las bombas contra el funcionamiento en vacío (cavitación/dry-run).

---

## 3. Arquitectura de Red de Alta Disponibilidad y Respaldo Eléctrico

Dado que la seguridad y el control remoto desde Madrid dependen al 100% de la red local, se implementa una infraestructura sin fisuras:

```mermaid
graph TD
    A[Acometida Fibra Movistar] -->|VLAN 6 / PPPoE| B(Router 5G GL.iNet Spitz AX GL-X3000)
    C[Tarjeta SIM 5G Backup] -.->|Failover Celular| B
    B -->|Enlace Cat6 Troncal| D(Switch TP-Link Omada TL-SG2218P)
    E[SAI Salicru SPS 900 ONE] -->|Protección Eléctrica| D
    E -->|Protección Eléctrica| F(NAS Ugreen DXP2800 - NVR)
    D -->|Gigabit Ethernet| F
    D -->|PoE 15.4W| G(AP Techo Omada EAP653)
    D -->|PoE 15.4W| H(AP Ext Omada EAP610-Outdoor)
    D -->|PoE 15.4W| I(3x Cámaras Reolink Duo 3 PoE 16MP)
    D -->|PoE 15.4W| J(Video Timbre Reolink PoE)
    D -->|PoE 15.4W| K(Wall Panel Geekland 10/13.3")
    D -->|PoE Splitter 12V| B
    D -->|PoE Splitters 5V| L(Cerebro Homey Pro + Satélite Bridge)
```

### Componentes Clave y Justificación de Cambios:
*   **Router Central: GL.iNet Spitz AX (GL-X3000)**
    *   *Justificación:* Reemplaza configuraciones complejas de ONT más router celular independiente. Al incorporar módem 5G/4G nativo con failover en milisegundos y puerto WAN, simplifica el hardware.
    *   *Ventaja:* Soporta de forma nativa el etiquetado **PPPoE con VLAN 6** de Movistar. Si el instalador coloca un router HGU estándar de Movistar, se configura en **Modo Monopuesto** traspasando la IP pública al Spitz AX, eliminando la necesidad de otros dispositivos intermedios.
    *   *Alimentación:* Se alimenta centralizadamente desde el Switch del garaje mediante un **Splitter PoE activo a USB-C (12V)**, asegurando su supervivencia en apagones.
*   **Switch de Distribución: TP-Link Omada (TL-SG2218P)**
    *   *Justificación:* Cuenta con 16 puertos Gigabit PoE+ y 2 slots SFP. Satisface plenamente tu requerimiento de contar con entre 12 y 16 puertos PoE para alimentar centralizadamente toda la red domótica (cámaras, APs, pantallas y splitters), ofreciendo un excelente presupuesto total de 150W de potencia a una fracción del costo de un switch de 24 puertos.
    *   *Uso:* Proporciona alimentación PoE+ Gigabit para tus 10 dispositivos PoE actuales de forma segura e independiente, dejando 6 puertos libres para futuras ampliaciones y garantizando un tráfico de red sumamente fluido y sin interrupciones.
*   **Almacenamiento NAS: 4TB útiles en RAID1 (8TB Físicos en total)**
    *   *Suficiencia:* Plenamente suficiente. Al grabar 24/7 en alta resolución, las 3 cámaras consumen unos 388 GB/día, dando **10 días completos de historial**. Si se optimiza para grabar en baja resolución y conmutar a 16MP mediante detección de movimiento IA, el consumo baja a 100-150 GB/día, ampliando la retención a **entre 25 y 40 días**, cubriendo holgadamente las ausencias mensuales.
*   **SAI (UPS): Salicru SPS 900 ONE (900VA/480W)**
    *   *Gestión Inteligente:* Ante cortes eléctricos, el software **ViewPower** (conectado por USB al NAS Ugreen) inicia un apagado seguro inmediato de los discos del NAS. La energía restante del SAI se reserva exclusivamente para el router Spitz AX y el Homey Pro, garantizando comunicaciones activas por 5G durante horas.
    *   *Alerta Térmica Rural:* Las baterías de plomo sufren degradación extrema por encima de los 40ºC. El Rack de 19" en el garaje **exige ventilación activa termostática**. Si el garaje supera de continuo los 40ºC en verano, el núcleo de red y el SAI deberán ser reubicados en el interior habitable.

---

## 4. Doble Barrera de Control de Accesos y Seguridad Perimetral

### Barrera 1: Valla Peatonal del Muro Exterior
*   **Hardware:** Abrepuertas eléctrico de 12V AC/DC en contacto seco permanente + transformador de carril DIN 230V a 12V + relé **Shelly Plus 1** configurado en modo **Momentary** con **Auto Off tras 2 segundos**.
*   **Operativa:** Al pulsar el Video Timbre Reolink PoE en la valla, la señal viaja localmente a Homey Pro, que despierta el **Wall Panel Geekland** del pasillo (vía Fully Kiosk API). En la pantalla se pulsa el botón *"Abrir Puerta Exterior"* para dar paso al jardín.

### Barrera 2: Entrada Principal de la Vivienda
*   **Cerradura:** **Nuki Smart Lock Pro (5.ª Generación)** ya en propiedad del usuario.
*   **Innegociable Técnico:** Obligatoria instalación de un **cilindro de alta seguridad de doble embrague**. Permite abrir físicamente con llave tradicional desde fuera en caso de fallo electrónico, batería agotada o bloqueo lógico.
*   **Acceso Familiar:** Se instala el **Nuki Keypad 2.0** en el exterior para entrada biométrica por huella dactilar (ideal para evitar que familiares mayores luchen con llaves o el móvil).
*   **Integración:** Conectada localmente a Homey Pro por **Matter-over-Thread** para una respuesta instantánea (<1s) y total autonomía offline.

---

## 5. Diseño del Cuadro Eléctrico Inteligente Monofásico

Ubicado en el garaje de la vivienda en carril DIN, utiliza protecciones y relés profesionales cableados con secciones seguras:

1.  **Diferencial Auto-rearmable (Circutor REC4):** Asegura que ante caídas intempestivas de diferencial (humedad del riego, tormentas en Toledo), la vivienda recupere el suministro en 3 segundos, protegiendo la nevera, el router y la seguridad.
2.  **Protector contra Sobretensiones (Toscano Combi-PRO):** Blindaje contra subidas de tensión permanentes de la distribuidora y transitorias (rayos).
3.  **Medidor Shelly Pro 3EM (Monofásico):** Medición con tres pinzas amperométricas: Pinza A (Consumo General), Pinza B (Fuerza Pozo 1), Pinza C (Fuerza Pozo 2).
4.  **Desvío de Excedentes Fotovoltaicos (Termo ACS):** Termo de 3kW controlado por un **contactor industrial de 25A** accionado por un **Shelly Pro 1** en carril DIN. La medición de carga la realiza un **Shelly Pro EM-50** dedicado. Homey Pro regula el encendido según la telemetría del inversor Huawei FusionSolar.
5.  **Control de Motores de Pozos (Shelly Pro 2 + 2x Contactores de 25A):** Los motores de las bombas tienen picos inductivos de arranque que quemarían relés comunes. Los Shelly Pro 2 comandan únicamente las bobinas (A1-A2) de los contactores de 25A, a través de los cuales fluye la potencia hacia las bombas.
6.  **Sonda de Nivel Hidrostático (Sonda TL-136 + Shelly Plus Uni + Buck Converter):** Para evitar que el Shelly Plus Uni se dañe debido a fluctuaciones eléctricas del entorno rural, se instala un **convertidor DC-DC (Buck Converter)** para estabilizar a 12V la tensión de alimentación de la placa. La sonda analógica lee el nivel freático y Homey Pro corta la bomba al instante si baja del 15% (Protección contra cavitación / Dry-Run).

---

## 6. Lógica de Riesgos Críticos en Homey Pro

Toda la lógica de emergencias se ejecuta localmente y offline en Homey Pro:
*   **Incendios en Falso Techo:** Ante detección de humo/CO por sensores Zigbee en salón o pasillo, Homey Pro envía por API Local HTTP un comando a la pasarela **Airzone Webserver HUB** para **cerrar al 0% todas las rejillas proporcional motorizadas (Airzone Rint)** y apaga los climatizadores de conductos. Esto evita que los ventiladores esparzan los humos tóxicos entre estancias a través de los techos técnicos mientras la familia duerme.
*   **Fugas de Agua:** Si los sensores de inundación detectan agua en cocina, baños o bandeja de condensados de la aerotermia, Homey Pro corta la **Electroválvula General de Agua (12V/230V)** en menos de 2 segundos.
*   **Geofencing Inteligente (Sin Falsos Positivos):**
    *   *Entrada:* Al salir de Madrid y cruzar el radio de **2 km** (sentido Entrante), se activa la pre-climatización de la aerotermia. Al cruzar el radio estrecho de **100 m** Y confirmarse la conexión Bluetooth/WiFi del móvil al AP exterior Omada, se abre la valla y el garaje de forma automatizada.
    *   *Salida:* Al cruzar el radio en sentido Saliente, el automatismo de apertura se bloquea inmediatamente para evitar aperturas accidentales por paseos dentro de la finca.

---

## 7. Instrucciones Urgentes de Obra para el Electricista

Para aprovechar la fase actual de enyesado y tabiquería, se deben cumplir tres innegociables físicos:
1.  **Neutro Obligatorio:** Debe llevarse cable Neutro (azul) a **todos los cajetines de interruptor de la casa** para poder instalar micromódulos Shelly ocultos detrás de las teclas.
2.  **Cajas de Mecanismos Profundas (Seguridad Crítica):** Exigir cajetines de mecanismos con profundidad de **mínimo 60 mm (preferiblemente 65 mm)**. Queda **terminantemente prohibido el uso de cajetines estándar de 40 mm**, ya que el aplastamiento físico del micromódulo Shelly contra el fondo de la caja representa un severo riesgo de fatiga mecánica, sobrecalentamiento e incendio por arco eléctrico.
3.  **Cableado Estructurado Blindado PoE:**
    *   Tiradas de interior cercanas a cables de fuerza: Cable **Cat6A F/UTP** blindado para evitar interferencias.
    *   Tiradas de exterior (Cámaras, Videotimbre, AP Exterior): Cable **Cat6A SF/UTP con chaqueta de Polietileno (PE)** resistente a la intemperie y al sol de Toledo, con **conectores STP metálicos**. El blindaje del conector debe derivarse a tierra física a través del chasis del switch TP-Link Omada en el garaje.

---

## 8. Arquitectura del Panel Interactivo (Dashboard Web)

La interfaz de usuario y panel técnico de esta solución ha sido desarrollada en Vanilla HTML, CSS y Javascript bajo una estética premium y dinámica, adaptada a un **diseño claro (Light Theme)** con alto contraste.

### Estructura del Código:
*   [index.html](file:///C:/Users/cotin/.gemini/antigravity/scratch/domotica-calzada/index.html): Documento principal que estructura el Dashboard con barra de navegación lateral y pestañas enriquecidas con SVG interactivos del plano conceptual de la casa y del esquema eléctrico DIN.
*   [styles.css](file:///C:/Users/cotin/.gemini/antigravity/scratch/domotica-calzada/styles.css): Sistema de diseño claro HSL unificado, transiciones fluidas, animaciones dinámicas de flujo eléctrico (`stroke-dasharray` en cables) y estilos adaptados a pantallas táctiles.
*   [app.js](file:///C:/Users/cotin/.gemini/antigravity/scratch/domotica-calzada/app.js): Control lógico del Dashboard, cambio dinámico de pestañas, comportamiento interactivo al hacer hover/click sobre los componentes SVG (tanto en el plano como en el cuadro), calculadora de autonomía del SAI/UPS basada en carga, sumador interactivo de presupuesto y bloc de notas autoguardado en `localStorage` con exportador de texto plano.

---

## 9. Registro de Bug Fixes Críticos (Mayo 2026)

Se han corregido cuatro fallos críticos en la interfaz del panel interactivo para garantizar un funcionamiento impecable:

1.  **Títulos Invisibles Corregidos:** Se eliminaron las reglas inline `color: white` en las tarjetas de la pestaña de Accesos y Seguridad, que causaban invisibilidad al renderizar con el tema claro. Ahora heredan dinámicamente el color `--text-primary` de alto contraste.
2.  **Botón Copiar Reposicionado:** El botón de copia de credenciales PPPoE (`#btn-copy-creds`) ha sido recolocado de forma absoluta dentro de su bloque contenedor oscuro `.code-container`. Esto soluciona la superposición que sufría con el título de la tarjeta y añade un icono de portapapeles consistente con la UI.
3.  **Estabilización del Plano Conceptual (Fin del Jitter/Vibración):** Los círculos numerados del plano conceptual sufrían una vibración violenta ("jitter") al situar el cursor encima. Esto sucedía porque al cambiar el radio del círculo `<circle>` en hover (de 19px a 20px), las propiedades de CSS `transform-box: fill-box`, `transform-origin: center` y la transición sobre `transform` forzaban un recalculo infinito del centro del grupo `<g>`, creando un bucle físico de entrada/salida del cursor.
    *   *Solución:* Se eliminaron las transiciones de transformación sobre el grupo `.svg-node` y `.panel-node`. Ahora, el cambio de tamaño del círculo se realiza mediante la transición nativa de su radio `r` en CSS sin alterar el grupo raíz, logrando un escalado limpio, estático e instantáneo sin vibración.
4.  **Habilitación de Páginas Vacías (Balanceo HTML):** Las secciones "Cuadro Inteligente", "Plan de Presupuesto", "Justificación de Equipos" y "Bloc de Planificación" aparecían completamente en blanco.
    *   *Diagnóstico:* En la pestaña 5 de Accesos (`tab-access`), faltaba la etiqueta de cierre `</div>` del contenedor flex. Esto provocaba que todas las pestañas siguientes se anidaran de forma errónea dentro de la sección oculta de Accesos. Al estar esta oculta por CSS, el navegador ocultaba todo el resto del documento.
    *   *Solución:* Se cerró correctamente el `div` de la sección y se validó el balanceo HTML en todo el archivo, incluyendo la etiqueta `<tbody>` omitida en la tabla de equipamiento. El Dashboard es ahora 100% visible, interactivo y accesible.

---

Este historial y memoria técnica garantiza la continuidad y el éxito de cualquier desarrollo futuro en el ecosistema **Fortaleza de Confort Invisible** en Calzada de Oropesa.
