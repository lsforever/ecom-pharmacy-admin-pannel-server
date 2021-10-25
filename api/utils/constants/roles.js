const roles = {
    // This is the role given to any user including workers , customers, owners etc ...
    basic: 'basic',

    // This is the role given to the owner which is the highest ...
    owner: 'owner',

    // This is the role given to a customer ...
    customer: 'customer',

    // This is the role given to a admin , which is the second highest...
    admin: 'admin',

    // This is the role given to a vendor , vendors can access their items with this role ...
    vendor: 'vendor',

    // This is the role given to a delivery boys and other delivery related users ...
    delivery: 'delivery',

    // Order manager
    order_manager: 'order_manager'
}

module.exports = roles
