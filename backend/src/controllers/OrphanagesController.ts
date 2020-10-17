import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";

import Orphanage from "../models/Orphanage";
import OrphanageView from "../views/orphanages_view";

export default {
  async index(req: Request, res: Response) {
    const OrphanageRepository = getRepository(Orphanage);

    const orphanages = await OrphanageRepository.find({
      relations: ["images"],
    });

    return res.json(OrphanageView.renderMany(orphanages));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const OrphanageRepository = getRepository(Orphanage);

    const orphanage = await OrphanageRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return res.json(OrphanageView.render(orphanage));
  },

  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const OrphanageRepository = getRepository(Orphanage);

    // No typescript, o multer não entende que o files, está vindo um array de arquivos. Ṕor isso usa o AS
    const requestImages = req.files as Express.Multer.File[];

    let images: Array<{ path: string }> = [];

    if (requestImages) {
      images = requestImages.map((image) => {
        return { path: image.filename };
      });
    }
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: String(open_on_weekends) === 'true',
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    await schema.validate(data, {
      // Se econtrar um campo que não está valido, por padrão ele retorna só aquele error
      // Se utilizar false, ele vai retornar TODOS os campos que não está valido
      abortEarly: false,
    });

    // .create ele só deixa o dado pre-criado, Então ele não vai salvar no banco de dados
    const orphanage = OrphanageRepository.create(data);

    // Então para salvar no banco prencisamos usar o .save
    await OrphanageRepository.save(orphanage);

    res.status(201).json(orphanage);
  },
};
