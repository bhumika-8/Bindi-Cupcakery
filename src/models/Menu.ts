import mongoose from "mongoose"

const menuSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  name_menu: {
    type: String,
    required: true,
  },
})

export default mongoose.models.Menu || mongoose.model("Menu", menuSchema)

