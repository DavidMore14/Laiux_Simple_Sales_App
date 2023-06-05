import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()
    if (req.method === 'GET') {
        const categ = await prisma.category.findMany();
        res.json(categ);
    }else if( req.method === 'POST'){
        const {name} = req.body;
        const cat = await prisma.category.create({
            data: {name},
        });
        res.json(cat);
    }
}