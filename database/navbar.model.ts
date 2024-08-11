import { Document, Schema, model, models } from "mongoose";

export interface NavbarModel extends Document {
  title: string;
  link: string;
  subLinks: Array<object>;
}

const NavbarSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  subLinks: { type: Array, required: true },
});
const Navbar = models.Navbar || model("Navbar", NavbarSchema);

export default Navbar;
