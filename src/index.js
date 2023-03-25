var http = require("http");
const generateReport = require("./report");

//create a server object:
http
  .createServer(function (req, res) {
    generateReport()
      .then((data) => {
        res.setHeader(
          "Content-Disposition",
          'attachment; filename="reportft.xlsx"'
        );
        res.write(data, () => res.end());
      })
      .catch((err) => {
        console.error(err);
        res.write(err.toString(), () => res.end());
      });
  })
  .listen(8080); //the server object listens on port 8080
