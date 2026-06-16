import path from 'path';
import fs from 'fs';
import imagemRepository from '../repositories/imagemRepository.js';

const imagemController = {
    listar: async (req, res) => {
        try {
            const param = req.params.id;
            const imagemArquivo = path.join(process.cwd(), 'uploads', 'imagens', param);
            if (fs.existsSync(imagemArquivo)) {
                return res.sendFile(imagemArquivo);
            }

            const result = await imagemRepository.listar(param);

            if (!result || result.length === 0 || !result[0].image) {
                return res.status(404).json({ message: 'A imagem não foi encontrada!' });
            }

            const arquivo = result[0].image;
            const localImagem = path.join(process.cwd(), 'uploads', 'imagens', arquivo);

            if (!fs.existsSync(localImagem)) {
                return res.status(404).json({ message: 'O arquivo de imagem não existe no servidor' });
            }

            return res.sendFile(localImagem, (err) => {
                if (err) {
                    console.error('Erro ao enviar arquivo de imagem:', err);
                    if (!res.headersSent) {
                        res.status(500).json({ message: 'Ocorreu um erro ao enviar imagem' });
                    }
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Ocorreu um erro no servidor', errorMessage: error.message });
        }
    }
};

export default imagemController;