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
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [loading, setLoading] = useState(true)
  const [time, setTime] = useState("00")

  let secs = 0

  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
    setLoading(false)
    window.addEventListener("click", () => console.log('window'))
    $('#frame').contents().find('html').on('mousemove', function (e) { 
      console.log("triggered")
        var x = e.clientX; 
        var y = e.clientY;
        $('#coord').html("x: " + x + " y: " + y);
    })    
    setTimeout(() => {
      // var iframe = document.getElementById('frame').contentWindow.document
      // console.log(iframe)

      // var iframe = document.getElementsByTagName('iframe')[0],
      // iDoc = iframe.contentWindow     // sometimes glamorous naming of variable
      //     || iframe.contentDocument;  // makes your code working :)
      // if (iDoc.document) {
      //     iDoc = iDoc.document;
      //     iDoc.body.addEventListener('afterLayout', function(){
      //                         console.log('works');
      //                 });
      // };
  

      var script = `window.addEventListener("click", () => console.log('window'))`;
      $('#frame').contents().find('body').append($('<script>').html(script))


      // var scriptTag = `<script>alert(1);document.getElementsByTagName("canvas")[0].addEventListener("click", () => console.log('window frame yea'))<`+"/script>";
      // $("#frame").contents().find("body").append(scriptTag);
      // const page = $("#frame").contents()
      // console.log('2281337: ', page)
      // console.log(1336,
      //   $("#frame").contents().find("[className=footer--statusText--2NxyT]").html()
      // )
    }, 1000);



    
    // const frame = document.getElementById('frame')

    // frame.onload = ()=>{
    //   html2canvas(frame.contentDocument.documentElement).then((canvas)=>{
    //     document.body.appendChild(canvas);
    //   });
    //   };
    // frame.src = 'data:text/html,' + encodeURIComponent('<html><body><div style="color:red">Hello world</div></body></html>');
  

  }, [])

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
        
        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FQhGyMuFcumunEVRjbzW3YO%2FMY-Fitness-APP%3Fnode-id%3D2%253A13%26scaling%3Dmin-zoom"
      />
      {/* <div
        style={{
          width: '100%',
          height: '100%',
          opacity: 0,
          position: 'absolute',
          background: 'black',
          top: 0
        }}
      /> */}
    </div>
  )
}

export default App