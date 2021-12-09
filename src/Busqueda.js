import { useParams } from "react-router-dom"
export default function Busqueda() {
    let params = useParams()

    return (
        <div>
            <p>{params.name}</p>
        </div>

    )
}