import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const storeUser = (data: { user: { username: string; id: number; }; jwt: string; }) => {
    localStorage.setItem(
        "user",
        JSON.stringify({
            username: data.user.username,
            jwt: data.jwt,
            id: data.user.id
        })
    );
};

export const userData = () => {
    const stringifiedUser = localStorage.getItem("user") || '""';
    return JSON.parse(stringifiedUser)
}

interface ProtectorProps {
    component: JSX.Element;
}

export const Protector = (props: ProtectorProps) => {
    const { component } = props;
    const navigate = useNavigate();

    const { jwt } = userData();

    useEffect(() => {
        if (!jwt) {
            navigate("/");
        }
    }, [navigate, jwt]);

    return component;
};
