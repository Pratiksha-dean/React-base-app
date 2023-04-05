
export const passwordRegex =
    /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;

export const setToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token))
}

export const getToken = () => {
    if (typeof window !== 'undefined') {
        return (localStorage.getItem('token') || '')
    }

}

export const logout = () => {
    return (localStorage.removeItem('token'))
}


export const rememberCreds = (creds) => {
    return localStorage.setItem('creds', JSON.stringify(creds));
}

export const getCreds = () => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('creds') || '{}');
    }

}

export const removeCreds = () => {
    return (localStorage.removeItem('creds'))
}

export const fieldNames = {
    FIRSTNAME: "firstName",
    LASTNAME: "lastName",
    EMAIL: "email",
    PHONE: "phone",
    PASSWORD: "password",
    CONFIRMPASSWORD: "confirmPassword",
    CURRENTPASSWORD: "currentpassword",
};


