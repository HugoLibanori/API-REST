import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import bcrypt from "bcryptjs";

interface UserData
  extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id?: number;
  nome: string;
  email: string;
  password_hash?: string;
  password: string;
}

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id?: number;
  declare nome: string;
  declare email: string;
  declare password: string;
  declare password_hash?: string;

  passwordIsValid(password: string): Promise<boolean> {
    if (!this.password_hash) {
      return Promise.resolve(false);
    }
    return bcrypt.compare(password, this.password_hash);
  }
}

export function initUser(sequelize: Sequelize) {
  User.init(
    {
      nome: {
        type: DataTypes.STRING,
        defaultValue: "",
        validate: {
          len: {
            args: [3, 255],
            msg: "O campo nome deve ter entre 3 e 255 caracteres",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: "",
        unique: { name: "email", msg: "E-mail já cadastrado!" },
        validate: {
          isEmail: {
            msg: "E-mail inválido!",
          },
        },
      },
      password_hash: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      password: {
        type: DataTypes.VIRTUAL,
        defaultValue: "",
        validate: {
          len: {
            args: [6, 50],
            msg: "A senha deve ter entre 6 e 50 caracteres",
          },
        },
      },
    },
    {
      sequelize,
    }
  );

  User.addHook("beforeSave", async (user: UserData) => {
    if (user.password) {
      user.password_hash = await bcrypt.hash(user.password, 8);
    }
  });
}
