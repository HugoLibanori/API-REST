import {
  Sequelize,
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import appConfig from "../config/appConfig";

export default class Foto extends Model<
  InferAttributes<Foto>,
  InferCreationAttributes<Foto>
> {
  declare id?: number;
  declare originalname: string;
  declare filename: string;
  declare aluno_id?: number;
  declare url?: string;

  static associate(models: any) {
    Foto.belongsTo(models.Aluno, { foreignKey: "aluno_id" });
  }
}

export function initFoto(sequelize: Sequelize): typeof Foto {
  Foto.init(
    {
      originalname: {
        type: DataTypes.STRING,
        defaultValue: "",
        validate: {
          notEmpty: {
            msg: "O campo não pode ficar vazio.",
          },
        },
      },
      filename: {
        type: DataTypes.STRING,
        defaultValue: "",
        validate: {
          notEmpty: {
            msg: "O campo não pode ficar vazio.",
          },
        },
      },
      url: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue("filename")}`;
        },
      },
    },
    {
      sequelize,
      modelName: "Foto",
    }
  );
  return Foto;
}
