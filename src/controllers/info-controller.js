const info = (req, res)=>{
    return res.json({
        success: true,
        message: 'API is live',
        error: {},
        data: {}
    })
}

module.exports = {
    info
}