import { Component } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import EventPage from '../EventPage/EventPage'
import VotingPage from '../VotingPage/VotingPage'
import EventResults from '../EventPage/EventResults'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'
import { addToken, deleteUser } from '../../Redux/actionCreators'
import { connect } from 'react-redux'
import UserProfile from "../UserProfile/UserProfile"

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    addToken: () => { dispatch(addToken()) },
    deleteUser: () => { dispatch(deleteUser()) }
});


class Main extends Component {

    handleLogout = () => {
        this.props.addToken("")
        this.props.deleteUser()
    }

    render() {
        return (
            <div className="fullscreen-container">
                {this.props.token.token !== undefined ?
                    <div>
                        <Navbar handleLogout={this.handleLogout} username={this.props.user.username} />
                        <Redirect to='/home' />
                    </div>
                    :
                    <></>
                }
                <Switch>
                    <Route path='/login'
                        component={this.props.token.token === undefined ?
                            () => <Login />
                            : () => <Redirect to='/home' />}
                    />
                    <Route path='/register'
                        component={this.props.token.token === undefined ?
                            () => <Register />
                            : () => <Redirect to='/home' />}
                    />
                    <Route path='/eventpage'
                        component={this.props.token.token !== undefined ?
                            () => <EventPage />
                            : () => <Redirect to='/login' />}
                    />
                    <Route path='/home'
                        component={this.props.token.token !== undefined ? () => <Home user={this.props.user} /> : () => <Redirect to='/login' />}
                    />
                    <Route path='/user/:username'
                        component={this.props.token.token !== undefined ? () => <UserProfile user={this.props.user} /> : () => <Redirect to='/login' />}
                    />

                    <Route path='/vote/:eventId/:guestId'
                        component={this.props.token.token === undefined ? () => <VotingPage /> : () => <Redirect to='/home' />}
                    />
                    <Route path='/results/'
                        component={this.props.token.token !== undefined ?
                            () => <EventResults /> :
                            () => <Redirect to='/login' />}
                    />
                    <Redirect to='/home' />

                </Switch>
            </div>
        )
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));