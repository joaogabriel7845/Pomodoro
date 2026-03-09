const timer = document.getElementById("timer")
const startBtn = document.getElementById("startBtn")
const pauseBtn = document.getElementById("pauseBtn")
const resetBtn = document.getElementById("resetBtn")

Notification.requestPermission()

function formatar(numero) {
    return String(numero).padStart(2, "0")
}

const TEMPO_INICIAL = 3
let tempo = TEMPO_INICIAL
let intervalo

function updateTimer() {
    let minutos = Math.floor(tempo / 60)
    let segundos = tempo % 60
    timer.textContent = formatar(minutos) + ":" + formatar(segundos)
}

updateTimer()

startBtn.addEventListener("click", startTimer);


function startTimer() {
    
    const notify = new Audio("assets/sounds/paxta.mp3")

    startBtn.disabled = true
    console.log("pomodoro iniciado!");
    intervalo = setInterval(function(){
        
        if(tempo <= 0) {
            notify.play()
            if (Notification.permission === "granted") {
                new Notification("Pomodoro finalizado!", {
                    body: "Hora de fazer uma pausa!",
                    icon: "assets/images/paxta.png"
                })
            }
            resetTimer()
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
    
    tempo = TEMPO_INICIAL
    updateTimer()
}
