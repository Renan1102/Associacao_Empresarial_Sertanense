import conectarDB from "../../../lib/dbConnect"
import Banner from "../../../models/Banner"

export default async function handler(req, res) {
  
  await conectarDB();

  //GET api/banner/:id
  //DELETE api/banner/:id
  //PUT api/banner/:id

  const {method, query: {id},} = req;

  switch (method) {
    case "PUT":
      try {
        const banner = await Banner.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!banner) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: banner });
      } catch (error) {
        return res.status(404).json({ success: false, error });
      }
    case "DELETE":
        try {
          const banner = await Banner.findByIdAndDelete(id);
          if(!banner){
            return res.status(404).json({success: false});
          }
          return res.json({success: true, data: banner});

        } catch (error) {
            return res.status(404).json({success: false});
        }
    case "GET":
        try {
          const banner = await Banner.findById(id).lean();
            if (!banner) {
                return res.status(404).json({ success: false });
             }
      
             return res.json({ success: true, data: banner });
            } catch (error) {
              return res.status(404).json({ success: false });
            }
            default:
                return res
                  .status(500)
                  .json({ success: false, error: "Falla de servidor" });
  }
}