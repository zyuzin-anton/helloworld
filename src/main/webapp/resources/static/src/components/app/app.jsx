import React from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

import NavBar from "../nav-bar/nav-bar";

class App extends React.Component {

    render() {
        return (
            <div>
                <NavBar/>
                <div>
                    {React.cloneElement(this.props.children, this.props)}
                </div>
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.element.isRequired
};


export default withRouter(App)