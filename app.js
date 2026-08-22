console.log("=== GESTOR DE TAREAS ===");

// Array donde guardaremos todas las tareas
let tareas = [];

// Categorías disponibles
const categorias = [
    "Estudio",
    "Trabajo",
    "Personal"
];

console.log("Categorías disponibles:");
console.log(categorias);

// Función para agregar una tarea
function agregarTarea(titulo, descripcion, categoria) {
    const nuevaTarea = {
        id: tareas.length + 1,
        titulo: titulo,
        descripcion: descripcion,
        categoria: categoria,
        estado: "Pendiente"
    };

    tareas.push(nuevaTarea);

    console.log("Tarea agregada correctamente:");
    console.log(nuevaTarea);
}

// Función para listar tareas (todas, pendientes o completadas)
function listarTareas(filtro = "todas") {
    console.log(`\n--- Tareas (${filtro}) ---`);

    let tareasFiltradas = tareas;

    if (filtro === "pendientes") {
        tareasFiltradas = tareas.filter(t => t.estado === "Pendiente");
    } else if (filtro === "completadas") {
        tareasFiltradas = tareas.filter(t => t.estado === "Completada");
    }

    if (tareasFiltradas.length === 0) {
        console.log("No hay tareas para mostrar.");
        return;
    }

    tareasFiltradas.forEach(t => {
        console.log(`[${t.id}] ${t.titulo} - ${t.categoria} - ${t.estado}`);
    });
}

// Función para marcar una tarea como completada
function marcarCompletada(id) {
    const tarea = tareas.find(t => t.id === id);

    if (!tarea) {
        console.log(`No se encontró la tarea con id ${id}.`);
        return;
    }

    tarea.estado = "Completada";
    console.log(`Tarea "${tarea.titulo}" marcada como completada.`);
}

// Función para agrupar tareas por categoría (usando un objeto/diccionario)
function agruparPorCategoria() {
    const agrupado = {};

    // Inicializamos el diccionario con cada categoría en un array vacío
    categorias.forEach(cat => {
        agrupado[cat] = [];
    });

    // Distribuimos cada tarea en su categoría correspondiente
    tareas.forEach(t => {
        if (agrupado[t.categoria]) {
            agrupado[t.categoria].push(t);
        }
    });

    return agrupado;
}

// Función para listar tareas de una categoría específica
function listarPorCategoria(categoria) {
    const agrupado = agruparPorCategoria();

    console.log(`\n--- Tareas de la categoría: ${categoria} ---`);

    if (!agrupado[categoria] || agrupado[categoria].length === 0) {
        console.log("No hay tareas en esta categoría.");
        return;
    }

    agrupado[categoria].forEach(t => {
        console.log(`[${t.id}] ${t.titulo} - ${t.estado}`);
    });
}

// ==== PRUEBAS ====

// Agregamos tareas de prueba en distintas categorías
agregarTarea(
    "Hacer el laboratorio de Node.js",
    "Completar la tarea del laboratorio",
    "Estudio"
);

agregarTarea(
    "Preparar informe semanal",
    "Redactar avances del sprint",
    "Trabajo"
);

agregarTarea(
    "Salir a correr",
    "30 minutos de trote",
    "Personal"
);

// Listamos todas las tareas
listarTareas("todas");

// Marcamos la primera tarea como completada
marcarCompletada(1);

// Comprobamos el cambio con los distintos filtros
listarTareas("todas");
listarTareas("pendientes");
listarTareas("completadas");

// Listamos tareas agrupadas por categoría
listarPorCategoria("Estudio");
listarPorCategoria("Trabajo");
listarPorCategoria("Personal");