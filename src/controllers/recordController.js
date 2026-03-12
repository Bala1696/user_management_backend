const { Record } = require('../db/sequelize')

function asNonEmptyString(value) {
  const s = String(value ?? '').trim()
  return s.length ? s : null
}

function asNumber(value) {
  if (value === null || value === undefined || value === '') return null
  const n = typeof value === 'number' ? value : Number(String(value).trim())
  if (!Number.isFinite(n)) return null
  return n
}

function badRequest(res, message) {
  return res.status(400).json({ message })
}

async function list(req, res, next) {
  try {
    const rows = await Record.findAll({ order: [['id', 'ASC']] })
    res.json(rows)
  } catch (e) {
    next(e)
  }
}

async function getById(req, res, next) {
  try {
    const row = await Record.findByPk(req.params.id)
    if (!row) return res.status(404).json({ message: 'Record not found' })
    res.json(row)
  } catch (e) {
    next(e)
  }
}

async function create(req, res, next) {
  try {
    const husbandName = asNonEmptyString(req.body?.husbandName)
    const wifeName = asNonEmptyString(req.body?.wifeName)
    const amount = asNumber(req.body?.amount)
    const totalAmount = asNumber(req.body?.totalAmount)
    const title = asNonEmptyString(req.body?.title)
    const dynamicData = req.body?.dynamicData || {}

    if (!husbandName || !wifeName) {
      return badRequest(res, 'Husband Name and Wife Name are required.')
    }
    if (amount === null || totalAmount === null) {
      return badRequest(res, 'Amount and Total Amount must be valid numbers.')
    }

    const created = await Record.create({
      title,
      husbandName,
      wifeName,
      amount,
      totalAmount,
      dynamicData,
    })

    res.status(201).json(created)
  } catch (e) {
    next(e)
  }
}

async function update(req, res, next) {
  try {
    const row = await Record.findByPk(req.params.id)
    if (!row) return res.status(404).json({ message: 'Record not found' })

    const husbandName = asNonEmptyString(req.body?.husbandName)
    const wifeName = asNonEmptyString(req.body?.wifeName)
    const amount = asNumber(req.body?.amount)
    const totalAmount = asNumber(req.body?.totalAmount)
    const title = asNonEmptyString(req.body?.title)
    const dynamicData = req.body?.dynamicData || {}

    if (!husbandName || !wifeName) {
      return badRequest(res, 'Husband Name and Wife Name are required.')
    }
    if (amount === null || totalAmount === null) {
      return badRequest(res, 'Amount and Total Amount must be valid numbers.')
    }

    await row.update({
      title,
      husbandName,
      wifeName,
      amount,
      totalAmount,
      dynamicData,
    })

    res.json(row)
  } catch (e) {
    next(e)
  }
}

async function remove(req, res, next) {
  try {
    const row = await Record.findByPk(req.params.id)
    if (!row) return res.status(404).json({ message: 'Record not found' })

    await row.destroy()
    res.json({ ok: true })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
}

