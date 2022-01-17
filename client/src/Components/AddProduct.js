import React, { Component } from 'react';
import firebase from '../Config/Config';
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}
class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.ref=firebase.firestore().collection('Products');
        this.state = { 
            address:'',
            city:'',
            name:'',
            contact:'',
            email:'',
            price:'',
            url:'',
            image:null,
            facilities:[],
            errors: {
                address: '',
                city:'',
                name:'',
                contact:'',
                email: '',
                price:'',
                url: '',
                facilities:''
              }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    onInputChange=(e)=>{
        e.preventDefault()
        const state=this.state;
        state[e.target.name]=e.target.value;
        this.setState(state);
        const { name, value } = e.target;
        let errors=this.state.errors;
        switch(name){
            case 'name':
                errors.name=
                    value.length< 5 
                        ? 'Name must be 5 characters long!'
                        : '';
                break;
            case 'email': 
                errors.email = 
                    validEmailRegex.test(value)
                    ? ''
                : 'Email is not valid!';
                break;
                case 'address':
                    errors.address=
                        value.length< 0
                            ? 'Address is  compaslasry'
                            : '';
                    break;
                case 'city':
                errors.city=
                    value.length< 0
                        ? 'enter  valid name'
                        : '';
                break;
                case 'contact':
                errors.contact=
                    value.length< 10 || value.length>10
                        ? 'Contact must be 10 characters '
                        : '';
                break;
                case 'url':
                    errors.url=
                    value.length<0 
                    ? 'select image'
                    :'';
                break;
        }
    }
    handleChange=(e)=>{
        if(e.target.files[0]){
            this.setState({
                image:e.target.files[0]
            })
        }
        console.log(e.target.files[0])
    }
    handleUplaod=()=>{
        const {image}=this.state;
        const uploadTask=firebase.storage().ref(`images/${image.name}`).put(this.state.image)
        uploadTask.on('state_changed',(snapshot)=>{console.log('snapshot')},
        (error)=>{console.log(error);},
        ()=>{firebase.storage().ref('images').child(image.name).getDownloadURL().then(url=>this.setState({url}))})
    }
    handleInputChange(event) {
        const facilities = this.state.facilities
        const target = event.target;
        var value = String(target.value);
        
        if(target.checked){
            facilities.push(value)
        }else{
            this.state.facilities.splice(value, 1);
        }
        this.setState({ facilities:facilities })
        
        
    }
    
    logout(){
        firebase.auth().signOut();
    }
    onSubmit=(e)=>{
        e.preventDefault();
        if(validateForm(this.state.errors)){
            const { address,city,name,contact,email,price,facilities}=this.state;
        this.ref.add({
            address,city,name,email,contact,price,
            url:this.state.url,facilities
        }).then((docRef)=>{
            this.setState({
                address:'',
                city:'',
                name:'',
                contact:'',
                email:'',
                price:'',
                url:'',facilities:[]

            });
            this.props.history.push("/Landing")
        })
        .catch((error)=>{
            console.error("Error Adding document :",error);
        })
        }
       else{
           alert('invalid form')
       } 
    }
    render() { 
        const{address,city,name,contact,email,price,facilities,errors}=this.state;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_navigation" aria-controls="main_navigation" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="main_navigation">
    <a className="navbar-brand" href="/landing"><span className="logo_main">Logo</span><span className="logo_main">Here</span></a>
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
      <li className="nav-item ">
        <a className="nav-link" href="/Landing">Home</a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="/AddProduct">Add Rooms</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/Contact">Contact</a>
      </li>
      <li className="nav-item">
        <a className="nav-link logout_btn btn-sm btn btn-danger py-1" onClick={this.logout} href="/">Log Out</a>
      </li>
    </ul>
  </div>
</nav>
                
            <div className="container">
                <div className="py-4">
                <div className="row">
                    <div className="col-md-10 mx-auto">
                        <div className="card card-body shadow">
                        <form onSubmit={this.onSubmit} noValidate>
                            <div className="form-row form-group mb-4">
                            <div className="col-md-6">
                                <input
                                for="name"
                                type="text"
                                placeholder="Enter Hostel Name"
                                name="name"
                                value={name}
                                onChange={this.onInputChange}
                                className="form-control"
                                required 
                                noValidate
                                />
                                {errors.name.length > 0 && 
                            <small className='error form-text text-danger'>{errors.name}</small>}
                            </div>
                            <div className="col-md-6">
                                <input
                                placeholder="Enter Hostel E-mail"
                                name="email"
                                value={email}
                                onChange={this.onInputChange}
                                className="form-control"
                                type="email" for="email"
                                required
                                />
                                {errors.email.length > 0 && 
                <small className='error form-text text-danger'>{errors.email}</small>}
                            </div>
                            </div>
                            <div className="form-row form-group mb-4">
                            <div className="col-md-6">
                                <input
                                type="number"
                                placeholder="Enter Hostel Phone"
                                name="contact" for="contact"
                                value={contact}
                                onChange={this.onInputChange}
                                className="form-control"
                                required noValidate
                                />
                                {errors.contact.length > 0 && 
                <small className='error form-text text-danger'>{errors.contact}</small>}
                            </div>
                            <div className="col-md-6">
                                <input
                                type="number"
                                placeholder="Enter Hostel rent per month"
                                name="price"
                                value={price}
                                onChange={this.onInputChange}
                                className="form-control"
                                required noValidate
                                />
                                {errors.price.length > 0 && 
                <small className='error form-text text-danger'>{errors.price}</small>}
                            </div>
                            </div>
                            <div className="form-row form-group">
                            <div className="col-md-6">
                                <input
                                type="text"
                                placeholder="Enter Hostel Address "
                                value={address}
                                name="address"
                                onChange={this.onInputChange}
                                className="form-control"
                                required
                                />
                                {errors.address.length > 0 && 
                <small className='error form-text text-danger'>{errors.address}</small>} 
                            </div>
                            <div className="col-md-6">
                                <input
                                type="text"
                                placeholder="Enter Hostel city"
                                value={city}
                                name="city" for="city"
                                onChange={this.onInputChange}
                                className="form-control"
                                required noValidate
                                />
                                 {errors.city.length > 0 && 
                <small className='error form-text text-danger'>{errors.city}</small>}
                            </div>
                            <div class="form-froup">
                            <div class="form-group">
                                <label>Facilites :</label><br />
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh1" value="Electricity and no power cut" onChange={this.handleInputChange} />
                                    <label class="form-check-label" for="inlineCheckboxh1" >Electricity and no power cut</label>
                                </div>
                                <div class="form-check ">
                                    <input class="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh2" value="Wi-Fi connection" onChange={this.handleInputChange} />
                                    <label class="form-check-label" for="inlineCheckboxh2">Wi-Fi connection</label>
                                </div>
                                <div class="form-check ">
                                    <input class="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh3" value="Mess" onChange={this.handleInputChange} />
                                    <label class="form-check-label" for="inlineCheckboxh3">Mess</label>
                                </div>
                                <div class="form-check ">
                                    <input class="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh3" value="Well-stocked kitchen facilities" onChange={this.handleInputChange} />
                                    <label class="form-check-label" for="inlineCheckboxh3">Well-stocked kitchen facilities</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh3" value="Plenty of clean, functional bathroom" onChange={this.handleInputChange} />
                                    <label class="form-check-label" for="inlineCheckboxh3">Plenty of clean, functional bathroom</label>
                                </div>
                                <div class="form-check ">
                                    <input className="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh3" value="Hot water" onChange={this.handleInputChange} />
                                    <label className="form-check-label" for="inlineCheckboxh3">Hot water</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox" name="hobbies" id="inlineCheckboxh3" value="Locker" onChange={this.handleInputChange} />
                                    <label className="form-check-label" for="inlineCheckboxh3">Locker</label>
                                </div>
                                </div>
                                
                        
                      </div>
                      <textarea type="text" className="form-control" name="behaviour" required value={facilities} onChange={this.onInputChange} placeholder="Insert details from facilities"/>
                        
                            </div>
    
                            <div className="upload-data " style={{alignContent:"center", textAlign:"center"}}>
                        <input type="file" onChange={this.handleChange}/>
                        <img src={this.state.url} height="200" width="200" alt=" upload your hostel"  required noValidate />
                        {errors.url.length > 0 && 
                <small className='error form-text text-danger'>{errors.url}</small>}
                    </div>
                  
                    <div className="row" style={{padding:"1%"}}>
                            <button type="button" className=" btn-secondary btn-rounded waves-effect col" style={{marginRight:"2%"}} onClick={this.handleUplaod}>Upload Image First <i class="fas fa-upload"></i></button>
                            <button type="submit" value="submit" className="submit-button btn-success btn-rounded waves-effect col" >save<i class="far fa-share-square"></i></button>
                    </div>
                    
                       </form>         
        
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>

          );
    }
}
 
export default AddProduct;