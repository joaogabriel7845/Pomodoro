const timer = document.getElementById("timer")
const startBtn = document.getElementById("startBtn")
const pauseBtn = document.getElementById("pauseBtn")
const resetBtn = document.getElementById("resetBtn")
const capybara = document.getElementById("capybaraImg")
const contadorCiclos = document.getElementById("ciclos")
const taskList = document.getElementById("taskList")
const addTask = document.getElementById("addTask")
const inputTask = document.getElementById("taskInput")
const contTask = document.getElementById("contTask")
const deletBtn = document.querySelector(".deleteTaskBtn")
const emptyState = document.querySelector(".emptyState")
const clearTaskCompleted = document.getElementById("clearTaskCompleted")
const filters = document.querySelectorAll(".filter")
const focusBtn = document.getElementById("focusBtn")
const sleepBtn = document.getElementById("sleepBtn")
const focusDot = focusBtn.querySelector(".dotGreen")
const sleepDot = sleepBtn.querySelector(".dotGreen")

const notify = new Audio("assets/sounds/notify.mp3")
Notification.requestPermission()

// ESTADOS
let tempo = 10;
let ciclos = 0
let intervalo
let modo = "foco";
let contadorTask = 0
let filtroAtivo = "tudo"

// FUNÇÕES
function formatar(numero) {
    return String(numero).padStart(2, "0")
}

function updateTimer() {
    let minutos = Math.floor(tempo / 60)
    let segundos = tempo % 60
    timer.textContent = formatar(minutos) + ":" + formatar(segundos)
}

function startTimer() {

    startBtn.disabled = true
    console.log("pomodoro iniciado!");

    intervalo = setInterval(function () {

        if (tempo <= 0) {
            notify.play()
            if (Notification.permission === "granted") {
                new Notification(modo === "foco" ? "Pomodoro finalizado!" : "Mais uma sessão de estudos?", {
                    body: modo === "foco" ? "Hora de fazer uma pausa!" : "Hora de focar!",
                    icon: modo === "foco" ? "./assets/images/capybaraNotify.jpg" : "./assets/images/capybaraNotify2.jpg"
                })
            }

            clearInterval(intervalo);

            if (modo === "foco") {
                sleepMode();
                startTimer();
                ciclos++;
                contadorCiclos.textContent = ciclos
            } else {
                focusMode();
            }

            return
        }

        tempo--;
        updateTimer()
    }, 1000)
}

function pauseTimer() {
    startBtn.disabled = false
    clearInterval(intervalo)
}

function resetTimer() {

    clearInterval(intervalo)
    startBtn.disabled = false

    if (modo === "foco") {
        tempo = 1500;
    } else {
        tempo = 300;
    }

    updateTimer()
}

function focusMode() {

    modo = "foco";

    focusDot.classList.remove("hidden");
    sleepDot.classList.add("hidden");


    startBtn.disabled = false;

    tempo = 1500;

    clearInterval(intervalo);
    updateTimer();

    capybara.src = "./assets/images/capybaraFocus.png"
}

function sleepMode() {

    modo = "descanso";

    sleepDot.classList.remove("hidden")
    focusDot.classList.add("hidden")

    tempo = 10;

    startBtn.disabled = false;
    clearInterval(intervalo);
    updateTimer();

    capybara.src = "./assets/images/capybaraSleep.jpg"
}

function updateTaskCounter() {
    const total = taskList.children.length
    contTask.textContent = total
}

function addItemTask() {

    // Impede adicionar tarefa vazia
    if (inputTask.value.trim() === "") return alert("Você não pode adicionar uma tarefa vazia ;(");

    let li = document.createElement("li")
    li.classList.add("checkContainer", "taskEnter")

    // Criação dinâmica de tarefas
    li.innerHTML = `
    <label>
        <input type="checkbox">
        <span class="checkmark"></span>
        <span class="taskText">${inputTask.value}</span>
        <span class="deleteTaskBtn">
            <i class="fa-solid fa-times"></i>
        </span>
    </label>
    `

    taskList.appendChild(li)

    const checkbox = li.querySelector('input')
    // Na adição de uma tarefa sempre vai verificar o checkbox com base no filtro
    checkbox.addEventListener("change", () => {
        aplicarFiltro(filtroAtivo)
    })


    updateTaskCounter()

    // Exclui a entrada de tarefas depois de adicionar
    inputTask.value = ""

    // Atualiza o estado vazio da lista
    checkEmptyState()

}

function aplicarFiltro() {

    const tarefas = taskList.querySelectorAll("li")

    tarefas.forEach(tarefa => {

        const checkbox = tarefa.querySelector("input")

        if (filtroAtivo === "tudo") {

            tarefa.classList.remove("hidden")

        } else if (filtroAtivo === "completados") {

            if (checkbox.checked) {
                tarefa.classList.remove("hidden")
            } else {
                tarefa.classList.add("hidden")
            }

        } else {

            if (checkbox.checked) {
                tarefa.classList.add("hidden")
            } else {
                tarefa.classList.remove("hidden")
            }

        }
    })

    checkEmptyState()
    updateTaskCounter()

}

function filtersTask() {


    filters.forEach(task => {

        task.addEventListener("click", () => {

            filtroAtivo = task.dataset.filter

            filters.forEach(f => f.classList.remove("active"))
            task.classList.add("active")

            aplicarFiltro()

        })

    })
}

function checkEmptyState() {

    const tarefasVisiveis = taskList.querySelectorAll("li:not(.hidden)")

    if (tarefasVisiveis.length === 0) {
        emptyState.classList.remove("hidden")

    } else {
        emptyState.classList.add("hidden")
    }
}

function deleteTaskCompleted() {

    // Selecionando todas as tarefas dentro da "lista"
    const tasks = taskList.querySelectorAll("li")

    // Percorrendo a lista e verificando se a checkbox está marcada
    tasks.forEach(task => {

        const checkbox = task.querySelector('input')

        if (checkbox.checked) {
            task.remove()
        }

    });

    updateTaskCounter()
    checkEmptyState()
}

// EVENT LISTENERS
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
focusBtn.addEventListener("click", focusMode);
sleepBtn.addEventListener("click", sleepMode);
addTask.addEventListener("click", addItemTask);
clearTaskCompleted.addEventListener("click", deleteTaskCompleted)

// Nos permite adicionar uma tarefa apenas apertando a tecla Enter
inputTask.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addItemTask()
})

// Deletar uma tarefa
taskList.addEventListener("click", (e) => {

    // Verifica se o clique aconteceu no botão de deletar
    // ou em algum elemento dentro dele
    if (e.target.closest(".deleteTaskBtn")) {

        // Encontra o <li> da tarefa correspondente
        const task = e.target.closest("li")

        // Animação de remoção em todos os filtros
        task.style.display = "flex"
        task.classList.add("taskDelete")
        setTimeout(() => {
            task.remove()
            updateTaskCounter()
            checkEmptyState()
        }, 250)

    }
})

// INICIALIZAÇÃO
updateTimer()
checkEmptyState()
filtersTask()