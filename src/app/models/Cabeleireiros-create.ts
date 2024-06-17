export interface CabeleireirosCreate {
    id?: any;
    nome: string;
    telefone: string;
    email: string;
    cpf: string;
    endereco?: {
        logradouro?: string;
        bairro: string;
        cep: string;
        cidade: string;
        uf: string;
        numero?: string;
      };
}