import { Button, Input, Modal } from "antd";
import { ChangeEvent, FormEvent, useState } from "react";
import { notify } from "../../assets/lib/utils";
import axiosClient from "../../axios-client";
import { useLoggedUserContext } from "../../context/LoggedUserContext";

interface LoginSignupModalTypes {
    onClose: () => void;
}

// type modeTypes = "Login" | "Sign up";

const LoginSignupModal:React.FC <LoginSignupModalTypes> = ({onClose}) => {
    const { setUser, setToken, setUserType } = useLoggedUserContext();

    // const [mode, setMode] = useState<modeTypes>("Login");

    const [loginIn, setLoginIn] = useState({
        username: "",
        password: ""
    });

    // const [signupIn, setsignupIn] = useState({
    //     fname: "",
    //     mname: "",
    //     lname: "",
    //     username: "",
    //     email: "",
    //     password: ""
    // });

    // const isSignupDisabled = isEmptyOrSpaces(signupIn.fname) || isEmptyOrSpaces(signupIn.lname) || isEmptyOrSpaces(signupIn.username) || 
    // isEmptyOrSpaces(signupIn.email) || isEmptyOrSpaces(signupIn.password);


    
    /**
     * Handlers
     */
    const handleInputChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginIn(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    // const handleInputChangeSignup = (e: ChangeEvent<HTMLInputElement>) => {
    //     setsignupIn(prev => ({...prev, [e.target.name]: e.target.value}));
    // }

    // const handleSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     if(!isEmail(signupIn.email)) {
    //         notify({type: "error", title: "Invalid email", message: "Please check your email format"})
    //         return
    //     }

    //     const formData = new FormData();
    //     formData.append("signupIn", JSON.stringify(signupIn));

    //     axiosClient.post("/signup", formData)
    //     .then(({data}) => {
    //         notify({
    //             type: data.status === 200 ? "success" : "error",
    //             title: data.status === 200 ? "Success" : "Failed",
    //             message: data.message
    //         });

    //         if(data.status === 200) {
    //             onClose();
    //             setUser(data.user); 
    //             setToken(data.token); 
    //             setUserType(data.userType);
    //         }
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         notify({
    //             type: "error",
    //             title: "Error",
    //             message: "Server Error"
    //         });
    //     })
    // }

    const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("loginIn", JSON.stringify(loginIn));

        axiosClient.post("/login", formData)
        .then(({data}) => {
            notify({
                type: data.status === 200 ? "success" : "error",
                title: data.status === 200 ? "Success" : "Failed",
                message: data.message
            });

            if(data.status === 200) {
                onClose();
                setUser(data.user); 
                setToken(data.token); 
                setUserType(data.userType);
            }
        })
        .catch(error => {
            console.error(error);
            notify({
                type: "error",
                title: "Error",
                message: "Server Error"
            });
        })
    }



    /**
     * Render
     */
    return(
        <Modal
        title={"Login"}
        open={true}
        onCancel={onClose}
        footer={null}
        width={500}
        >
            {/* <Segmented<string>
                className="mar-bottom-1"
                options={["Login", "Sign up"]}
                value={mode}
                onChange={(value) => {
                    setMode(value as modeTypes);
                }}
            /> */}

            {/* LOGIN */}
            <form onSubmit={handleLoginSubmit}>
                <label htmlFor="username">Username</label>
                <Input
                className="w-100 mar-bottom-4"
                name="username"
                id="username"
                value={loginIn.username}
                onChange={handleInputChangeLogin}/>

                <label htmlFor="password">Password</label>
                <Input.Password
                className="w-100 mar-bottom-1"
                name="password"
                id="password"
                value={loginIn.password}
                onChange={handleInputChangeLogin}/>

                <div className="d-flex justify-content-end">
                    <Button
                    type="primary"
                    htmlType="submit">
                        Login
                    </Button>
                </div>
            </form>

            {/* SIGN UP */}
            {/* {mode === "Sign up" && (
                <form onSubmit={handleSignupSubmit}>
                    <label htmlFor="fname">First name</label>
                    <Input
                    className="w-100 mar-bottom-4"
                    name="fname"
                    id="fname"
                    value={signupIn.fname}
                    onChange={handleInputChangeSignup}/>

                    <label htmlFor="mname">Middle name (optional)</label>
                    <Input
                    className="w-100 mar-bottom-4"
                    name="mname"
                    id="mname"
                    value={signupIn.mname}
                    onChange={handleInputChangeSignup}/>

                    <label htmlFor="lname">Last name</label>
                    <Input
                    className="w-100 mar-bottom-4"
                    name="lname"
                    id="lname"
                    value={signupIn.lname}
                    onChange={handleInputChangeSignup}/>

                    <label htmlFor="email">Email</label>
                    <Input
                    className="w-100 mar-bottom-4"
                    name="email"
                    id="email"
                    value={signupIn.email}
                    onChange={handleInputChangeSignup}/>

                    <label htmlFor="username">Username</label>
                    <Input
                    className="w-100 mar-bottom-4"
                    name="username"
                    id="username"
                    value={signupIn.username}
                    onChange={handleInputChangeSignup}/>

                    <label htmlFor="password">Password</label>
                    <Input.Password
                    className="w-100 mar-bottom-1"
                    name="password"
                    id="password"
                    value={signupIn.password}
                    onChange={handleInputChangeSignup}/>

                    <div className="d-flex justify-content-end">
                        <Button
                        type="primary"
                        htmlType="submit"
                        disabled={isSignupDisabled}>
                            Signup
                        </Button>
                    </div>
                </form>
            )} */}

        </Modal>
    );
}

export default LoginSignupModal;