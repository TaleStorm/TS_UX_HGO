import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container
} from '@material-ui/core'
import { useRouter } from 'next/router'
import $ from 'jquery'

const App = () => {
  const router = useRouter()
  const { id } = router.query
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [loading, setLoading] = useState(true)
  const [time, setTime] = useState("00")
  const [app, setApp] = useState(null)

  let secs = 0

  useEffect(() => {
    init()
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
    setLoading(false)

  }, [])

  const init = async () => {
    console.log(id)
    const f = await fetch(`/api/appbyid?id=${id}`)
    const res = await f.json()
    if(res.type === "ok"){
      console.log(id, res)
      if(res.data[0]){
        setApp(res.data[0].fields.figma)
      }else{
        router.push("/")
      }
    }
  }

  const startTimer = () => {
    secs += 1
    // console.log(secs)
    setTime(
      secs < 9 ? "0"+secs : secs
    )
  }

  const stop = () => {
    router.back()
  }

  if(loading) return <div />

  return (
    <div style={{ padding: 0 }} onClick={() => console.log(228)}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            00:{time}
          </Typography>
          <Button onClick={stop} color="secondary">Закончить</Button>
        </Toolbar>
      </AppBar>
      {
        app && (
          <iframe
            id="frame"
            onLoad={() => {
              setInterval(startTimer, 1000);
            }}
            onScroll={() => console.log('scroll')}
            onMouseMove={(e) => {
              console.log("triggered")
              var x = e.clientX; 
              var y = e.clientY;
              console.log(x, y)
            }}
            onMouseOver={() => console.log(90)}
            onMouseDown={() => console.log(100)}
            onClick={() => console.log(110)}
            style={{ marginTop: 60 }}
            width="100%"
            height={height}
            frameBorder="0"
            
            src={app}
          />
        )
      }
    </div>
  )
}

export default App