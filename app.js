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

// ==== MENÚ INTERACTIVO ====
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu() {
    console.log("\n========== MENÚ ==========");
    console.log("1. Agregar tarea");
    console.log("2. Listar todas las tareas");
    console.log("3. Listar tareas pendientes");
    console.log("4. Listar tareas completadas");
    console.log("5. Marcar tarea como completada");
    console.log("6. Listar tareas por categoría");
    console.log("7. Salir");
    console.log("===========================");

    rl.question("Elige una opción: ", (opcion) => {
        manejarOpcion(opcion.trim());
    });
}

// Pide la categoría y no avanza hasta que sea válida (acepta mayúsculas/minúsculas)
function pedirCategoria(titulo, descripcion) {
    console.log(`Categorías disponibles: ${categorias.join(", ")}`);
    rl.question("Categoría: ", (categoria) => {
        const categoriaEncontrada = categorias.find(
            cat => cat.toLowerCase() === categoria.trim().toLowerCase()
        );

        if (!categoriaEncontrada) {
            console.log("Categoría no válida. Escribe: Estudio, Trabajo o Personal.");
            pedirCategoria(titulo, descripcion);
        } else {
            agregarTarea(titulo, descripcion, categoriaEncontrada);
            mostrarMenu();
        }
    });
}

function manejarOpcion(opcion) {
    switch (opcion) {
        case "1":
            rl.question("Título de la tarea: ", (titulo) => {
                rl.question("Descripción: ", (descripcion) => {
                    pedirCategoria(titulo, descripcion);
                });
            });
            break;

        case "2":
            listarTareas("todas");
            mostrarMenu();
            break;

        case "3":
            listarTareas("pendientes");
            mostrarMenu();
            break;

        case "4":
            listarTareas("completadas");
            mostrarMenu();
            break;

        case "5":
            rl.question("ID de la tarea a marcar como completada: ", (id) => {
                marcarCompletada(Number(id));
                mostrarMenu();
            });
            break;

        case "6":
            rl.question(`Categoría (${categorias.join(", ")}): `, (categoria) => {
                listarPorCategoria(categoria);
                mostrarMenu();
            });
            break;

        case "7":
            console.log("¡Hasta luego!");
            rl.close();
            break;

        default:
            console.log("Opción no válida, intenta de nuevo.");
            mostrarMenu();
            break;
    }
}

// Iniciamos el menú
mostrarMenu();