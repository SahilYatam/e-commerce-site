import { useSelector } from "react-redux"

const AuthGate = ({children}) => {
    const {loading} = useSelector((state) => state.auth);

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-lg">Initializing session...</p>
            </div>
        )
    }

    return children
}

export default AuthGate