import data from '../../lib/data/rechartData'

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
const TransactionChart = () => {
    return (
        <div className='h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1'>
            <strong className='text-gray-700 font-medium'>Transacciones</strong>
            <div className='w-full mt-3 flex-1 text-xs'>
                <ResponsiveContainer width='100%' height='100%' aspect={6}>
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray='4 1 2' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='income' fill='#0ea5e9' />
                        <Bar dataKey='expense' fill='#ea580c' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default TransactionChart