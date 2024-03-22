import CircleIconAuxie from '../../assets/logos/CircleIconAuxie.png'
import { Link } from 'react-router-dom'
import { Typography } from '@material-tailwind/react'
import { Place } from '@mui/icons-material'
import { useSelector } from 'react-redux'
const Footer = ({ myRef3 }) => {
    const nightMode = useSelector(state => state.nightMode)
    return (
        <footer ref={myRef3} className={nightMode ? 'w-full bg-rgb(10,11,37) py-4 px-8' : 'w-full py-4 px-8'}>
            <hr className='my-8 border-blue-gray-500' />
            <div
                className={
                    nightMode
                        ? 'flex items-center justify-between px-16 bg-rgb(10,11,37) text-center '
                        : 'flex items-center justify-between px-16 text-center '
                }
            >
                <img src={CircleIconAuxie} alt='logo-ct' className='w-24' />
                <ul className='flex flex-col sm:flex-row justify-between'>
                    <Link to={'/aboutUs'}>
                        <li className='px-2 text-left sm:text-center'>
                            <Typography
                                color='blue-gray'
                                className='font-normal
                                text-sm
                                transition-colors hover:text-blue-500 focus:text-blue-500'
                            >
                                Sobre nosotros
                            </Typography>
                        </li>
                    </Link>
                    <Link to={'/guarantee'}>
                        <li className='px-2 text-left sm:text-center'>
                            <Typography
                                color='blue-gray'
                                className='font-normal 
                                text-sm
                                transition-colors hover:text-blue-500 focus:text-blue-500'
                            >
                                Garantías
                            </Typography>
                        </li>
                    </Link>
                    <Link to='/help'>
                        <li className='px-2 text-left sm:text-center'>
                            <Typography
                                color='blue-gray'
                                className='font-normal 
                                text-sm
                                transition-colors hover:text-blue-500 focus:text-blue-500'
                            >
                                Como funciona
                            </Typography>
                        </li>
                    </Link>
                    <Link to='/support'>
                        <li className='px-2 text-left sm:text-center'>
                            <Typography
                                color='blue-gray'
                                className='font-normal
                                text-sm
                                transition-colors hover:text-blue-500 focus:text-blue-500'
                            >
                                Contacto
                            </Typography>
                        </li>
                    </Link>
                </ul>
            </div>
            <div className='flex justify-evenly justify-center text-center font-normal'>
                    <div className='flex'>
                        <Place />
                        <label>Argentina</label>
                    </div>
                    <div  className='flex'>
                        <Place />
                        <label>México</label>
                    </div>

                    
                </div>
            <div className='flex items-center justify-center'>
                <Typography color='blue-gray' className='text-center font-normal '>
                    &copy; 2023 Auxie
                </Typography>
            </div>
        </footer>
    )
}

export default Footer
