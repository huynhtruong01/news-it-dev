import { IUploadImg } from '@/models'

export const uploadImage = async (
    file: File,
    uploadPreset: string = import.meta.env.VITE_UPLOAD_PRESETS_GLOBAL_CLOUDINARY
): Promise<IUploadImg | undefined> => {
    try {
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', uploadPreset)

        const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
            method: 'POST',
            body: formData,
        })

        const data = await res.json()

        return {
            public_id: data.public_id,
            url: data.url,
        }
    } catch (error) {
        throw new Error((error as Error).message as string)
    }
}
