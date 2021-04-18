import base from '../../lib/index'

export default async function auth(req, res) {
  try {
    console.log(req.query.id)
    if(req.query.id){
      const airt = base()
      const data = await airt('apps').select({
        view: 'Grid view'
      }).all()
      console.log(req.query.id)
      res.json({ type: "ok", data: data.filter((a) => a.id === req.query.id) })
    }else{
      res.json({ type: 'bad' })
    }
  } catch (error) {
    console.log(error)
    res.json({ type: 'bad' })
  }
}
