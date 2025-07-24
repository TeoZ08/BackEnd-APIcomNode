import express from "express";
import { PrismaClient } from '@prisma/client';
import cors from "cors";

const prisma = new PrismaClient()

const app = express();
app.use(express.json()); // Middleware para interpretar JSON
app.use(cors()); // Middleware para permitir CORS


app.post("/usuarios", async (req, res) => {

    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            dataNascimento: new Date(req.body.dataNascimento),
            telefone: req.body.telefone,
        }
    })

    res.status(201).json(req.body);
})

app.get("/usuarios", async (req, res) => {

    let users = [];

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name:
                    req.query.name,

                email:
                    req.query.email,

                dataNascimento: new Date(req.body.dataNascimento),

                telefone: req.query.telefone, // Filtra por telefone

            }
        });

    } else {
        users = await prisma.user.findMany();
    }



    res.status(200).json(users);

}) //app.post("/usuarios",) app.put("/usuarios",) app.delete("/usuarios",)

app.put("/usuarios/:id", async (req, res) => {
    // Validação para garantir que o corpo da requisição não está vazio
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Corpo da requisição ausente ou vazio." });
    }

    try {
        const user = await prisma.user.update({
            where: { id: req.params.id },
            data: {
                name: req.body.name,
                email: req.body.email,
                dataNascimento: req.body.dataNascimento ? new Date(req.body.dataNascimento) : undefined,
                telefone: req.body.telefone,
            }
        });
        res.status(200).json(user);
    } catch (error) {
        // Erro pode ser "usuário não encontrado" ou dados inválidos
        console.error("Erro ao atualizar usuário:", error);
        res.status(404).json({ message: "Não foi possível atualizar o usuário." });
    }
});

app.delete("/usuarios/:id", async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id,
        },
    })
    res.status(200).json({ message: "Usuário deletado com sucesso!" });
})

app.listen(3000);

/*  
    Criar nossa API de usuários
    - Criar um usuario
    - Listar todos os usuarios
    - Editar um usuario
    - Deletar um usuario
*/ 