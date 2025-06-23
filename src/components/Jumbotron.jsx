import React from 'react'
import holdingiphone from '../assets/images/iphone-hand.png'
import Iphone from '../assets/images/iphone-14.jpg'

const Jumbotron = () => {
    const handleLearnMore=()=>{
       const element= document.querySelector(".sound-section");
       window.scrollTo({
        top: element?.getBoundingClientRect().top,
        left: 0,
        behavior:'smooth'
       })

    }
  return (
    <div className='jumbotron-section wrapper'>
        <h2 className='title'>
            NEW
        </h2>
        <img src={Iphone}/>
        <p className='text'>
            BIG and BIGGER
        </p>
        <span className='description'>
                From $41.62/mo. for 24 mo. or $999 before trade-in
        </span>

        <ul className='links'>
            <li>
                <button className='button'>Buy</button>
            </li>


            <li>
                <a className='link' onClick={handleLearnMore}>
                    learn more 

                </a>

            </li>
        </ul>

        <img src={holdingiphone} className='iphone-img'/>


        <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.96/build/spline-viewer.js"></script>
<spline-viewer url="https://prod.spline.design/jA9uuYK6wGswP79k/scene.splinecode"></spline-viewer>
    </div>
  )
}

export default Jumbotron