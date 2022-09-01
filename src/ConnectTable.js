import Airtable from 'airtable'

// Authenticate
Airtable.configure({
  apiKey: import.meta.env.VITE_AIRTABLE_KEY
})

// Initialize a base
const base = Airtable.base(import.meta.env.VITE_AIRTABLE_TABLE)

// Reference a table
const table = base(import.meta.env.VITE_AIRTABLE_NAME)

// To get minified records array
const minifyItems = (records) =>
  records.map((record) => getMinifiedItem(record))

// to make record meaningful.
const getMinifiedItem = (record) => {
  if (!record.fields.brought) {
    record.fields.brought = false
  }
  return {
    id: record.id,
    fields: record.fields
  }
}

export { table, minifyItems, getMinifiedItem }
