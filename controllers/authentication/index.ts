import { RequestHandler, Router } from "express";
import {
  ValidateCreateUserRequest,
  ValidateLoginRequest,
} from "../../middlewares";
import { loginDetailsValidators, userValidator } from "../../util/validators";
import { hash, compare } from "bcrypt";
import { db } from "../../prisma";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post("/register", ValidateCreateUserRequest, (async (
  req,
  res,
  next
) => {
  const { name, password, username } = userValidator.cast(req.body);
  const saltRounds = 10;

  try {
    const passwordHash = await hash(password, saltRounds);
    const user = await db.users.create({
      data: {
        name,
        username,
        password: passwordHash,
      },
    });
    res.status(200).send({
      name: user.name,
      username: user.username,
      id: user.id,
    });
  } catch (e) {
    next(e);
  }
}) as RequestHandler);
authRouter.post("/login", ValidateLoginRequest, (async (req, res, next) => {
  const { username, password } = loginDetailsValidators.cast(req.body);
  try {
    const user = await db.users.findFirst({
      where: {
        username: username,
      },
    });
    const passwordCorrect =
      user === null ? false : await compare(password, user.password);


    if (!(user && passwordCorrect)) {
      return res.status(401).send("invalid username or password");
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };
    
    const token = jwt.sign(userForToken, process.env.SECRET || "secret");
    res.status(200).send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

export default authRouter;
