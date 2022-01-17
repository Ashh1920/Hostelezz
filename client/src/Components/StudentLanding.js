import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import firebase from '../Config/Config';
import '../App.css';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.ref=firebase.firestore().collection("Products");
        this.unsubscribe=null;
        this.state={
            products : [],
            search: ""
        };
    }
    componentDidMount(){
        this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);
    }
    logout(){
      firebase.auth().signOut();
  }

    onCollectionUpdate=(querySnapshot)=>{
        const products=[];
        querySnapshot.forEach((doc)=>{
            const { address,city,name,contact,email,price,url,facilities}=doc.data();
            products.push({
                key:doc.id,
                doc,
                address,
                city,
                name,
                contact,
                email,
                price,
                url,facilities
            });
        });
        this.setState({products});
    }
   handleInput=(e)=>{
     console.log(e.target.value)
     this.setState({search:e.target.value})

   }
   
    render() { 
     let filterHostel=this.state.products.filter((product)=>{
       return product.city.toLowerCase().includes(this.state.search.toLowerCase())
     })
        return ( 
            <div>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_navigation" aria-controls="main_navigation" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="main_navigation">
                    <a className="navbar-brand" href="/landing"><span className="logo_main">Logo</span><span className="logo_main">Here</span></a>
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <a className="nav-link" href="/StudentLanding" id="Home">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/update-profile-student" id="UpdatePro">Update Profile</a>
                  </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/ContactStudent">Contact</a>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link logout_btn btn-sm btn btn-danger py-1" onClick={this.logout} href="/" id="LogoutBtn" id="logout">Log Out</a>
                    </li>
                    </ul>
                </div>
            </nav>
        <div className="main_header_section">
          <div className="container-fluid p-0 main_carousel_container">
            <div id="carouselExampleSlidesOnly" class="carousel slide carousel-fade" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="https://d19m59y37dris4.cloudfront.net/directory/1-6/img/photo/photo-1501621965065-c6e1cf6b53e2.jpg" class="d-block w-100" alt="test"/>
                </div>
                <div class="carousel-item">
                  <img src="https://d19m59y37dris4.cloudfront.net/directory/1-6/img/photo/photo-1519974719765-e6559eac2575.jpg" class="d-block w-100" alt="test"/>
                </div>
                <div class="carousel-item">
                  <img src="https://d19m59y37dris4.cloudfront.net/directory/1-6/img/photo/photo-1490578474895-699cd4e2cf59.jpg" class="d-block w-100" alt="test"/>
                </div>
              </div>
            </div>  
          </div>

          <div className="container main_search_container">
            <h6>THE BEST STAYING EXPERIENCE</h6>
            <h3>Stay like a local</h3>
            <div className="searchbar_main">
              <form className="main_form">
                <div className="row">
                  <div className="col-lg-5 search_col_main">
                    <div className="main_search_div">
                      <p type="search" className="form-control m-0" >Where are you Searching for?</p>
                    </div>
                  </div>
                  <div className="col-md-5 search_col_main">
                    <div className="main_search_div d-flex align-items-center">
                      <input id="search" type="search" className="form-control" placeholder="Location" value={this.search}  onChange={this.handleInput}></input>
                      <i class="fas fa-search-location"></i>
                    </div>
                  </div>
                  <div className="col-md-2 search_col_main">
                    <div className="main_search_div">
                      <input type="submit" className="form-control btn btn-primary search_button" placeholder="Search" ></input>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>     
<div className="container">
  <div className="py-4">
    <div className="row">
     {filterHostel.map(product=>(
      <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 " >
        <div className="card text-center main_product_div">
          <img src={product.url} height="100px" alt="" className="img-fluid"/>
          <div className="card-body">
            <h5 className="card-title mb-0 text-uppercase">{product.name}</h5>
            <div className="details_div">
              <p className="text-muted small">{product.city}</p>
              <Link to={`/ShowProductStudent/${product.key}`} className="btn btn-warning btn-profile py-1 secondary_button view_room_button">
                View Room
              </Link>
            </div>
          </div>
        </div>
      </div>
        ))}
        </div>
        </div>
        </div>
            </div>
         );
    }
}
 
export default Landing;
