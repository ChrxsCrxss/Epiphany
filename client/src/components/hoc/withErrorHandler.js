import React, { Component } from "react";
import Aux from "./Aux";
import ErrorModal from "../UI/Modals/ErrorModal/ErrorModal"; 

/*
withErrorHandler is a high-order component that binds interceptor
logic to the axios instance of the lambda component (i.e, the WrappedComponent
parameter). The main use ase is to define 'global' error-handling. This 
component displays a modal containing the error message.

Its function is similiar to withErrorBoundary, except withErrorBoundary
is a general error handling component that bounds the upward propogation
of errors at specific nodes in the component tree. withErrorHandler 
defines a domain ( a subtree ) for which error handling logic for 
asynchronous requests via an axios instance is applicable.
*/

const withErrorHandler = (WrappedComponent, axios) => {

    // This is an anonymous class, essentially a class vector
    // that is never accessed 
    return class extends Component {

        state = {
            error : null 
        }

        componentWillMount() {

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error : null })
                return req; 
            }); 

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error : error })
            });

        }

        // We call the componentWIllUnmount lifescycle method to prevent old
        // interceptors from accumulating. Since an axios instance is being passed in 
        // this allows us to reuse the withErrorHhandler hoc and change the
        // configuration on the axios instance 
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor); 

        }

        errorConfirmedHandler = () => {
            this.setState({ error : null })
        }

        // Currently, the render method conditionally renders the error message 
        // associated with 

        render() {

            return (
                <Aux>
                    <ErrorModal
                        clicked={this.errorConfirmedHandler}
                        show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </ErrorModal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )

        }

    }

}

export default withErrorHandler