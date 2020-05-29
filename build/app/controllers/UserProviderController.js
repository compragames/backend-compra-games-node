"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _PaperUser = require('../models/PaperUser'); var _PaperUser2 = _interopRequireDefault(_PaperUser);
var _Paper = require('../models/Paper'); var _Paper2 = _interopRequireDefault(_Paper);

class UserProvidController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(5),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const userExist = await _User2.default.findOne({ where: { email: req.body.email } });
    if (userExist) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const { name, email, password, provider } = req.body;

    const { id } = await _User2.default.create({ name, email, password, provider });
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async index(req, res) {
    const users = await _User2.default.findAll({
      where: { provider: true, active: true },
      attributes: ['id', 'name', 'email', 'provider'],
      include: [
        {
          model: _PaperUser2.default,
          as: 'paperUser',
          attributes: ['id', 'paper_id'],
          include: [
            {
              model: _Paper2.default,
              as: 'paper',
              attributes: ['id', 'title'],
            },
          ],
        },
      ],
    });

    res.json(users);
  }

  async show(req, res) {
    const { id } = req.params;
    const users = await _User2.default.findByPk(id, {
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'provider'],
      include: [
        {
          model: _PaperUser2.default,
          as: 'paperUser',
          attributes: ['id', 'paper_id'],
          include: [
            {
              model: _Paper2.default,
              as: 'paper',
              attributes: ['id', 'title'],
            },
          ],
        },
      ],
    });

    res.json(users);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, oldPassword } = req.body;
    const user = await _User2.default.findByPk(req.params.id);

    if (email && email !== user.email) {
      const userExist = await _User2.default.findOne({ where: { email } });

      if (userExist) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await _User2.default.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: 'User does not exists' });
    }
    const { name, email } = await user.update({
      active: false,
    });
    return res.json({
      id,
      name,
      email,
    });
  }
}

exports. default = new UserProvidController();
