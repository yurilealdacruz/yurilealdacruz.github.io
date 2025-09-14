// Aguarda o carregamento completo da página antes de executar o script
window.onload = function() {
    // 1. Encontra o botão de download e o elemento do currículo no HTML
    const btn = document.getElementById('download-btn');
    const resume = document.querySelector('.container');

    // 2. Adiciona um "escutador" que dispara uma função quando o botão é clicado
    btn.addEventListener('click', () => {

        // 3. Esconde o botão para que ele não apareça no PDF
        btn.style.display = 'none';

        // 4. Configurações para a captura da imagem (aumentar a escala melhora a qualidade)
        const options = {
            scale: 3, // Aumenta a resolução da imagem final
            useCORS: true, // Permite carregar imagens de outras origens, se houver
            logging: true, // Mostra logs no console para depuração
            windowWidth: resume.scrollWidth,
            windowHeight: resume.scrollHeight
        };

        // 5. Usa o html2canvas para "fotografar" o elemento do currículo
        html2canvas(resume, options).then(canvas => {
            // 6. Converte o "desenho" (canvas) em uma imagem no formato PNG
            const imgData = canvas.toDataURL('image/png');
            
            // 7. Calcula as dimensões do PDF para manter a proporção da imagem
            const pdfWidth = 210; // Largura de uma página A4 em mm
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // 8. Cria uma nova instância do jsPDF no formato A4
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'portrait', // 'portrait' (retrato) ou 'landscape' (paisagem)
                unit: 'mm',
                format: [pdfWidth, pdfHeight]
            });
            
            // 9. Adiciona a imagem capturada ao PDF
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            
            // 10. Salva o PDF com um nome de arquivo
            pdf.save('Curriculo-YuriLeal.pdf');

            // 11. Mostra o botão novamente após a geração do PDF
            btn.style.display = 'flex';
        }).catch(error => {
            console.error('Ocorreu um erro ao gerar o PDF:', error);
            // Garante que o botão reapareça mesmo se der erro
            btn.style.display = 'flex';
        });
    });
}