import React from 'react'
import {Link} from 'react-router-dom';
function MainPage() {
    return (
        <div>
            <div className="site-wrap">
            <div className="site-blocks-cover" id="home-section">
            <div className="img-wrap">
                <div className="owl-carousel slide-one-item hero-slider">
                <div className="slide">
                    <img src="assets/images/hostel1.jpg" alt=""/>  
                </div>
                
                </div>
            </div>
            <div className="container">
                <div className="row">
                <div className="col-md-6 ml-auto align-self-center">
                    <div className="intro">
                    <div className="heading">
                        <h1>Hostelezz</h1>
                    </div>
                    <div className="texto">
                        <p className="sub-texto mb-5"> .Hostel World – Meet the world.</p>
                        <div className="row">
                            <div className="col mb-2">
                            <Link to="/LoginStudent" className="btn btn-outline-secondary btn-md " id="Student-login" >Student</Link>
                            </div>
                            <div className="col mb-2">
                            <Link to="/LoginOwner" className="btn btn-outline-secondary btn-md " id="Owner-login">Owner</Link>
                            </div>
                        </div>
                        
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div> 
                    </div>
                </div>

    )
}

export default MainPage;
