import React, { Component } from 'react'

export default class Default extends Component {
    render() {
        return (
            <div>
                <idv className="container">
                    <div className="row">
                    <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                    <h1 className="display-1">404</h1>
                    <h1>error</h1>
                    <h3>
                        the requrested url<span className="text-danger">
                            {this.props.location.pathname}
                        </span>{" "}was not found
                    </h3>
                    </div>
                    </div>
                </idv>
            </div>
        )
    }
}
