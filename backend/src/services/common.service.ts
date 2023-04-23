import bcrypt from 'bcrypt'
import slugify from 'slugify'

class CommonService {
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(Number(process.env.SECRET_PASSWORD))
        return await bcrypt.hash(password, salt)
    }

    async comparePassword(password: string, userPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, userPassword)
    }

    generateSlug(data: string, options?: any) {
        return slugify(`${data} ${Date.now()}`, {
            replacement: '-',
            lower: true,
            locale: 'vi',
            trim: true,
            strict: true,
            ...options,
        })
    }
}

export const commonService = new CommonService()
