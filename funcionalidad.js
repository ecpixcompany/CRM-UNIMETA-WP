/* ========================================
   INICIALIZACIÓN Y GESTIÓN DEL DOM
   ======================================== */

// Variables globales
const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.getElementById('sidebar');
const navItems = document.querySelectorAll('.nav-item');

/* ========================================
   FUNCIONES DE SIDEBAR
   ======================================== */

/**
 * Inicializa los eventos del sidebar
 */
function initSidebar() {
    // Toggle sidebar en dispositivos móviles
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });
    }

    // Navegar entre elementos
    navItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Remover clase active de todos los items
            navItems.forEach((nav) => nav.classList.remove('active'));

            // Agregar clase active al item clickeado
            item.classList.add('active');

            // Cerrar sidebar en móviles después de seleccionar
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }

            // Aquí puedes agregar lógica de navegación
            handleNavigation(item.textContent.trim());
        });
    });

    // Cerrar sidebar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

/**
 * Maneja la navegación entre secciones
 * @param {string} section - Nombre de la sección
 */
function handleNavigation(section) {
    console.log('Navegando a:', section);
    // Aquí puedes agregar lógica para cargar diferentes páginas o secciones
}

/* ========================================
   FUNCIONES DE ANIMACIÓN Y ESTILOS
   ======================================== */

/**
 * Anima el valor de un KPI card
 * @param {HTMLElement} element - Elemento a animar
 * @param {number} finalValue - Valor final
 * @param {number} duration - Duración en ms
 */
function animateKPIValue(element, finalValue, duration = 1000) {
    const startValue = 0;
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (element.dataset.type === 'number') {
            const current = Math.floor(startValue + (finalValue - startValue) * progress);
            element.textContent = current.toLocaleString();
        } else if (element.dataset.type === 'percentage') {
            const current = Math.floor(progress * finalValue);
            element.textContent = current + '%';
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

/**
 * Aplica estilos dinámicos basados en temas
 */
function applyDynamicStyles() {
    // Obtener el tema almacenado o usar por defecto
    const theme = localStorage.getItem('crm-theme') || 'light';

    if (theme === 'dark') {
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        localStorage.setItem('crm-theme', 'dark');
    }
}

/**
 * Cambia el tema de la plataforma
 * @param {string} themeName - Nombre del tema (light, dark)
 */
function switchTheme(themeName) {
    if (themeName === 'dark') {
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        localStorage.setItem('crm-theme', 'dark');
    } else {
        document.body.style.filter = 'none';
        localStorage.setItem('crm-theme', 'light');
    }
}

/**
 * Aplica estilos personalizados a elementos
 * @param {string} selector - Selector CSS
 * @param {object} styles - Objeto con propiedades CSS
 */
function applyCustomStyles(selector, styles) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
        Object.assign(el.style, styles);
    });
}

/* ========================================
   FUNCIONES DE NOTIFICACIONES
   ======================================== */

/**
 * Actualiza el badge de notificaciones
 * @param {number} count - Cantidad de notificaciones
 */
function updateNotificationBadge(count) {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.textContent = count;
        if (count === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'flex';
        }
    }
}

/**
 * Anima el icono de notificación
 */
