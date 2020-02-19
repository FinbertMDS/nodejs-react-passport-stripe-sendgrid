import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createSurvey } from '../actions';
import { Button } from 'semantic-ui-react'
import './styles.css';

class SurveyInfo extends Component {
    constructor(props) {
        super(props);

        this.createSurvey = this.createSurvey.bind(this);
    }

    createSurvey() {
        this.props.createSurvey({
            title: '123', 
            body: '1234', 
            subject: '123456', 
            recipients: 'ngovanhuy.cntt2@gmail.com'
        })
    }

    render() {
        return (
            <Fragment>
                <h1>Survey</h1>
                <Button primary onClick={this.createSurvey}>Create survey</Button>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
});

export default connect(null,{createSurvey})(SurveyInfo);