const generateTokenPayload = (user) => {

    const payload = {
        user: {
            id: user.id,
            roles: user.roles
        }
    }

    return payload
}

module.exports = { generateTokenPayload }
