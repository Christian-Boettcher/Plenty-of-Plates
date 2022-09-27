package com.techelevator.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.BAD_REQUEST, reason = "This e-mail address has already been registered.")
public class EmailAlreadyExistsException extends RuntimeException {
}
