import { useState, useEffect } from "react";
import FabricanteContext from "./FabricanteContext";
import {
    getFabricanteServico, getFabricanteServicoPorIdAPI, deleteFabricanteServico, cadastraFabricanteServico
}
    from '../../../servicos/FabricanteServico';
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Fabricante() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({ id: "", nome: ""});
    const [carregando, setCarregando] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ 
            id: 0,
            nome: "",
            pais: "",
            telefone: "",
            descricao: ""
        });
    }

    const editarObjeto = async id => {
        try {
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setObjeto(await getFabricanteServicoPorIdAPI(id));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraFabricanteServico(objeto, metodo);
            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });
            setObjeto(retornoAPI.data);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaFabricantes();
    }

    const recuperaFabricantes = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getFabricanteServico());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async id => {
        try {
            if (window.confirm('Deseja remover este objeto')) {
                let retornoAPI = await deleteFabricanteServico(id);
                setAlerta({
                    status: retornoAPI.status,
                    message: retornoAPI.message
                });
                recuperaFabricantes();
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
        recuperaFabricantes();
    }, []);

    return (
        <FabricanteContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar,
            handleChange, novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>

            <Form />
        </FabricanteContext.Provider>
    )
}

export default WithAuth(Fabricante);