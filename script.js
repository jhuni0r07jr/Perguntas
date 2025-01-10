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
        { pergunta: "Qual modelo da Honda é um clássico das motos de esportes de alta performance?", respostaCorreta: "Honda CBR 600RR", respostas: ["Honda CRF 450R", "Honda CBR 600RR", "Honda CB 1000R", "Honda CB 500X"] },
        { pergunta: "A Honda Hornet 600 é considerada uma moto do tipo:", respostaCorreta: "Naked", respostas: ["Cruiser", "Naked", "Touring", "Sport-touring"] },
        { pergunta: "Qual é a principal característica da Honda CBR 500R?", respostaCorreta: "Modelo de entrada para motos esportivas", respostas: ["Alta cilindrada", "Moto com suspensão de ar", "Capacete integrado", "Modelo de entrada para motos esportivas"] },
        { pergunta: "A Honda CB 500F é uma moto do tipo:", respostaCorreta: "Naked", respostas: ["Naked", "Touring", "Cruiser", "Off-road"] },
        { pergunta: "Qual é a cilindrada da Honda CRF 230F?", respostaCorreta: "230 cc", respostas: ["230 cc", "250 cc", "150 cc", "500 cc"] }
    ],
    [
        { pergunta: "Qual foi o primeiro modelo da Honda a utilizar o sistema de injeção eletrônica?", respostaCorreta: "Honda CG 150", respostas: ["Honda CG 150", "Honda XRE 300", "Honda CBR 1000RR", "Honda CB 500X", "Honda Biz"] },
        { pergunta: "A Honda CRF 150F é ideal para qual tipo de terreno?", respostaCorreta: "Off-road", respostas: ["Praia", "Asfalto", "Neve", "Off-road"] },
        { pergunta: "O que significa a sigla CB nas motos Honda?", respostaCorreta: "City Bike", respostas: ["Chopper Bike", "Cross Bike", "City Bike", "Café Racer Bike"] },
        { pergunta: "A Honda Africa Twin é um modelo:", respostaCorreta: "Adventure", respostas: ["Naked", "Touring", "Adventure", "Scooter"] },
        { pergunta: "A Honda Biz é uma moto voltada para:", respostaCorreta: "Uso urbano e fácil manuseio", respostas: ["Uso urbano e fácil manuseio", "Motocross", "Longas viagens", "Uso off-road"] }
    ],
    [
        { pergunta: "Em que ano foi lançada a Honda CB 500X no Brasil?", respostaCorreta: "2015", respostas: ["2012", "2015", "2018", "2020"] },
        { pergunta: "A Honda XRE 300 é uma moto do tipo:", respostaCorreta: "Trail", respostas: ["Naked", "Scooter", "Trail", "Off-road"] },
        { pergunta: "Qual modelo da Honda é voltado para o uso no motocross?", respostaCorreta: "Honda CRF 450R", respostas: ["Honda XR 250", "Honda CB 500X", "Honda CRF 450R", "Honda CB 1000R"] },
        { pergunta: "Qual é o motor da Honda CBR 1000RR Fireblade?", respostaCorreta: "1000 cc", respostas: ["1000 cc", "600 cc", "1500 cc", "1200 cc"] },
        { pergunta: "A Honda CB 1000R é uma moto do tipo:", respostaCorreta: "Naked", respostas: ["Touring", "Chopper", "Cruiser", "Naked"] }
    ],
    [
        { pergunta: "Qual é o nome da moto Honda mais indicada para quem começa a andar de moto?", respostaCorreta: "Honda CG 160", respostas: ["Honda CG 160", "Honda XRE 300", "Honda CB 500", "Honda CBR 600RR"] },
        { pergunta: "A Honda CRF 250R é uma moto voltada para qual tipo de modalidade?", respostaCorreta: "Moto de cross", respostas: ["Moto de rua", "Moto de cross", "Moto de cross", "Moto de estrada"] },
        { pergunta: "Em qual ano a Honda lançou a primeira moto CG no Brasil?", respostaCorreta: "1971", respostas: ["1976", "1971", "1990", "1982"] },
        { pergunta: "Qual é o nome da linha de motos esportivas da Honda?", respostaCorreta: "CBR", respostas: ["CRF", "CB", "CBR", "XR"] },
        { pergunta: "Qual é o modelo de moto mais popular da Honda no Brasil?", respostaCorreta: "Honda CG 160", respostas: ["Honda CRF 250", "Honda CB 500", "Honda CBR 1000RR", "Honda CG 160"] }
    ],
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
