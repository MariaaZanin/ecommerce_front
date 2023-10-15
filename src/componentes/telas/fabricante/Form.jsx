import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";
import FabricanteContext from "./FabricanteContext";

function Form() {
  const { objeto, handleChange, acaoCadastrar, alerta } =
    useContext(FabricanteContext);

  return (
    <Dialogo
      id="modalEdicao"
      titulo="Fabricante"
      idformulario="formEdicao"
      acaoCadastrar={acaoCadastrar}
    >
      <Alerta alerta={alerta} />
      <CampoEntrada id="txtId" label="Id" tipo="number"
                name="id" value={objeto?.id}
                handlechange={handleChange}
                requerido={false} readonly={true}
                maximocaracteres={5} />
      <CampoEntrada
        id="txtNome"
        label="Nome"
        tipo="text"
        name="nome"
        value={objeto?.nome}
        handlechange={handleChange}
        requerido={true}
        readonly={false}
        textovalido="Nome OK"
        textoinvalido="Informe o nome"
        maximocaracteres={40}
      />
      <CampoEntrada
        id="txtPais"
        label="País"
        tipo="text"
        name="pais"
        value={objeto?.pais}
        handlechange={handleChange}
        requerido={true}
        readonly={false}
        textovalido="País OK"
        textoinvalido="Informe o país"
        maximocaracteres={40}
      />
      <CampoEntrada
        id="txtTelefone"
        label="Telefone"
        tipo="text"
        name="telefone"
        value={objeto?.telefone}
        handlechange={handleChange}
        requerido={true}
        readonly={false}
        textovalido="Telefone OK"
        textoinvalido="Informe o telefone"
        maximocaracteres={40}
      />
      <CampoEntrada
        id="txtDescricao"
        label="Descrição"
        tipo="text"
        name="descricao"
        value={objeto?.descricao}
        handlechange={handleChange}
        requerido={true}
        readonly={false}
        textovalido="Descrição OK"
        textoinvalido="Informe a descrição"
        maximocaracteres={40}
      />
    </Dialogo>
  );
}

export default Form;
