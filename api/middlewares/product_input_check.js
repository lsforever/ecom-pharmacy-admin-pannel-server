const { check } = require('express-validator')


const product_input_check_create = [
    // Product Schema
    check('kind', 'type should not be empty')
        .notEmpty(),
    check('name', 'name should not be empty')
        .notEmpty(),
    check('flag', ' flag (is published) should be a boolean')
        .optional()
        .isBoolean(),
    check('price', 'price should be a number')
        .optional()
        .notEmpty(),
    check('category', 'Category should have a valid category reference id')
        .notEmpty(),
    check('images.*', 'images should be an array with image urls')
        .optional()
        .isURL(),
    check('brand', 'brand should not be empty')
        .optional()
        .notEmpty(),
    check('description', 'Category name should not be empty')
        .optional()
        .notEmpty(),

    // Normal Schema
    check('other', 'Category name should not be empty')
        .optional()
        .notEmpty(),


    // Eye Glass Schema
    check('eye_glass_type', 'Category name should not be empty')
        .optional()
        .notEmpty(),


    // Medicine Schema
    check('special_name', 'Category name should not be empty')
        .optional()
        .notEmpty(),
    check('strength', 'Category name should not be empty')
        .optional()
        .notEmpty(),
    check('medicine_type', 'Category name should not be empty')
        .optional()
        .isArray(),
    check('strip', 'Category name should not be empty')
        .optional()
        .isNumeric(),
    check('box', 'Category name should not be empty')
        .optional()
        .isNumeric(),
    check('company_name', 'Category name should not be empty')
        .optional()
        .isArray(),
    check('generic_name', 'Category name should not be empty')
        .optional()
        .isArray(),

]



const product_input_check_update = [
    // Product Schema

    check('name', 'name should not be empty')
        .optional()
        .notEmpty(),
    check('flag', ' flag (is published) should be a boolean')
        .optional()
        .isBoolean(),
    check('price', 'price should be a number')
        .optional()
        .notEmpty(),
    check('category', 'Category should have a valid category reference id')
        .optional()
        .notEmpty(),
    check('images.*', 'images should be an array with image urls')
        .optional()
        .isURL(),
    check('brand', 'brand should not be empty')
        .optional()
        .notEmpty(),
    check('description', 'Category name should not be empty')
        .optional()
        .notEmpty(),

    // Normal Schema
    check('other', 'Category name should not be empty')
        .optional()
        .notEmpty(),


    // Eye Glass Schema
    check('eye_glass_type', 'Category name should not be empty')
        .optional()
        .notEmpty(),


    // Medicine Schema
    check('special_name', 'Category name should not be empty')
        .optional()
        .notEmpty(),
    check('strength', 'Category name should not be empty')
        .optional()
        .notEmpty(),
    check('medicine_type', 'Category name should not be empty')
        .optional()
        .isArray(),
    check('strip', 'Category name should not be empty')
        .optional()
        .isNumeric(),
    check('box', 'Category name should not be empty')
        .optional()
        .isNumeric(),
    check('company_name', 'Category name should not be empty')
        .optional()
        .isArray(),
    check('generic_name', 'Category name should not be empty')
        .optional()
        .isArray(),

]





module.exports = { product_input_check_create, product_input_check_update }