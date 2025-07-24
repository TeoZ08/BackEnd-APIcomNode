import express from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

// ROTA POST (Criar Usuário)
app.post("/usuarios", async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                dataNascimento: req.body.dataNascimento ? new Date(req.body.dataNascimento) : null,
                telefone: req.body.telefone,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ message: "Ocorreu um erro ao criar o usuário." });
    }
});

// ROTA GET (Listar Usuários com Filtros) - VERSÃO CORRIGIDA
app.get("/usuarios", async (req, res) => {
    try {
        const { name, email, dataNascimento } = req.query; // <-- CORREÇÃO: Usando req.query
        const where = {};

        if (name) {
            where.name = { contains: name, mode: 'insensitive' };
        }
        if (email) {
            where.email = { contains: email, mode: 'insensitive' };
        }
        // Filtro por data de nascimento (se fornecido)
        if (dataNascimento) {
            // CORREÇÃO: Usando req.query e convertendo para data
            where.dataNascimento = new Date(dataNascimento);
        }

        const users = await prisma.user.findMany({ where });
        res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao listar usuários:", error);
        res.status(500).json({ message: "Ocorreu um erro ao listar os usuários." });
    }
});

// ROTA PUT (Atualizar Usuário)
app.put("/usuarios/:id", async (req, res) => {
    try {
        const { name, email, dataNascimento, telefone } = req.body;
        const updateData = {};

        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (telefone) updateData.telefone = telefone;
        if (dataNascimento) updateData.dataNascimento = new Date(dataNascimento);

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "Nenhum dado fornecido para atualização." });
        }

        const user = await prisma.user.update({
            where: { id: req.params.id },
            data: updateData,
        });
        res.status(200).json(user);
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(404).json({ message: "Não foi possível atualizar o usuário." });
    }
});

// ROTA DELETE (Deletar Usuário)
app.delete("/usuarios/:id", async (req, res) => {
    try {
        await prisma.user.delete({
            where: { id: req.params.id },
        });
        res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(404).json({ message: "Usuário não encontrado." });
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});