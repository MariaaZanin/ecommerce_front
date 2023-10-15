import { getToken } from "../seguranca/Autenticacao";

export const getFabricanteServico = async () => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/fabricante`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": getToken()
                }
            });
    const data = await response.json();
    return data;
}

export const getFabricanteServicoPorIdAPI = async id => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/fabricante/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": getToken()
                }
            });
    const data = await response.json();
    return data;
}

export const deleteFabricanteServico = async id => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/fabricante/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": getToken()
                }
            });
    const data = await response.json();
    return data;
}


export const cadastraFabricanteServico = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/fabricante`, {
        method: metodo,
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}