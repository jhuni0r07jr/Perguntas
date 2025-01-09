let categoriaAtual = 0;
let perguntaAtual = 0;
let acertos = 0;

const categorias = [
    [
        { pergunta: "Quantos modelos de motos temos atualmente ?", respostaCorreta: "25", respostas: ["10", "20", "15", "2", "7"] },
        { pergunta: "Quantas CC tem os modelos CG ?", respostaCorreta: "160", respostas: ["110", "120", "160", "300", "1.000"] },
        { pergunta: "Qual modelo de moto mais vendida hoje na Honda?", respostaCorreta: "CG", respostas: ["CRF 250F", "XRE 300", "PCX", "CG", "Biz"] },
        { pergunta: "De qual Pais é a Honda foi fundada ?", respostaCorreta: "Japão", respostas: ["Brasil", "India", "Alemanhã", "Japão", "China"] },
        { pergunta: "Em que ano que a Honda foi criada ?", respostaCorreta: "1948", respostas: ["1900", "1948", "1501", "1854", "1946"] }
    ],
    [
        { pergunta: "Quem pintou a Mona Lisa?", respostaCorreta: "Leonardo da Vinci", respostas: ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Claude Monet", "Dali"] },
        { pergunta: "Qual o nome do maior planeta do sistema solar?", respostaCorreta: "Júpiter", respostas: ["Júpiter", "Saturno", "Urano", "Terra", "Marte"] },
        { pergunta: "Em que ano o homem chegou à lua?", respostaCorreta: "1969", respostas: ["1965", "1969", "1972", "1980", "1990"] },
        { pergunta: "Quem é conhecido como o 'Pai da Física'?", respostaCorreta: "Isaac Newton", respostas: ["Albert Einstein", "Isaac Newton", "Galileu Galilei", "Nikola Tesla", "Max Planck"] },
        { pergunta: "Qual é o símbolo químico da água?", respostaCorreta: "H2O", respostas: ["H2O", "O2", "CO2", "CH4", "N2"] }
    ],
    // Outras categorias podem ser adicionadas da mesma forma.
];

// Função para embaralhar as perguntas de uma categoria
function embaralharPerguntas(perguntas) {
    for (let i = perguntas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [perguntas[i], perguntas[j]] = [perguntas[j], perguntas[i]]; // Troca as perguntas
    }
}

function iniciarQuiz(categoria) {
    categoriaAtual = categoria;
    perguntaAtual = 0;
    acertos = 0;

    // Embaralha as perguntas da categoria escolhida
    embaralharPerguntas(categorias[categoriaAtual]);

    document.getElementById("home-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    carregarPergunta();
}

function carregarPergunta() {
    const pergunta = categorias[categoriaAtual][perguntaAtual];
    document.getElementById("pergunta").textContent = pergunta.pergunta;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = '';

    pergunta.respostas.forEach(resposta => {
        const button = document.createElement("button");
        button.textContent = resposta;
        button.onclick = () => verificarResposta(resposta);
        answersContainer.appendChild(button);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("next-button").style.display = "none";
}

function verificarResposta(resposta) {
    const feedback = document.getElementById("feedback");
    const nextButton = document.getElementById("next-button");

    const pergunta = categorias[categoriaAtual][perguntaAtual];

    if (resposta === pergunta.respostaCorreta) {
        acertos++;
        feedback.textContent = "Resposta correta!";
        feedback.style.color = "green";
        animarConfetes();
    } else {
        feedback.textContent = "Resposta errada!";
        feedback.style.color = "red";
        animarConfetes();
    }

    nextButton.style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;

    if (perguntaAtual < categorias[categoriaAtual].length) {
        carregarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    document.getElementById("resultado").textContent = `Você acertou ${acertos} de 5 perguntas.`;
}

function voltarHome() {
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("home-screen").style.display = "block";
}

function animarConfetes() {
    const confetesContainer = document.getElementById("confetes-container");

    // Limpar confetes existentes antes de adicionar novos
    confetesContainer.innerHTML = "";

    for (let i = 0; i < 50; i++) {
        const confete = document.createElement("div");
        confete.classList.add("confete");
        confete.style.backgroundColor = gerarCorAleatoria();
        confete.style.left = `${Math.random() * 100}vw`;
        confete.style.animationDelay = `${Math.random() * 2}s`;
        confetesContainer.appendChild(confete);

        setTimeout(() => {
            confete.remove();
        }, 2000);
    }
}

function gerarCorAleatoria() {
    const cores = ["#ff0", "#f00", "#0f0", "#00f", "#ff69b4"];
    return cores[Math.floor(Math.random() * cores.length)];
}
