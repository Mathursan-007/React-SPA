import React from 'react'
import {GoTrashcan,GoStar,GoMail} from 'react-icons/go'
import firebase from './Firebase'
import {navigate} from "@reach/router";


class AttendeesList extends React.Component{




    deleteAttendee =(meetingID,attendeeID) =>{


        const ref = firebase.database().ref(`meetings/${this.props.adminUser}/${meetingID}/attendees/${attendeeID}`)
        ref.remove();

    }

    toggleStar = (star,meetingID,attendeeID)=>{


        const ref = firebase.database().ref(`meetings/${this.props.adminUser}/${meetingID}/attendees/${attendeeID}/star`)

        if(star === false){

            ref.set(true)          //set will update the value referred
        }else{

            ref.set(false)
        }

    }




    render() {

        const {attendees} = this.props

        const admin = this.props.adminUser === this.props.userID ? true:false

        return(

            <div className={"row justify-content-center"}>

                {attendees.map(attendee=>{

                    return(
                        <div className={"list-group-item d-flex w-25"} key={attendee.attendeeID}>
                                 <div className={"card-body px-3 py-2 d-flex align-items-center"+
                                                                             (admin ? " " : "justify-content-center")}>

                                     {admin && (
                                         <div className={"btn-group p-2 m-2"}>
                                             <button
                                                 className={"btn btn-sm "+(attendee.star ? 'btn-info':'btn-outline-secondary')}
                                                 title={"Give user a Star"}
                                                 onClick={e=>{

                                                     e.preventDefault()
                                                     this.toggleStar(attendee.star,this.props.meetingID,attendee.attendeeID)

                                                 }
                                                 }
                                             >
                                                 <GoStar/>
                                             </button>


                                             <a href={`mailto:${attendee.attendeeEmail}`}
                                                 className={"btn btn-sm btn-outline-secondary"}
                                                 title={"Mail to Attendee"}
                                             >
                                                 <GoMail/>
                                             </a>

                                                <button
                                                    className={"btn btn-sm btn-outline-secondary"}
                                                    title={"Delete Attendee"}
                                                    onClick={e=>{

                                                        e.preventDefault()
                                                        this.deleteAttendee(this.props.meetingID,attendee.attendeeID)

                                                       }
                                                    }
                                                >
                                                  <GoTrashcan/>
                                                </button>
                                         </div>

                                     )}
                                     <div>
                                         {attendee.attendeeName}
                                     </div>
                                </div>
                        </div>

                    )
                })}

            </div>


        )

    }


}

export default AttendeesList;