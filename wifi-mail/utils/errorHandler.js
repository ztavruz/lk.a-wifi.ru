module.exports = (res, error) => {
    res.send(500).json(
        {
            success: false,
            message: error.message ? error.message : error
        }
    )
}