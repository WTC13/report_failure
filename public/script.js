function mostrarCamposOutros() {
    const modulo = document.getElementById('modulo').value;
    const outrosCampos = document.getElementById('outrosCampos');
    outrosCampos.style.display = modulo === 'Outros' ? 'block' : 'none';
}

function toggleEditMode() {
            document.getElementById('view-section').style.display = 'none';
            document.getElementById('edit-section').style.display = 'block';
        }

function toggleViewMode() {
    document.getElementById('edit-section').style.display = 'none';
    document.getElementById('view-section').style.display = 'block';
}

// Obtém referências para os elementos
const botao = document.getElementById('botaoMostrar');
const conteudo = document.getElementById('conteudoOculto');

// Verifica se o botão foi encontrado antes de adicionar o ouvinte de evento
if (botao) {
    // Apenas seleciona o ícone se o botão existir
    const iconeSeta = botao.querySelector('.arrow-icon');
    
    // Adiciona o ouvinte de evento de clique
    botao.addEventListener('click', () => {
        // Alterna a classe que inicia a animação de opacidade e movimento
        conteudo.classList.toggle('show');
    
        // Alterna a classe que faz a seta rotacionar
        iconeSeta.classList.toggle('rotated');
    
        // Rola a página suavemente para o contêiner dos dados
        conteudo.scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Mapeamento das etapas para porcentagem
    const etapasMap = {
        'Solicitação Reportada': 30,
        'Solicitação em Análise': 50,
        'Homologação': 75,
        'Produção': 100
    };

    // Pega o canvas só se ele existir
    const canvas = document.getElementById('etapasChart');
    if (canvas) {
        const etapaAtual = (canvas.getAttribute('data-etapa') || "").trim();
        const porcentagem = etapasMap[etapaAtual] ?? 0;

        // Registrar plugin
        Chart.register(ChartDataLabels);

        const ctx = canvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [""], // sem label fora da barra
                datasets: [{
                    data: [porcentagem],
                    backgroundColor: '#4caf50'
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    x: { min: 0, max: 100, display: false },
                    y: { display: false }
                },
                plugins: {
                    legend: { display: true },
                    tooltip: { enabled: false },
                    datalabels: {
                        color: "#fff",
                        font: { family: "Poppins", weight: "bold", size: 14,},
                        align: "center",
                        anchor: "center",
                        formatter: (value) => etapaAtual || ""
                    }
                }
            }
        });
    }