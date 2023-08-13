import { useState } from 'react'
import { DateTime } from 'luxon'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../../redux/actions/actions'
import { useNavigate } from 'react-router-dom'
import './ProfileAuxies.scss'

const ProfileAuxies = () => {
    const provider = useSelector((state) => state.loggedUser)
    const [newImage, setNewImage] = useState('')
    const [newBio, setNewBio] = useState(provider.bio)
    const [error, setError] = useState(null)
    const [gallery, setGallery] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const registerDate = provider.registerDate
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

    const handleBioChange = (e) => {
        setNewBio(e.target.value)
    }

    const handleAddPhoto = (event) => {
        const newPhotos = [...gallery, event.target.files[0]]
        if (newPhotos.length <= 5) {
            setGallery(newPhotos)
        }
    }

    const handleRemovePhoto = (index) => {
        const newPhotos = gallery.filter((_, i) => i !== index)
        setGallery(newPhotos)
    }

    const handleUpdateProfile = () => {
        const formData = new FormData()
        formData.append('image', newImage)
        formData.append('bio', newBio)

        gallery.forEach((gallery, index) => {
            formData.append(`gallery-${index}`, gallery)
        })

        dispatch(
            updateProfile(
                { id: provider.id, image: newImage, bio: newBio },

                'providers'
            )
        )
    }

    return (
        <div className="profile-container">
            <div>
                <img src={provider.image.secure_url} alt="imagen de perfil" />
                <input
                    type="file"
                    accept=".jpg, .png"
                    onChange={handleImageChange}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <h1>
                    {provider.firstName} {provider.lastName}
                </h1>
                <h4>Genero: {provider.gender}</h4>
                <h3>
                    Email: {provider.email}{' '}
                    <button onClick={() => navigate('/resetpassword')}>
                        Cambiar contraseña
                    </button>
                </h3>
                <textarea value={newBio} onChange={handleBioChange} />
                <h6>Te uniste: {toDateMed}</h6>
                <div>
                    <h5>Servicios que ofrece:</h5>
                    <h5>Trabajos realizados: </h5>
                    <h5>Rating: </h5>
                    <h5>Average Rating: {provider.averageRating}</h5>
                    <h5>Reviews:</h5>
                </div>
                <div className="gallery-container">
                    <h5>Fotos de tus trabajos realizados:</h5>
                    <input
                        type="file"
                        accept=".jpg, .png"
                        multiple
                        onChange={handleAddPhoto}
                    />
                    <ul>
                        {gallery.map((photo, index) => (
                            <li className="gallery-item" key={index}>
                                <img
                                    src={URL.createObjectURL(photo)}
                                    alt={`Photo ${index}`}
                                />
                                <button
                                    className="delete-button"
                                    onClick={() => handleRemovePhoto(index)}
                                >
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={handleUpdateProfile}>Guardar Cambios</button>
            </div>
        </div>
    )
}

export default ProfileAuxies
