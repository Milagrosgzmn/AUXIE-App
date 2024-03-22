import style from './landing.module.scss'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Animated } from 'react-animated-css'
import CardsServices from '../../components/cards-services/CardsServices'
import NavLanding from '../../components/nav-landing/NavLanding'
import ButtonUp from '../../components/buttons/buttonUp/ButtonUp'
import FeaturedAuxies from '../../components/featuredAuxies/FeaturedAuxies'
import Footer from '../../components/footer/Footer'

const Landing = () => {
    const {
        landing,
        hiden,
        menuLogo,
        menuLogoLight,
        menuLogoNight,
        slogan,
        divSlogan,
        divSloganNight,
        divSloganLight,
        menuSearchAuxieNight,
        buttonSloganCont,
        buttonSloganContLight,
        buttonSloganContNight,
        menuSearchAuxie,
        buttonMenu,
        serviceCards,
    } = style
    const { ref: myRef, inView: firstObserver } = useInView()

    const { ref: myRef2, inView: secondObserver } = useInView()

    const { ref: myRef3, inView: thirdObserver } = useInView()

    const [animationObserver, setAnimationObserver] = useState({
        cardsAnimated: false,
        secondCardsAnimated: false,
        footerAnimated: false,
    })
    const nightMode = useSelector(state => state.nightMode)
    const user = useSelector(state => state.loggedUser)
    const menuLanding = useSelector(state => state.menuLanding)
    const [menuChange, setMenuChange] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        if (Object.keys(user).includes('requiredServices')) {
            return navigate('/homeconsumer')
        }
        if (Object.keys(user).includes('services')) {
            return navigate('homeauxie')
        }
    }, [])

    useEffect(() => {
        if (firstObserver) {
            setAnimationObserver(prevAnimationObserver => ({
                ...prevAnimationObserver,
                cardsAnimated: true,
            }))
        }
        if (secondObserver) {
            setAnimationObserver(prevAnimationObserver => ({
                ...prevAnimationObserver,
                secondCardsAnimated: true,
            }))
        }

        if (thirdObserver) {
            setAnimationObserver(prevAnimationObserver => ({
                ...prevAnimationObserver,
                footerAnimated: true,
            }))
        }
    }, [firstObserver, secondObserver, thirdObserver])

    const handlerMenuSearchAuxie = () => {
        setMenuChange(true)
    }
    const handlerMenuBeAuxie = () => {
        setMenuChange(false)
    }

    const handleClick = event => {
        switch (event.target.value) {
            case 'toAuxieForm':
                navigate('/auxielogin')
                break
            case 'toClientForm':
                navigate('/clientlogin')
                break
            case 'toHelp':
                navigate('/help')
                break
            default:
                navigate('/clientlogin')
                break
        }
    }

    const { cardsAnimated, secondCardsAnimated, footerAnimated } = animationObserver

    return (
        <>
            <NavLanding />

            <ButtonUp
                observersLanding={{
                    firstObserver,
                    secondObserver,
                    thirdObserver,
                }}
            />

            <main className={!menuLanding ? landing : hiden}>
                <div className='w-full'>
                <Animated animationIn='fadeIn' animationOut='fadeOut' animationInDuration={1000} isVisible={true}>
                    <section className={style.sectionMenu}>
                        <div className={!nightMode ? `${menuLogo} ${menuLogoLight}` : `${menuLogo} ${menuLogoNight}`}>
                            <div
                                className={
                                    !nightMode
                                        ? `${style.menuMainLight} ${style.menuMain}`
                                        : `${style.menuMainNight} ${style.menuMain}`
                                }
                            >
                                <div className={style.buttonsMenuMain}>
                                    <button onClick={handlerMenuSearchAuxie} className='w-1/2 rounded-t-xl py-2'>
                                        Busco un Auxie
                                    </button>
                                    <button onClick={handlerMenuBeAuxie} className='w-1/2 rounded-t-xl py-2'>
                                        Convertirme en Auxie
                                    </button>
                                </div>
                                {menuChange === true ? (
                                    <div
                                        className={
                                            !nightMode ? menuSearchAuxie : `${menuSearchAuxie} ${menuSearchAuxieNight}`
                                        }
                                    >
                                        <h4 className='px-2 text-center'>Contrata a un Auxie que te ayude</h4 >
                                        
                                        <button onClick={handleClick} value={'toClientlogin'} className=''>
                                            Necesito un Auxie
                                        </button>
                                    </div>
                                ) : (
                                    <div className={style.menuTurnAuxie}>
                                        <h4 className='px-2 text-center'>Conviértete en Auxie y genera ganancias</h4>
                                        
                                        <button onClick={handleClick} value={'toAuxieForm'} className={buttonMenu}>
                                            Convertirme en Auxie
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </Animated>
                </div>

                {/* Section Slogan */}
                <Animated animationIn='slideInUp' animationOut='fadeOut' animationInDuration={1000} isVisible={true}>
                    <section className={slogan}>
                        <div
                            className={!nightMode ? `${divSlogan} ${divSloganLight}` : `${divSlogan} ${divSloganNight}`}
                        >
                            <h3>TU VIDA COTIDIANA AHORA ES MÁS FÁCIL</h3>
                            <p>
                                <span>Esta aplicación está diseñada para tu comodidad, con</span>
                                <span>unos pocos clics podrás solucionar tus problemas.</span>
                            </p>
                        </div>
                        <div
                            className={
                                !nightMode
                                    ? `${buttonSloganCont} ${buttonSloganContLight}  `
                                    : `${buttonSloganCont} ${buttonSloganContNight}  `
                            }
                        >
                            <button className='' onClick={handleClick} value={'toClientForm'}>
                                Contratar
                            </button>
                        </div>
                    </section>
                </Animated>

                {/* Section Cards */}
                {cardsAnimated ? (
                    <div>
                        <Animated
                            animationIn='slideInUp'
                            animationOut='fadeOut'
                            animationInDuration={1000}
                            isVisible={true}
                        >
                            <section ref={myRef} className={serviceCards}>
                                <div className={style.serviceCardsTitle}>
                                    <h3>Nuestros servicios más populares</h3>
                                </div>

                                <CardsServices />
                            </section>
                        </Animated>
                    </div>
                ) : (
                    <section ref={myRef} className={serviceCards}>
                        <div className={style.serviceCardsTitle}></div>
                        <h3>Nuestros servicios más populares</h3>
                        <CardsServices />
                    </section>
                )}

                {secondCardsAnimated ? (
                    <Animated animationIn='slideInUp' animationOut='fadeOut' animationInDuration={1000}>
                        {/* Section Slogan */}
                        <section ref={myRef2} className={slogan}>
                            <div
                                className={
                                    !nightMode ? `${divSlogan} ${divSloganLight}` : `${divSlogan} ${divSloganNight}`
                                }
                            >
                                <h3>Trabaja con nosotros y genera ganancias</h3>
                                <p>
                                    <span>Somos la mejor herramienta para potenciar tu independencia laboral</span>
                                </p>
                            </div>
                            <div
                                className={
                                    !nightMode
                                        ? `${buttonSloganCont} ${buttonSloganContLight}  `
                                        : `${buttonSloganCont} ${buttonSloganContNight}  `
                                }
                            >
                                <button className={style.buttonSlogan} onClick={handleClick} value={'toHelp'}>
                                    Más información
                                </button>
                            </div>
                        </section>

                        {/* Section Auxies */}
                        <section className={style.auxies}>
                            <h3>Auxies destacados</h3>
                            <div className={style.featuredAuxiesCont}>
                                <FeaturedAuxies />
                            </div>
                        </section>
                    </Animated>
                ) : (
                    <>
                        <section className={style.sloganNone} ref={myRef2}></section>
                        <section className={style.auxies} ref={myRef2}></section>
                    </>
                )}
                {/* Footer */}
                {footerAnimated ? <Footer myRef3={myRef3} /> : <Footer myRef3={myRef3} />}
            </main>
        </>
    )
}

export default Landing
