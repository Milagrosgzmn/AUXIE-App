
//* Components
import Card from '../card/Card'
import usePagination from '../pagination/usePagination'
import Pagination from '../pagination/Pagination'

import { useSelector } from 'react-redux'

const Cards = () => {
    const users = useSelector((state) => state.shownAuxies)
    const { currentPageData } = usePagination(12, users)

    return (
            <section className='flex flex-col justify-center items-center ml-4'>
                <div className='mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-4'>
                    {currentPageData &&
                        currentPageData.map((user) => (
                            <Card
                                key={user.id}
                                id={user.id}
                                googleId={user.googleId}
                                userUid={user.userUid}
                                firstName={user.firstName}
                                lastName={user.lastName}
                                services={user.services}
                                averageRating={user.averageRating}
                                completedWorks={user.completedWorks}
                                image={user.image.secure_url}
                            />
                        ))}
                </div>
                <div className='mt-8'>
                    <Pagination num={12} data={users} />
                </div>
            </section>
    )
}

export default Cards
