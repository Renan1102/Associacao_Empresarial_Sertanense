import conectarDB from "../../../lib/dbConnect"
import User from "../../../models/User"

export default async function handler(req, res) {
  
  await conectarDB();

  //post api/user

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const user = new User(req.body);
        await user.save();

        return res.status(200).json({ success: true, user });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falla de servidor error" });
  }
}