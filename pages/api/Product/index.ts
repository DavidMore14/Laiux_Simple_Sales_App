import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()
    if (req.method === 'GET') {
        const products = await prisma.product.findMany();
        res.json(products);
    }else if( req.method === 'POST'){
        const { name, quantity, price, categoryId} = req.body;
        let newProduct = await prisma.product.create ({
            data: {
                name,
                quantity,
                price,
                category:{
                    connect: {id: categoryId}
            }
        },
            include: {
                category : true
        }
        })
        res.json(newProduct);
    }else{
        res.status(404).json({message: "Not Found"})
    }

} 