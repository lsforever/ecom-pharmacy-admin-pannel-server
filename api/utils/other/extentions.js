const generateTokenPayload = (user) => {

    const rolesAvailable = user.roles
        .filter(role => role.flag)
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
