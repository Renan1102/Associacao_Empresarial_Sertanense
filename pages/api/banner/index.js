import conectarDB from "../../../lib/dbConnect"
import Banner from "../../../models/Banner"

export default async function handler(req, res) {
  
  await conectarDB();

  //post api/banner

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const banner = new Banner(req.body);
        await banner.save();

        return res.status(200).json({ success: true, banner });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falla de servidor error" });
  }
}