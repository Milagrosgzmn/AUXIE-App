import style from './homeAuxie.module.scss'

import { useSelector, useDispatch } from 'react-redux'
//Import components
// import CardServices from '../../../components/card-services/CardServices'
import AsideAuxie from '../../../components/home-auxie-components/aside-auxie/AsideAuxie'
import NavGeneral from '../../../components/nav-general/NavGeneral'
import Footer from '../../../components/footer/Footer'
import axios from 'axios'
import { useEffect } from 'react'
import { loggedUser } from '../../../redux/actions/actions'
//Hooks
import useNotify from './../../../hooks/useNotify'

const HomeAuxie = () => {
    const logged = useSelector(state => state.loggedUser)
    const { sendNotification } = useNotify(logged.userUid)
    const lastJobs = logged.reviews?.slice(0, 4)

    const { services } = logged
    const dispatch = useDispatch()
    const handleRefresh = async () => {
        try {
            const response = await axios.get(`/providers/${logged.id}`)
            if (response) {
                dispatch(loggedUser(response.data))
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        let welcome
        switch (logged.gender) {
            case 'Masculino':
                welcome = 'Bienvenido'
                break
            case 'Femenino':
                welcome = 'Bienvenida'
                break
            case 'Otro':
                welcome = 'Bienvenide'
                break
            default:
                welcome = 'Bienvenidx'
        }
        if (logged.firstLogin) {
            sendNotification(`${welcome} a Auxie ${logged.firstName}, ingresa a tu perfil para modificar tu bio`)
            axios.put('/providers/firstLogin', { id: logged.id })
        }
        handleRefresh()
    }, [])
    return (
        <div>
            <div>
            {/* Header */}
            <header className='h-16'>
                <NavGeneral />
            </header>
            {/* Aside */}
            <AsideAuxie />
            {/* Main */}
            <main className={style.main}>
                <div className={style.services}>
                    <h3>Servicios</h3>
                    <div className={style.userServices}>
                        {services ? (
                            services.map(service => (
                                <div className={style.cardServices} key={service.name}>
                                    {/* <img src={service.image?.secure_url} alt={service.name} /> */}
                                    <h4>{service.name}</h4>
                                </div>
                            ))
                        ) : (
                            <p>No ofrece servicios</p>
                        )}
                    </div>
                    </div></main>
                    <div className={style.inbox}>
                        <p>Calificación de los ultimos servicios</p>
                        <table className={style.servicesTable}>
                            <thead>
                                <tr>
                                    <th>Servicio</th>
                                    <th>Reseña</th>
                                    <th>Calificación</th>
                                    <th>Contratante</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lastJobs?.map((review, index) => (
                                    <tr key={index}>
                                        <td>{review.service}</td>
                                        <td>{review.review}</td>
                                        <td>{review.score}</td>
                                        <td>{review.username}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                
                <div className='bg-div-text-color-light p-4 border-t-2 border-b-2 border-r-2 border-div-text-color-light-900'>
                    <h3 className='mb-4 text-color-light'>Pagos</h3>
                </div>
                <div className='p-4 '>
                    <p className='mt-4 w-full ml-40'>Calificaciones de los últimos servicios</p>
                    <table className='mx-auto border-collapse mt-2 ml-40'>
                        <thead>
                            <tr>
                                <th className='py-2 px-14 border border-gray-300 bg-gray-100 '>Servicio</th>
                                <th className='py-2 px-40 border border-gray-300 bg-gray-100 '>Reseña</th>
                                <th className='py-2 px-14 border border-gray-300 bg-gray-100  '>Calificación</th>
                                <th className='py-2 px-14 border border-gray-300 bg-gray-100  '>Contratante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lastJobs?.map((review, index) => (
                                <tr key={index}>
                                    <td className='py-2 px-14 border border-gray-300 bg-gray-100  '>
                                        {review.service}
                                    </td>
                                    <td className='py-2 px-4 border border-gray-300 bg-gray-100 '>{review.review}</td>
                                    <td className='py-2 px-14 border border-gray-300 bg-gray-100'>{review.score}</td>
                                    <td className='py-2 px-14 border border-gray-300 bg-gray-100'>{review.username}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </div>
    )
}

export default HomeAuxie

