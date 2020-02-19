import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Icon, Label } from 'semantic-ui-react';
import styled from 'styled-components';
import Payments from "./Payments";
import Config from '../Config';

const HeaderStyled = styled.div`
  margin-top: 20px;
`;

class HeaderWrapper extends Component {

  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {

    const { activeItem } = this.state;
    const { auth } = this.props;

    return (
      <HeaderStyled>
        <Menu secondary>
          <Menu.Item
            as={Link}
            to={Config.CLIENT_LINK.HOME}
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            name='surveys'
            active={activeItem === 'surveys'}
            onClick={this.handleItemClick}
            to={Config.CLIENT_LINK.SURVEYS}
          />

          <Menu.Menu position='right'>
            {!auth && (
              <Menu.Item
                as='a'
                name='Login with Google'
                href={Config.CLIENT_LINK.AUTH_GOOGLE}
              />
            )}
            {auth && (
              <Fragment>
                <Payments />
                <Menu.Item
                  name='credits'
                  as={Link}
                  to={Config.CLIENT_LINK.STRIPE_INFO}
                >
                  <Icon name='bitcoin' /> Credits
                  <Label color='teal' floating>
                    {auth.credits}
                  </Label>
                </Menu.Item>
                <Menu.Item
                  name='Logout'
                  as='a'
                  href={Config.CLIENT_LINK.LOGOUT}
                />
              </Fragment>
            )}
          </Menu.Menu>
        </Menu>
      </HeaderStyled>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(HeaderWrapper);