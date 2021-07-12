import React from 'react'

class FormError extends React.Component{



    render() {


        const {msg} = this.props

        return(

            <div className={"col-12 alert alert-danger px-3"}>
                {msg}
            </div>


        )

    }


}

export default FormError;