import React from 'react';

const signUp = () => {

    const [formData, setFormData] = React.useState(
        {firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""})

    function handleChange(event) {
        const {name, value} =  event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        }

        )
    }

    function handleSubmit(event) {
        event.preventDefault()
        /** 
         * This is were you would submit the 
         * formData kind of like this: 
         * submitToAPI(formData)
         */
    }


    return <div>
        <div class="row">
            <div class="col-12 col-md-4">
            <form id="sign_up_form" onSubmit={handleSubmit}>

                    <h4>Sign Up</h4>

                    <p>
                        <label htmlFor="first_name">First Name: </label>
                        <input 
                            type="text" 
                            name="firstName" 
                            id="first_name" 
                            onChange={handleChange}
                            value={formData.firstName}
                        />
                        
                    </p>
                    
                    <p>
                        <label htmlFor="last_name">Last Name: </label>
                        <input 
                            type="text" 
                            name="lastName" 
                            id="last_name" 
                            onChange={handleChange}
                            value={formData.lastName}
                        />
                        
                    </p>

                    <p>
                        <label htmlFor="email">Email: </label>
                        <input 
                            type="text" 
                            name="email" 
                            id="email"
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </p>
                    
                    <p>
                        <label htmlFor="username">Username: </label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username"
                            onChange={handleChange}
                            value={formData.username}
                        />
                    </p>

                    <p>
                        <label htmlFor="password">Password: </label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password"
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </p>

                    <button id="Submit">Sign Up</button>
                </form>
            </div>
        </div>
    </div>
}
export default signUp;
