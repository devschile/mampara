import { table, minifyItems } from './ConnectTable'

export default async (_req, res) => {
  try {
    const records = await table.select({
      sort: [
          {field: 'Fecha', direction: 'desc'}
      ]
    }).firstPage()
    const minfiedItems = minifyItems(records)
    res.status(200).json(minfiedItems)
  } catch (error) {
    console.error(err)
    res.status(500).json({ msg: 'Something went wrong 😕' })
  }
}
