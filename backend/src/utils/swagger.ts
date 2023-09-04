import swaggerJsdoc from 'swagger-jsdoc'
import { version } from '../../package.json'
import { Express, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import { log } from '@/utils'

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'News API Docs',
            version,
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.route.ts', './src/entities/*.ts'],
}

const swaggerSpec = swaggerJsdoc(options)

export function swaggerDocs(app: Express, port: number) {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })

    log.info(`Docs available at http://localhost:${port}/docs`)
}
