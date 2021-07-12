import React from 'react'
import {Router,navigate} from '@reach/router'
import firebase from './Firebase'

import Home from './Home'
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import Meetings from "./Meetings";
import Register from "./Register";
import CheckIn from "./CheckIn";
import Attendees from "./Attendees";

class App extends React.Component{


    constructor() {
        super();
        this.state={
            user:null,
            displayName:null,
            userID:null,
            meetings:[],
            NoOfMeetings:0
        }
    }



    componentDidMount() {

        // const ref = firebase.database().ref('user')
        //
        // ref.on('value',snapshot =>{
        //     let FBUser = snapshot.val();
        //     this.setState({user:FBUser})
        //     alert(this.state.user)
        // })

        firebase.auth().onAuthStateChanged(FBUser=>{
            if(FBUser){
                this.setState({
                    user:FBUser,
                    displayName:FBUser.displayName,
                    userID:FBUser.uid
                })

                const meetingsRef = firebase.database().ref('meetings/'+FBUser.uid)

                meetingsRef.on('value',snapshot=>{
                    let meetings = snapshot.val() //returns an object

                    let meetingsList=[]

                    console.log(meetings)

                   for(let meeting in meetings){
                      meetingsList.push(
                          {
                            meetingID:meeting,
                            meetingName:meetings[meeting].meetingName
                        })
                    }

                    this.setState({
                        meetings:meetingsList,
                        NoOfMeetings:meetingsList.length
                    })

                })

            }else{
                this.setState({user:null})
            }
        })

    }



    registerUser =(userName)=>{


        firebase.auth().onAuthStateChanged(FBUser=>{//called whenever there is a change in registration occurs
            FBUser.updateProfile({                                //update user profile details
                    displayName: userName
                }).then(()=>{
                    this.setState({
                        user:FBUser,
                        displayName:FBUser.displayName,
                        userID:FBUser.uid                            //unique id generated for each user
                    })
                navigate('/meetings')
            })
        })

    }

    logOut =(e)=>{

        e.preventDefault()
        this.setState({
            displayName:null,
            userID:null,
            user:null
        })

        firebase.auth().signOut()
            .then(()=>{
                navigate('/login')
            })

    }


    addMeeting = (meetingName)=>{

        const ref = firebase
            .database()
            .ref(`meetings/${this.state.userID}`)

        ref.push({meetingName:meetingName})

    }

    render() {

        return (
            <div className="App">

                <Navigation user={this.state.user} logOut={this.logOut} />
                {this.state.user && (
                    <Welcome userName={this.state.displayName} logOut={this.logOut} />
                )}
                <Router>
                    <Home path="/" user={this.state.user} />
                    <Login path="/login"/>
                    <Meetings path="/meetings" userID={this.state.userID} meetings={this.state.meetings} addMeeting={this.addMeeting}/>
                    <Register path="/register" registerUser={this.registerUser}/>
                    <CheckIn path={"/checkin/:userID/:meetingID"}/>
                    <Attendees path={"/attendees/:userID/:meetingID"} adminUser={this.state.userID}/>
                </Router>
            </div>
        );

    }
}

export default App;
