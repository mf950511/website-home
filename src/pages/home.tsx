import * as React from 'react'
const THREE = require('three')
const { useEffect, useRef, useState } = React
import { debounce } from 'lib/untils'
import cat from './cat.jpg'

const Home = () => {
  const containerRef = useRef(null)
  const [] = useState()
  useEffect(() => {
    init()
    animate()
    window.addEventListener('resize', initFunc, false)
    return ()=>{
      window.removeEventListener('resize', initFunc, false)
    }
  }, [])
  const initFunc = debounce(()=>{
    resetData()
    init()
    animate()
  }, 300)

  const resetData = () => {
    container.removeChild(renderer.domElement);
    window.cancelAnimationFrame(requestAnimationFrameId)
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseout', onMouseout, false);
    windowHalfX = aspect = mouseX = mouseY = fov = plane = far = randomX = randomY = 0
    renderer = scene = camera = container = starStuff = stars = timerId = null
    xFlag = yFlag = true
  }
  let scene: any, 
  camera: any, 
  renderer: any, 
  container: any, 
  aspect, 
  fov, 
  plane, 
  far, 
  mouseX: number, 
  mouseY: number, 
  windowHalfX: number, 
  windowHalfY: number, 
  geometry, 
  starStuff, 
  materialOptions, 
  stars,
  requestAnimationFrameId: any = null,
  randomX: number,
  randomY: number,
  xFlag: boolean,
  yFlag: boolean,
  timerId: any = null
  const init = () => {
    container = containerRef.current
    mouseX = 0;
    mouseY = 0;
    randomX = 0;
    randomY = 0;
    xFlag = true;
    yFlag = true;
    aspect = window.innerWidth / window.innerHeight;
    fov = 40;
    plane = 1;
    far = 800;
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera = new THREE.PerspectiveCamera(
      fov,
      aspect,
      plane,
      far
    );
    camera.position.z = far / 2;
    scene = new THREE.Scene({ antialias: true });
    scene.fog = new THREE.FogExp2(0x1b1b1b, 0.0001);
    starForge();
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);
    container.appendChild(renderer.domElement);
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseout', onMouseout, false)
    renderIn()
  }

  const renderIn = () => {
    timerId = setInterval(() => {
      randomX = xFlag ? (randomX + 10) : (randomX - 10)
      randomY = yFlag ? (randomY + 10) : (randomY - 10)
      if(randomX > windowHalfX * 2) {
        xFlag = false
      }
      if(randomX < 0) {
        xFlag = true
      }
      if(randomY > windowHalfY * 2) {
        yFlag = false
      }
      if(randomY < 0) {
        yFlag = true
      }
      mouseX = randomX - windowHalfX;
      mouseY = randomY - windowHalfY;
    }, 100)
  }

  const starForge = () => {
    const amount = 45000;
    geometry = new THREE.SphereGeometry(1000, 100, 50);
    materialOptions = {
      color: new THREE.Color(0xffffff),
      size: 1.1,
      transparency: true,
      opacity: 0.8
    };
    starStuff = new THREE.PointsMaterial(materialOptions);
    for (var i = 0; i < amount; i++) {
      var item = new THREE.Vector3();
      item.x = Math.random() * 2000 - 1000;
      item.y = Math.random() * 2000 - 1000;
      item.z = Math.random() * 2000 - 1000;
      geometry.vertices.push(item);
    }
    stars = new THREE.PointCloud(geometry, starStuff);
    scene.add(stars);
  }
  const animate = () => {
    requestAnimationFrameId = requestAnimationFrame(animate);
    render();
  }
  const render = () => {
    camera.position.x += (mouseX - camera.position.x) * 0.005;
    camera.position.y += (-mouseY - camera.position.y) * 0.005;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }
  const onMouseMove = (e: any) => {
    clearInterval(timerId)
    timerId = null
    mouseX = e.clientX - windowHalfX;
    mouseY = e.clientY - windowHalfY;
  }
  const onMouseout = (e: any) => {
    randomX = mouseX
    randomY = mouseY
    renderIn()
  }
  return (
    <div ref={ containerRef }>
      <div className="main-show">
        <div className="img-wrapper">
          <img src={ cat } className="img"/>
        </div>
        <div className="link-wrapper">
          <a className="link" href="/react-admin/index.html">管理后台</a>
          <a className="link" href="/blog">个人博客</a>
          <a className="link" href="https://github.com/mf950511">github</a>
          <a className="link" href="https://juejin.im/user/2137106337250013">掘金</a>
          <a className="link" href="https://blog.csdn.net/weixin_41900457">CSDN博客</a>
        </div>
      </div>
    </div>
  )
}


export default Home