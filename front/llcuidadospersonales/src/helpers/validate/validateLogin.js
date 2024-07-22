export const validateLogin = (values) => {
    const errors = {};

    if (!values.password) {
        errors.password = 'Required';
    }

    if (!values.username) {
        errors.username = 'Required';
    }



    return errors;
}