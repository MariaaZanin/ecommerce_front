import { useContext } from "react";
import ProdutoContext from "./ProdutoContext";
import Alerta from '../../comuns/Alerta';
import { formataMoeda } from "../../comuns/Uteis";

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto }
        = useContext(ProdutoContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Produtos</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {listaObjetos.length === 0 && <h1>Nenhum produto encontrado</h1>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">Id</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Data Cadastro</th>
                            <th scope="col">Data Alteracao</th>
                            <th scope="col">Fabricante</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.id}>
                                <td align="center">
                                    <button className="btn btn-info"
                                        onClick={() => editarObjeto(objeto.id)}
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objeto.id); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                                <td>{objeto.id}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.descricao}</td>
                                <td>{objeto.valor}</td>
                                <td>{objeto.data_cadastro}</td>
                                <td>{objeto.data_alterecao}</td>
                                <td>{objeto.fabricante_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Tabela;