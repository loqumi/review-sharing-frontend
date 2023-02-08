import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginErrorCatcher = () => {
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
    }, [isError, user, navigate]);
};

export default LoginErrorCatcher;
