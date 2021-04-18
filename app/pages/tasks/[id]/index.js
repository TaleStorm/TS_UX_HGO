import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import {
  FormControlLabel,
  Checkbox,
  AppBar,
  Typography,
  Toolbar,
  Grid,
  FormControl
} from '@material-ui/core'
import Link from 'next/link';

const Tasks = () => {
  const [app, setApp] = useState(null)
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    init()
  }, [])
  
  const init = async () => {
    const f = await fetch(`/api/appbyid?id=${id}`)
    const res = await f.json()
    if(res.type === "ok"){
      if(res.data[0]){
        setApp(res.data[0])
      }else{
        router.push("/")
      }
    }
  }

  if(!app) return <div />

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">{app.fields.name}</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} style={{ marginTop: 100 }}>
        <Grid item xs={12}>
          <center>
            <img style={{ width: 100, height: 100 }} src={app.fields.icon[0].url} />
          </center>
          <FormControl>
            {
              app.fields.tasks.split(";").map((item) =>
                <Link href="/app/[id]" as={`/app/${id}`} key={item}>
                  <FormControlLabel
                    style={{ marginTop: 15 }}
                    control={<Checkbox checked={false}  name="gilad" />}
                    label={item}
                  />
                </Link>
              )
            }
          </FormControl>
        </Grid>
      </Grid>
    </div>
  )
}

export default Tasks