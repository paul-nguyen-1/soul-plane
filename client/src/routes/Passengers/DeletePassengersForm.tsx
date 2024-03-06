import { FormEvent, useState, useEffect } from "react"
import Axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

interface FormData {
    first_name: string,
    last_name: string,
    phone: string,
    email: string,
    address: string,
    city: string,
    state_abbr: string,
    zip_code: number,
    passport_number: string,
}

export default function DeletePassengersForm() {
    const { id } = useParams();

    const [formData, setFormData] = useState<FormData>({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state_abbr: '',
        zip_code: 0,
        passport_number: '',
    })

    useEffect(() => {
        async function getPassengers() {
            const response = await Axios.get(`http://${import.meta.env.VITE_HOST_NAME}:55767/passengers/${id}`)
            const data = response.data[0]
            setFormData({
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                email: data.email,
                address: data.address,
                city: data.city,
                state_abbr: data.state_abbr,
                zip_code: data.zip_code,
                passport_number: data.passport_number,
            })
        }
        getPassengers()
    }, [id])

    const navigate = useNavigate();
    
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const response = await Axios.delete(`http://${import.meta.env.VITE_HOST_NAME}:55767/passengers/${id}`)
            console.log(response)
            navigate("/Passengers")
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <div id="delete">
        <form id="deletePassengers" method="put" onSubmit={handleSubmit}>
          <legend>
            <strong>Delete Passenger Type</strong>
          </legend>
          <fieldset className="fields">
            <p>Are you sure you wish to delete the following?</p>
            <span>Passenger ID: {id}</span>
            <span>First Name: {formData.first_name}</span>
            <span>Last Name: {formData.last_name}</span>
            <span>Phone: {formData.phone}</span>
            <span>Email: {formData.email}</span>
            <span>Address: {formData.address}</span>
            <span>City: {formData.city}</span>
            <span>State Abbreviation: {formData.state_abbr}</span>
            <span>Zip Code: {formData.zip_code}</span>
            <span>Passport Number: {formData.passport_number}</span>
          </fieldset>
          <div className="buttons-container">
            <input className="btn" type="submit" value="Delete Plane Type" />
            <input className="btn" type="button" value="Cancel" onClick={() => navigate(-1)}/>
          </div>
        </form>
      </div>   
    )
}