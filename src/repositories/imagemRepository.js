import { connection } from "../config/Database.js";

const imagemRepository = {
  listar: async (id) => {
    const sql = "SELECT Imagem FROM Produtos WHERE id = ?";
    const values = [id];
    const [rows] = await connection.execute(sql, values);
    return rows; 
  }
};

export default imagemRepository;