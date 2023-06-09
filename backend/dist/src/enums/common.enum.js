"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.IsActive = exports.IsAdmin = exports.Status = exports.Results = exports.StatusText = exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["SUCCESS"] = 200] = "SUCCESS";
    StatusCode[StatusCode["CREATED"] = 201] = "CREATED";
    StatusCode[StatusCode["DELETED"] = 204] = "DELETED";
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCode[StatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCode[StatusCode["ERROR"] = 500] = "ERROR";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
var StatusText;
(function (StatusText) {
    StatusText["SUCCESS"] = "success";
    StatusText["FAILED"] = "failed";
    StatusText["ERROR"] = "error";
})(StatusText = exports.StatusText || (exports.StatusText = {}));
var Results;
(function (Results) {
    Results["SUCCESS"] = "true";
    Results["ERROR"] = "false";
})(Results = exports.Results || (exports.Results = {}));
var Status;
(function (Status) {
    Status["ASC"] = "ASC";
    Status["DESC"] = "DESC";
})(Status = exports.Status || (exports.Status = {}));
var IsAdmin;
(function (IsAdmin) {
    IsAdmin[IsAdmin["ADMIN"] = 1] = "ADMIN";
    IsAdmin[IsAdmin["USER"] = 0] = "USER";
})(IsAdmin = exports.IsAdmin || (exports.IsAdmin = {}));
var IsActive;
(function (IsActive) {
    IsActive[IsActive["ACTIVE"] = 1] = "ACTIVE";
    IsActive[IsActive["INACTIVE"] = 0] = "INACTIVE";
})(IsActive = exports.IsActive || (exports.IsActive = {}));
var Order;
(function (Order) {
    Order["ASC"] = "ASC";
    Order["DESC"] = "DESC";
})(Order = exports.Order || (exports.Order = {}));
