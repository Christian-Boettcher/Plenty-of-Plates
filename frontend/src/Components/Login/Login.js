import { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {addToken, addUser} from '../../Redux/actionCreators'
import {baseUrl} from '../../Shared/baseUrl'
import axios from 'axios'
import "./Login.css"

const Swal = window.Swal

const mapDispatchToProps = (dispatch) => ({
    addToken: () =>  dispatch(addToken()),
    addUser: () => dispatch(addUser()) 
});

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleLogin = async (e) => {
        e.preventDefault()
        const data = { username: this.state.username, password: this.state.password }

        await axios.post(baseUrl + '/login', data)
        .then(response => {
            const userWithToken = response
            this.props.dispatch(addToken(userWithToken.data.token))
            this.props.dispatch(addUser(userWithToken.data.user))
        })
        .catch(err => {
            if (err.response !== undefined) 
            {
                this.setState({...this.state, error: err.response.data.message})
                Swal.fire({
                    icon: 'error',
                    title: this.state.error,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div className="fullscreen-container">
                <h1 className='login--title-banner'>Plenty of Plates</h1>
                <div className="login-container">
                    <h1 className="login-title font-effect-emboss">Please Sign In</h1>
                    <form className="login--form" onSubmit={this.handleLogin}>
                        <div className="input-group">
                            <label className="sr-only">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                v-model="user.username"
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="sr-only">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                v-model="user.password"
                                onChange={this.handleInputChange}
                                required
                                pattern="[a-zA-Z0-9]{8,}"
                            />
                            <span className="msg">Incorrect Password</span>
                        </div>

                        <Link to="/register" className="register-link">Need an account?</Link>
                        <button className="login--btn" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(connect(mapDispatchToProps)(Login));
