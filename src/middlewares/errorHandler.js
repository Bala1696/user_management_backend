function notFound(req, res) {
  res.status(404).json({ message: 'Not found' })
}

function errorHandler(err, req, res, next) {
  const message =
    err?.original?.sqlMessage ||
    err?.message ||
    'Internal server error'

  const status = Number(err?.statusCode || err?.status) || 500

  if (process.env.NODE_ENV !== 'production') {
    console.error(err)
  }

  res.status(status).json({ message })
}

module.exports = { notFound, errorHandler }

