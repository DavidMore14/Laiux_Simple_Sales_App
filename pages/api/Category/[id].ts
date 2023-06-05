import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()
export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    const {method, body, query:{id}} = req;
    let catg
    switch(method) {
        case "GET":
            catg = await prisma.category.findUnique({
                where: {
                    id: Number(id),
                },
            });
            if(catg)res.json(catg)
            else res.status(404).json({message: "Not Found Category"})
            break;
        case "PUT":
            try {
                catg = await prisma.category.update({
                    where: {
                        id: Number(id),
                    },
                    data: body,
                });
                res.json(catg);
            } catch (error) {
                console.log(error)
                res.json(error);
            }
            break;
        case "DELETE":
            catg = await prisma.category.delete({
                where: {
                    id: Number(id),
                },
            });
            res.json(catg);
            break;
    }
}