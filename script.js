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
const focusBtn = document.getElementById("focusBtn")
const sleepBtn = document.getElementById("sleepBtn")
const focusDot = focusBtn.querySelector(".dotGreen")
const sleepDot = sleepBtn.querySelector(".dotGreen")
const notify = new Audio("assets/sounds/paxta.mp3")

Notification.requestPermission()

function formatar(numero) {
    return String(numero).padStart(2, "0")
}

let tempo = 1500;
let ciclos = 0
let intervalo

function updateTimer() {
    let minutos = Math.floor(tempo / 60)
    let segundos = tempo % 60
    timer.textContent = formatar(minutos) + ":" + formatar(segundos)
}

updateTimer()

startBtn.addEventListener("click", startTimer);


function startTimer() {
    


    startBtn.disabled = true
    console.log("pomodoro iniciado!");

    intervalo = setInterval(function(){
        
        if(tempo <= 0) {
            notify.play()
            if (Notification.permission === "granted") {
                new Notification(modo === "foco" ? "Pomodoro finalizado!" : "Mais uma sessão de estudos?", {
                    body: modo ==="foco" ? "Hora de fazer uma pausa!" : "Hora de focar!",
                    icon: "assets/images/paxta.png"
                })
            }

            clearInterval(intervalo);
            
            if(modo === "foco") {
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

pauseBtn.addEventListener("click", pauseTimer)

function pauseTimer() {
    startBtn.disabled = false
    clearInterval(intervalo)
}

resetBtn.addEventListener("click", resetTimer)

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

focusBtn.addEventListener("click", focusMode)

let modo = "foco";

function focusMode() {

    modo = "foco";

    focusDot.classList.remove("hidden");
    sleepDot.classList.add("hidden");
    

    startBtn.disabled = false;
    
    tempo = 1500;

    clearInterval(intervalo);
    updateTimer();

    capybara.src = "assets/images/capybaraFocus.png"
}

sleepBtn.addEventListener("click", sleepMode)

sleepBtn.style.border = "none"

function sleepMode() {

    modo = "descanso";
    
    sleepDot.classList.remove("hidden")
    focusDot.classList.add("hidden")

    
    tempo = 300;
    
    startBtn.disabled = false;
    clearInterval(intervalo);
    updateTimer();

    capybara.src = "assets/images/capybaraSleep.jpg"
}

addTask.addEventListener("click", addItemTask)

checkEmptyState()

function addItemTask() {
    
    // Impede adicionar tarefa vazia
    if(inputTask.value.trim() === "") return alert("Você não pode adicionar uma tarefa vazia ;(")
    
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
    
    // Exclui a entrada de tarefas depois de adicionar
    inputTask.value = ""

    // Atualiza o estado vazio da lista
    checkEmptyState()
    
}

function checkEmptyState() {
    if (taskList.children.length === 0) {
        emptyState.classList.remove("hidden")
    } else {
        emptyState.classList.add("hidden")
    }
}

// Nos permite adicionar uma tarefa apenas digitando e apertando a tecla Enter
inputTask.addEventListener("keydown", (e) => {
    if(e.key === "Enter") addItemTask()
})

// Deletar uma tarefa
taskList.addEventListener("click", function(e) {

    // Verifica se o clique aconteceu no botão de deletar
    // ou em algum elemento dentro dele
    if (e.target.closest(".deleteTaskBtn")) {

        // Encontra o <li> da tarefa correspondente
        const task = e.target.closest("li")
        
        // Animação de remoção
        task.classList.add("taskDelete")
        setTimeout(() => {
            // Remove a tarefa da lista
            task.remove()
            // Atualiza o estado vazio da lista
            checkEmptyState()    
        }, 250)

    }
})