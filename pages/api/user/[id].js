import conectarDB from "../../../lib/dbConnect"
import User from "../../../models/User"

export default async function handler(req, res) {
  
  await conectarDB();

  //GET api/user/:id
  //DELETE api/user/:id
  //PUT api/user/:id

  const {method, query: {id},} = req;

  switch (method) {
    case "PUT":
      try {
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!user) {
          return res.status(404).json({ success: false });
        }

        return res.json({ success: true, data: user });
      } catch (error) {
        return res.status(404).json({ success: false, error });
      }
    case "DELETE":
        try {
          const user = await User.findByIdAndDelete(id);
          if(!user){
            return res.status(404).json({success: false});
          }
          return res.json({success: true, data: user});

        } catch (error) {
            return res.status(404).json({success: false});
        }
    case "GET":
        try {
          const user = await User.findById(id).lean();
            if (!user) {
                return res.status(404).json({ success: false });
             }
      
             return res.json({ success: true, data: user });
            } catch (error) {
              return res.status(404).json({ success: false });
            }
            default:
                return res
                  .status(500)
                  .json({ success: false, error: "Falla de servidor" });
  }
}