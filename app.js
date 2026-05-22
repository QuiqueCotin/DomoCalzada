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
            desc: "Pantalla táctil Android de 10.1\" o 13.3\" sin batería. Totalmente encastrada en obra. Se enciende y suena automáticamente cuando tocan el Video Timbre de la valla.",
            loc: "Pasillo Central (Planta Baja)",
            pwr: "Alimentación exclusiva PoE (Cat6) (Cero baterías)",
            net: "Conexión estable por cable RJ45 Cat6",
            fun: "Interfaz táctil de uso simplificado e intercomunicador."
        },
        "12": {
            title: "Video Timbre Reolink PoE",
            desc: "Video Timbre exterior con lente gran angular, audio bidireccional y pulsador físico. Envía la señal instantánea a la pantalla de casa al ser pulsado.",
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
            elec: "Entrada superior directa L/N (230V AC - Fase marrón, Neutro azul). Conexión a tierra (PE - Verde/Amarillo) y salidas independientes hacia el diferencial de Domótica, el REC4 y los diferenciales de Riego y Exterior.",
            domo: "OK LED verde encendido indica correcto estado de protección. Aislamiento físico de red en milisegundos ante anomalías de voltaje."
        },
        "dif-domo": {
            title: "Diferencial Domótica y Seguridad Clase A-SI 2P-40-30",
            desc: "Interruptor diferencial independiente de clase A Superinmunizado de 40A y sensibilidad de 30mA. Dedicado en exclusiva a proteger la línea C10 Domótica y Red (que alimenta el Rack, SAI, APs, ONT, Router 5G, Switch Omada PoE, Cerebro Homey Pro, Homey Bridge, NVR NAS, VideoTimbre y WallPanel). Su total independencia respecto al resto de la casa y del exterior garantiza inmunidad absoluta contra disparos indeseados por derivaciones secundarias.",
            fun: "Protección diferencial superinmunizada y blindada para el núcleo domótico.",
            elec: "Entrada directa desde Combi-PRO. Salida directa que alimenta al magnetotérmico C10 Domótica y sirve de referencia al canal de medición VA del Shelly Pro 3EM.",
            domo: "Evita que un fallo en cualquier electrodoméstico o la lluvia en el jardín apaguen las cámaras, la red WiFi o la supervisión local y remota desde Madrid."
        },
        "rec4": {
            title: "Diferencial Auto-rearmable Circutor REC4 2P-40-30",
            desc: "Interruptor diferencial inteligente y auto-rearmable de 2 polos y 40A con sensibilidad de 30mA. Dedicado a proteger todos los circuitos de consumo interior y confort de la vivienda (PIAs de Alumbrado, Enchufes, Cocina, Lavadora y Termo ACS). Si salta por un factor transitorio (humedad interior o tormenta), analiza el aislamiento y se rearma de forma 100% segura en 3 segundos.",
            fun: "Protección diferencial inteligente de la vivienda con restablecimiento automático.",
            elec: "Entrada fase/neutro desde Combi-PRO. Salida directa al repartidor general que alimenta los magnetotérmicos de la casa (C10, C16, C20, C25).",
            domo: "Evita pérdidas de alimentos en el frigorífico combi por disparos silenciosos durante ausencias largas sin requerir intervención manual."
        },
        "dif-pozo1": {
            title: "Diferencial de Riego y Pozo 1 Clase A-SI 2P-25-30",
            desc: "Interruptor diferencial independiente de clase A Superinmunizado con sensibilidad de 30mA. Protege específicamente el circuito de fuerza de la bomba de agua del Pozo 1 (riego y piscina). Su inmunidad evita disparos indeseados por armónicos de arranque del motor.",
            fun: "Protección dedicada para la bomba principal de riego de la finca.",
            elec: "Entrada desde Combi-PRO. Salida directa hacia el contactor bipolar 2P del Pozo 1 y al borne de medición de tensión VB del Shelly Pro 3EM.",
            domo: "Garantiza que el riego y llenado de la piscina no se interrumpan si se produce un fallo o fuga en el alumbrado de jardín o en la fuente."
        },
        "dif-ext": {
            title: "Diferencial de Exterior y Pozo 2 Clase A-SI 2P-25-30",
            desc: "Interruptor diferencial independiente de clase A Superinmunizado con sensibilidad de 30mA. Protege el circuito de fuerza exterior: la bomba de la fuente (Pozo 2), el alumbrado de jardín y los enchufes de intemperie. Aísla las fugas típicas de la humedad exterior.",
            fun: "Protección perimetral húmeda aislada para el alumbrado y fuerza del jardín.",
            elec: "Entrada desde Combi-PRO. Salida directa hacia el contactor bipolar 2P del Pozo 2, alumbrado exterior y al borne de medición de tensión VC del Shelly Pro 3EM.",
            domo: "Cualquier derivación por lluvia o humedad en farolas exteriores solo tirará este diferencial, sin perturbar el interior ni la domótica."
        },
        "pro3em": {
            title: "Medidor Trifásico Shelly Pro 3EM (Monofásico)",
            desc: "Analizador de energía profesional para carril DIN con puerto LAN Ethernet. Aunque funciona en monofásico, aprovecha sus tres entradas de voltaje (VA, VB, VC) de forma cruzada para monitorizar si salta algún diferencial individual en tiempo real y enviar alertas instantáneas.",
            fun: "Telemetría eléctrica en tiempo real de consumo y detección de disparos.",
            elec: "Alimentación protegida por C10. Voltajes cruzados: VA lee tras el diferencial de Domótica, VB tras el diferencial de Riego (Pozo 1) y VC tras el diferencial de Exterior (Pozo 2). Pinzas: Pinza A (Consumo General Casa), Pinza B (Fase Pozo 1), Pinza C (Fase Pozo 2).",
            domo: "Informa de potencias, tensiones y factor de potencia a Homey Pro. Si la lectura de VB o VC cae a 0V, Homey Pro alerta inmediatamente a Madrid de la caída del diferencial correspondiente."
        },
        "pia-domo": {
            title: "Magnetotérmico C10 Domótica y Red",
            desc: "Interruptor magnetotérmico de 10A dedicado a salvaguardar la línea del armario rack (SAI, APs, ONT, Router 5G, Switch Omada PoE, Cerebro Homey Pro, Homey Bridge, NVR NAS, VideoTimbre y WallPanel). La cerradura Nuki Smart Lock es inalámbrica y va a baterías, por lo que no va cableada aquí, pero su puente y red sí quedan respaldados.",
            fun: "Protección magnetotérmica del núcleo lógico de comunicaciones y control.",
            elec: "Entrada desde la fase protegida por el diferencial de Domótica. Salida directa hacia la entrada de alimentación del SAI Salicru SPS 900 ONE.",
            domo: "Aísla por completo el cerebro, la red local y los módulos domóticos de cualquier cortocircuito o sobrecarga del resto de la vivienda."
        },
        "pia-termo": {
            title: "Magnetotérmico C16 Termo ACS",
            desc: "Interruptor magnetotérmico monofásico de 16A dimensionado específicamente para proteger la línea eléctrica exclusiva del termo de agua caliente de 3kW.",
            fun: "Protección térmica y magnética de la línea de agua caliente.",
            elec: "Entrada desde fase de la salida del diferencial auto-rearmable REC4. Salida hacia el contactor de fuerza del termo, cruzando la pinza del Shelly Pro EM-50.",
            domo: "Aísla la línea de fuerza en caso de avería en la resistencia eléctrica calefactora del termo de agua caliente."
        },
        "pia-luz": {
            title: "Magnetotérmico C10 Alumbrado Interior",
            desc: "Interruptor magnetotérmico de 10A que protege la línea general de iluminación interior (dormitorios, salón, cocina y baños).",
            fun: "Protección de sobrecargas y cortocircuitos de la red de luces interiores.",
            elec: "Entrada desde la salida de fase del diferencial auto-rearmable REC4. Salida directa a la red de iluminación interior.",
            domo: "Mantiene la iluminación separada del núcleo domótico para que una bombilla fundida no afecte a las cámaras o al router."
        },
        "pia-enchufes": {
            title: "Magnetotérmico C16 Enchufes Generales",
            desc: "Interruptor magnetotérmico de 16A que protege las líneas de tomas de corriente convencionales de toda la vivienda.",
            fun: "Protección magnetotérmica de tomas generales de 16A.",
            elec: "Entrada desde la salida de fase del diferencial auto-rearmable REC4. Salida hacia la distribución de enchufes interiores.",
            domo: "Protección estándar de tomas de corriente; los módulos Shelly ocultos en cajetín profundo son protegidos por este interruptor."
        },
        "pia-cocina": {
            title: "Magnetotérmico C25 Cocina y Horno",
            desc: "Interruptor magnetotérmico de 25A diseñado para proteger la línea de alta potencia que alimenta la vitrocerámica, el horno y el frigorífico combi.",
            fun: "Protección térmica de alta capacidad (hasta 25A) para elementos de cocina.",
            elec: "Entrada desde la salida de fase del diferencial auto-rearmable REC4. Salida directa a la cocina.",
            domo: "Garantiza la alimentación del frigorífico, respaldada aguas arriba por la capacidad de rearme automático de seguridad del REC4."
        },
        "pia-lavadora": {
            title: "Magnetotérmico C20 Lavadora y Lavavajillas",
            desc: "Interruptor magnetotérmico de 20A para salvaguardar los circuitos dedicados a electrodomésticos húmedos de la zona de lavado.",
            fun: "Protección de circuitos de fuerza húmedos interiores de 20A.",
            elec: "Entrada desde la salida de fase del diferencial auto-rearmable REC4. Salida a la lavadora y lavavajillas.",
            domo: "Aislamiento individual para el mantenimiento seguro de lavadora/lavavajillas sin comprometer el suministro del resto del hogar."
        },
        "pia-pozos": {
            title: "Magnetotérmicos C16 Pozos y Exterior",
            desc: "Interruptores de protección magnetotérmica C16 dedicados a proteger los circuitos de potencia de las bombas de agua (Pozo 1 y Pozo 2) y la fuerza/alumbrado exterior.",
            fun: "Protección de las líneas de motores hidráulicos y elementos de jardín.",
            elec: "Entradas independientes alimentadas desde los diferenciales segmentados de Riego (Pozo 1) y Exterior (Pozo 2). Salidas directas a los contactores bipolares 2P correspondientes.",
            domo: "Evita que un agarrotamiento o cortocircuito de motores exteriores afecte al suministro doméstico de la vivienda."
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
            elec: "Alimentación L/N a 230V protegida por C10. Salida O1 (Canal 1) a bobina A1 del contactor del Pozo 1, Salida O2 (Canal 2) a bobina A1 del contactor del Pozo 2.",
            domo: "Permite temporizar riegos, llenados de piscina y la parada protectora inmediata si la sonda detecta bajo nivel de agua en el pozo."
        },
        "contactor-pozo1": {
            title: "Contactor Bipolar 2P 25A (Bomba Pozo 1)",
            desc: "Contactor industrial robusto de 2 polos y 25A. Conmuta simultáneamente tanto la Fase como el Neutro de la bomba de agua del Pozo 1 (Riego y Piscina) de forma coordinada por el Shelly Pro 2.",
            fun: "Conmutador bipolar de fuerza para la Bomba del Pozo 1.",
            elec: "Bobina A1-A2 (A1 conectado a salida O1 del Shelly Pro 2, A2 a neutro). Bornes de fuerza conmutan Fase y Neutro simultáneamente desde el circuito protegido por su diferencial dedicado.",
            domo: "Garantiza un aislamiento total (100%) de la bomba al estar apagada, evitando que derivaciones silenciosas de Neutro a Tierra tiren el diferencial."
        },
        "contactor-pozo2": {
            title: "Contactor Bipolar 2P 25A (Bomba Pozo 2)",
            desc: "Contactor industrial bipolar idéntico de 25A dedicado al control de potencia de la bomba del Pozo 2 (Fuente). Conmuta simultáneamente tanto la Fase como el Neutro del motor.",
            fun: "Conmutador bipolar de fuerza para la Bomba del Pozo 2 (Fuente Decorativa).",
            elec: "Bobina A1-A2 (A1 conectado a salida O2 del Shelly Pro 2, A2 a neutro). Bornes de fuerza conmutan Fase y Neutro simultáneamente desde el circuito protegido por el diferencial de exterior.",
            domo: "Permite al sistema aislar eléctricamente por completo la bomba de la fuente al estar apagada, neutralizando cualquier fuga de Neutro en reposo."
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

        node.addEventListener('mouseover', () => {
            updatePanelDetails();
            
            const id = node.getAttribute('data-id');
            if (id) {
                const cables = document.querySelectorAll('.panel-cable');
                cables.forEach(cable => {
                    const devicesAttr = cable.getAttribute('data-devices');
                    const devices = devicesAttr ? devicesAttr.split(/\s+/) : [];
                    if (devices.includes(id)) {
                        cable.classList.add('active-cable');
                        cable.classList.remove('dimmed-cable');
                    } else {
                        cable.classList.add('dimmed-cable');
                        cable.classList.remove('active-cable');
                    }
                });
            }
        });

        node.addEventListener('mouseleave', () => {
            const cables = document.querySelectorAll('.panel-cable');
            cables.forEach(cable => {
                cable.classList.remove('active-cable');
                cable.classList.remove('dimmed-cable');
            });
        });

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
        `- Cuadro Eléctrico: Implementar la 'Arquitectura de Tres Pilares':\n` +
        `  * Diferencial Domótica (Clase A-SI dedicado) + SAI para inmunidad total de seguridad y red.\n` +
        `  * Diferencial Casa (REC4 Auto-rearmable) para confort y protección automática del frigo combi.\n` +
        `  * Diferencial Riego y Pozo 1 (Clase A-SI dedicado) + Contactor bipolar 2P para aislamiento total en reposo.\n` +
        `  * Diferencial Exterior, Alumbrado y Pozo 2 (Clase A-SI dedicado) + Contactor bipolar 2P para aislar humedad del jardín.\n` +
        `- Telemetría Shelly Pro 3EM: Cablear tensiones VA/VB/VC de forma segmentada tras cada diferencial para detectar disparos instantáneamente desde Madrid.\n` +
        `- VideoTimbre y WallPanel: La pantalla Geekland se empotrará en el pasillo. Debe encenderse sola cuando suene el timbre de valla y accionar la cerradura exterior a 12V.\n` +
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
});
