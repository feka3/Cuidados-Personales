export const validate = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Requerido';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Email inválido';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Debe tener 6 caracteres o más';
    }

    if (!values.name) {
        errors.name = 'Required';
    } else if (
        !/^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/i.test(values.name)
    ) {
        errors.name = 'Ingresa nombre y apellido';
    }

    if (!values.birthdate) {
        errors.birthdate = 'Required';
    } else if (
        !/^(?:(?:19|20)\d{2})-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)$/.test(values.birthdate)
    ) {
        errors.birthdate = 'Ingresa fecha de nacimiento';
    }

    if (!values.nDni) {
        errors.nDni = 'Required';
    } else if (
        !/^[0-9]{7,}$|^([A-Z]{1,2})?[0-9]{6}[A-Z]$/.test(values.nDni)
    ) {
        errors.nDni = 'Ingresa un DNI valido';
    }

    if (!values.username) {
        errors.username = 'Required';
    } else if (
        !/^[a-zA-Z0-9_]{5,16}$/.test(values.username)
    ) {
        errors.username = 'Ingresa un usuario valido';
    }


    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required';
    } else if (values.confirmPassword.length < 6) {
        errors.password = 'Debe tener 6 caracteres o más';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return errors;
}