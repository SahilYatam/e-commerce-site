import SignupForm from "../components/auth/SignupForm"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { clearMessages } from "../features/auth/authSlice";
import { signUp } from "../features/auth/authThunks";

const SignupPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        dispatch(clearMessages())
    }, [dispatch])


    const handleSignup = async (formdata) => {
        dispatch(signUp(formdata))
    }


    return <SignupForm onSubmit={handleSignup} loading={loading}/>
}

export default SignupPage