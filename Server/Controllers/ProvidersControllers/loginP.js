const Provider = require('../../Models/provider')
const bcrypt = require('bcrypt')

const loginP = async (email, password)=>{

    try {
        const provider = await Provider.findOne({email})
        if (provider) {
            const passwordMatch = await bcrypt.compare(password, provider.password)
            return passwordMatch ? provider : new Error ('wrongPassword')
        } else {
            throw new Error('inexistente')
        }
    } catch (error) {
        return error.message
    }


}

module.exports = loginP