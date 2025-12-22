import LoginForm from "../components/auth/LoginForm"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { clearMessages } from "../features/auth/authSlice";
import { login } from "../features/auth/authThunks";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])

    useEffect(() => {
        dispatch(clearMessages())
    }, [dispatch])


    const handleLogin = async(formdata) => {
        dispatch(login(formdata))
    }


    return <LoginForm onSubmit={handleLogin} loading={loading}/>
}

export default LoginPage