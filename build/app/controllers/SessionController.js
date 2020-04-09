"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);
var _PaperUser = require('../models/PaperUser'); var _PaperUser2 = _interopRequireDefault(_PaperUser);
var _Paper = require('../models/Paper'); var _Paper2 = _interopRequireDefault(_Paper);

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;
    const user = await _User2.default.findOne({
      where: { email },
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

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!user.active) {
      return res.status(401).json({ error: 'User not active' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, provider, active, paperUser } = user;
    return res.json({
      user: {
        id,
        name,
        email,
        provider,
        active,
        paperUser: {
          id: paperUser.id,
          paper: paperUser.paper_id,
          title: paperUser.paper.title,
        },
      },
      token: _jsonwebtoken2.default.sign({ id }, _auth2.default.secret, {
        expiresIn: _auth2.default.expiresIn,
      }),
    });
  }
}

exports. default = new SessionController();
