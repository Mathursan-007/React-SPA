import React from 'react'
import firebase from './Firebase'

import FormError from "./FormError";

class Register extends React.Component{


    constructor(props) {
        super(props);

        this.state={
            displayName:'',
            email:'',
            password:'',
            repeat:'',
            error:null
        }

    }


    handleChange = (e)=>{

        this.setState({[e.target.name]:e.target.value},()=>{
            if(this.state.password !== this.state.repeat){
                this.setState({error:'Passwords do not match'})
            }else{
                this.setState({error:null})
            }
        })

    }

    handleSubmit =(e)=>{

        e.preventDefault()  //prevent reload of page to prevent from resetting of state values

        const registerInfo = {
            displayName:this.state.displayName,
            email:this.state.email,
            password:this.state.password

        }

        firebase.auth().createUserWithEmailAndPassword(
            registerInfo.email,
            registerInfo.password
        ).
        then(()=>{
            this.props.registerUser(registerInfo.displayName)
        })
            .catch(e=>{
            if(e.message!==null){
                this.setState({error:e.message})
            }else{
                this.setState({error:null})
            }
        })

    }

    render() {

        return(


           <div>

               <form className="mt-3" onSubmit={this.handleSubmit}>
                   <div className="container">
                       <div className="row justify-content-center">
                           <div className="col-lg-8">
                               <div className="card bg-light">
                                   <div className="card-body">
                                       <h3 className="font-weight-light mb-3 text-center">Register</h3>
                                       {
                                           this.state.error ? <FormError msg={this.state.error}/> : ' '
                                       }
                                       <section className="form-row m-4">
                                               <input
                                                   className="form-control"
                                                   type="text"
                                                   id="displayName"
                                                   placeholder="Display Name"
                                                   name="displayName"
                                                   value={this.state.displayName}
                                                   required
                                                   onChange={this.handleChange}
                                               />
                                       </section>
                                       <section className="form-group m-4">
                                           <input
                                               className="form-control"
                                               type="email"
                                               id="email"
                                               placeholder="Email Address"
                                               name="email"
                                               value={this.state.email}
                                               required
                                               onChange={this.handleChange}
                                           />
                                       </section>
                                       <section className="form-group m-4">
                                               <input
                                                   className="form-control"
                                                   type="password"
                                                   name="password"
                                                   value={this.state.password}
                                                   placeholder="Password"
                                                   required
                                                   onChange={this.handleChange}
                                               />
                                       </section>
                                       <section className="form-group m-4">
                                               <input
                                                   className="form-control"
                                                   type="password"
                                                   name="repeat"
                                                   value={this.state.repeat}
                                                   placeholder="Repeat Password"
                                                   required
                                                   onChange={this.handleChange}
                                               />
                                           </section>
                                       <div className="form-group text-center mb-0">
                                           <button className="btn btn-primary" type="submit">
                                               Register
                                           </button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </form>


           </div>


        )

    }


}

export default Register;