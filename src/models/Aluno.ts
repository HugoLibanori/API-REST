import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

export default class Aluno extends Model<
  InferAttributes<Aluno>,
  InferCreationAttributes<Aluno>
> {
  declare id?: number;
  declare nome: string;
  declare sobrenome: string;
  declare email: string;
  declare idade: number;
  declare peso: number;
  declare altura: number;

  static associate(models: any) {
    Aluno.hasMany(models.Foto, { foreignKey: "aluno_id" });
  }
}

export function initAluno(sequelize: Sequelize) {
  Aluno.init(
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
      sobrenome: {
        type: DataTypes.STRING,
        defaultValue: "",
        validate: {
          len: {
            args: [3, 255],
            msg: "O campo sobrenome deve ter entre 3 e 255 caracteres",
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
      idade: {
        type: DataTypes.INTEGER,
        defaultValue: "",
        validate: {
          isInt: {
            msg: "Idade precisa ser um número inteiro!",
          },
        },
      },
      peso: {
        type: DataTypes.FLOAT,
        defaultValue: "",
        validate: {
          isFloat: {
            msg: "Peso precisa ser um número!",
          },
        },
      },
      altura: {
        type: DataTypes.FLOAT,
        defaultValue: "",
        validate: {
          isFloat: {
            msg: "Altura precisa ser um número!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Aluno",
    }
  );
}
