import Airtable from 'airtable'

const index = () => {
  const base = new Airtable({ apiKey: "keysNYpkCxyeYOQyj" }).base("appq9rYBLO8QKEHKG");
  console.log(base)
  return base
}

export default index