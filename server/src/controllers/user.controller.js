function deleteUser(req, res) {
   let email = req.body.email
   if (!email) {
      return res.status(400).json({
         status: "Failure",
         message: "No 'email' property was sent in request body"
      });

   }
   async function deleteUser(email) {
      const connection = await sql.connect(adminconf);
      const request = connection.request();
      request.input("email", sql.VarChar, email);
      return await request.query("DELETE Users WHERE email = @email");
   }
   deleteUser(email).then(
      (response) => {
         res.status(200).json({
            status: "Success",
            message: "User successfully deleted"
         })
      }
   ).catch((err) => {
      console.log(err);
      res.status(500).json({
         status: "Failure",
         message: "An error occurred"
      })
   })
}


module.exports = {
   deleteUser
}
