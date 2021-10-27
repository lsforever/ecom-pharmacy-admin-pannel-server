const generateTokenPayload = (user) => {

    const rolesAvailable = user.roles
        .map(role => role.type)

    const payload = {
        user: {
            id: user.id,
            roles: rolesAvailable
        }
    }
 
    return payload
}

module.exports = { generateTokenPayload }
