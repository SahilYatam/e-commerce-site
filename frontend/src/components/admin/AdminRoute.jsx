import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { user, loading } = useSelector((state) => state.auth);
    if(loading) return null;

    // if (!user) return <Navigate to="/login" replace />;
    if (!user || user.role !== "seller") {
        return <Navigate to="/" replace />
    }

    return children;
}

export default AdminRoute