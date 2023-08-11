const postClaim = require('../../Controllers/ClaimsControllers/postClaim')
const { uploadClaimImage } = require('./../../Utils/cloudinary')
const fs = require('fs-extra')

const handlerPostClaim = async (req, res) => {
    try {
        const { consumerUsername, message, providerUsername, reason } = req.body

        if (!consumerUsername || !message || !providerUsername || !reason) {
            throw new Error('Faltan datos')
        } else {
            let image
            if (req.files?.image) {
                const result = await uploadClaimImage(
                    req.files.image.tempFilePath
                )
                image = {
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                }

                await fs.unlink(req.files.image.tempFilePath)
            }

            const newClaim = await postClaim(
                consumerUsername,
                message,
                providerUsername,
                reason,
                image
            )
            res.status(200).json(newClaim)
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = handlerPostClaim
