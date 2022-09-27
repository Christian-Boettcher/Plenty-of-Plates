import axios from 'axios'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {baseUrl} from '../../Shared/baseUrl'
import "./Register.css"

const Swal = window.Swal

class Register extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: null, 
            created: false, 
            validEmail: false,
            validPassword: false
        }
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleInputBlur = (event) => {
        if(event.target.name === "email")
        {
            this.toggleValidationStyle(event, "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")
        }
        else if(event.target.name === "password")
        {
            this.toggleValidationStyle(event, "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")
            document.getElementsByClassName("msg")[0].style.display = "none";
        }
    }

    handleInputFocus = ()=>
    {
        document.getElementsByClassName("msg")[0].style.display = "block";
    }

    handleKeyUp = (event)=>
    {
        const letter = document.getElementById("pwd-letter");
        const capital = document.getElementById("pwd-capital");
        const number = document.getElementById("pwd-number");
        const length = document.getElementById("pwd-length");
        
        // Validate lowercase letters
        const lowerCaseLetters = /[a-z]/g;
        if(event.target.value.match(lowerCaseLetters))
        {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } 
        else
        {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        // Validate capital letters
        const upperCaseLetters = /[A-Z]/g;
        if(event.target.value.match(upperCaseLetters))
        {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        }
        else
        {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers
        const numbers = /[0-9]/g;
        if(event.target.value.match(numbers))
        {
            number.classList.remove("invalid");
            number.classList.add("valid");
        }
        else
        {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        // Validate length
        if(event.target.value.length >= 8)
        {
            length.classList.remove("invalid");
            length.classList.add("valid");
        }
        else
        {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
    }

    toggleValidationStyle = (event, format) => 
    {
        if (!event.target.value.match(format) && event.target.value !== null)
        {
            event.target.parentElement.classList.add('invalid');
            if(event.target.parentElement.classList.contains('valid'))  // sanity check
            {
                event.target.parentElement.classList.remove('valid');
            }
            if(event.target.name === 'email') {
                this.setState({...this.state, validEmail: false})
            } else if(event.target.name === 'password') {
                this.setState({...this.state, validPassword: false})
            }
        }
        else
        {
            event.target.parentElement.classList.remove('invalid');
            event.target.parentElement.classList.add('valid');
            if(event.target.name === 'email')
            {
                this.setState({...this.state, validEmail: true})
            }
            else if(event.target.name === 'password') 
            {
                this.setState({...this.state, validPassword: true})
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const data = {username: this.state.username, email: this.state.email, password: this.state.password, confirmPassword: this.state.confirmPassword, role: 'USER'}
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success'
            }
          })
        if(this.state.password === this.state.confirmPassword)
        {
            axios.post(baseUrl + "/register", data)
            .then(response => {
               if (response.status <= 202) 
               {
                swalWithBootstrapButtons.fire({
                    title: 'Successfully Registered!',
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Go to Login ->',
                    reverseButtons: false
                  })
                  .then((result) => {
                        if (result.isConfirmed) 
                        {
                            window.location = '/login';
                        }
                    })
               }
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
        else
        {
            Swal.fire({
                icon: 'error',
                title: 'Password and Confirm Password must match!!!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    clearFields = () => {
        var inputs = document.getElementsByTagName("input");
        for(var i=0;i<inputs.length;i++)
            inputs[i].value = '';
    }

    render(){
        return(
            <div className="fullscreen-container">
                <div className="register-container">
                    <h1 className="register-title font-effect-emboss">Create Account</h1>
                    <form className="register--form">
                        <div className={this.state.error === "User Already Exists." ? "input-group invalid" : "input-group"}>
                            <label className="sr-only">Username</label>
                            <input
                                type="text"
                                id="register--username"
                                name="username"
                                placeholder="Username"
                                v-model="user.username"
                                onChange={this.handleInputChange}
                                required
                            />
                            {this.state.error === "User Already Exists." && <div className="msg">{this.state.error}</div>}
                        </div>

                        <div className="input-group">
                            <input 
                                type="email"
                                id="register--email"
                                name="email"
                                placeholder='E-mail Address'
                                v-model="user.email"
                                onChange={this.handleInputChange}
                                required
                                onBlur={this.handleInputBlur}
                            />
                        </div>
                        
                        <div className="input-group">
                            <label className="sr-only">Password</label>
                            <input
                                type="password"
                                id="register--password"
                                name="password"
                                placeholder="Password"
                                v-model="user.password"
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" 
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputBlur}
                                onFocus={this.handleInputFocus}
                                onKeyUp={this.handleKeyUp}
                                required
                            />
                            <div className="msg">
                                <h5>Password must contain the following:</h5>
                                <p id="pwd-letter" className="invalid">A <b>lowercase</b> letter</p>
                                <p id="pwd-capital" className="invalid">A <b>capital (uppercase)</b> letter</p>
                                <p id="pwd-number" className="invalid">A <b>number</b></p>
                                <p id="pwd-length" className="invalid">Minimum <b>8 characters</b></p>
                            </div>
                        </div>

                        <div className={this.state.password === '' ?
                         "input-group" : this.state.password === this.state.confirmPassword ?
                          "input-group valid" : "input-group  invalid"}>
                            <input
                                type="password"
                                id="register--password-confirm"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                v-model="user.password"
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputBlur}
                                required
                            />
                            {this.state.password === this.state.confirmPassword ?
                             <div className="msg"></div> : <div className="msg">Password and Confirm Password must match!!!</div>}
                        </div>
                        <Link to="/login" className="login-link">Have an account?</Link>
                        <button 
                            className="register--btn"
                            type="submit" 
                            disabled={!this.state.validEmail || !this.state.validPassword} 
                            onClick={this.handleSubmit}>
                        Register
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;