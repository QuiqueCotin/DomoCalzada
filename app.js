document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Switching Functionality
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');

            // Remove active classes
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active classes
            item.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 2. Interactive SVG Conceptual Plan Tooltips
    const svgNodes = document.querySelectorAll('.svg-node');
    const detailsTitle = document.getElementById('node-details-title');
    const detailsDesc = document.getElementById('node-details-desc');
    const specLoc = document.getElementById('node-spec-loc');
    const specPwr = document.getElementById('node-spec-pwr');
    const specNet = document.getElementById('node-spec-net');
    const specFun = document.getElementById('node-spec-fun');
    const specBlock = document.getElementById('node-details-specs');

    const nodeData = {
        "0": {
            title: "Cuadro Eléctrico Inteligente",
            desc: "Cuadro general monofásico de protección y control de la vivienda. Aloja las protecciones avanzadas de carril DIN (diferencial REC4 auto-rearmable, Combi-PRO) y la lógica Shelly para derivación de excedentes fotovoltaicos y motores de pozos.",
            loc: "Garaje (Planta Baja, pared izquierda)",
            pwr: "Acometida Eléctrica Principal 230V AC",
            net: "Módulo WiFi y conexión ethernet a la red Omada",
            fun: "Protección y blindaje eléctrico, monitorización general y automatización de pozos."
        },
        "1": {
            title: "Router GL.iNet Spitz AX (GL-X3000)",
            desc: "Router neutro de alta gama y procesador ARM. Gestiona la fibra de Movistar y, en caso de caídas físicas o sabotajes de la línea de calle, conmuta automáticamente en milisegundos a su módem celular 5G integrado. Soporta la segmentación por VLANs locales (Domótica, Seguridad, Gestión, Invitados).",
            loc: "Salón (Planta Baja)",
            pwr: "PoE Splitter a USB-C (Respaldado por el SAI del garaje)",
            net: "Doble WAN activa (FTTH por cable + backup celular 5G)",
            fun: "Sistema nervioso de red, failover ultra rápido y cortafuegos SPI."
        },
        "2": {
            title: "Homey Pro (2023)",
            desc: "El cerebro domótico central de la vivienda. Coordina todas las antenas locales de radio Zigbee, Z-Wave, Thread/Matter e Infrarrojos para automatizar luces, clima y cierres.",
            loc: "Salón (Planta Baja)",
            pwr: "PoE Splitter a USB-C (Respaldado por el SAI del garaje)",
            net: "Red Local Inalámbrica WiFi & Zigbee Mesh",
            fun: "Procesador lógico, reglas de automatización y control local."
        },
        "3": {
            title: "Homey Bridge",
            desc: "Extensor de cobertura físico. Funciona como un satélite del Homey Pro para repetir y tejer la malla de señales Zigbee, Z-Wave e Infrarrojos en la planta superior.",
            loc: "Dormitorio / Distribuidor (Planta 1)",
            pwr: "PoE Splitter a USB-C (Respaldado por el SAI del garaje)",
            net: "WiFi Mesh local conectado con Homey Pro",
            fun: "Repetidor de radiofrecuencias para evitar zonas ciegas por muros gruesos."
        },
        "4": {
            title: "SAI Salicru SPS 900 ONE",
            desc: "Sistema de Alimentación Ininterrumpida de 900VA / 480W. Protege los equipos críticos de fluctuaciones y microcortes frecuentes en Toledo, suministrando unos 30 min de autonomía.",
            loc: "Armario Rack (Garaje)",
            pwr: "Línea Directa de Acometida 230V AC",
            net: "Monitoreo local mediante cable de datos USB al NAS",
            fun: "Respaldo y filtrado eléctrico. Apagado seguro del NAS."
        },
        "5": {
            title: "Switch TP-Link Omada (TL-SG2218P)",
            desc: "Switch PoE+ gestionable de alta disponibilidad con 16 puertos Gigabit PoE+ y 2 ranuras SFP. Satisface perfectamente la necesidad de entre 12 y 16 puertos PoE para alimentar cámaras, APs, pantallas y splitters, con un presupuesto de hasta 150W de potencia y una excelente relación calidad-precio.",
            loc: "Armario Rack 19\" con Ventilación Activa (Garaje)",
            pwr: "Enchufe Schuko protegido por el SAI",
            net: "Conexión Gigabit PoE+ para dispositivos y 2x ranuras SFP libres",
            fun: "Distribuidor troncal de datos y alimentación PoE de alta potencia y disponibilidad."
        },
        "6": {
            title: "NAS Ugreen DXP2800",
            desc: "Unidad de almacenamiento en red de 2 bahías. Sirve como NVR (Grabador de vídeo local) continuo para las cámaras Reolink, de forma 100% privada y sin suscripciones.",
            loc: "Armario Rack (Garaje)",
            pwr: "Enchufe Schuko protegido por el SAI",
            net: "Conectado por cable directo RJ45 Cat6",
            fun: "Almacenamiento masivo, grabaciones de seguridad y servidor local."
        },
        "7": {
            title: "AP Omada EAP653 WiFi 6",
            desc: "Punto de acceso profesional WiFi 6 empotrado en techo. Ofrece cobertura inalámbrica de alta velocidad y gran densidad a todos los dormitorios, móviles y sensores de la planta alta, con soporte multi-VLAN.",
            loc: "Techo del distribuidor (Planta 1)",
            pwr: "Alimentado por cable PoE desde el Switch del garaje",
            net: "Enlace de datos PoE Cat6",
            fun: "Red WiFi 6 unificada de alta velocidad y Roaming activo sin cortes."
        },
        "8": {
            title: "Cámara Fachada Izquierda",
            desc: "Cámara Reolink Duo 3 PoE con dos lentes y resolución de 16MP. Proporciona una imagen ultra-ancha de 180º sin ángulos muertos en el lateral izquierdo.",
            loc: "Fachada Exterior Lateral (Segunda Planta)",
            pwr: "Alimentación PoE (Cat6)",
            net: "Cable de red Ethernet de cobre",
            fun: "Seguridad y detección inteligente IA de personas/coches."
        },
        "9": {
            title: "Cámara Fachada Centro",
            desc: "Cámara Reolink Duo 3 PoE de 180 grados reales orientada al patio central y acceso peatonal de entrada.",
            loc: "Porche Principal (Segunda Planta)",
            pwr: "Alimentación PoE (Cat6)",
            net: "Cable de red Ethernet de cobre",
            fun: "Vigilancia perimetral del porche y zonas comunes."
        },
        "10": {
            title: "Cámara Fachada Derecha (Patio)",
            desc: "Cámara panorámica Reolink Duo 3 PoE de 16MP y 180º reales. Instalada sobre la zona de escaleras del patio exterior para vigilar la franja trasera y lateral de acceso.",
            loc: "Fachada del Patio Exterior (Segunda Planta)",
            pwr: "Alimentación PoE mediante cables exteriores blindados SF/UTP con cubierta PE",
            net: "Cable blindado Ethernet STP con toma de tierra a chasis del switch",
            fun: "Vigilancia perimetral del patio y accesos posteriores de la finca."
        },
        "13": {
            title: "AP PoE Outdoor (TP-Link Omada EAP610-Outdoor)",
            desc: "Punto de acceso WiFi 6 profesional de exteriores con certificación IP67 contra la intemperie. Proporciona señal WiFi de alta velocidad a toda la zona de jardín, piscina y los sensores de automatización de pozos.",
            loc: "Fachada del Jardín (Segunda Planta, esquina derecha)",
            pwr: "Alimentación PoE+ desde el Switch del garaje (Cat6A SF/UTP PE)",
            net: "Cable blindado Ethernet STP con toma de tierra a chasis del switch",
            fun: "Cobertura WiFi extendida y roaming inteligente de exteriores."
        },
        "11": {
            title: "Wall Panel PoE Encastrado",
            desc: "Pantalla táctil Android de 10.1\" o 13.3\" sin batería. Totalmente encastrada en obra. Se enciende y suena automáticamente cuando tocan el videoportero de la valla.",
            loc: "Pasillo Central (Planta Baja)",
            pwr: "Alimentación exclusiva PoE (Cat6) (Cero baterías)",
            net: "Conexión estable por cable RJ45 Cat6",
            fun: "Interfaz táctil de uso simplificado e intercomunicador."
        },
        "12": {
            title: "Video Timbre Reolink PoE",
            desc: "Videoportero exterior con lente gran angular, audio bidireccional y pulsador físico. Envía la señal instantánea a la pantalla de casa al ser pulsado.",
            loc: "Muro de la Valla Peatonal Exterior",
            pwr: "Alimentación PoE (Cat6)",
            net: "Cable de red Ethernet de cobre",
            fun: "Intercomunicador, timbre de valla y cámara de entrada."
        },
        "shelly-pro": {
            title: "Shelly Pro 2 (Pozos)",
            desc: "Relé de carril DIN conectado por cable de red en el cuadro. Activa de forma segura las bobinas de los dos contactores eléctricos de 25A para accionar las potentes bombas de agua.",
            loc: "Cuadro Eléctrico (Garaje)",
            pwr: "Conexión 230V AC",
            net: "Cable RJ45 Cat6 conectado al Switch",
            fun: "Control lógico y seguro de cargas inductivas de alto consumo."
        },
        "shelly-gate": {
            title: "Abrepuertas Eléctrico (Shelly Plus 1)",
            desc: "Módulo Shelly en serie con transformador de 12V para accionar el cerradero/pestillo eléctrico de la valla exterior. Abre la valla al pulsar en el Wall Panel.",
            loc: "Caja de registro en Valla Exterior",
            pwr: "Línea de 12V AC/DC",
            net: "WiFi Local enlazado a Homey Pro",
            fun: "Pulso eléctrico de 2 segundos para liberar el pestillo de valla."
        },
        "nuki": {
            title: "Nuki Smart Lock Pro",
            desc: "Cerradura inteligente Matter over Thread/WiFi en la entrada interior de la casa. Permite a tus familiares mayores entrar con su huella en el Keypad 2.0 exterior.",
            loc: "Puerta Entrada Principal",
            pwr: "Pila recargable integrada (duración 6 meses)",
            net: "Matter over Thread & Bluetooth local",
            fun: "Acceso sin llaves de máxima seguridad para la vivienda."
        },
        "pozo1": {
            title: "Bomba Pozo 1 (Riego y Piscina)",
            desc: "Bomba potente de pozo para suministro de agua del circuito de riego automático y llenado de la piscina. Accionada mediante contactor comandado por Shelly Pro 2.",
            loc: "Exterior (Well 1)",
            pwr: "Monofásica 230V con pico inductivo",
            net: "Manguera eléctrica al cuadro",
            fun: "Suministro hídrico para jardín y piscina."
        },
        "pozo2": {
            title: "Bomba Pozo 2 (Fuente)",
            desc: "Bomba de pozo dedicada en exclusiva para el llenado y flujo de la fuente decorativa exterior.",
            loc: "Exterior (Well 2)",
            pwr: "Monofásica 230V comandada por contactor",
            net: "Manguera eléctrica al cuadro",
            fun: "Flujo y llenado de la fuente exterior."
        },
        "fp2": {
            title: "Radar Aqara FP2 (Salón)",
            desc: "Radar de presencia por ondas milimétricas (mmWave). Detecta la posición exacta de varias personas en tiempo real incluso en reposo absoluto, dividiendo el salón en hasta 30 zonas virtuales independientes para climatizar e iluminar solo donde estás.",
            loc: "Techo del Salón (Planta Baja)",
            pwr: "Alimentación USB 5V continua (cable oculto a caja profunda)",
            net: "WiFi 2.4 GHz local enlazado a Homey Pro",
            fun: "Detección estática milimétrica, control de clima y luces invisibles sin fallos."
        },
        "shelly-uni": {
            title: "Shelly Uni (Pozos)",
            desc: "Chip inteligente miniatura con entradas analógicas y sensores de temperatura/sondas. Lee las sondas de nivel analógicas instaladas en los pozos y transmite los datos para evitar que las bombas giren en vacío.",
            loc: "Cuadro de Control de Pozos / Exterior",
            pwr: "Alimentación a baja tensión 12V/24V DC",
            net: "WiFi Local enlazado a Homey Pro",
            fun: "Lectura analógica en tiempo real del caudal/profundidad de los pozos de agua."
        },
        "water-valve": {
            title: "Electroválvula General de Agua",
            desc: "Válvula solenoide motorizada con retorno por muelle o accionamiento eléctrico. Si algún sensor detecta fugas de agua, Homey Pro corta la entrada general de la finca en menos de 2 segundos para evitar inundaciones catastróficas.",
            loc: "Caja de Acometida de Agua (Garaje)",
            pwr: "Alimentada por circuito dedicado de 230V comandado por Shelly",
            net: "Cableada físicamente a relé auxiliar del cuadro",
            fun: "Contención automática e inmediata de inundaciones en toda la vivienda."
        },
        "smoke": {
            title: "Detector Inteligente de Humo y CO",
            desc: "Sensor dual fotoeléctrico de humo e incendio. Enlazado a la compuerta inteligente de climatización. Si detecta humo (ej. mala combustión en chimenea), ordena cerrar al 0% todas las rejillas Airzone para evitar la propagación de monóxido.",
            loc: "Techo del Salón / Pasillo",
            pwr: "Batería de litio sellada integrada (duración 10 años)",
            net: "Protocolo inalámbrico Zigbee de alta disponibilidad",
            fun: "Detección rápida de fuegos y aislamiento de humo por conductos."
        },
        "nuki-keypad": {
            title: "Nuki Keypad 2.0",
            desc: "Teclado exterior con lector de huellas dactilares. Permite el desbloqueo biométrico rápido y ultra seguro de la puerta principal para familiares o personal autorizado sin necesidad de llevar móvil.",
            loc: "Marco exterior de la Puerta Principal",
            pwr: "4 pilas AAA (duración superior a 12 meses)",
            net: "Conexión Bluetooth encriptada directa con la cerradura Nuki",
            fun: "Acceso biométrico rápido y seguro, eliminando la necesidad de llaves."
        }
    };

    svgNodes.forEach(node => {
        node.addEventListener('mouseover', () => {
            const id = node.getAttribute('data-id');
            const data = nodeData[id];
            if (data) {
                detailsTitle.textContent = data.title;
                detailsDesc.textContent = data.desc;
                specLoc.textContent = data.loc;
                specPwr.textContent = data.pwr;
                specNet.textContent = data.net;
                specFun.textContent = data.fun;
                specBlock.style.display = 'block';
            }
            
            // Highlight connections for this node
            document.querySelectorAll('.cable-line').forEach(cable => {
                const from = cable.getAttribute('data-from');
                const to = cable.getAttribute('data-to');
                if (from === id || to === id) {
                    cable.classList.add('active-cable');
                } else {
                    cable.classList.remove('active-cable');
                }
            });
        });
        
        node.addEventListener('mouseleave', () => {
            // Remove highlighting from all connections
            document.querySelectorAll('.cable-line').forEach(cable => {
                cable.classList.remove('active-cable');
            });
        });
        
        node.addEventListener('click', () => {
            const id = node.getAttribute('data-id');
            const data = nodeData[id];
            if (data) {
                detailsTitle.textContent = data.title;
                detailsDesc.textContent = data.desc;
                specLoc.textContent = data.loc;
                specPwr.textContent = data.pwr;
                specNet.textContent = data.net;
                specFun.textContent = data.fun;
                specBlock.style.display = 'block';

                // Simple visual ripple on click
                const circle = node.querySelector('circle');
                if (circle) {
                    const originalR = circle.getAttribute('r');
                    circle.setAttribute('r', '25');
                    setTimeout(() => {
                        circle.setAttribute('r', originalR);
                    }, 300);
                }
                
                const rect = node.querySelector('rect');
                if (rect) {
                    const originalW = rect.getAttribute('width');
                    const originalH = rect.getAttribute('height');
                    const originalX = rect.getAttribute('x');
                    const originalY = rect.getAttribute('y');
                    
                    rect.setAttribute('width', '40');
                    rect.setAttribute('height', '40');
                    rect.setAttribute('x', '-20');
                    rect.setAttribute('y', '-20');
                    setTimeout(() => {
                        rect.setAttribute('width', originalW);
                        rect.setAttribute('height', originalH);
                        rect.setAttribute('x', originalX);
                        rect.setAttribute('y', originalY);
                    }, 300);
                }
            }
        });
    });

    // 2b. Interactive SVG Electrical Panel Tooltips
    const panelNodes = document.querySelectorAll('.panel-node');
    const panelDetailsTitle = document.getElementById('panel-details-title');
    const panelDetailsDesc = document.getElementById('panel-details-desc');
    const panelSpecFun = document.getElementById('panel-spec-fun');
    const panelSpecElec = document.getElementById('panel-spec-elec');
    const panelSpecDomo = document.getElementById('panel-spec-domo');
    const panelSpecBlock = document.getElementById('panel-details-specs');

    const panelData = {
        "combi-pro": {
            title: "Protección Sobretensiones Toscano Combi-PRO 2P40",
            desc: "Protector inteligente contra sobretensiones transitorias y permanentes con reconexión automática integrada. Protege de forma infalible toda la electrónica de control y la domótica contra los impactos de rayos en las líneas aéreas rurales y variaciones de tensión extremas de hasta 320V.",
            fun: "Protección física integral contra picos eléctricos críticos.",
            elec: "Entrada superior directa L/N (230V AC - Fase marrón, Neutro azul). Conexión a tierra (PE - Verde/Amarillo) y salida hacia el diferencial REC4.",
            domo: "OK LED verde encendido indica correcto estado de protección. Aislamiento físico de red en milisegundos ante anomalías de voltaje."
        },
        "rec4": {
            title: "Diferencial Auto-rearmable Circutor REC4 2P-40-30",
            desc: "Interruptor diferencial autorearmable e inteligente de 2 polos y 40A con sensibilidad de 30mA. En caso de salto accidental por tormenta o humedad en los circuitos de exterior, realiza automáticamente una serie de test de aislamiento y reestablece la corriente de forma segura en solo 3 segundos.",
            fun: "Protección diferencial de personas y rearme proactivo del suministro.",
            elec: "Entrada fase/neutro desde Combi-PRO. Salida directa al repartidor general y las fases que alimentan a los magnetotérmicos C10 y C16.",
            domo: "Garantiza que la casa, cámaras, neveras y domótica no queden inoperativas durante ausencias largas por saltos intempestivos."
        },
        "pro3em": {
            title: "Medidor Trifásico Shelly Pro 3EM (Monofásico)",
            desc: "Analizador de energía profesional para carril DIN con conexión por cable Ethernet LAN físico. Aunque está alimentado en monofásico, utiliza sus tres pinzas amperimétricas (CT clamps) independientes para monitorizar simultáneamente tres puntos neurálgicos de la instalación.",
            fun: "Telemetría eléctrica en tiempo real de toda la vivienda.",
            elec: "Alimentación de tensión protegida por el PIA de domótica. Pinza A colocada tras el REC4 (General), Pinza B en fase de Bomba Pozo 1, Pinza C en fase de Bomba Pozo 2.",
            domo: "Transmite consumo instantáneo (W), potencia acumulada (kWh), tensión de red y factor de potencia vía WebSockets a Homey Pro localmente."
        },
        "pia-domo": {
            title: "Magnetotérmico C10 Domótica",
            desc: "Interruptor magnetotérmico monofásico de 10A dedicado en exclusiva a salvaguardar la línea del armario rack de comunicaciones (router 5G, switch PoE y cerebro Homey Pro) y la alimentación lógica de los módulos de control Shelly.",
            fun: "Protección de sobrecarga del núcleo domótico y red local.",
            elec: "Entrada desde fase general de REC4. Salida directa a la acometida de corriente protegida por el SAI (UPS) del garaje.",
            domo: "Aísla eléctricamente el cerebro y red de datos de cualquier avería o cortocircuito de fuerza o motores de la vivienda."
        },
        "pia-termo": {
            title: "Magnetotérmico C16 Termo ACS",
            desc: "Interruptor magnetotérmico monofásico de 16A dimensionado específicamente para proteger la línea eléctrica exclusiva del termo de agua caliente de 3kW.",
            fun: "Protección térmica y magnética de la línea de agua caliente.",
            elec: "Entrada desde fase general de REC4. Salida hacia el contactor de fuerza del termo, cruzando la pinza del Shelly Pro EM-50.",
            domo: "Aísla la línea de fuerza en caso de avería en la resistencia eléctrica calefactora del termo de agua caliente."
        },
        "pia-pozos": {
            title: "Magnetotérmico C16 Pozos",
            desc: "Interruptor magnetotérmico de 16A para proteger el circuito eléctrico y de fuerza de las potentes bombas de agua de los dos pozos exteriores de la propiedad.",
            fun: "Protección contra sobrecargas de fuerza hidráulica exterior.",
            elec: "Entrada desde fase de REC4. Salida en paralelo directa a los bornes principales de entrada de los contactores 1 y 2 de las bombas.",
            domo: "Aísla por completo la potencia exterior ante derivaciones de agua en los motores sin cortar el suministro eléctrico del resto de la vivienda."
        },
        "shelly-pro1": {
            title: "Actuador Domótico Shelly Pro 1",
            desc: "Relé profesional para carril DIN con contacto seco libre de potencial y puerto Ethernet LAN. Se utiliza para conmutar lógicamente la maniobra de potencia del termo eléctrico.",
            fun: "Control lógico digital y maniobra segura por relé seco.",
            elec: "Alimentación L/N a 230V protegida por C10. Bornes I/O conectados en serie con la fase de control (cable rojo) hacia el borne A1 del contactor del termo.",
            domo: "Homey Pro lo activa automáticamente para derivar excedentes fotovoltaicos hacia el termo ACS, convirtiéndolo en batería térmica."
        },
        "pro-em50": {
            title: "Medidor Shelly Pro EM-50",
            desc: "Medidor de consumo eléctrico en carril DIN de doble canal con conexión cableada Ethernet. Registra en tiempo real el consumo de energía del termo eléctrico para coordinar la climatización solar.",
            fun: "Medición exacta del consumo activo del termo ACS.",
            elec: "Alimentación a 230V protegida por C10. Pinza amperimétrica (CT) colocada alrededor de la fase que sale del contactor hacia el termo.",
            domo: "Informa del estado térmico y potencia demandada real por el termo (0W indica termo completamente cargado de calor y termostato abierto)."
        },
        "contactor-termo": {
            title: "Contactor de Potencia 25A (Termo ACS)",
            desc: "Contactor industrial de carril DIN diseñado para conmutar cargas resistivas pesadas de hasta 25A de forma segura. Actúa como barrera física de potencia.",
            fun: "Conmutación electromecánica segura de alta potencia (3000W).",
            elec: "Bornes A1-A2 (Bobina de Control): A1 recibe fase de maniobra (roja) de Shelly Pro 1, A2 a neutro. Bornes 1-2, 3-4 (Fuerza): L/N desde el magnetotérmico hacia el termo.",
            domo: "Absorbe el desgaste de los arcos eléctricos de potencia, protegiendo al relé Shelly Pro 1 contra fusión mecánica de contactos por chispazos."
        },
        "shelly-pro2": {
            title: "Actuador Domótico Shelly Pro 2",
            desc: "Relé inteligente profesional para carril DIN con dos canales independientes de control de maniobra y puerto Ethernet LAN. Gestiona secuencialmente las bombas.",
            fun: "Control de maniobra e intercomunicación para las bombas de pozo.",
            elec: "Alimentación L/N a 230V. Salida O1 (Canal 1) a bobina A1 del contactor del Pozo 1, Salida O2 (Canal 2) a bobina A1 del contactor del Pozo 2.",
            domo: "Permite temporizar riegos, llenados de piscina y la parada protectora inmediata si la sonda detecta bajo nivel de agua en el pozo."
        },
        "contactor-pozo1": {
            title: "Contactor de Potencia 25A (Bomba Pozo 1)",
            desc: "Contactor industrial robusto de 25A. Diseñado específicamente para conmutar cargas muy inductivas y motores de bomba con picos de arranque elevados.",
            fun: "Conmutador de fuerza para la Bomba del Pozo 1 (Riego y Piscina).",
            elec: "Bobina de control en A1-A2 (A1 conectado a salida roja O1 del Shelly Pro 2). Bornes principales conmutan fase de fuerza de la bomba desde el magnetotérmico.",
            domo: "Absorbe con total seguridad el enorme pico de corriente inductiva en el arranque del motor, garantizando la fiabilidad de los mandos."
        },
        "contactor-pozo2": {
            title: "Contactor de Potencia 25A (Bomba Pozo 2)",
            desc: "Contactor industrial idéntico de 25A dedicado al control de potencia de la bomba del Pozo 2 que alimenta la fuente decorativa exterior de la finca.",
            fun: "Conmutador de fuerza para la Bomba del Pozo 2 (Fuente Exterior).",
            elec: "Bobina A1-A2 (A1 conectado a salida roja O2 de Shelly Pro 2). Bornes de fuerza conmutan la fase activa del motor de la fuente exterior.",
            domo: "Permite al sistema cortar por completo la fuente exterior cuando no hay nadie en la finca, previniendo vandalismo y derroche."
        },
        "shelly-uni-box": {
            title: "Caja de Telemetría Shelly Plus Uni + Convertidor Buck",
            desc: "Caja estanca en carril DIN que integra el micromódulo inteligente analógico Shelly Plus Uni y un convertidor DC-DC (Buck Converter) estabilizado para proteger el chip y alimentar la sonda de nivel hidrostática TL-136.",
            fun: "Telemetría y protección contra cavitación de los pozos.",
            elec: "Alimentación protegida y rebajada a 12V DC mediante convertidor Buck integrado. Entrada analógica conectada por cable blindado a la sonda del pozo (0-10V).",
            domo: "Monitoriza el nivel de profundidad de los pozos. Homey Pro realiza una desconexión de emergencia si el nivel cae por debajo de 15%."
        }
    };

    panelNodes.forEach(node => {
        const updatePanelDetails = () => {
            const id = node.getAttribute('data-id');
            const data = panelData[id];
            if (data) {
                panelDetailsTitle.textContent = data.title;
                panelDetailsDesc.textContent = data.desc;
                panelSpecFun.textContent = data.fun;
                panelSpecElec.textContent = data.elec;
                panelSpecDomo.textContent = data.domo;
                panelSpecBlock.style.display = 'block';
            }
        };

        node.addEventListener('mouseover', updatePanelDetails);
        node.addEventListener('click', () => {
            updatePanelDetails();

            // Visual pulse effect for SVG group bounding box
            const rect = node.querySelector('rect');
            if (rect) {
                const originalStrokeWidth = rect.getAttribute('stroke-width') || '2';
                rect.setAttribute('stroke-width', '4');
                setTimeout(() => {
                    rect.setAttribute('stroke-width', originalStrokeWidth);
                }, 300);
            }
        });
    });

    // 3. Interactive UPS (SAI) Autonomy Calculator
    const loadSlider = document.getElementById('load-slider');
    const loadValue = document.getElementById('load-value');
    const batterySlider = document.getElementById('battery-slider');
    const batteryValue = document.getElementById('battery-value');
    const autonomyValEl = document.getElementById('autonomy-value');

    function calculateAutonomy() {
        const load = parseFloat(loadSlider.value);
        const batteryAh = parseFloat(batterySlider.value);
        
        loadValue.textContent = `${load} W`;
        batteryValue.textContent = `${batteryAh} Ah`;

        // Energy formula: E = 12V * BatteryAh * Inverter Efficiency (estimated 82% for Salicru)
        const voltage = 12;
        const efficiency = 0.82;
        const totalEnergyWh = voltage * batteryAh * efficiency;

        // Autonomy in minutes
        let autonomyMinutes = (totalEnergyWh / load) * 60;

        // Visual adjustment for high discharge rates (Peukert's law simplification)
        if (load > 200) {
            autonomyMinutes = autonomyMinutes * 0.9;
        } else if (load > 350) {
            autonomyMinutes = autonomyMinutes * 0.8;
        }

        // Display results nicely
        if (autonomyMinutes >= 60) {
            const hours = Math.floor(autonomyMinutes / 60);
            const mins = Math.round(autonomyMinutes % 60);
            autonomyValEl.textContent = `${hours}h ${mins}m`;
        } else {
            autonomyValEl.textContent = `${Math.round(autonomyMinutes)} min`;
        }
    }

    if (loadSlider && batterySlider) {
        loadSlider.addEventListener('input', calculateAutonomy);
        batterySlider.addEventListener('input', calculateAutonomy);
        // Initial run
        calculateAutonomy();
    }

    // 4. Interactive Budget Calculator
    const budgetCheckboxes = document.querySelectorAll('.budget-checkbox');
    const budgetTotalEl = document.getElementById('budget-total');
    const budgetQtyInputs = document.querySelectorAll('.budget-qty');

    function calculateTotalBudget() {
        let total = 0;
        const budgetItems = document.querySelectorAll('.budget-item');
        budgetItems.forEach(item => {
            const checkbox = item.querySelector('.budget-checkbox');
            const qtyInput = item.querySelector('.budget-qty');
            const priceEl = item.querySelector('.item-price');
            
            if (checkbox && qtyInput && priceEl) {
                const unitPrice = parseFloat(checkbox.getAttribute('data-price') || 0);
                let qty = parseInt(qtyInput.value);
                if (isNaN(qty) || qty < 1) {
                    qty = 1;
                }
                const subtotal = unitPrice * qty;
                
                // Update item's price display in the UI dynamically
                priceEl.textContent = `${subtotal.toLocaleString('es-ES')} €`;
                
                if (checkbox.checked) {
                    total += subtotal;
                }
            }
        });
        if (budgetTotalEl) {
            budgetTotalEl.textContent = `${total.toLocaleString('es-ES')} €`;
        }
    }

    budgetCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotalBudget);
    });

    budgetQtyInputs.forEach(qtyInput => {
        qtyInput.addEventListener('input', calculateTotalBudget);
        qtyInput.addEventListener('change', calculateTotalBudget);
    });

    // Make the entire card clickable for budget items (except when interacting with input elements)
    const budgetItems = document.querySelectorAll('.budget-item');
    budgetItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Prevent double triggering if clicked directly on checkbox or typing in quantity selector
            if (e.target.tagName !== 'INPUT') {
                const checkbox = item.querySelector('.budget-checkbox');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    calculateTotalBudget();
                }
            }
        });
    });

    // Initial budget calculation
    calculateTotalBudget();

    // 5. Copy Movistar WAN Credentials
    const btnCopyCreds = document.getElementById('btn-copy-creds');
    if (btnCopyCreds) {
        btnCopyCreds.addEventListener('click', () => {
            const textToCopy = `Tipo de Conexión: PPPoE\nUsuario: adslppp@telefonicanetpa\nContraseña: adslppp\nVLAN ID: 6\nPrioridad: 1`;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = btnCopyCreds.innerHTML;
                btnCopyCreds.innerHTML = `
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Copiado!
                `;
                setTimeout(() => {
                    btnCopyCreds.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar: ', err);
            });
        });
    }

    // 6. Interactive Notepad and Document Export
    const notepadArea = document.getElementById('notepad-area');
    const btnExportTxt = document.getElementById('btn-export-txt');
    const btnResetNotepad = document.getElementById('btn-reset-notepad');

    const defaultNotes = `[Notas de Planificación - Calzada de Oropesa]\n\n` +
        `- Canalización: Asegurar que el electricista coloque cajetines profundos de 60mm en los interruptores para albergar los Shelly Plus 2PM.\n` +
        `- Movistar FTTH: Pedir ONT independiente al instalador durante la visita de puesta en marcha. Si no, poner el HGU en Monopuesto.\n` +
        `- Videoportero: La pantalla Geekland se empotrará en el pasillo. Debe encenderse sola cuando suene el timbre de valla y accionar la cerradura exterior a 12V.\n` +
        `- Cuadro Eléctrico: Instalar el diferencial REC4 auto-rearmable y Shelly Pro 3EM en carril DIN con pinzas para monitorizar las bombas de los pozos.\n` +
        `- Climatización: Airzone centralizado con compuertas proporcionales e interfaz simplificada para familiares.`;

    if (notepadArea) {
        // Load saved notes if they exist, otherwise set default
        const savedNotes = localStorage.getItem('domo_calzada_notes');
        notepadArea.value = savedNotes || defaultNotes;

        // Auto save on input
        notepadArea.addEventListener('input', () => {
            localStorage.setItem('domo_calzada_notes', notepadArea.value);
        });
    }

    if (btnResetNotepad && notepadArea) {
        btnResetNotepad.addEventListener('click', () => {
            if (confirm('¿Seguro que quieres restaurar las notas predeterminadas?')) {
                notepadArea.value = defaultNotes;
                localStorage.setItem('domo_calzada_notes', defaultNotes);
            }
        });
    }

    if (btnExportTxt && notepadArea) {
        btnExportTxt.addEventListener('click', () => {
            const blob = new Blob([notepadArea.value], { type: 'text/plain;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'DomoCalzada_Notas_Planificacion.txt';
            link.click();
            URL.revokeObjectURL(link.href);
        });
    }

    // 7. View Selector (Zones vs Floor Plan) in Conceptual Plan tab
    const btnViewZones = document.getElementById('btn-view-zones');
    const btnViewFloorplan = document.getElementById('btn-view-floorplan');
    const zonesSvg = document.getElementById('zones-svg');
    const floorplanSvg = document.getElementById('floorplan-svg');

    if (btnViewZones && btnViewFloorplan && zonesSvg && floorplanSvg) {
        btnViewZones.addEventListener('click', () => {
            btnViewZones.classList.add('active');
            btnViewFloorplan.classList.remove('active');
            zonesSvg.classList.remove('view-hidden');
            floorplanSvg.classList.add('view-hidden');
        });

        btnViewFloorplan.addEventListener('click', () => {
            btnViewFloorplan.classList.add('active');
            btnViewZones.classList.remove('active');
            floorplanSvg.classList.remove('view-hidden');
            zonesSvg.classList.add('view-hidden');
        });
    }

    // 8. Interactive HVAC Floor Plan and Sidebar specs
    const climateNodes = document.querySelectorAll('.climate-node');
    const climatePaths = document.querySelectorAll('#hvac-svg .hvac-duct, #hvac-svg .hvac-cable, #hvac-svg .hvac-rf');
    const climateDetailsTitle = document.getElementById('climate-details-title');
    const climateDetailsDesc = document.getElementById('climate-details-desc');
    const climateDetailsSpecs = document.getElementById('climate-details-specs');
    const climateSpecLoc = document.getElementById('climate-spec-loc');
    const climateSpecPwr = document.getElementById('climate-spec-pwr');
    const climateSpecNet = document.getElementById('climate-spec-net');
    const climateSpecFun = document.getElementById('climate-spec-fun');

    const climateData = {
        "ue-1": {
            title: "Unidad Exterior 1 (UE-1) - Planta Baja",
            desc: "Bomba de calor exterior de aerotermia dedicada a la planta baja. Se encarga del ciclo termodinámico para suministrar refrigeración o calefacción a la unidad interior (UI-1) a través de tuberías de gas refrigerante de cobre.",
            loc: "Tejado (Planta Alta, zona exterior)",
            pwr: "Alimentación trifásica 400V AC desde el cuadro de protecciones clima.",
            net: "Control analógico por interconexión directa con la UI-1 (bus de señal de maniobra de 2 hilos).",
            fun: "Generación térmica (Frío/Calor) de alta eficiencia para Salón y Cocina. Coordinado por la demanda de la UI-1."
        },
        "ue-2": {
            title: "Unidad Exterior 2 (UE-2) - Planta Alta",
            desc: "Bomba de calor exterior de aerotermia dedicada a la planta alta. Abastece a la unidad interior (UI-2) para climatizar los tres dormitorios y el distribuidor.",
            loc: "Tejado (Planta Alta, zona exterior)",
            pwr: "Alimentación trifásica 400V AC desde el cuadro de protecciones clima.",
            net: "Control analógico por interconexión directa con la UI-2.",
            fun: "Generación térmica para toda la planta alta. Regulado según la demanda agregada de los termostatos Think de las habitaciones."
        },
        "ui-1": {
            title: "Unidad Interior 1 (UI-1) - Conductos Planta Baja",
            desc: "Máquina interior de conductos de expansión directa de baja silueta, oculta en el falso techo del Baño 1. Distribuye aire acondicionado al Salón y la Cocina mediante conductos de fibra de vidrio y compuertas motorizadas.",
            loc: "Falso Techo del Baño 1 (Planta Baja)",
            pwr: "230V AC monofásico protegido por el diferencial general.",
            net: "Bus Modbus cableado hacia Airzone Webserver HUB y pasarela local.",
            fun: "Climatización por zonas de Planta Baja. Ajusta dinámicamente la velocidad del ventilador y la potencia térmica de la UE-1 según la apertura de las rejillas Rint."
        },
        "ui-2": {
            title: "Unidad Interior 2 (UI-2) - Conductos Planta Alta",
            desc: "Máquina interior de conductos de baja silueta, oculta en el falso techo del Baño 2. Climatiza los tres dormitorios (Dormitorio Principal, Dormitorio 2 y Dormitorio 3) de manera independiente.",
            loc: "Falso Techo del Baño 2 (Planta Alta)",
            pwr: "230V AC monofásico desde el cuadro secundario.",
            net: "Bus Modbus cableado hacia Airzone Webserver HUB.",
            fun: "Climatización independiente por zonas de Planta Alta. Ajusta caudal y temperatura basándose en las necesidades individuales de cada dormitorio."
        },
        "grille-salon": {
            title: "Rejilla Proporcional Rint - Salón",
            desc: "Compuerta motorizada inteligente del sistema Airzone. Regula el caudal de aire frío o caliente que entra al Salón abriendo o cerrando sus lamas de forma proporcional (0-100%) según la temperatura de consigna.",
            loc: "Salón (Planta Baja, pared frontal)",
            pwr: "Alimentada a 12V DC por bus físico desde el módulo de zonas Airzone.",
            net: "Conexión por cable de control Airzone de 2 hilos.",
            fun: "Control de flujo de aire en el Salón. Lógica de seguridad: si la ventana del Salón está abierta durante más de 60 segundos, la compuerta se cierra al 0% automáticamente para evitar pérdidas."
        },
        "grille-cocina": {
            title: "Rejilla Proporcional Rint - Cocina",
            desc: "Compuerta motorizada que regula la entrada de aire climatizado en la Cocina. Permite aislar térmicamente la cocina cuando se cocina o cuando la estancia no está ocupada.",
            loc: "Cocina (Planta Baja, pared lateral)",
            pwr: "12V DC desde el módulo de control Airzone.",
            net: "Cableado de zona Airzone.",
            fun: "Control de flujo de aire en Cocina. Cerrado automático de rejilla (0%) si se detecta humo para confinamiento de gases de combustión e incendios."
        },
        "grille-principal": {
            title: "Rejilla Proporcional Rint - Dormitorio Principal",
            desc: "Rejilla inteligente encargada de regular de forma precisa la temperatura en la suite principal. Su motor proporcional evita ruidos molestos durante la noche ajustando el flujo con suavidad.",
            loc: "Dormitorio Principal (Planta Alta)",
            pwr: "12V DC por bus físico Airzone.",
            net: "Cable de control local.",
            fun: "Climatización del Dormitorio Principal. Su compuerta se cierra de inmediato si el sensor magnético detecta la puerta del balcón abierta por más de 60 segundos."
        },
        "grille-dorm2": {
            title: "Rejilla Proporcional Rint - Dormitorio 2",
            desc: "Compuerta motorizada que regula de forma autónoma el aporte de aire climatizado en el segundo dormitorio, garantizando confort personalizado.",
            loc: "Dormitorio 2 (Planta Alta)",
            pwr: "12V DC por bus físico Airzone.",
            net: "Cable de control local.",
            fun: "Climatización de Dormitorio 2. Apagado automático por sensor de ventana Aqara tras el tiempo de histéresis regulado (60 segundos)."
        },
        "grille-dorm3": {
            title: "Rejilla Proporcional Rint - Dormitorio 3",
            desc: "Compuerta inteligente dedicada al tercer dormitorio. Permite suspender la climatización por completo en esta estancia si no está habitada.",
            loc: "Dormitorio 3 (Planta Alta)",
            pwr: "12V DC por bus físico Airzone.",
            net: "Cable de control local.",
            fun: "Climatización de Dormitorio 3. Automatización de cierre al abrir ventana o por falta de ocupación prolongada."
        },
        "thermostat-salon": {
            title: "Termostato Airzone Think - Salón",
            desc: "Termostato inteligente con pantalla de tinta electrónica de bajo consumo. Mide la temperatura y humedad del Salón y permite ajustar la consigna localmente o desde la app.",
            loc: "Salón (Planta Baja, pared central)",
            pwr: "Batería de litio de larga duración / Conexión por cable de bus.",
            net: "Bus Domo cableado a la placa centralizadora Airzone.",
            fun: "Interfaz de usuario e higrómetro del Salón. Envía la consigna y temperatura medida al cerebro Airzone para ajustar la apertura de la rejilla Rint."
        },
        "thermostat-cocina": {
            title: "Termostato Airzone Think - Cocina",
            desc: "Termostato dedicado a la zona de la Cocina. Proporciona control táctil local para ajustar el clima durante actividades de cocinado.",
            loc: "Cocina (Planta Baja, acceso pasillo)",
            pwr: "Batería de litio / Bus cableado.",
            net: "Bus Domo de comunicación.",
            fun: "Higrómetro e interfaz táctil para la Cocina. Coordina la temperatura óptima evitando choques térmicos con el resto de la planta."
        },
        "thermostat-principal": {
            title: "Termostato Airzone Think - Dormitorio Principal",
            desc: "Termostato de control local para la suite principal. Permite a los usuarios ajustar consignas nocturnas específicas para un descanso reparador.",
            loc: "Dormitorio Principal (Planta Alta)",
            pwr: "Batería / Bus cableado.",
            net: "Bus Domo de comunicación.",
            fun: "Control de clima de la suite principal. Lógica nocturna integrada en Homey Pro que atenúa la iluminación de la pantalla de tinta electrónica."
        },
        "thermostat-dorm2": {
            title: "Termostato Airzone Think - Dormitorio 2",
            desc: "Termostato dedicado al control local del segundo dormitorio, permitiendo perfiles de temperatura independientes.",
            loc: "Dormitorio 2 (Planta Alta)",
            pwr: "Batería / Bus cableado.",
            net: "Bus Domo.",
            fun: "Control de clima y consigna en Dormitorio 2."
        },
        "thermostat-dorm3": {
            title: "Termostato Airzone Think - Dormitorio 3",
            desc: "Termostato táctil para el tercer dormitorio. Ofrece control independiente y preciso de la zona.",
            loc: "Dormitorio 3 (Planta Alta)",
            pwr: "Batería / Bus cableado.",
            net: "Bus Domo.",
            fun: "Control de clima y consigna en Dormitorio 3."
        },
        "airzone-hub": {
            title: "Airzone Webserver HUB (Domo Bus)",
            desc: "El cerebro físico centralizado del sistema de climatización. Se conecta directamente a las máquinas interiores mediante Modbus para regular el ventilador y la caldera/aerotermia de forma proporcional, y expone una API local para la domótica.",
            loc: "Distribuidor Planta Alta (Falso Techo)",
            pwr: "12V DC suministrado por la fuente integrada de la placa Airzone.",
            net: "Bus Modbus cableado hacia UI-1 y UI-2 + Red LAN cableada RJ45.",
            fun: "Pasarela y lógica central de clima. Traduce las órdenes de Homey Pro a través de la API JSON de red local y gestiona el bus físico hacia termostatos y compuertas."
        },
        "homey-pro": {
            title: "Homey Pro 2023 - Coordinador del Clima",
            desc: "Servidor domótico principal. Integra el sistema de aerotermia y zonificación Airzone con el resto de la casa (sensores de ventanas, radar, detectores de humo y excedentes fotovoltaicos) para crear automatizaciones complejas de alta eficiencia.",
            loc: "Salón (Planta Baja)",
            pwr: "PoE Splitter a USB-C (Respaldado por el SAI de garaje).",
            net: "WiFi local de alta velocidad, Zigbee Mesh, Z-Wave, Thread.",
            fun: "Coordinador de automatizaciones. Reglas integradas: 1) Apagado de zona por ventana abierta (>60s). 2) Parada de ventiladores y cierre de rejillas (0%) si hay humo (confinamiento). 3) Encendido del clima con excedentes solares."
        },
        "sensor-window-salon": {
            title: "Sensor de Ventana Aqara - Salón",
            desc: "Sensor magnético inalámbrico ultra pequeño. Detecta si la ventana del Salón está abierta o cerrada y lo notifica al Homey Pro de forma instantánea.",
            loc: "Ventana del Salón (Planta Baja)",
            pwr: "Pila de botón CR2032 (Autonomía > 2 años).",
            net: "Zigbee 3.0 inalámbrico a la malla Homey Pro.",
            fun: "Sensor de seguridad y eficiencia. Lógica: si la ventana está abierta, activa un temporizador de 60s de histéresis tras el cual le indica a Homey Pro que cierre al 0% la rejilla del Salón."
        },
        "sensor-window-cocina": {
            title: "Sensor de Ventana Aqara - Cocina",
            desc: "Sensor magnético inalámbrico Aqara en la ventana de la Cocina.",
            loc: "Ventana de la Cocina (Planta Baja)",
            pwr: "Pila CR2032.",
            net: "Zigbee 3.0.",
            fun: "Cierre automático de la rejilla proporcional Rint de la Cocina si la ventana permanece abierta más de 60s para evitar derroche energético."
        },
        "sensor-window-principal": {
            title: "Sensor Puerta de Balcón Aqara - Suite Principal",
            desc: "Sensor magnético inalámbrico que monitoriza la puerta del balcón de la suite principal.",
            loc: "Balcón Dormitorio Principal (Planta Alta)",
            pwr: "Pila CR2032.",
            net: "Zigbee 3.0.",
            fun: "Apagado del clima en el Dormitorio Principal si se abre la puerta al exterior, aplicando la histéresis de 60 segundos."
        },
        "sensor-window-dorm2": {
            title: "Sensor de Ventana Aqara - Dormitorio 2",
            desc: "Sensor inalámbrico magnético en el segundo dormitorio.",
            loc: "Ventana Dormitorio 2 (Planta Alta)",
            pwr: "Pila CR2032.",
            net: "Zigbee 3.0.",
            fun: "Desactivación local de la compuerta de clima de la habitación 2 si se detecta apertura prolongada."
        },
        "sensor-window-dorm3": {
            title: "Sensor de Ventana Aqara - Dormitorio 3",
            desc: "Sensor inalámbrico magnético en el tercer dormitorio.",
            loc: "Ventana Dormitorio 3 (Planta Alta)",
            pwr: "Pila CR2032.",
            net: "Zigbee 3.0.",
            fun: "Desactivación local de la compuerta de clima de la habitación 3 en caso de apertura prolongada."
        },
        "sensor-radar-salon": {
            title: "Sensor de Presencia mmWave Aqara FP2",
            desc: "Radar de presencia por ondas milimétricas de alta precisión. Es capaz de rastrear múltiples zonas en el Salón, distinguiendo si hay personas sentadas en el sofá o en movimiento.",
            loc: "Pared del Salón (Planta Baja)",
            pwr: "Alimentación continua por cable Micro-USB 5V.",
            net: "Conexión WiFi local directa a Homey Pro.",
            fun: "Automatización por presencia. Si el Salón está vacío por más de 30 minutos y el clima está activo, Homey Pro reduce la consigna a modo ECO o cierra la rejilla si no hay nadie."
        },
        "sensor-smoke-salon": {
            title: "Detector de Humo y CO Zigbee - Salón",
            desc: "Sensor fotoeléctrico inteligente de humo y monóxido de carbono. Monitorea continuamente la calidad del aire del Salón para alertar en caso de fuego o combustión anómala.",
            loc: "Techo del Salón (Planta Baja)",
            pwr: "Pila de litio CR123A (Autonomía de 5 a 10 años).",
            net: "Zigbee 3.0 inalámbrico a la malla.",
            fun: "Lógica de seguridad crítica (Incendios). Al detectar humo, Homey Pro ejecuta un protocolo inmediato: detiene todos los ventiladores del clima y cierra todas las rejillas al 0% para aislar el oxígeno y evitar la propagación de humos tóxicos en la casa (confinamiento)."
        },
        "sensor-smoke-pasillo": {
            title: "Detector de Humo y CO Zigbee - Pasillo Alta",
            desc: "Sensor de humo inteligente instalado en el distribuidor superior para proteger los dormitorios.",
            loc: "Distribuidor / Pasillo (Planta Alta)",
            pwr: "Pila de litio CR123A.",
            net: "Zigbee 3.0.",
            fun: "Seguridad pasiva. Activa el apagado de la máquina UI-2 y el cierre de las compuertas de los dormitorios ante cualquier indicio de humo o monóxido de carbono."
        }
    };

    let selectedClimateId = null;

    function updateClimateDetails(id) {
        const data = climateData[id];
        if (!data) return;

        climateDetailsTitle.textContent = data.title;
        climateDetailsDesc.textContent = data.desc;
        climateSpecLoc.textContent = data.loc;
        climateSpecPwr.textContent = data.pwr;
        climateSpecNet.textContent = data.net;
        climateSpecFun.textContent = data.fun;
        climateDetailsSpecs.style.display = 'block';
    }

    function highlightClimatePaths(nodeId) {
        // Clear previous highlights and dimmed states
        climatePaths.forEach(path => {
            path.classList.remove('active-cable');
            path.classList.remove('dimmed');
        });
        climateNodes.forEach(node => {
            node.classList.remove('dimmed');
        });

        if (!nodeId) return;

        let activePathCount = 0;
        const connectedNodes = new Set();
        connectedNodes.add(nodeId);

        // Find connected paths and mark direct nodes
        climatePaths.forEach(path => {
            const from = path.getAttribute('data-from');
            const to = path.getAttribute('data-to');

            if (from === nodeId || to === nodeId) {
                path.classList.add('active-cable');
                activePathCount++;
                if (from) connectedNodes.add(from);
                if (to) connectedNodes.add(to);
            }
        });

        // If we have active paths, dim all others to draw focus
        if (activePathCount > 0) {
            climatePaths.forEach(path => {
                if (!path.classList.contains('active-cable')) {
                    path.classList.add('dimmed');
                }
            });

            climateNodes.forEach(node => {
                const id = node.getAttribute('data-id');
                if (!connectedNodes.has(id)) {
                    node.classList.add('dimmed');
                }
            });
        }
    }

    function resetClimateHighlight() {
        climatePaths.forEach(path => {
            path.classList.remove('active-cable');
            path.classList.remove('dimmed');
        });
        climateNodes.forEach(node => {
            node.classList.remove('dimmed');
        });

        climateDetailsTitle.textContent = "Selecciona un dispositivo";
        climateDetailsDesc.textContent = "Haz clic o pasa el cursor sobre cualquiera de los equipos de climatización, rejillas, termostatos o sensores del plano interactivo para analizar sus características técnicas, tipo de alimentación y lógica domótica integrada.";
        climateDetailsSpecs.style.display = 'none';
        climateSpecLoc.textContent = "--";
        climateSpecPwr.textContent = "--";
        climateSpecNet.textContent = "--";
        climateSpecFun.textContent = "--";
    }

    climateNodes.forEach(node => {
        const id = node.getAttribute('data-id');

        node.addEventListener('mouseenter', () => {
            if (!selectedClimateId) {
                updateClimateDetails(id);
                highlightClimatePaths(id);
            }
        });

        node.addEventListener('mouseleave', () => {
            if (!selectedClimateId) {
                resetClimateHighlight();
            }
        });

        node.addEventListener('click', (e) => {
            e.stopPropagation();

            // Ripple pulse feedback: briefly pulse circle r attribute or rect outline
            const circle = node.querySelector('circle');
            if (circle) {
                const prevR = circle.getAttribute('r') || '11';
                circle.setAttribute('r', '16');
                setTimeout(() => {
                    circle.setAttribute('r', prevR);
                }, 300);
            } else {
                const rect = node.querySelector('rect');
                if (rect) {
                    const prevStrokeWidth = rect.getAttribute('stroke-width') || '1.2';
                    rect.setAttribute('stroke-width', '3');
                    setTimeout(() => {
                        rect.setAttribute('stroke-width', prevStrokeWidth);
                    }, 300);
                }
            }

            if (selectedClimateId === id) {
                // Deselect
                selectedClimateId = null;
                resetClimateHighlight();
            } else {
                // Select
                selectedClimateId = id;
                updateClimateDetails(id);
                highlightClimatePaths(id);
            }
        });
    });

    // Reset when clicking outside on the SVG background
    const hvacSvg = document.getElementById('hvac-svg');
    if (hvacSvg) {
        hvacSvg.addEventListener('click', () => {
            selectedClimateId = null;
            resetClimateHighlight();
        });
    }
});
