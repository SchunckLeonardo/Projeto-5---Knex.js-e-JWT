class Validation {

    fieldValidation(field) {
        if (field == undefined || field == "" || field == " ") {
            return true
        } else {
            return false
        }
    }

}

module.exports = new Validation()