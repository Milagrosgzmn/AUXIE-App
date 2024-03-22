import style from './auxieLogin.module.scss'
import axios from 'axios'
import NavLanding from '../../../components/nav-landing/NavLanding'
// Hooks
import { useEffect, useState } from 'react'
import { useValidations } from '../../../utils/validationutils'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loggedUser, updateProfile } from '../../../redux/actions/actions'
import { auth } from '../../../config/firebase-config'
import Swal from 'sweetalert2'
import Pruebas from '../../pruebas/PruebasAuxie'
const ClientLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { errors, validate } = useValidations()
    const [input, setInput] = useState({
        email: '',
        password: '',
    })
    const [access, setAccess] = useState(false) //eslint-disable-line
    const logged = useSelector(state => state.loggedUser)
    const handleChange = event => {
        setInput({
            ...input,
            [event.target.name]: event.target.value,
        })
        ///validations ///
        validate(
            {
                ...input,
                [event.target.name]: event.target.value,
            },
            event.target.name
        )
        ///validations ///
    }

    const handleLogin = async input => {
        try {
            const { data } = await axios.post('/providers/login', input)
            if (data) {
                dispatch(loggedUser(data))
                setAccess(true)
            }
        } catch (error) {
            console.error(error.message)

            Swal.fire(error.response.data.error)
        }
    }

    useEffect(() => {
        if (access === true) {
            navigate('/homeauxie')
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
                    welcome = 'Hola'
                    break
            }
            let timerInterval
            Swal.fire({
                title: `${welcome} ${logged.firstName}`,
                html: '<b></b>', // Set the HTML to be blank
                timer: 1000,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        const remainingTime = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                },
            }).then(result => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.error('I was closed by the timer')
                }
            })
            if (!logged?.userUid) {
                dispatch(updateProfile({ userUid: auth.currentUser.uid, id: logged.id }, 'providers'))
            }
        }
    }, [access])
    const [isActive,setActive] = useState(true);

    return (
        <>
        <NavLanding />
             <div className={style.login}>
             {isActive && 
             <div className='flex flex-col m-auto'>
                <button className={style.xButton} onClick={() => {setActive(false)
                    navigate('/')}
                }>
                                X
                </button>
                <Pruebas />
            </div>}
             </div>
             
         </>
    )
}

export default ClientLogin
