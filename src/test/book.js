import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import chaiNock from "chai-nock";
import chaiAsPromised from "chai-as-promised";
import path from "path";
import nock from "nock";

import server from "../server";
import resetDatabase from "../utils/resetDatabase";

chai.use(chaiHttp);
chai.use(chaiNock);
chai.use(chaiAsPromised);

// tout les packages et fonction nescessaire au test sont importé ici, bon courage

// fait les Tests d'integration en premier
describe("integration empty database", function() {
  beforeEach(function() {
    resetDatabase(path.join(__dirname, "../data/books.json"), {
      books: []
    });
  });

  describe("GET /book", function() {
    it("response body should be an object", function(done) {
      chai
        .request(server)
        .get("/book")
        .end((err, res) => {
          expect(res.body).to.be.an("object");
          done(); // <= Call done to signal callback end
        });
    });

    it("response status should be 200", function(done) {
      chai
        .request(server)
        .get("/book")
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done(); // <= Call done to signal callback end
        });
    });

    it("key books should be an array and empty", function(done) {
      chai
        .request(server)
        .get("/book")
        .end(function(err, res) {
          expect(res.body.books).to.be.an("array");
          expect(res.body.books).to.be.empty;
          done(); // <= Call done to signal callback end
        });
    });
  });

  describe("POST /book", function() {
    it("response status should be 200", function(done) {
      chai
        .request(server)
        .post("/book")
        .send({ title: "Coco raconte Channel 2", years: 1990, pages: 400 })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done(); // <= Call done to signal callback end
        });
    });

    it('key books should be contain "book successfully added"', function(done) {
      chai
        .request(server)
        .post("/book")
        .send({ title: "Coco raconte Channel 2", years: 1990, pages: 400 })
        .end(function(err, res) {
          expect(res.body.message).to.equal("book successfully added");
          done(); // <= Call done to signal callback end
        });
    });
  });
});

describe("integration mock database", () => {
  beforeEach(function() {
    resetDatabase(path.join(__dirname, "../data/books.json"), {
      books: [
        {
          id: "0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9",
          title: "Coco raconte Channel 2",
          years: 1990,
          pages: 400
        }
      ]
    });
  });

  describe("PUT /book/:id", function() {
    it("response status should be 200", done => {
      chai
        .request(server)
        .put("/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9")
        .send({
          title: "Coco raconte Channel 2",
          years: 1990,
          pages: 400
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done(); // <= Call done to signal callback end
        });
    })

    it("response message should be book successfully updated", done => {
      chai
        .request(server)
        .put("/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9")
        .send({
          title: "Coco raconte Channel 2",
          years: 1990,
          pages: 400
        })
        .end(function(err, res) {
          expect(res.body.message).to.equal("book successfully updated");
          done(); // <= Call done to signal callback end
        });
    })
  });

  describe("DELETE /book/:id", function() {
    it("response status should be 200", done => {
      chai
        .request(server)
        .delete("/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9")
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done(); // <= Call done to signal callback end
        });
    })

    it("response message should be book successfully deleted", done => {
      chai
        .request(server)
        .delete("/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9")
        .end(function(err, res) {
          expect(res.body.message).to.equal("book successfully deleted");
          done(); // <= Call done to signal callback end
        });
    })
  });

  describe("GET /book/:id", function() {
    it("response status should be 200", done => {
      chai
        .request(server)
        .get("/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9")
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done(); // <= Call done to signal callback end
        });
    })

    it("response message should be book fetched", done => {
      chai
        .request(server)
        .get("/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9")
        .end(function(err, res) {
          expect(res.body.message).to.equal("book fetched");
          done(); // <= Call done to signal callback end
        });
    })

    it("response book body should be an object", function(done) {
      chai
        .request(server)
        .get("/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9")
        .end((err, res) => {
          expect(res.body.book).to.be.an("object");
          done(); // <= Call done to signal callback end
        });
    });

    it("book.title should be an string", function(done) {
      chai
        .request(server)
        .get("/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9")
        .end((err, res) => {
          expect(res.body.book.title).to.be.an("string");
          done(); // <= Call done to signal callback end
        });
    });

    it("book.title should be equal to Coco raconte Channel 2", function(done) {
      chai
        .request(server)
        .get("/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9")
        .end((err, res) => {
          expect(res.body.book.title).to.be.equal("Coco raconte Channel 2");
          done(); // <= Call done to signal callback end
        });
    });

    
    it("book.years should be an integer", function(done) {
      chai
      .request(server)
      .get("/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9")
      .end((err, res) => {
        expect(res.body.book.years).to.be.an("number");
        done(); // <= Call done to signal callback end
      });
    });
    
    it("book.years should be equal to 1990", function(done) {
      chai
        .request(server)
        .get("/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9")
        .end((err, res) => {
          expect(res.body.book.years).to.be.equal(1990);
          done(); // <= Call done to signal callback end
        });
    });
    
    it("book.pages should be an integer", function(done) {
      chai
        .request(server)
        .get("/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9")
        .end((err, res) => {
          expect(res.body.book.pages).to.be.an("number");
          done(); // <= Call done to signal callback end
        });
    });

    it("book.pages should be equal to 400", function(done) {
      chai
        .request(server)
        .get("/book/0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9")
        .end((err, res) => {
          expect(res.body.book.pages).to.be.equal(400);
          done(); // <= Call done to signal callback end
        });
    });
  });
});
