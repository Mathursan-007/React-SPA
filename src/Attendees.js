import React from 'react'
import firebase from "./Firebase";
import AttendeesList from "./AttendeesList";
import {FaUndo,FaRandom} from 'react-icons/fa'

class Attendees extends React.Component{



    constructor(props) {
        super(props);

        this.state={

            displayAttendees:[],
            search:'',
            allAttendees:[]  //this will always have the all attendees
        }

    }



    handleChange = (e)=>{

        this.setState({[e.target.name]:e.target.value})

    }

    reset=()=>{
        this.setState(
            {

                displayAttendees:this.state.allAttendees,
                search:''

            }
        )
    }


    chooseRandom=()=>{

        const randomAttendee = Math.floor(Math.random()*this.state.allAttendees.length)
        this.reset()//calling reset here if in case the random button selected with the input not cleared in the search input field
        this.setState({displayAttendees:[this.state.allAttendees[randomAttendee]]})   //here setting value inside [] because the filter will work only for array types


    }

    componentDidMount() {

        const ref = firebase.database().ref(`/meetings/${this.props.userID}/${this.props.meetingID}/attendees`)

        ref.on('value',snapshot=>{   //whenever the value changes it will take a snapshot of the data
           let attendees = snapshot.val()

            let attendeesList = []

            for(let attendee in attendees){

                attendeesList.push({
                    attendeeID:attendee,
                    attendeeName:attendees[attendee].attendeeName,
                    attendeeEmail:attendees[attendee].attendeeEmail,
                    star:attendees[attendee].star
                })

            }

            this.setState({
                displayAttendees:attendeesList,
                allAttendees:attendeesList
            })
        })

    }


    render() {

        const dataFilter = (attendee)=>attendee.attendeeName.toLowerCase().match(this.state.search.toLowerCase()) //filter method callback

        const filteredAttendees = this.state.displayAttendees.filter(dataFilter) //whenever the search state changes this filter will be changed

        return(

                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <h1 className="font-weight-light text-center text-light">
                                Attendees
                            </h1>

                            <div className={"card bg-light mb-4"}>
                                <div className={"card body text-center"}>
                                    <div className={"input-group input-group-md"}>
                                    <input type={"text"} name={"search"} value={this.state.search} placeholder={"Search Attendees"} onChange={this.handleChange} className={"form form-control"}/>

                                    <div className={"input-group-append"}>

                                        <button
                                            className={"btn btn-md btn-outline-info"}
                                            title={"Choose a random attendee"}
                                            onClick={()=>this.chooseRandom()}>
                                            <FaRandom/>
                                        </button>


                                        <button
                                            className={"btn btn-md btn-outline-info"}
                                         title={"Reset search"}
                                        onClick={()=>this.reset()}>
                                          <FaUndo/>
                                        </button>

                                    </div>

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className={"list-group list-group-flush"}>
                        <AttendeesList
                            adminUser={this.props.adminUser}
                            userID={this.props.userID}
                            meetingID={this.props.meetingID}
                            attendees={filteredAttendees}/>
                    </div>
                </div>


        )

    }


}

export default Attendees;

//onClick={()=>this.reset()}> //function call
//onChange={this.handleChange} //expression