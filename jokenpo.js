let vitorias = 0;
let derrotas = 0;
let empates = 0;
let totalJogos = 0;
let modo = "normal";
let rodadaAtual = 0;

document.getElementById('modo').addEventListener('change', function() {
    modo = this.value;
    reiniciarJogo();
});

document.getElementById('pedra').addEventListener('click', function() {
    jogar('pedra');
});

document.getElementById('papel').addEventListener('click', function() {
    jogar('papel');
});

document.getElementById('tesoura').addEventListener('click', function() {
    jogar('tesoura');
});

document.getElementById('reiniciar').addEventListener('click', reiniciarJogo);

function jogar(escolhaUsuario) {
    const escolhas = ['pedra', 'papel', 'tesoura'];
    const escolhaMaquina = escolhas[Math.floor(Math.random() * 3)];
    let resultado = '';

    if (escolhaUsuario === escolhaMaquina) {
        resultado = 'Empate!';
        empates++;
    } else if (
        (escolhaUsuario === 'pedra' && escolhaMaquina === 'tesoura') ||
        (escolhaUsuario === 'papel' && escolhaMaquina === 'pedra') ||
        (escolhaUsuario === 'tesoura' && escolhaMaquina === 'papel')
    ) {
        resultado = 'Vitória!';
        vitorias++;
    } else {
        resultado = 'Derrota!';
        derrotas++;
    }

    totalJogos++;
    rodadaAtual++;

    document.getElementById('resultado').textContent = `Você escolheu ${escolhaUsuario}, computador escolheu ${escolhaMaquina}. ${resultado}`;
    atualizarPlacar();
    checarFimJogo();
}

function atualizarPlacar() {
    document.getElementById('vitorias').textContent = vitorias;
    document.getElementById('derrotas').textContent = derrotas;
    document.getElementById('empates').textContent = empates;
}

function checarFimJogo() {
    if (modo !== "normal" && rodadaAtual >= modo) {
        let vencedor = vitorias > derrotas ? 'Você venceu o jogo!' : (derrotas > vitorias ? 'Você perdeu o jogo!' : 'O jogo ficou Empatado!');
        document.getElementById('resultado').textContent += ` ${vencedor}`;
        estatisticasJogo();
    }
}

function reiniciarJogo() {
    vitorias = 0;
    derrotas = 0;
    empates = 0;
    totalJogos = 0;
    rodadaAtual = 0;
    document.getElementById('resultado').textContent = '';
    document.getElementById('estatisticas').textContent = '';
    atualizarPlacar();
}

function estatisticasJogo() {
    const percentualVitorias = ((vitorias / totalJogos) * 100).toFixed(2);
    const percentualDerrotas = ((derrotas / totalJogos) * 100).toFixed(2);
    const percentualEmpates = ((empates / totalJogos) * 100).toFixed(2);
    document.getElementById('estatisticas').innerHTML = `
        <h2>Estatísticas:</h2>
        <p>Total de Jogos: ${totalJogos}</p>
        <p>Percentual de Vitórias: ${percentualVitorias}%</p>
        <p>Percentual de Derrotas: ${percentualDerrotas}%</p>
        <p>Percentual de Empates: ${percentualEmpates}%</p>
    `;
}
