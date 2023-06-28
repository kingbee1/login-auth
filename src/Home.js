import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Welcome Over Over.</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio totam, nulla incidunt architecto at dolorem alias 
        libero quis quasi eaque perspiciatis minima 
        dolor harum quia repudiandae corrupti esse tempore et soluta nemo ea nisi vero. Facere minima inventore in nobis.
      </p>
      <Link className="btn btn-primary ms-3" to={'/login'}>Access Form Page</Link>
    </div>
    
  )
}

export default Home
