const nameRegexp = /(([A-Za-z]+[,.]?[ ]?|[a-z]+['-]?)+)$/;

const emailRegexp =
  /^[\w!#$%^&*\-=/{}[\]_|`~?\\+][\w!#$%^&*\+\-?=/{}[\]_|`~\\.]{1,62}[\w!#$%^&*\-=/{}+[\]_|`~?\\]@([\w]+\.){1,20}[\w]{1,4}$/;

const passwordRegexp = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

// const phoneRegexp = /^(?=.*[0-9])$/;
const phoneRegexp = /^[+0-9]{13}$/;
  
const descriptionRegexp = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

module.exports = {nameRegexp, emailRegexp, passwordRegexp, phoneRegexp, descriptionRegexp};