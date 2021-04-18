import { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  AppBar,
  Toolbar
} from '@material-ui/core'
import Link from 'next/link'

const Index = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const f = await fetch("/api/getapps")
    const res = await f.json()
    if(res.type === "ok"){
      setData(res.data)
    }
  }
  
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">TS Test</Typography>
        </Toolbar>
      </AppBar>
      <Grid item xs={12} style={{ marginTop: 100 }}>
        <Grid container justify="center" spacing={3}>
          {
            data && (
              data.map((item) =>
                <Link key={item.id} href="/tasks/[id]" as={`/tasks/${item.id}`}>
                  <Grid item>
                    <Paper style={{ padding: 10 }}>
                      <img style={{ width: 100, height: 100 }} src={item.fields.icon[0].url} />
                      <Typography variant="body1">
                        {item.fields.name}
                      </Typography>
                    </Paper>
                  </Grid>
                </Link>
              )
            )
          }
        </Grid>
      </Grid>
    </>
  )
}

export default Index