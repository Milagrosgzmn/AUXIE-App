import { DatePicker } from '@mui/x-date-pickers'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import style from './jobrequestform.module.scss'
import { useState } from 'react'
import { Button, MenuItem, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const JobRequestForm = ({ services }) => {

    let { id } = useParams()
    const client = useSelector((state) => state.loggedUser)
    // const services = useSelector((state) => state.services)
    const [value, setValue] = useState({
        clientId: client.id,
        service: '',
        jobDate: '',
        description: '',
        // price:'',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setValue((previousvalue) => ({ ...previousvalue, [name]: value }))
    }
    const handleServiceChange = (event) => {
        const { value } = event.target // Obtenemos el valor seleccionado del campo de selección
        setValue((previousvalue) => ({
            ...previousvalue,
            service: value, // Actualizamos solo el campo 'service'
        }))
    }
    const handlePost = async () => {
        try {
            const response = await axios.put(
                `/providers/addJob/${id}`,
                value
            )
            if (response) {
                const form = document.getElementById('form')
                form.reset()
                Swal.fire('Cita solicitada!')
            }
            // setAccess(true)
            console.log(response)
            // navigate('/home')
        } catch (error) {
            console.log(error + error.response.data.error)

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'error + error.response.data.error!',
                footer: '<a href="">Why do I have this issue?</a>',
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        handlePost()
    }
    return (
        //pasar por param id de auxie y por body "service name" (mapeado de servicios) "description" "client id de logged user"
        <div>
            <center>
                <div className={style.form}>
                    <form id="form" onSubmit={handleSubmit}>
                        <div>
                            <h1>Agenda cita</h1>
                        </div>
                        <div>
                            <label>Elige fecha</label>

                            <DatePicker
                                className={style.picker}
                                value={value}
                                onChange={(jobDate) =>
                                    setValue((previousvalue) => ({
                                        ...previousvalue,
                                        jobDate,
                                    }))
                                }
                                sx={{
                                    color: 'primary.main',
                                    border: 2,
                                    borderRadius: 1.4,
                                    borderColor: 'primary.main',
                                }}
                            />
                        </div>

                        <div>
                            <label>Elige horario</label>
                            <TimePicker
                                className={style.picker}
                                value={value}
                                onChange={(jobDate) =>
                                    setValue((previousvalue) => ({
                                        ...previousvalue,
                                        jobDate,
                                    }))
                                }
                                sx={{
                                    border: 2,
                                    borderRadius: 1.4,
                                    borderColor: 'primary.main',
                                }}
                            />
                        </div>
                        <div>
                            <label>
                                Selecciona el servicio que deseas contratar
                            </label>

                            <TextField
                                required
                                className={style.picker}
                                id="service"
                                select
                                fullWidth
                                label="Servicio"
                                helperText="Selecciona un servicio"
                                color="primary"
                                focused
                                name="service"
                                value={value.service}
                                onChange={handleServiceChange}
                            >
                                {services ? (
                                    services.map((service) => (
                                        <MenuItem
                                            key={service.name}
                                            value={service.name}
                                        >
                                            {service.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <div></div>
                                )}
                            </TextField>
                        </div>
                        <div>
                            <label>Descripción del trabajo que necesita:</label>

                            <TextField
                                className={style.picker}
                                fullWidth
                                id="outlined-basic"
                                label="descripcion"
                                variant="outlined"
                                required
                                multiline
                                color="primary"
                                focused
                                name="description"
                                value={value.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <Button
                            className={style.send}
                            variant="contained"
                            endIcon={<SendIcon />}
                            type="submit"
                        >
                            Send
                        </Button>
                    </form>
                </div>
            </center>
        </div>
    )
}

export default JobRequestForm