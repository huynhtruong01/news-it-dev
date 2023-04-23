export enum StatusCode {
    SUCCESS = 200,
    CREATED = 201,
    DELETED = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    ERROR = 500,
}

export enum StatusText {
    SUCCESS = 'success',
    FAILED = 'failed',
    ERROR = 'error',
}

export enum Results {
    SUCCESS = 'true',
    ERROR = 'false',
}
