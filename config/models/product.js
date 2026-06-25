const User = require("./models/User");

app.get("/test", async (req, res) => {
    const user = new User({
        name: "Mohana",
        email: "mohana@gmail.com",
        password: "123456"
    });

    await user.save();

    res.send("User Saved");
});