import fs from 'fs';
import { resolve } from 'path';
import Image from '../models/Image';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const file = await Image.create({
      name,
      path,
    });

    return res.json(file);
  }

  async delete(req, res) {
    const { id } = req.params;

    const file = await Image.findByPk(id);

    // fs.unlink(resolve('tmp', 'uploads', file.path), err => {
    //   if (err) throw err;
    // });

    await file.destroy({
      where: { id },
    });
    return res.json(file);
  }

  async update(req, res) {
    const { id } = req.params;
    const file = await Image.findByPk(id);
    await file.update({
      main: true,
    });
    return res.json(file);
  }
}

export default new FileController();
