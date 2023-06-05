import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()
export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    const {method, body, query:{id}} = req;
    let prod
    switch(method) {
        case "GET":
            prod = await prisma.product.findUnique({
                where: {
                    id: Number(id),
                },
                include: {
                    category: true,
                },
            });
            if(prod)res.json(prod)
            else res.status(404).json({message: "Not Found Product"})
            break;
        case "PUT":
            try {
                let categoryId = {...body}.category;
                delete body.category
                prod = await prisma.product.update({
                    where: {
                        id: Number(id),
                    },
                    data: {...body, categoryId},
                    include: {
                        category: true,
                    },
                });
                res.json(prod);
            } catch (error) {
                console.log(error)
                res.json(error);
            }
            break;
        case "DELETE":
            prod = await prisma.product.delete({
                where: {
                    id: Number(id),
                },
            });
            res.json(prod);
            break;
    }
}