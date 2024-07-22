function getNextDate() {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000); // Suma 24 horas (en milisegundos) al día de hoy

    const year = tomorrow.getFullYear();
    let month = tomorrow.getMonth() + 1;
    let day = tomorrow.getDate();

    // Agrega un 0 delante si el mes o el día es menor que 10 para asegurarte de que estén en el formato de dos dígitos (por ejemplo, '01' en lugar de '1')
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
}

export default getNextDate;
