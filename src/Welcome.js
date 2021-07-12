import React from 'react'
import {Link} from '@reach/router'

class Welcome extends React.Component{



    render() {

        const {userName,logOut} = this.props

        return(

          <div className={"text-center mt-4"}>

              <span className={"text-secondary font-weight-bold pl-1"}>
                  Welcome {userName}
              </span>,

              <Link to={"/login"} className={"text-primary font-weight-bold pl-1"} onClick={(e)=>{
                  logOut(e)
              }}>
                  logout
              </Link>

          </div>


        )

    }


}

export default Welcome;