function animateNotificationIcon() {
    const icon = document.querySelector('.notification-icon');
    if (icon) {
        icon.style.animation = 'none';
        setTimeout(() => {
            icon.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
    }
}

/* ========================================
   FUNCIONES DE TABLA
   ======================================== */

/**
 * Resalta una fila de la tabla
 * @param {number} rowIndex - Índice de la fila
 */
function highlightTableRow(rowIndex) {
    const rows = document.querySelectorAll('table tbody tr');
    if (rows[rowIndex]) {
        rows[rowIndex].style.backgroundColor = '#f0f8ff';
        setTimeout(() => {
            rows[rowIndex].style.backgroundColor = '';
        }, 2000);
    }
}

/**
 * Ordena la tabla por una columna
 * @param {string} columnName - Nombre de la columna
 * @param {string} order - 'asc' o 'desc'
 */
function sortTable(columnName, order = 'asc') {
    console.log('Ordenando tabla por:', columnName, 'en orden:', order);
    // Aquí puedes agregar la lógica de ordenamiento
}

/* ========================================
   FUNCIONES DE KPI
   ======================================== */

/**
 * Actualiza los valores de los KPI
 * @param {object} data - Objeto con los nuevos datos
 */
function updateKPIValues(data) {
    const cards = document.querySelectorAll('.kpi-card');

    cards.forEach((card, index) => {
        const valueElement = card.querySelector('.kpi-value');
        if (valueElement && data[index]) {
            valueElement.dataset.type = 'number';
            animateKPIValue(valueElement, data[index].value);

            // Actualizar cambio porcentual
            const changeElement = card.querySelector('.kpi-change');
            if (changeElement && data[index].change !== undefined) {
                const isNegative = data[index].change < 0;
                changeElement.className = 'kpi-change' + (isNegative ? ' negative' : '');
                changeElement.innerHTML = `
                    <i class="fas fa-arrow-${isNegative ? 'down' : 'up'}"></i>
                    ${Math.abs(data[index].change)}% vs mes anterior
                `;
            }
        }
    });
}

/* ========================================
   FUNCIONES DE RESPONSIVE
   ======================================== */

/**
 * Maneja cambios en el tamaño de la ventana
 */
function handleResponsive() {
    const width = window.innerWidth;

    if (width > 768) {
        sidebar.classList.remove('active');
        if (toggleBtn) toggleBtn.style.display = 'none';
    }
}

/**
 * Inicializa el listener de resize
 */
function initResponsiveListener() {
    window.addEventListener('resize', handleResponsive);
    // Ejecutar una vez al cargar
    handleResponsive();
}

/* ========================================
   FUNCIONES DE UTILIDAD
   ======================================== */

/**
 * Formatea un número como moneda
 * @param {number} value - Valor a formatear
 * @param {string} currency - Código de moneda (ej: 'USD', 'COP')
 * @returns {string} Número formateado
 */
function formatCurrency(value, currency = 'COP') {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: currency,
    }).format(value);
}

/**
 * Formatea un número con separadores de miles
 * @param {number} value - Valor a formatear
 * @returns {string} Número formateado
 */
function formatNumber(value) {
    return new Intl.NumberFormat('es-CO').format(value);
}

/**
 * Obtiene un valor del localStorage
 * @param {string} key - Clave
 * @param {*} defaultValue - Valor por defecto
 * @returns {*} Valor almacenado
 */
function getStorageValue(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch {
        return defaultValue;
    }
}

/**
 * Almacena un valor en localStorage
 * @param {string} key - Clave
 * @param {*} value - Valor a almacenar
 */
function setStorageValue(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
}

/* ========================================
   FUNCIONES DE INICIALIZACIÓN
   ======================================== */

/**
 * Inicializa la plataforma CRM
 */
function initCRM() {
    console.log('Inicializando CRM...');

    // Inicializar componentes
    initSidebar();
    initResponsiveListener();
    applyDynamicStyles();

    // Agregar estilos de animación si no existen
    if (!document.getElementById('animation-styles')) {
        const style = document.createElement('style');
        style.id = 'animation-styles';
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }

    console.log('✓ CRM inicializado correctamente');
}

/**
 * Evento cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    initCRM();

    // Ejemplo: Actualizar notificaciones después de 2 segundos
    setTimeout(() => {
        // updateNotificationBadge(5);
    }, 2000);
});

/* ========================================
   EXPORTAR FUNCIONES (para uso global)
   ======================================== */
window.CRM = {
    switchTheme,
    applyCustomStyles,
    updateNotificationBadge,
    animateNotificationIcon,
    highlightTableRow,
    sortTable,
    updateKPIValues,
    formatCurrency,
    formatNumber,
    getStorageValue,
    setStorageValue,
    handleNavigation,
};
