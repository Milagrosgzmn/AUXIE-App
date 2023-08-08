import { Link } from 'react-router-dom'
import style from './navGeneral.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LogoAuxie from '../../assets/Logos/logoAuxie.svg'

import { logOut, resetToken } from '../../redux/Actions/actions'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase-config'
import axios from 'axios'
import { Popper, Box } from '@mui/material'
import { useState } from 'react'
import ClickAwayListener from '@mui/base/ClickAwayListener'

const NavGeneral = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.loggedUser)
    const [profileMenu, setProfileMenu] = useState(null)

    const isAuxie = Object.keys(user).includes('services') ? true : false
    
    const token = useSelector((state) => {
        return state.token
    })

    const handleClick = (event) => {
        setProfileMenu(profileMenu ? null : event.currentTarget)
    }

    const handleRedirect = (e) => {
        if (e.target.innerText === 'Perfil' && isAuxie) return navigate('/homeauxie')
        if (e.target.innerText === 'Perfil' && !isAuxie) return navigate('/homeconsumer')
        if (e.target.innerText === 'Ayuda') return navigate('/help')
    }

    const handleLogOut = async () => {
        try {
            console.log(user.googleId)
            if (user.googleId) {
                const response = await axios.post(
                    'http://localhost:3001/consumers/logout',
                    { googleId: `${user.googleId}` },
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    }
                )
                if (response) {
                    dispatch(logOut({}))
                    dispatch(resetToken())
                    return navigate('/')
                }
            }
            dispatch(logOut({}))
            await signOut(auth)
            dispatch(resetToken())
            navigate('/')
        } catch (error) {
            console.error('error: ' + error.message)
            alert(error.message)
        }
    }
    const handleClickAway = () => {
        setProfileMenu(null)
    }

    const open = Boolean(profileMenu)
    const id = open ? 'profileMenu' : undefined

    return (
        <nav className={style.navGeneral}>
            <div className={style.containerLeft}>
                {isAuxie ? (
                    <div className={style.viewsGeneral}>
                        <Link to={'/homeauxie'}>
                            <img
                                src={LogoAuxie}
                                alt="Logo Auxie"
                                className={style.logo}
                            />
                        </Link>
                    </div>
                ) : (
                    <div className={style.viewsGeneral}>
                        <Link to={'/homeconsumer'}>
                            <img
                                src={LogoAuxie}
                                alt="Logo Auxie"
                                className={style.logo}
                            />
                        </Link>
                    </div>
                )}
            </div>
            <div className={style.profile}>
                {/* Botón para desplegar menu con opciones del perfil*/}
                <button onClick={handleClick} aria-describedby={id}>
                    <img
                        className={style.img}
                        src={user.image}
                        alt="imagen de perfil"
                        height="80rem"
                        width="80rem"
                    />
                </button>
                <Popper
                    id={id}
                    open={open}
                    anchorEl={profileMenu}
                    placement="bottom"
                    disablePortal={false}
                    modifiers={[
                        {
                            name: 'flip',
                            enabled: false,
                            options: {
                                altBoundary: false,
                                rootBoundary: 'document',
                                padding: 8,
                            },
                        },
                        {
                            name: 'preventOverflow',
                            enabled: true,
                            options: {
                                altAxis: true,
                                altBoundary: true,
                                tether: false,
                                rootBoundary: 'document',
                                padding: 8,
                            },
                        },
                        {
                            name: 'arrow',
                            enabled: true,
                            options: {
                                element: 'profileMenu',
                            },
                        },
                    ]}
                >
                    {isAuxie ? (
                        <>
                            {/*Botones para el perfil auxie*/}
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <Box className={style.profileMenu}>
                                <p onClick={handleRedirect} className={style.profileButtonTop}>
                                            Perfil
                                        </p>
                                        <p onClick={handleRedirect} className={style.profileButtonMiddle}>
                                            Ayuda
                                        </p>
                                    <p onClick={handleLogOut} className={style.profileButtonBottom}>
                                        Cerrar sesión
                                    </p>
                                </Box>
                            </ClickAwayListener>
                        </>
                    ) : (
                        <>
                            {/*Botones para el perfil consumer*/}
                            <ClickAwayListener onClickAway={handleClickAway}>
                                <Box className={style.profileMenu}>
                                        <p onClick={handleRedirect} className={style.profileButtonTop}>
                                            Perfil
                                        </p>
                                        <p onClick={handleRedirect} className={style.profileButtonMiddle}>
                                            Ayuda
                                        </p>
                                    <p onClick={handleLogOut} className={style.profileButtonBottom}>
                                        Cerrar sesión
                                    </p>
                                </Box>
                            </ClickAwayListener>
                        </>
                    )}
                </Popper>
            </div>
        </nav>
    )
}

export default NavGeneral
