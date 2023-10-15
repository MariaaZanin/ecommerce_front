import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from "./componentes/telas/Home";
import Produto from "./componentes/telas/produto/Produto";
import Login from "./componentes/telas/login/Login";
import MenuPublico from "./componentes/telas/MenuPublico";
import MenuPrivado from "./componentes/telas/MenuPrivado";
import Fabricante from "./componentes/telas/fabricante/Fabricante";

const router = createBrowserRouter([
  {
    path : "/",
    element : <MenuPublico/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "login",
        element : <Login/>
      }   
    ]
  },
  {
    path : "/privado",
    element : <MenuPrivado/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "fabricantes",
        element : <Fabricante/>
      }
      ,
      {
        path : "produtos",
        element : <Produto/>
      },
      {
        path : "login",
        element : <Login/>
      }   
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
