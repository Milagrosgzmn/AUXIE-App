import { useState } from 'react'
import { DateTime } from 'luxon'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from '../../../redux/actions/actions'
import { useNavigate } from 'react-router-dom'
import ClientRequiredServices from '../../../components/clientRequiredServices/ClientRequiredServices'
import style from './ProfileConsumers.module.scss'

const ProfileConsumers = () => {
    const consumer = useSelector((state) => state.loggedUser)
    const [newImage, setNewImage] = useState(null)
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const registerDate = consumer.registerDate
    const luxonDate = DateTime.fromISO(registerDate)
    const toDateMed = luxonDate.toLocaleString(DateTime.DATE_MED)

    const handleImageChange = (event) => {
        const fileInput = event.target.files[0]
        if (
            fileInput &&
            (fileInput.type === 'image/jpeg' || fileInput.type === 'image/png')
        ) {
            setNewImage(fileInput)
            setError(null)
        } else {
            setError('Por favor, selecciona un archivo PNG o JPG.')
        }
    }

    const handleUpdateProfile = () => {
        const formData = new FormData()
        formData.append('image', newImage)

        dispatch(
            updateProfile(
                { id: consumer.id, image: newImage },

                'consumers'
            )
        )
    }

    const favNames = consumer.favoritesProviders
        .map((favorite) => favorite.firstName)
        .join(' | ')

    const requiredServicesNames = consumer.requiredServices
        .map((service) => service.service)
        .join(' | ')
    const requiredServicesNamesSet = new Set(requiredServicesNames)

    return (
        <div className={style.profileContainer}>
            <div>
                <h1 className={style.name}>
                    {consumer.firstName} {consumer.lastName}
                </h1>
                <img src={consumer.image.secure_url} alt="imagen de perfil" />
                <input
                    type="file"
                    accept=".jpg, .png"
                    onChange={handleImageChange}
                    className={style.imageButton}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <h4>
                    {consumer.isAdmin && (
                        <div>
                            <h4>Admin</h4>
                        </div>
                    )}
                </h4>
                <h4>Genero: {consumer.gender}</h4>
                <div className={style.emailpassword}>
                    <h3>
                        Email: {consumer.email}{' '}
                        <button onClick={() => navigate('/resetpassword')}>
                            Cambiar la contraseña
                        </button>
                    </h3>
                </div>
                <h6>Te uniste: {toDateMed}</h6>
                <div>
                    <h5>Auxies favoritos: {favNames}</h5>
                    <h5>Servicios contratados: {requiredServicesNamesSet}</h5>
                    <h5>
                        Servicios requeridos:
                        {consumer.requiredServices.length && (
                            <ClientRequiredServices />
                        )}
                    </h5>
                    <h5>Average Rating: {consumer.averageRating}</h5>
                    <h5>Ratings: {consumer.ratings}</h5>
                </div>
                <div className={style.savebutton}>
                    <button onClick={handleUpdateProfile}>
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileConsumers
