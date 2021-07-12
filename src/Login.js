import React from 'react'
import FormError from './FormError'
import firebase from './Firebase'
import {navigate} from "@reach/router";

class Login extends React.Component{




    constructor(props) {
        super(props);

        this.state={

            email:'',
            password:'',
            error:null
        }

    }


    handleChange = (e)=> {

        this.setState({[e.target.name]: e.target.value})

    }

    handleSubmit = (e)=>{

        e.preventDefault();

        const loginInfo ={
            email:this.state.email,
            password:this.state.password
        }

        firebase.auth().signInWithEmailAndPassword(
            loginInfo.email,
            loginInfo.password
        ).then(()=>{
            navigate('/meetings')
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

            <div className={"text-center"}>
                <form className="mt-3" onSubmit={this.handleSubmit}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="card bg-light">
                                    <div className="card-body">
                                        <h3 className="font-weight-light mb-3">Log in</h3>
                                        {
                                            this.state.error ? <FormError msg={this.state.error} /> : ''
                                        }
                                        <section className="form-group m-3">
                                            <input
                                                required
                                                className="form-control"
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Email"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                            />
                                        </section>
                                        <section className="form-group m-3">
                                            <input
                                                required
                                                className="form-control"
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                            />
                                        </section>
                                        <div className="form-group text-right mb-0 mt-2">
                                            <button className="btn btn-primary" type="submit">
                                                Log in
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

export default Login;