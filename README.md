# 🍅 Pomodoro Dogcore

Aplicativo de Pomodoro com gerenciador de tarefas integrado, construído com HTML, CSS e JavaScript puro — sem frameworks, sem dependências.

---

## 🎯 Sobre

A técnica Pomodoro divide o trabalho em sessões de foco de 25 minutos, separadas por pausas de 5 minutos. Este projeto aplica essa técnica com um timer interativo, troca automática de modos e um sistema completo de gerenciamento de tarefas.

---

## ✨ Funcionalidades

**Timer**
- Modo foco (25 min) e descanso (5 min)
- Controles de iniciar, pausar e resetar
- Troca automática de modo ao fim de cada sessão
- Contador de ciclos completados
- Som e notificação nativa do navegador ao fim de cada sessão
- Imagem da capivara muda de acordo com o modo ativo

**Tarefas**
- Adicionar tarefas com botão ou tecla Enter
- Marcar tarefas como concluídas com checkbox customizado
- Excluir tarefas individualmente com animação
- Limpar todas as tarefas concluídas de uma vez
- Filtros: Tudo, Ativo e Completados
- Estado vazio dinâmico quando não há tarefas visíveis
- Contador de tarefas atualizado em tempo real

---

## 🚀 Como usar

Acesse diretamente pelo navegador, sem precisar instalar nada:

👉 [joaogabriel7845.github.io/Pomodoro](https://joaogabriel7845.github.io/Pomodoro/)

Ou clone o repositório localmente:

```bash
git clone https://github.com/joaogabriel7845/Pomodoro.git
cd Pomodoro
```

Abra o arquivo `index.html` no navegador.

---

## 📁 Estrutura

```
pomodoro-dogcore/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── images/
    │   ├── capybaraFocus.png
    │   ├── capybaraSleep.jpg
    │   ├── capybaraNotify.jpg
    │   └── capybaraNotify2.jpg
    └── sounds/
        └── notify.mp3
```

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica |
| CSS3 | Estilização, animações e responsividade |
| JavaScript | Lógica do timer, DOM e estado da aplicação |
| Font Awesome | Ícones |
| Google Fonts | Tipografia (Google Sans) |
| Notification API | Notificações nativas do navegador |

---

## 📖 Conceitos praticados

Este projeto foi desenvolvido como estudo prático de JavaScript. Durante o desenvolvimento foram aplicados:

- Manipulação do DOM com `querySelector` e `querySelectorAll`
- Gerenciamento de estado com variáveis globais
- Timers com `setInterval` e `clearInterval`
- Eventos e delegação de eventos com `closest`
- Animações via classes CSS controladas por JavaScript
- Filtros dinâmicos com `classList` e `dataset`
- Navegação pela árvore DOM
- Refatoração e organização de código

---

## 📸 Preview

<img width="1150" height="875" alt="Image" src="https://github.com/user-attachments/assets/66779160-6200-40a1-bc40-8592f4f56364" />

---

## 👤 Autor

Feito por **João Gabriel** como projeto de aprendizado em JavaScript.
