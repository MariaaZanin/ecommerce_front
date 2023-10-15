import { getToken } from "../seguranca/Autenticacao";

export const getProdutoServico = async () => {
    const response = 
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto`,
    {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const getProdutoServicoPorIdAPI = async id => {
    const response = 
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto/${id}`,
    {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const deleteProdutoServico = async id => {
    const response = 
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto/${id}`,
    {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const cadastraProdutoServico = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/produto`, {
        method: metodo,
        headers: { "Content-Type": "application/json",
        "authorization" : getToken() },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}