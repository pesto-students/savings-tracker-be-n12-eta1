function makeErrorsArray(error) {
    const errorFields = error.errors ? Object.keys(error.errors) : [];
    let errors = [];

    if (errorFields.length > 0) {
        errors = errorFields.map(field => error.errors[field].message);
    } else {
        errors = ['Bad Request'];
    }

    return errors;
}

export {makeErrorsArray}