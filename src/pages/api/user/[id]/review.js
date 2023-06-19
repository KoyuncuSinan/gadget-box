import User from "@/models/User";
import databaseConnection from "../../util/databaseConnect";
import Review from "@/models/Review";
import Game from "@/models/Game";

export default async function review(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method now allowed." });
  }

  await databaseConnection();
  
  try {
    const userId = req.query.id;
    if (!userId) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    console.log("Received userId:", userId);

    const userReviews = await User.findById(userId)
      .select("firstname lastname username profilePicture")
      .populate({
        path: "reviews",
        select: "reviews likes rating game createdAt",
        populate:
        {
          path:"game",
          select: "image releaseDate name"
        },
      });
      res.status(200).json(userReviews)
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
