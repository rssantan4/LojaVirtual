import { GeneroMusical } from "../../genero-musical/model/genero-musical";
export interface Produto {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  estoque: number;
  generoMusical: GeneroMusical;
  imagemUrl: string;
}
