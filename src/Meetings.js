import React from 'react'
import firebase from "./Firebase";
import MeetingsList from "./MeetingsList";

class Meetings extends React.Component{



    constructor(props) {
        super(props);

        this.state={

            meetingName:'',
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
        this.props.addMeeting(this.state.meetingName)
        this.setState({meetingName:''})



    }



    render() {

        return(

            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h1 className="font-weight-light text-light">Add a Meeting</h1>
                        <div className="card bg-light">
                            <div className="card-body text-center">
                                <form className="formgroup" onSubmit={this.handleSubmit}>
                                    <div className="input-group input-group-lg">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="meetingName"
                                            value={this.state.meetingName}
                                            placeholder="Meeting name"
                                            aria-describedby="buttonAdd"
                                            onChange={this.handleChange}
                                            required
                                        />
                                        <div className="input-group-append">
                                            <button
                                                type="submit"
                                                className="btn btn-lg btn-info"
                                                id="buttonAdd"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                    <div className={"col-11 col-md-6 text-center mt-3"}>
                        <div className={"card border-top-0 rounded-0"}>
                            {
                                this.props.meetings && this.props.meetings.length ?
                                    <div className={"card-body py-2"}>
                                        <h4 className={"card-title font-weight-light m-0"}>
                                            Your Meetings
                                        </h4>
                                        <div className={"list-group list-group-flush"}>
                                               <MeetingsList meetings={this.props.meetings} userID={this.props.userID}/>
                                        </div>
                                    </div>
                                    : ' '
                            }
                        </div>
                    </div>


                </div>
            </div>


        )

    }


}

export default Meetings;