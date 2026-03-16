const axios = require("axios");

module.exports = async (req, res) => {
  const topic = req.query.topic || "technology";
  const apiKey = process.env.VUE_APP_NEWS_API_KEY;

  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: topic,
        language: "id",
        sortBy: "publishedAt",
        pageSize: 10,
        apiKey,
      },
    });

    res.status(200).json({ articles: response.data.articles });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};
