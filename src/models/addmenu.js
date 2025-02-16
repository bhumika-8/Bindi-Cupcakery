import mongoose from "mongoose"
import Menu from "./Menu" // ✅ No need for `.ts`

const menus = [
  {
    imageUrl: "https://res.cloudinary.com/dzrqqv9hl/image/upload/v1739671570/menu1_y6rg3m.jpg",
    name_menu: "Fudge Menu",
  },
  {
    imageUrl: "https://res.cloudinary.com/dzrqqv9hl/image/upload/v1739671610/menu2_s7xihd.jpg",
    name_menu: "Chocolate Modak",
  },
  {
    imageUrl: "https://res.cloudinary.com/dzrqqv9hl/image/upload/v1739671622/menu3_s6hzja.jpg",
    name_menu: "Truffle Chocolate Balls",
  },
  {
    imageUrl: "https://res.cloudinary.com/dzrqqv9hl/image/upload/v1739671632/menu4_rthjgj.jpg",
    name_menu: "Muffins, Cookies, Brownies, Cakes",
  },
];

const addMenus = async () => {
  try {
    await mongoose.connect("mongodb+srv://u23cs046:PuC2mGf64jpD0Aar@bindi-cupcake.r6uaa.mongodb.net/?retryWrites=true&w=majority&appName=bindi-cupcake", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Menu.insertMany(menus);
    console.log("Menu items added successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error adding menus:", error);
  }
};

addMenus();
