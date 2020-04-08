import PaperUser from '../models/PaperUser';
import User from '../models/User';
import Paper from '../models/Paper';

class PaperUserController {
  async store(req, res) {
    const { paper_id, user_id } = req.body;

    const user = await User.findByPk(user_id);
    const paper = await Paper.findByPk(paper_id);

    if (!user) {
      return res.status(400).json({ error: 'user not exists' });
    }

    if (!paper) {
      return res.status(400).json({ error: 'paper not exists' });
    }
    const paperUser = await PaperUser.create({
      paper_id,
      user_id,
    });
    return res.json(paperUser);
  }

  async update(req, res) {
    const { id, paper_id, user_id } = req.body;

    const user = await User.findByPk(user_id);
    const paper = await Paper.findByPk(paper_id);
    const paperUser = await PaperUser.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: 'user not exists' });
    }

    if (!paper) {
      return res.status(400).json({ error: 'paper not exists' });
    }

    if (!paperUser) {
      return res.status(400).json({ error: 'paperUser not exists' });
    }

    await paperUser.update({
      paper_id,
      user_id,
    });
    return res.json(paperUser);
  }
}

export default new PaperUserController();
