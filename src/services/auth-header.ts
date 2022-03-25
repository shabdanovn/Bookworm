

const AuthHeader = () => {
    const token = JSON.parse(localStorage.getItem('token') || "")

    // if(token) return {Authorization: 'Bearer ' + token}
    if(token) return token
    else return {}
}

export default AuthHeader
