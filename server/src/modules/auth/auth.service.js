const { NotFoundError } = require('../../utils/errors.js');
const BaseService = require('../base/base.service.js');
const bcrypt = require('bcryptjs');
const {
    convertFileNameWithPdfExt,
    convertFileNameWithWebpExt,
    convertImgArrayToObject,
    convertObjOriginalImgNameWithWebpExt,
    removeUploadFile,
    uploadWorker,
} = require('../../middleware/upload/index.js');
const { isMainThread } = require('worker_threads');
const { generateAccessToken, generateRefreshToken } = require('../../utils/jwt.js');
const authRepository = require('./auth.repository.js');
const isArrayElementExist = require('../../utils/isArrayElementExist.js');
const OTPGenerate = require('../../utils/OTPGenerate.js');
const Email = require('../../utils/Email.js');
const membershipRepository = require('../membership/membership.repository.js');


class AuthService extends BaseService {
    #repository;
    #membershipRepository;
    constructor(repository, membershipRepository, serviceName) {
        super(repository, membershipRepository, serviceName);
        this.#repository = repository;
        this.#membershipRepository = membershipRepository;
    }

    async authUserSingUp(payload, session) {
        const { name, email, phone, password } = payload;
        if (!name || !phone || !password) {
            throw new Error('name, phone and password are required');
        }
        if (phone.length !== 11) {
            throw new Error('Phone Number Must be 11 digits');
        }
        if (password.length < 5) {
            throw new Error('Password must be at least 5 characters');
        }
        if (email) {
            const auth = await this.#repository.getAuthByEmail(email);
            if (auth) throw new Error('Email already exists');
        }
        const auth = await this.#repository.getAuthByPhone(phone);
        if (auth) throw new Error('Phone already exists');
        const hashedPassword = await bcrypt.hash(String(password), 10);
        payload.password = hashedPassword;
        const authData = await this.#repository.authUserSingUp(payload, session);
        return authData;
    }

    async authUserSingIn(payload) {
        const { email, phone, password } = payload;



        const auth = await this.#repository.getAuthByEmailOrPhone(email, phone);
        if (!auth) throw new NotFoundError('unauthorized access');
        const isPasswordMatch = await bcrypt.compare(String(password), auth?.password);
        if (!isPasswordMatch) throw new NotFoundError('unauthorized access');
        const user_info_encrypted = {
            id: auth?._id || null,
            name: auth?.name || null,
            email: auth?.email || null,
            role: auth?.role || null
        };

        const accessToken = generateAccessToken({ userInfo: { user_info_encrypted } });
        const refreshToken = generateRefreshToken({ userInfo: { user_info_encrypted } });

        return {
            accessToken: `Bearer ${accessToken}`,
            refreshToken: `Bearer ${refreshToken}`,
            user: user_info_encrypted,
        };
    }

    async authForgetPassword(payload, session) {
        const { email } = payload;
        if (!email) {
            throw new Error('email is required');
        }

        const auth = await this.#repository.getAuthByEmail(email);
        if (!auth) throw new NotFoundError('No user found');
        const OTP = await OTPGenerate()

        const stockAlertEmail = new Email({ email: auth?.email, name: auth?.name }, OTP);
        await stockAlertEmail.sendForgetPasswordOTP();
        await this.#repository.setUserOTP(auth?._id, OTP);
        return true;
    }

    async authForgetPasswordVarification(payload, session) {
        const { email, otp, password } = payload;
        if (!email || !otp || !password) {
            throw new Error('email, OTP and password are required');
        }
        const auth = await this.#repository.getAuthByEmail(email);
        if (!auth) throw new NotFoundError('No user found');
        // auth.otpTime 5min 
        if (auth.otpTime < Date.now() - 5 * 60 * 1000) throw new Error('OTP expired');

        if (otp != auth?.otp) throw new Error('Invalid OTP');
        const newPassword = await bcrypt.hash(String(password), 10);
        await this.#repository.updateUserPassword(auth?._id, newPassword);
        return true;
    }

    async getUserById(userId, session) {
        // 

        const user = await this.#repository.getUserById(userId, session);
        if (!user) throw new NotFoundError('User not found');
        return user;
    }

    async getAllUserWithPagination(payload) {
        const users = await this.#repository.getAllUserWithPagination(payload);
        return users;
    }

    async getSingleUser(id, session) {
        const user = await this.#repository.getUserById(id, session);
        if (!user) throw new NotFoundError('User not found');
        return user;
    }

    async updateUser(userId, payloadFiles, payload, session) {

        const { dles } = payloadFiles;
        const user = await this.#repository.getUserById(userId, session);
        if (!user) throw new NotFoundError('User not found');
        if (files.length) {
            let images;
            if (isArrayElementExist(files) && isMainThread) {
                const imgFile = files.map(
                    ({ buffer, originalname, fieldname, mimetype }) => ({
                        buffer,
                        originalname:
                            mimetype == "application/pdf"
                                ? convertFileNameWithPdfExt(originalname)
                                : convertFileNameWithWebpExt(originalname),
                        fieldname,
                        mimetype,
                    })
                );
                await uploadWorker(imgFile);
                images = convertImgArrayToObject(imgFile);
            }

            for (const key in images) {
                payload[key] = images[key];
            }
        }
        const userData = await this.#repository.updateById(userId, payload);
        // Remove old file  
        if (user.photo && user.photo !== payload.photo) {
            await removeUploadFile(user.photo)
        }
        return userData;

    }

    async deleteUser(id, session) {
        const user = await this.#repository.deleteById(id, session);
        const membership = await this.#membershipRepository.deleteMembershipByUserId(id, session);
        if (!user) throw new NotFoundError('User not found');
        return user;
    }



}

module.exports = new AuthService(authRepository, membershipRepository, 'auth');

