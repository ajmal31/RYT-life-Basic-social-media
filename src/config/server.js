const PORT = 3000;
const startServer=(app)=>{
    app.listen(PORT, () => {
        console.log("Server listening on port 3000");
      });

}
export default startServer