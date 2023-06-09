"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const config_1 = require("../config");
const consts_1 = require("../consts");
const entities_1 = require("../entities");
const enums_1 = require("../enums");
const services_1 = require("../services");
const google_auth_library_1 = require("google-auth-library");
const fetch = (...args) => Promise.resolve().then(() => __importStar(require('node-fetch'))).then(({ default: fetch }) => fetch(...args));
const client = new google_auth_library_1.OAuth2Client(`${process.env.CLIENT_ID}`);
// const CLIENT_URL = `${process.env.BASE_URL}`
// login user
const loginUser = (user, password, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkPassword = yield services_1.commonService.comparePassword(password, user === null || user === void 0 ? void 0 : user.password);
        if (!checkPassword) {
            res.status(enums_1.StatusCode.BAD_REQUEST).json({
                results: enums_1.Results.ERROR,
                status: enums_1.StatusText.FAILED,
                message: 'Incorrect password.',
            });
            return;
        }
        // generate token: access & refresh
        const accessToken = services_1.authService.signAccessToken(user.id);
        const refreshToken = services_1.authService.signRefreshToken(user.id);
        res.status(enums_1.StatusCode.SUCCESS).json({
            results: enums_1.Results.SUCCESS,
            status: enums_1.StatusText.SUCCESS,
            data: {
                user,
                accessToken,
                refreshToken,
            },
        });
    }
    catch (error) {
        throw new Error(error);
    }
});
// register user
const registerUser = (data, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield services_1.userService.create(data);
        // generate token: access & refresh
        const accessToken = services_1.authService.signAccessToken(user.id);
        const refreshToken = services_1.authService.signRefreshToken(user.id);
        res.status(enums_1.StatusCode.SUCCESS).json({
            results: enums_1.Results.SUCCESS,
            status: enums_1.StatusText.SUCCESS,
            data: {
                user,
                accessToken,
                refreshToken,
            },
        });
    }
    catch (error) {
        throw new Error(error);
    }
});
class AuthController {
    constructor(userRepository = config_1.AppDataSource.getRepository(entities_1.User)) {
        this.userRepository = userRepository;
    }
    // signup (POST)
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check email has exits
                const { emailAddress, username } = req.body;
                const isEmailExist = yield services_1.authService.checkEmailOrUsername(emailAddress);
                const isUsernameExist = yield services_1.authService.checkEmailOrUsername(username);
                // check username has exits
                if (isEmailExist || isUsernameExist) {
                    res.status(enums_1.StatusCode.BAD_REQUEST).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Email or username already exits.',
                    });
                    return;
                }
                // generate token & send email
                const activeToken = services_1.authService.signActiveToken(req.body);
                if (emailAddress) {
                    const token = encodeURIComponent(activeToken).split('.').join('_');
                    const url = `${process.env.BASE_URL}/active/${token}`;
                    yield (0, config_1.sendEmail)(emailAddress, url, 'Verify your email address.');
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        message: 'Sign up account success. Please check your email.',
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // active token
    activeUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bearer = req.headers['authorization'];
                if (!bearer) {
                    res.status(enums_1.StatusCode.FORBIDDEN).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found authorization.',
                    });
                    return;
                }
                const token = bearer.split('.')[1];
                const decode = services_1.authService.verifyTokenBuffer(token);
                if (!decode.newUser) {
                    res.status(enums_1.StatusCode.BAD_REQUEST).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not valid authentication.',
                    });
                    return;
                }
                // check email & username exist
                const isEmailExist = yield services_1.authService.checkEmailOrUsername(decode.newUser.emailAddress);
                const isUsernameExist = yield services_1.authService.checkEmailOrUsername(decode.newUser.username);
                if (isEmailExist || isUsernameExist) {
                    res.status(enums_1.StatusCode.BAD_REQUEST).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Email or username already exits.',
                    });
                    return;
                }
                const user = yield services_1.userService.create(decode.newUser);
                res.status(enums_1.StatusCode.CREATED).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        user,
                        message: 'Active user success.',
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // login (POST)
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check email and password
                const { emailAddress, password } = req.body;
                if (!emailAddress || !password) {
                    res.status(enums_1.StatusCode.BAD_REQUEST).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Missing email or password.',
                    });
                    return;
                }
                // check email has exits
                const user = yield services_1.authService.getByEmail(emailAddress);
                if (!user) {
                    res.status(enums_1.StatusCode.BAD_REQUEST).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Wrong email.',
                    });
                    return;
                }
                // check compare password
                const checkPassword = yield services_1.commonService.comparePassword(password, user.password);
                if (!checkPassword) {
                    res.status(enums_1.StatusCode.BAD_REQUEST).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Wrong password.',
                    });
                    return;
                }
                // config password
                user.password = undefined;
                // return access and refresh token
                const accessToken = services_1.authService.signAccessToken(user.id);
                const refreshToken = services_1.authService.signRefreshToken(user.id);
                services_1.authService.setCookieToken(res, process.env.ACCESS_TOKEN_KEY, accessToken, consts_1.MAX_AGE_ACCESS_TOKEN);
                services_1.authService.setCookieToken(res, process.env.REFRESH_TOKEN_KEY, refreshToken);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        user,
                        accessToken,
                        refreshToken,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // logout (GET)
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = req.cookies[process.env.ACCESS_TOKEN_KEY];
                const refreshToken = req.cookies[process.env.REFRESH_TOKEN_KEY];
                if (accessToken) {
                    res.clearCookie(process.env.ACCESS_TOKEN_KEY);
                }
                if (refreshToken) {
                    res.clearCookie(process.env.REFRESH_TOKEN_KEY);
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        message: 'Logout successfully.',
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // refresh token (POST)
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // check freshToken
                // const token = req.cookies[process.env.REFRESH_TOKEN_KEY as string]
                const token = req.body.token;
                if (!token) {
                    res.status(enums_1.StatusCode.UNAUTHORIZED).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Unauthorized. Login now.',
                    });
                    return;
                }
                // verify refreshToken
                const { id } = services_1.authService.verifyToken(token);
                const user = yield services_1.userService.getById(Number(id));
                // check user
                if (!user) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found this user.',
                    });
                    return;
                }
                // generate token: access, refresh; set cookies
                const accessToken = services_1.authService.signAccessToken(user.id);
                const refreshToken = services_1.authService.signRefreshToken(user.id);
                services_1.authService.setCookieToken(res, process.env.ACCESS_TOKEN_KEY, accessToken, consts_1.MAX_AGE_ACCESS_TOKEN);
                services_1.authService.setCookieToken(res, process.env.REFRESH_TOKEN_KEY, refreshToken);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        user,
                        accessToken,
                        refreshToken,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // google login
    googleLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tokenId } = req.body;
                const verify = yield client.verifyIdToken({
                    idToken: tokenId,
                    audience: `${process.env.CLIENT_ID}`,
                });
                const { email, email_verified, name, picture, given_name, family_name } = verify.getPayload();
                if (!email_verified) {
                    res.status(enums_1.StatusCode.ERROR).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Email verification failed.',
                    });
                    return;
                }
                const password = `${email}`;
                const user = yield services_1.authService.getByEmail(email);
                if (user) {
                    yield loginUser(user, password, res);
                }
                else {
                    const dataUser = {
                        username: name,
                        avatar: picture,
                        password,
                        roleIds: [2],
                        emailAddress: email,
                        firstName: given_name,
                        lastName: family_name,
                        type: 'google',
                    };
                    yield registerUser(dataUser, res);
                }
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // facebook login
    facebookLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { accessToken, userId } = req.body;
                const URL = `
                https://graph.facebook.com/v16.0/${userId}/?fields=id,name,email,picture,first_name,last_name&access_token=${accessToken}
            `;
                const data = yield fetch(URL)
                    .then((res) => res.json())
                    .then((res) => res);
                const { email, name, picture, first_name, last_name } = data;
                const password = email;
                const user = yield services_1.authService.getByEmail(email);
                if (user) {
                    loginUser(user, password, res);
                }
                else {
                    const dataUser = {
                        username: name,
                        avatar: picture.data.url,
                        password,
                        roleIds: [2],
                        emailAddress: email,
                        firstName: first_name,
                        lastName: last_name,
                        type: 'facebook',
                    };
                    registerUser(dataUser, res);
                }
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // github login
    githubLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { code } = req.body;
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // change password (POST)
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { emailAddress, password, confirmPassword } = req.body;
                const user = yield services_1.authService.getByEmail(emailAddress);
                if (!user) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: `Not found this user with email ${emailAddress}.`,
                    });
                    return;
                }
                const checkPassword = yield services_1.commonService.comparePassword(password, user.password);
                if (!checkPassword) {
                    res.status(enums_1.StatusCode.BAD_REQUEST).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: `Wrong password.`,
                    });
                    return;
                }
                const hashPassword = yield services_1.commonService.hashPassword(confirmPassword);
                user.password = hashPassword;
                const newUser = yield services_1.userService.update(user.id, user);
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        user: newUser,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // check email (POST)
    checkEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const hasUserByEmail = yield services_1.authService.checkEmailOrUsername(email);
                if (!hasUserByEmail) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'This user is invalid.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        message: 'Email is valid.',
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // delete your self (DELETE)
    deleteMe(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) {
                    const user = yield services_1.userService.delete(Number(req.user.id));
                    if (!user) {
                        res.status(enums_1.StatusCode.NOT_FOUND).json({
                            results: enums_1.Results.ERROR,
                            status: enums_1.StatusText.FAILED,
                            message: 'Not found this user to delete your account.',
                        });
                        return;
                    }
                    res.status(enums_1.StatusCode.DELETED).json({
                        results: enums_1.Results.SUCCESS,
                        status: enums_1.StatusText.SUCCESS,
                        data: null,
                    });
                    return;
                }
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // verify user (GET)
    verifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bearer = req.headers['authorization'];
                if (!bearer) {
                    res.status(enums_1.StatusCode.FORBIDDEN).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: "You don't login.",
                    });
                    return;
                }
                const token = bearer.split(' ')[1];
                // verify token
                const { id } = services_1.authService.verifyToken(token);
                // check user
                const user = yield services_1.userService.getById(Number(id));
                if (!user) {
                    res.status(enums_1.StatusCode.UNAUTHORIZED).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Unauthorized.',
                    });
                    return;
                }
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        user,
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // confirm email
    confirmEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { emailAddress } = req.body;
                const user = yield services_1.userService.getByEmail(emailAddress);
                if (!user) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: `Not found this user with email ${emailAddress}`,
                    });
                    return;
                }
                if (user.type !== consts_1.TYPE_REGISTER) {
                    res.status(enums_1.StatusCode.ERROR).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: `Can't reset password by email of ${user.type}`,
                    });
                    return;
                }
                const accessToken = services_1.authService.signAccessToken(user.id);
                const token = encodeURIComponent(accessToken).replaceAll('.', '_');
                const url = `${process.env.BASE_URL}/forgot-password/${token}`;
                yield (0, config_1.sendEmail)(emailAddress, url, 'Forgot password');
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        message: 'Check your email',
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
    // forgot password (POST)
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, confirmPassword } = req.body;
                const bearer = req.headers['authorization'];
                if (!bearer) {
                    res.status(enums_1.StatusCode.FORBIDDEN).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Not found authorization.',
                    });
                    return;
                }
                const token = bearer.split('.')[1];
                const decode = services_1.authService.verifyTokenBuffer(token);
                const user = yield services_1.userService.getByIdNoRelation(Number(decode.id));
                if (!user) {
                    res.status(enums_1.StatusCode.NOT_FOUND).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: `Not found this user by id`,
                    });
                    return;
                }
                if (password !== confirmPassword) {
                    res.status(enums_1.StatusCode.BAD_REQUEST).json({
                        results: enums_1.Results.ERROR,
                        status: enums_1.StatusText.FAILED,
                        message: 'Password is not equal confirm password',
                    });
                    return;
                }
                const hashPassword = yield services_1.commonService.hashPassword(password);
                user.password = hashPassword;
                const newUser = (yield services_1.userService.updateAll(user.id, user, true));
                res.status(enums_1.StatusCode.SUCCESS).json({
                    results: enums_1.Results.SUCCESS,
                    status: enums_1.StatusText.SUCCESS,
                    data: {
                        user: newUser,
                        message: 'Change password successfully',
                    },
                });
            }
            catch (error) {
                res.status(enums_1.StatusCode.ERROR).json({
                    results: enums_1.Results.ERROR,
                    status: enums_1.StatusText.ERROR,
                    message: error.message,
                });
            }
        });
    }
}
exports.authController = new AuthController();
