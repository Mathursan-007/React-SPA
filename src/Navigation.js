import React from 'react'

import {FaUsers} from 'react-icons/fa'
import {Link} from '@reach/router'

class Navigation extends React.Component{



    render() {

        const {user,logOut} = this.props

        return(

            <nav className="site-nav family-sans navbar navbar-expand bg-primary navbar-dark higher">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                       <FaUsers style={{marginRight:'10px'}}/>Meeting Log
                    </Link>

                    <div className="navbar-nav ml-auto">

                        {user &&(
                                <Link to="/meetings" className="nav-item nav-link" >
                                    Meetings
                                </Link>)}
                        {user &&(
                                <Link to="/" className="nav-item nav-link" onClick={(e)=>{
                                    logOut(e)
                                }}>
                                    Log out
                                </Link>
                        )}
                        {!user &&
                            <Link to="/login" className="nav-item nav-link">
                                Log in
                            </Link>}
                        {!user &&
                            <Link to="/register" className="nav-item nav-link" >
                                Register
                            </Link>
                        }


                    </div>
                </div>
            </nav>

        )

    }


}

export default Navigation;