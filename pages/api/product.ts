import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()
    if (req.method === 'GET') {
        const users = await prisma.product.findMany();
        res.json(users);
    }else if( req.method === 'POST'){
        const { name, quantity, price, categoryId} = req.body;
        let newProduct: Prisma.ProductCreateInput = {
            name,
            quantity,
            price,
            category:{
                connect: {
                    id: categoryId
                }
            }
        };
        const user = await prisma.product.create({
            data: newProduct,
        });
        res.json(user);
    }
}