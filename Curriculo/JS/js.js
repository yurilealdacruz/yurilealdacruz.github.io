function baixarArquivos() {
    // Lista de arquivos
    const arquivos = [
        'Arquivos/Curriculo_Yuri_Leal_da_Cruz.docx',
        'Arquivos/Curriculo_Yuri_Leal_da_Cruz.pdf'
    ];

    arquivos.forEach(arquivo => {
        const link = document.createElement('a');
        link.href = arquivo;
        link.download = arquivo.split('/').pop(); // Define o nome do arquivo
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

