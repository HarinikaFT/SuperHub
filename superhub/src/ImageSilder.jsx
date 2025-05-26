import React,{useState,useEffect} from 'react';
import img1 from './assets/bike1.jpg';
import img2 from './assets/bs1.jpg';
import img3 from './assets/car1.jpg';    
import img4 from './assets/cycle1.jpg';
import img5 from './assets/sofa1.jpg';
import img6 from './assets/wm1.jpg';
import img7 from './assets/bike2.jpg';
import img8 from './assets/bs2.jpg';
import img9 from './assets/car2.jpg';    
import img10 from './assets/cycle2.jpg';
import img11 from './assets/sofa2.jpg';
import img12 from './assets/wm2.jpg';
import img13 from './assets/bike3.jpg';
import img14 from './assets/bs3.jpg';
import img15 from './assets/car3.jpg';    
import img16 from './assets/sofa3.jpg';
import img17 from './assets/cycle3.jpg';
import img18 from './assets/bike4.jpg';
import img19 from './assets/car4.jpg';    
import img20  from './assets/sofa4.jpg';


const images=[img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14,img15,img16,img17,img18,img19,img20]

const AutoImageSilder = () =>{
    const[current,setCurrent] = useState(0);
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrent(prev =>(prev === images.length-1? 0 : prev+1 ))
        },2500);

        return () => clearInterval(interval);  
    },[]);
    return(
      
        
        <div className='relative  w-96  h-80  ml-3  overflow-hidden rounded-lg shadow-lg flex  justify-center'>
            <img  src={images[current]}
                alt={`slide-${current}`}
                className=' p-4 bg-radial from grey transition-opacity duration-700'
                key = {current} />

        </div>
        
    );
};
export default AutoImageSilder;
