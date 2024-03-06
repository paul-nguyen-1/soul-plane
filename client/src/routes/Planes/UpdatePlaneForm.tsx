import { FormEvent, ChangeEvent, useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

interface PlaneType {
    plane_type_id: number,
    type_name: string,
    capacity: number,
    range_in_hrs: number
  }

interface Airport {
    airport_id: number;
    airport_name: string;
    airport_code?: string;
    location?: string;
}

interface FormData {
    plane_type_id: number,
    current_airport_id?: number
}

export default function UpdatePlaneForm() {
    const { id } = useParams();
    const [planeTypes, setPlaneTypes] = useState<PlaneType[]>([])
    const [airports, setAirports] = useState<Airport[]>([])
    
    const [formData, setFormData] = useState<FormData>({
        plane_type_id: 1,
        current_airport_id: 1
    })

    useEffect(() => {
        async function getPlane() {
            const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/planes/${id}`)
            const data = response.data[0] 

            setFormData({
                plane_type_id: data.plane_type_id,
                current_airport_id: data.current_airport_id || ""
            })
        }

        async function getPlaneTypes() {
            const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/plane-types`)
            setPlaneTypes(response.data)
        }

        async function getAirports() {
            const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/airports`)
            response.data.push({ airport_id: "", airport_name: "Currently Unavailable" })
            setAirports(response.data)
        }

        getPlane()
        getPlaneTypes()
        getAirports()

    }, [id])

    const navigate = useNavigate();

    async function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const { name, value } = event.target

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const response = await Axios.put(`http://${import.meta.env.VITE_HOST_NAME}:55767/planes/${id}`, formData)
            console.log(response)
            navigate("/Planes")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            <h1>Planes</h1>
        
            <div id="update">
                <form id="updatePlane" method="post" onSubmit={handleSubmit}>
                <legend>
                    <strong>Update Plane</strong>
                </legend>
                <fieldset className="fields">
                    <span>Plane ID: {id}</span>
                    <label htmlFor="current_airport_id">Current Airport</label>
                    <select name="current_airport_id" onChange={handleSelectChange} value={formData.current_airport_id}>
                    {airports.map((airport) => (
                        <option key={airport.airport_id} value={airport.airport_id}>{airport.airport_name}</option>
                    ))}
                    </select>

                    <label htmlFor="plane_type_id">Plane Type</label>
                    <select name="plane_type_id" onChange={handleSelectChange} value={formData.plane_type_id}>
                    {planeTypes.map((planeType) => (
                        <option key={planeType.plane_type_id} value={planeType.plane_type_id}>{planeType.type_name}</option>
                    ))}
                    </select>
                </fieldset>
                <div className="buttons-container">
                    <input className="btn" type="submit" value="Save Update Plane" />
                    <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
                </div>
                </form>
            </div>
        </div>
    )
}