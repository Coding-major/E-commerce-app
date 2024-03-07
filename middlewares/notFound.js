const notFound = (req, res) => {
    res.status(400).json({msg: "routes does not exist"})
}

module.exports = notFound