import React from 'react'
import {GoTrashcan,GoListUnordered} from 'react-icons/go'
import {FaLink} from 'react-icons/fa'
import firebase from './Firebase'
import {navigate} from "@reach/router";


class MeetingsList extends React.Component{




    deleteMeeting =(meetingID) =>{


        const ref = firebase.database().ref(`meetings/${this.props.userID}/${meetingID}`)
        ref.remove();

    }


    render() {

        const {meetings} = this.props

        return(

            <div>
                {meetings.map(meeting=>{

                    return(
                    <div className={"list-group-item d-flex"} key={meeting.meetingID}>
                        <section className={"btn-group align-self-center"} role={"group"} aria-label={"Meeting Options"}>
                            <button className={"btn btn-sm btn-outline-secondary m-2"} title={"Delete Meeting"}
                                    onClick={(e)=>{
                                        e.preventDefault()
                                        this.deleteMeeting(meeting.meetingID)
                            }} >
                                   <GoTrashcan/>
                            </button>
                            <button className={"btn btn-sm btn-outline-secondary m-2"} title={"CheckIn to Meeting"}
                                    onClick={()=>{
                                       navigate(`checkin/${this.props.userID}/${meeting.meetingID}`)
                                    }} >
                                <FaLink/>
                            </button>
                            <button className={"btn btn-sm btn-outline-secondary m-2"} title={"Attendees List"}
                                    onClick={()=>{
                                        navigate(`attendees/${this.props.userID}/${meeting.meetingID}`)
                                    }} >
                                <GoListUnordered/>
                            </button>
                        </section>
                        <section className={"pl-3 text-left align-self-center"}>

                            {
                                meeting.meetingName
                            }

                        </section>
                    </div>
                    )
                })}

            </div>


        )

    }


}

export default MeetingsList;