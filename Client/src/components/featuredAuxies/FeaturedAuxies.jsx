// import { shuffle } from '../../utils/shuffle'
import { useSelector } from 'react-redux'
import FeaturedCard from './featuredCard/FeaturedCard'

const FeaturedAuxies = () => {
    const auxies = useSelector((state) => state.backupAuxies)

    const auxiesToShuffle = auxies
        ? auxies.filter((aux) => aux.averageRating > 2.5)
        : null
    // const shuffledAuxies = shuffle(auxiesToShuffle)
    const topAuxies = auxiesToShuffle.splice(0, 3)
    return (
        <div className='flex justify-center items-center'>
            <div className='mb-8 my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-4'>
            {topAuxies &&
                topAuxies.map((aux) => (
                    <FeaturedCard
                        key={aux.id}
                        id={aux.id}
                        firstName={aux.firstName}
                        lastName={aux.lastName}
                        services={aux.services}
                        averageRating={aux.averageRating}
                        image={aux.image.secure_url}
                        bio={aux.bio}
                    />
                ))}
        </div>
        </div>
    )
}

export default FeaturedAuxies
