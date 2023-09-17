import conectarDB from "../../../lib/dbConnect"
import Empresa from "../../../models/Empresa"

export default async function handler(req, res) {
  
  await conectarDB();

  //GET api/empresa/:id
  //DELETE api/empresa/:id
  //PUT api/empresa/:id

  const {method, query: {id},} = req;

  switch (method) {
    case "PUT":
      try {
        const empresa = await Empresa.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!empresa) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: empresa });
      } catch (error) {
        return res.status(404).json({ success: false, error });
      }
    case "DELETE":
        try {
          const empresa = await Empresa.findByIdAndDelete(id);
          if(!empresa){
            return res.status(404).json({success: false});
          }
          return res.json({success: true, data: empresa});

        } catch (error) {
            return res.status(404).json({success: false});
        }
    case "GET":
        try {
          const empresa = await Empresa.findById(id).lean();
            if (!empresa) {
                return res.status(404).json({ success: false });
             }
      
             return res.json({ success: true, data: empresa });
            } catch (error) {
              return res.status(404).json({ success: false });
            }
            default:
                return res
                  .status(500)
                  .json({ success: false, error: "Falla de servidor" });
  }
}