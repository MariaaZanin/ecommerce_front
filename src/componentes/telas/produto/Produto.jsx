import { useState, useEffect } from "react";
import ProdutoContext from "./ProdutoContext";
import { getFabricanteServico } from '../../../servicos/FabricanteServico';
import {
    getProdutoServico, getProdutoServicoPorIdAPI,
    deleteProdutoServico, cadastraProdutoServico
} from '../../../servicos/ProdutoServico'
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Produto() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({ id: "", nome: "" });
    const [carregando, setCarregando] = useState(false);
    const [listaFabricantes, setListaFabricantes] = useState([]);

    const formatarData = (timestamp) => {
        const data = new Date(timestamp);
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0'); 
        const dia = String(data.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    }

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: 0,
            nome: "",
            descricao: "",
            valor: "",
            data_cadastro: new Date().toISOString().slice(0, 10),
            data_alteracao: new Date().toISOString().slice(0, 10),
            fabricante_id: ""
        });
    }

    const editarObjeto = async id => {
        try {
            setEditar(true);
            setAlerta({ status: "", message: "" });
            let retornoAPI = await getProdutoServicoPorIdAPI(id)
            retornoAPI.data_cadastro = formatarData(retornoAPI.data_cadastro);
            retornoAPI.data_alteracao = formatarData(retornoAPI.data_alteracao);
            setObjeto(retornoAPI);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraProdutoServico(objeto, metodo);
            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });
            retornoAPI.data.data_cadastro = formatarData(retornoAPI.data.data_cadastro);
            retornoAPI.data.data_alteracao = formatarData(retornoAPI.data.data_alteracao);
            setObjeto(retornoAPI.data);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaProdutos();
    }

    const recuperaProdutos = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getProdutoServico());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaFabricantes = async () => {
        setListaFabricantes(await getFabricanteServico());
    }

    const remover = async id => {
        try {
            if (window.confirm('Deseja remover este objeto')) {
                let retornoAPI = await deleteProdutoServico(id);
                setAlerta({
                    status: retornoAPI.status,
                    message: retornoAPI.message
                });
                recuperaProdutos();
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaProdutos();
        recuperaFabricantes();
    }, []);

    return (
        <ProdutoContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar,
            handleChange, novoObjeto, editarObjeto, listaFabricantes
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>

            <Form />
        </ProdutoContext.Provider>
    )
}

export default WithAuth(Produto);