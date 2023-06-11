import { IMAGE_PREVIEW } from '@/consts'
import { Helmet } from 'react-helmet-async'

export interface ISeoProps {
    title: string
    description?: string
    image?: string
    url?: string
}

export function Seo({
    title,
    description = '',
    image = IMAGE_PREVIEW,
    url = window.location.href,
}: ISeoProps) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="image" content={image} />
            <meta property="og:image:width" content="600" />
            <meta property="og:image:height" content="314" />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    )
}
