import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  boss: {
    type: ObjectId,
    ref: 'User', // Hace referencia donde buscar. En este caso busca en la colección llamada 'users' (se debe poner dicho nombre con la primera en mayuscula y en singular.)
  },
});

const userModel = model('User', userSchema);

export default userModel;
