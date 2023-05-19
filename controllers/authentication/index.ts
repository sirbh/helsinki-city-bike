import { RequestHandler, Router } from "express";
import { ValidateCreateUserRequest } from "../../middlewares";
import { userValidator } from "../../util/validators";
import { hash } from "bcrypt";
import { db } from "../../prisma";

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
      data:{
        name,
        username,
        password:passwordHash
      }
    });
    res.status(200).send(user);
  } catch (e) {
    next(e);
  }
}) as RequestHandler);

export default authRouter;
