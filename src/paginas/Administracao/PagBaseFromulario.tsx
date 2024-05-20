import { Outlet } from "react-router-dom";
import stylesGlobla from '../../Global.module.scss'

export default function PagBaseFrmulario(){
    return(
    <div className={stylesGlobla.Logs}>
        <Outlet/>
    </div>

    )
}
