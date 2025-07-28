
// Espera a que todo el contenido del HTML esté cargado para empezar a ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {

    // --- Base de Datos de los Ramos ---
    // Aquí definimos todos los ramos de la carrera.
    // Cada ramo es un objeto con:
    // - id: Un identificador único. Es MUY importante para los prerrequisitos.
    // - nombre: El nombre del ramo que se mostrará.
    // - semestre: El semestre al que pertenece.
    // - prerrequisitos: Un array (lista) con los 'id' de los ramos que necesita para ser desbloqueado.
    // - estado: El estado inicial del ramo ('bloqueado', 'disponible', 'aprobado').
    const ramos = [
        // Semestre 1
        { id: 1, nombre: 'Biología general', semestre: 1, prerrequisitos: [], estado: 'disponible' },
        { id: 2, nombre: 'Química general y orgánica', semestre: 1, prerrequisitos: [], estado: 'disponible' },
        { id: 3, nombre: 'Ciencias de los alimentos I', semestre: 1, prerrequisitos: [], estado: 'disponible' },
        { id: 4, nombre: 'Introducción a la nutrición y la dietética', semestre: 1, prerrequisitos: [], estado: 'disponible' },
        { id: 5, nombre: 'Estrategias para el aprendizaje', semestre: 1, prerrequisitos: [], estado: 'disponible' },
        
        // Semestre 2
        { id: 6, nombre: 'Anatomía humana', semestre: 2, prerrequisitos: [], estado: 'disponible' },
        { id: 7, nombre: 'Bioquímica general', semestre: 2, prerrequisitos: [1, 2], estado: 'bloqueado' }, // Req: Biología, Química
        { id: 8, nombre: 'Ciencias de los alimentos II', semestre: 2, prerrequisitos: [3], estado: 'bloqueado' }, // Req: Ciencias de los alimentos I
        { id: 9, nombre: 'Matemáticas', semestre: 2, prerrequisitos: [], estado: 'disponible' },
        { id: 10, nombre: 'Expresión oral y escrita', semestre: 2, prerrequisitos: [], estado: 'disponible' },
        
        // Semestre 3
        { id: 11, nombre: 'Microbiología y parasitología de los alimentos', semestre: 3, prerrequisitos: [1], estado: 'bloqueado' }, // Req: Biología
        { id: 12, nombre: 'Fisiología humana', semestre: 3, prerrequisitos: [7], estado: 'bloqueado' }, // Req: Bioquímica
        { id: 13, nombre: 'Nutrición básica I', semestre: 3, prerrequisitos: [7], estado: 'bloqueado' }, // Req: Bioquímica
        { id: 14, nombre: 'Evaluación del estado nutricional I', semestre: 3, prerrequisitos: [6, 8], estado: 'bloqueado' }, // Req: Anatomía, Ciencias de los alimentos II
        { id: 15, nombre: 'Estadísticas', semestre: 3, prerrequisitos: [9], estado: 'bloqueado' }, // Req: Matemáticas
        { id: 16, nombre: 'Antropología', semestre: 3, prerrequisitos: [], estado: 'disponible' },
        { id: 17, nombre: 'Integración I', semestre: 3, prerrequisitos: [7, 8], estado: 'bloqueado' }, // Req: Bioquímica, Ciencias de los alimentos II
        
        // Semestre 4
        { id: 18, nombre: 'Bases fisiopatológicas de la nutrición', semestre: 4, prerrequisitos: [12], estado: 'bloqueado' }, // Req: Fisiología
        { id: 19, nombre: 'Nutrición Básica II', semestre: 4, prerrequisitos: [13], estado: 'bloqueado' }, // Req: Nutrición básica I
        { id: 20, nombre: 'Dietética del Ciclo vital', semestre: 4, prerrequisitos: [14, 17], estado: 'bloqueado' }, // Req: Eval. Nutricional I, Integración I
        { id: 21, nombre: 'Evaluación del estado nutricional II', semestre: 4, prerrequisitos: [14], estado: 'bloqueado' }, // Req: Eval. Nutricional I
        { id: 22, nombre: 'Epidemiología', semestre: 4, prerrequisitos: [15], estado: 'bloqueado' }, // Req: Estadísticas
        { id: 23, nombre: 'Ética', semestre: 4, prerrequisitos: [16], estado: 'bloqueado' }, // Req: Antropología
        { id: 24, nombre: 'Integración II', semestre: 4, prerrequisitos: [13, 14, 17], estado: 'bloqueado' }, // Req: Nutrición básica I, Eval. Nutricional I, Integración I

        // Semestre 5
        { id: 25, nombre: 'Análisis y tecnología de los alimentos', semestre: 5, prerrequisitos: [11, 22], estado: 'bloqueado' }, // Req: Microbiología, Epidemiología
        { id: 26, nombre: 'Dietoterapia del Adulto y adulto mayor I', semestre: 5, prerrequisitos: [18, 19, 20, 21], estado: 'bloqueado' },
        { id: 27, nombre: 'Farmacología de la nutrición', semestre: 5, prerrequisitos: [18], estado: 'bloqueado' }, // Req: Bases fisiopatológicas
        { id: 28, nombre: 'Salud pública', semestre: 5, prerrequisitos: [22], estado: 'bloqueado' }, // Req: Epidemiología
        { id: 29, nombre: 'Psicología de la conducta alimentaria', semestre: 5, prerrequisitos: [], estado: 'disponible' },
        { id: 30, nombre: 'Nutrition research I', semestre: 5, prerrequisitos: [], estado: 'disponible' },
        { id: 31, nombre: 'Integración III', semestre: 5, prerrequisitos: [18, 19, 20, 21], estado: 'bloqueado' },

        // Semestre 6
        { id: 32, nombre: 'Inocuidad alimentaria', semestre: 6, prerrequisitos: [25], estado: 'bloqueado' }, // Req: Análisis y tec. de los alimentos
        { id: 33, nombre: 'Dietoterapia del adulto Adulto y Adulto mayor II', semestre: 6, prerrequisitos: [26, 27], estado: 'bloqueado' },
        { id: 34, nombre: 'Nutrición y ejercicio', semestre: 6, prerrequisitos: [21], estado: 'bloqueado' }, // Req: Eval. Nutricional II
        { id: 35, nombre: 'Intervención en alimentación y nutrición', semestre: 6, prerrequisitos: [28], estado: 'bloqueado' }, // Req: Salud pública
        { id: 36, nombre: 'Nutrition Research II', semestre: 6, prerrequisitos: [30], estado: 'bloqueado' }, // Req: Nutrition Research I
        { id: 37, nombre: 'Persona y sociedad', semestre: 6, prerrequisitos: [], estado: 'disponible' },
        { id: 38, nombre: 'Integración IV', semestre: 6, prerrequisitos: [28], estado: 'bloqueado' }, // Req: Salud publica

        // Semestre 7
        { id: 39, nombre: 'Gestión alimentaria I', semestre: 7, prerrequisitos: [32], estado: 'bloqueado' }, // Req: Inocuidad alimentaria
        { id: 40, nombre: 'Dietoterapia Materno infantil y adolescente I', semestre: 7, prerrequisitos: [33], estado: 'bloqueado' },
        { id: 41, nombre: 'Planificación de políticas públicas en alimentación y nutrición', semestre: 7, prerrequisitos: [35], estado: 'bloqueado' },
        { id: 42, nombre: 'Metodología de investigación', semestre: 7, prerrequisitos: [22, 33, 36], estado: 'bloqueado' },
        { id: 43, nombre: 'Emprendimiento y desarrollo de proyectos', semestre: 7, prerrequisitos: [], estado: 'disponible' },
        { id: 44, nombre: 'Integración V', semestre: 7, prerrequisitos: [33], estado: 'bloqueado' },

        // Semestre 8
        { id: 45, nombre: 'Gestión alimentaria II', semestre: 8, prerrequisitos: [39], estado: 'bloqueado' },
        { id: 46, nombre: 'Dietoterapia Materno infantil y adolescente II', semestre: 8, prerrequisitos: [40], estado: 'bloqueado' },
        { id: 47, nombre: 'Intervención nutricional en salud comunitaria', semestre: 8, prerrequisitos: [41], estado: 'bloqueado' },
        { id: 48, nombre: 'Seminario de investigación', semestre: 8, prerrequisitos: [39, 41, 42], estado: 'bloqueado' },
        { id: 49, nombre: 'Liderazgo y responsabilidad social', semestre: 8, prerrequisitos: [], estado: 'disponible' },
        { id: 50, nombre: 'Integración VI', semestre: 8, prerrequisitos: [39], estado: 'bloqueado' }, // Asumiendo que es VI y no IV repetido

        // Semestre 9 y 10
        { id: 51, nombre: 'Internado profesional gestión alimentaria', semestre: 9, prerrequisitos: [45, 48], estado: 'bloqueado' },
        { id: 52, nombre: 'Internado profesional clínico', semestre: 9, prerrequisitos: [46, 48], estado: 'bloqueado' },
        { id: 53, nombre: 'Internado profesional salud comunitaria', semestre: 10, prerrequisitos: [47, 48], estado: 'bloqueado' },
    ];

    // --- Referencias a Elementos del DOM ---
    const mallaContainer = document.getElementById('malla-container');
    const alertaContainer = document.getElementById('alerta-bloqueo');
    const cerrarAlertaBtn = document.getElementById('cerrar-alerta');
    const listaRequisitosUl = document.getElementById('lista-requisitos');
    const resetButton = document.getElementById('reset-button');


    // --- Lógica Principal ---

    /**
     * Carga el estado de los ramos aprobados desde el localStorage del navegador.
     * Esto permite que el progreso no se pierda al recargar la página.
     */
    function cargarEstado() {
        const aprobadosGuardados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];
        aprobadosGuardados.forEach(idAprobado => {
            const ramo = ramos.find(r => r.id === idAprobado);
            if (ramo) {
                ramo.estado = 'aprobado';
            }
        });
    }

    /**
     * Guarda la lista de IDs de los ramos aprobados en el localStorage.
     * Se llama cada vez que se aprueba o desaprueba un ramo.
     */
    function guardarEstado() {
        const idsAprobados = ramos
            .filter(r => r.estado === 'aprobado')
            .map(r => r.id);
        localStorage.setItem('ramosAprobados', JSON.stringify(idsAprobados));
    }

    /**
     * Actualiza el estado de todos los ramos ('bloqueado' o 'disponible')
     * basándose en si sus prerrequisitos han sido aprobados.
     * No modifica los ramos que ya están aprobados.
     */
    function actualizarEstados() {
        ramos.forEach(ramo => {
            // No cambiamos el estado de un ramo ya aprobado
            if (ramo.estado === 'aprobado') return;

            // Comprobamos si tiene prerrequisitos
            if (ramo.prerrequisitos.length === 0) {
                ramo.estado = 'disponible';
                return;
            }

            // Verificamos si CADA prerrequisito está aprobado
            const requisitosCumplidos = ramo.prerrequisitos.every(reqId => {
                const requisito = ramos.find(r => r.id === reqId);
                return requisito && requisito.estado === 'aprobado';
            });

            ramo.estado = requisitosCumplidos ? 'disponible' : 'bloqueado';
        });
    }

    /**
     * Dibuja o vuelve a dibujar toda la malla curricular en la página.
     * Limpia el contenedor y crea las columnas y ramos desde cero
     * con sus estados y clases CSS actualizadas.
     */
    function renderizarMalla() {
        mallaContainer.innerHTML = ''; // Limpiamos la malla para redibujar

        // Creamos una columna para cada semestre del 1 al 10
        for (let i = 1; i <= 10; i++) {
            const semestreColumna = document.createElement('div');
            semestreColumna.className = 'semestre-columna';
            
            const titulo = document.createElement('div');
            titulo.className = 'semestre-titulo';
            titulo.textContent = (i <= 8) ? `Semestre ${i}` : `Semestre ${i} (Internado)`;
            semestreColumna.appendChild(titulo);

            // Filtramos los ramos que pertenecen a este semestre
            const ramosDelSemestre = ramos.filter(r => r.semestre === i || (i >= 9 && r.semestre >= 9));
            
            // Si es semestre 9, agrupamos 9 y 10
            if (i === 9) {
                const ramos10 = ramos.filter(r => r.semestre === 10);
                ramosDelSemestre.push(...ramos10);
            }
            if (i === 10) continue; // Saltamos la columna 10 porque ya la incluimos en la 9

            ramosDelSemestre.forEach(ramo => {
                const ramoDiv = document.createElement('div');
                ramoDiv.className = `ramo ${ramo.estado}`; // Clase base y clase de estado
                ramoDiv.textContent = ramo.nombre;
                ramoDiv.dataset.id = ramo.id; // Guardamos el ID en el elemento para identificarlo al hacer clic
                ramoDiv.addEventListener('click', () => onRamoClick(ramo.id));
                semestreColumna.appendChild(ramoDiv);
            });
            mallaContainer.appendChild(semestreColumna);
        }
    }
    
    /**
     * Maneja el evento de clic en un ramo.
     * @param {number} id - El ID del ramo que fue clickeado.
     */
    function onRamoClick(id) {
        const ramo = ramos.find(r => r.id === id);
        if (!ramo) return;

        if (ramo.estado === 'bloqueado') {
            mostrarAlerta(ramo);
            return;
        }

        // Cambiar estado: si está aprobado lo pone disponible, y si está disponible lo aprueba.
        ramo.estado = ramo.estado === 'aprobado' ? 'disponible' : 'aprobado';
        
        // Después de cambiar el estado, guardamos, actualizamos los bloqueos y redibujamos todo.
        guardarEstado();
        actualizarEstados();
        renderizarMalla();
    }

    /**
     * Muestra una alerta emergente indicando qué prerrequisitos faltan.
     * @param {object} ramo - El objeto del ramo bloqueado que fue clickeado.
     */
    function mostrarAlerta(ramo) {
        // Limpiamos la lista de requisitos anterior
        listaRequisitosUl.innerHTML = '';

        // Buscamos los nombres de los prerrequisitos no cumplidos
        ramo.prerrequisitos.forEach(reqId => {
            const requisito = ramos.find(r => r.id === reqId);
            if (requisito && requisito.estado !== 'aprobado') {
                const li = document.createElement('li');
                li.textContent = requisito.nombre;
                listaRequisitosUl.appendChild(li);
            }
        });
        
        alertaContainer.classList.remove('oculto');
    }
    
    /**
     * Limpia todo el progreso guardado y reinicia la malla.
     */
    function resetearProgreso() {
        if (confirm('¿Estás seguro de que quieres borrar todo tu progreso? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('ramosAprobados');
            // Recargamos la página para que los cambios se apliquen desde cero
            location.reload();
        }
    }


    // --- Inicialización ---
    
    // Configurar los listeners de los botones de la alerta y reseteo
    cerrarAlertaBtn.addEventListener('click', () => alertaContainer.classList.add('oculto'));
    resetButton.addEventListener('click', resetearProgreso);

    // Flujo de arranque de la aplicación
    cargarEstado();
    actualizarEstados();
    renderizarMalla();
});
