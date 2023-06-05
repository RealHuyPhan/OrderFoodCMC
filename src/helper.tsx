

export const storeUser = (data: any) => {
    localStorage.setItem(
        "user",
        JSON.stringify({
            username: data.user.username,
            jwt: data.jwt,
            id: data.user.id
        })
    );
};

