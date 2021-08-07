const firebaseRef = require("./firebase");

export default (req, res) => {
  console.log(req.body);
  let userData = [];
  let ref = firebaseRef
    .ref("users")
    .once("value", async function (snapshot) {
      const data = snapshot.val();

      data &&
        Object.entries(data).map((sUser, key) => {
          if (
            sUser[1].username.toLowerCase() === req.body.username.toLowerCase()
          ) {
            console.log("username exists " + req.body.username);
            userData = {
              id: sUser[0],
              ...sUser[1],
            };
          }
        });

      userData = {
        id: userData.id ? userData.id : null,
        admin: userData.admin ? userData.admin : null,
        token: userData.id ? userData.id : null,
      };

      return res.json({ success: userData ? true : false, userData });
    })
    .catch(() => {
      res.json({ success: false });
    });
};
