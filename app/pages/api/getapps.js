import base from '../../lib/index'

export default async function auth(req, res) {
  try {
    const airt = base()
    const data = await airt('apps').select({
      view: 'Grid view'
    }).all()
    res.json({ type: "ok", data })
  } catch (error) {
    console.log(error)
    res.json({ type: 'bad' })
  }
}
