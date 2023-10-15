import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import ProdutoContext from './ProdutoContext';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import CampoSelect from '../../comuns/CampoSelect';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaFabricantes }
        = useContext(ProdutoContext);

    return (
        <Dialogo id="modalEdicao" titulo="Produto" idformulario="formEdicao"
            acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtId" label="Id" tipo="number"
                name="id" value={objeto?.id}
                handlechange={handleChange}
                requerido={false} readonly={true}
                maximocaracteres={5} />
            <CampoEntrada id="txtNome" label="Nome" tipo="text"
                name="nome" value={objeto?.nome}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Nome OK" textoinvalido="Informe o nome"
                maximocaracteres={40} />
            <CampoEntrada id="txtDescricao" label="Descrição" tipo="text"
                name="descricao" value={objeto?.descricao}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Descrição OK" textoinvalido="Informe a descrição"
                maximocaracteres={40} />
            <CampoEntrada id="txtValor" label="Valor" tipo="number"
                name="valor" value={objeto?.valor}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Valor OK" textoinvalido="Informe o valor" />
            <CampoEntrada id="txtDataCadastro" label="Data de cadastro" tipo="date"
                name="data_cadastro" value={objeto?.data_cadastro}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Data OK" textoinvalido="Informe a data de cadastro" />
                 <CampoEntrada id="txtDataAlteracao" label="Data de alteracao" tipo="date"
                name="data_alteracao" value={objeto?.data_alteracao}
                handlechange={handleChange}
                requerido={false} readonly={false}
                textovalido="Data OK" textoinvalido="Informe a data de alteracao" />
            <CampoSelect id="txtFabricante" label="Fabricante"
                name="fabricante_id" value={objeto?.fabricante_id}
                handlechange={handleChange}
                requerido={true}
                textovalido="Fabricante OK"
                textoinvalido="Informe o fabricante">
                {
                    listaFabricantes.map((fab) => (
                        <option key={fab.id} value={fab.id}>
                            {fab.nome}
                        </option>
                    ))
                }
            </CampoSelect>
        </Dialogo>
    )
}

export default Form;
