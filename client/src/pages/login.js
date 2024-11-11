import React from "react"

export default function Login() {


    return <div>
        <div class="row">
            <div class="col-12 col-md-4">
            <form id="login_form">

                    <h4>Login</h4>

                    <p>
                        <label htmlFor="email">Email: </label>
                        <input 
                            type="text" 
                            name="email" 
                            id="email"
                        />
                    </p>

                    <p>
                        <label htmlFor="password">Password: </label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                        />
                    </p>

                    <button id="Submit">Login</button>
                </form>
            </div>
        </div>
    </div>

}