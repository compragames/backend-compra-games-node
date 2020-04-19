import Paper from '../models/Paper';

class PaperController {
  async store(req, res) {
    const { title } = req.body;
    const paper = await Paper.create({
      title,
    });
    return res.json(paper);
  }

  async update(req, res) {
    const { id } = req.params;
    const { title } = req.body;

    const paper = await Paper.findByPk(id);

    if (!paper) {
      res.json({ error: 'Paper does not match' });
    }
    paper.update({
      title,
    });
    return res.json(paper);
  }

  async index(req, res) {
    const paper = await Paper.findAll();

    return res.json(paper);
  }
}

export default new PaperController();
