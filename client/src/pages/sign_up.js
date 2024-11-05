const signUp = () => {
    return <div>
        <div class="row">
            <div class="col-12 col-md-4">
            <form id="sign_up_form" action="" method="post">

                    <h4>Sign Up</h4>

                    <p>
                        <label htmlFor="email">Email: </label>
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            placeholder="Enter your email"
                        />
                    </p>

                    <p>
                        <label htmlFor="create_password">Password: </label>
                        <input 
                            type="password" 
                            name="create_password" 
                            id="create_password" 
                            placeholder="Enter a password"
                        />
                    </p>

                    <p>
                        <label htmlFor="first_name">First Name: </label>
                        <input 
                            type="text" 
                            name="first_name" 
                            id="first_name" 
                            placeholder=""
                        />
                        
                    </p>
                    
                    <p>
                        <label htmlFor="last_name">Last Name: </label>
                        <input 
                            type="text" 
                            name="last_name" 
                            id="last_name" 
                            placeholder=""
                        />
                        
                    </p>

                    <p>
                        <label htmlFor="username">Username: </label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Enter a Username"
                        />
                    </p>

                    <input 
                        type="submit" 
                        value="Sign Up" 
                        id="submit"
                    />
                </form>
            </div>
        </div>
    </div>
}
export default signUp;
