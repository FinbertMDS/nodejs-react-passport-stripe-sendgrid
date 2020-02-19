import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { fetchUser } from '../actions';
import HeaderWrapper from './HeaderWrapper';
import StripeInfo from './StripeInfo';
import Config from '../Config';
import SurveyInfo from './SurveyInfo';

const DashBoard = () => <h1>DashBoard1</h1>;
const SurveyNew = () => <h1>SurveyNew1</h1>;
const Landing = () => <h1>Home1</h1>;

class App extends Component {

  componentDidMount() {
    const { fetchUser } = this.props;
    fetchUser();
  }

  render() {
    return (
      <Container>
        <BrowserRouter>
          <div>
            <HeaderWrapper />
            <Route exact path={Config.CLIENT_LINK.HOME} component={Landing} />
            <Route exact path={Config.CLIENT_LINK.STRIPE_INFO} component={StripeInfo} />
            <Route exact path={Config.CLIENT_LINK.SURVEYS} component={SurveyInfo} />
            <Route path={Config.CLIENT_LINK.SURVEYS_NEW} component={SurveyNew} />
          </div>
        </BrowserRouter>
      </Container>
    );
  }
}

export default connect(null, {fetchUser})(App);