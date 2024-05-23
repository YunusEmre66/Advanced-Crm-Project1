import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
require('dotenv').config();
import cors = require("cors")
import { getUserFromJWT } from "./utility/getUserIdFromJWT"

AppDataSource.initialize().then(async () => {
    // test
    // create express app
    const app = express()
    app.use(bodyParser.json())
    app.use(express.static('public'))
    app.use(cors({ credentials: true }))

    // app.get('/api/user(s)?|(user-)?list|ab+', async (req: Request, res: Response) => {
    //     res.send('Hello World!')   
    // })
    // /api/users
    // /api/user-list

    // app.get(/^\/api\/doc(s|umentation)$/, async (req: Request, res: Response) => {
    //     res.send('Hello World!')   
    // })
    // /api/docs
    // /api/documentation

    // app.get('/api/user/:year([0-9]{4})-:month([0-9]{2})-:day([0-9]{2})', async (req: Request, res: Response) => {
    //     console.log(req.params.month);
        
    //     res.send(req.params)   
    // })
    // /api/user/2023-12-18

    app.all('*', async (request: Request, response: Response, next: NextFunction) => {
        console.log('bir istek yapıldı');
        if (request.url.endsWith('/login') || request.url.endsWith('/register')) {
            next()
        } else {
            try {
                const user: any = await getUserFromJWT(request)

                if (user.confirmed === 'approval' || user.confirmed === 'email') {
                    if (request.url.endsWith('/is-login')) {
                        response.status(200).json({ status: true })
                    } else {
                        next()
                    }
                } else {
                    response.status(401).json({ status: false, message: 'yetkilendirme hatası. lütfen yöneticiye danışın' })
                }
            } catch (error: any) {
                response.status(401).json({ status: false, message: error.message })
            }
        }
    })

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](`/api/v1${route.route}`, async (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    app.use((error: any, request: Request, response: Response, next: NextFunction) => {
        return response.status(error.status).json({
            status: false, 
            code: error.error.code, 
            errno: error.error.errno, 
            message: error.error.message
        })
     })

    // start express server
    app.listen(process.env.PORT)
    console.log("Express server has started on port " + process.env.PORT)
}).catch(error => console.log(error))
