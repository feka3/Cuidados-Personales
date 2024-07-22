export default function validateappointment(values) {
    const errors = {};

    if (!values.date) {
        errors.password = 'Required';
    }

    if (!values.time) {
        errors.username = 'Required';
    }

    return errors;
}

