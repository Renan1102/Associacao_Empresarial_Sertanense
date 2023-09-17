import conectarDB from "../../../lib/dbConnect"
import Empresa from "../../../models/Empresa"

export default async function handler(req, res) {
  
  await conectarDB();

  //post api/empresa

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const empresa = new Empresa(req.body);
        await empresa.save();

        return res.status(200).json({ success: true, empresa });
      } catch (error) {
        return res.status(400).json({ success: false, error });
      }
    default:
      return res
        .status(500)
        .json({ success: false, error: "Falla de servidor error" });
  }
}