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

const requestNock = nock('http://localhost:8080/');
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
        
        it('key books should be ‘error fetching books’ ', function() {
        
        });
    
        it('response status should be 400', function() {
        
        });
    });
    
    describe('POST result', function() {
        
        it('response status should be 200', function() {
        
        });
        
        it('key books should be ‘book successfully added’ ', function() {
        
        });
        it('response status should be 400', function() {
        
        });
        it('key books should be ‘error adding the book’  ', function() {
        
        });
    });
    
    describe('PUT result', function() {
        
        it('response status should be 200', function() {
        
        });
        
        it('key books should be ‘book successfully updated’  ', function() {
        
        });
        
         it('key books should be ‘error updating the book’  ', function() {
        
        });
        
        
        it('response status should be 400', function() {
        
        });
    });
    
    
    describe('DELETE result', function() {
        
        it('response status should be 200', function() {
        
        });
        
        it('key books should be ‘book successfully deleted’ ', function() {
        
        });
        
        it('key books should be ‘error deleting the book’  ', function() {
        
        });
        
        
        it('response status should be 400', function() {
        
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

describe('test unitaire', function () {
    beforeEach(function() {
        nock.cleanAll();
    });
    
    describe("first part : successful responses", function() {
      describe("GET success", function() {
        it("books should be an empty array", function(done) {
          const requestNock = nock('http://localhost:8080')
            .get('/book')
            .reply(200, 
              { 'books': []
              });
          chai
            .request('http://localhost:8080')
            .get('/book')
            .end(function(err, res) {
              expect(res).to.have.status(200);
              expect(res.body.books).to.be.an('Array');
              expect(res.body.books).to.be.empty;
              done(); // <= Call done to signal callback end
            });
          });
        });
  
      describe("POST success", function() {
        it("message should be 'book successfully added'", function(done) {
          const requestNock = nock('http://localhost:8080')
            .post('/book', { title: "Coco raconte Channel 2", years: 1990, pages: 400 })
            .reply(200, {message:'book successfully added'});
  
          chai
            .request('http://localhost:8080')
            .post('/book')
            .send({ title: "Coco raconte Channel 2", years: 1990, pages: 400 })
            .end(function(err, res) {
              expect(res).to.have.status(200);
              expect(res.body.message).to.equal("book successfully added");
              done(); // <= Call done to signal callback end
            });
          });
        });
  
      describe("PUT success", function() {
        it("response message should be book successfully updated", function(done) {
          const requestNock = nock('http://localhost:8080')
            .put('/book', { title: "Coco raconte Channel 2", years: 1990, pages: 400 })
            .reply(200, {message:'book successfully updated'});
  
          chai
            .request('http://localhost:8080')
            .put('/book')
            .send({
              title: "Coco raconte Channel 2",
              years: 1990,
              pages: 400
            })
            .end(function(err, res) {
              expect(res).to.have.status(200);
              expect(res.body.message).to.equal("book successfully updated");
              done(); // <= Call done to signal callback end
            });
          });
        });
  
          
  
    describe("DELETE success", function() {
      it("response message should be 'book successfully deleted'", done => {
        const requestNock = nock('http://localhost:8080')
            .delete('/book')
            .reply(200, {message:'book successfully deleted'});
        chai
          .request('http://localhost:8080')
          .delete('/book')
          .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal("book successfully deleted");
            done(); // <= Call done to signal callback end
          });
      });
    });
  });

  describe("second part : unsuccessful responses", function() {
    describe("GET fail", function() {
      it("message should be 'error fetching books", function(done) {
        const requestNock = nock('http://localhost:8080')
          .get('/book')
          .reply(400, 
            { message: 'error fetching books'
            });
        chai
          .request('http://localhost:8080')
          .get('/book')
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("error fetching books");
            done(); // <= Call done to signal callback end
          });
        });
      });

    describe("POST fail", function() {
      it("message should be 'error adding the book'", function(done) {
        const requestNock = nock('http://localhost:8080')
          .post('/book', { title: "Coco raconte Channel 2", years: 1990, pages: 400 })
          .reply(400, {message:'error adding the book'});

        chai
          .request('http://localhost:8080')
          .post('/book')
          .send({ title: "Coco raconte Channel 2", years: 1990, pages: 400 })
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("error adding the book");
            done(); // <= Call done to signal callback end
          });
        });

    });

    describe("PUT fail", function() {
      it("response message should be 'error updating the book", function(done) {
        const requestNock = nock('http://localhost:8080')
          .put('/book', { title: "Coco raconte Channel 2", years: 1990, pages: 400 })
          .reply(400, {message:'error updating the book'});

        chai
          .request('http://localhost:8080')
          .put('/book')
          .send({
            title: "Coco raconte Channel 2",
            years: 1990,
            pages: 400
          })
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("error updating the book");
            done(); // <= Call done to signal callback end
          });
        });

    });

    describe("DELETE fail", function() {
      it("response message should be 'error deleting the book'", done => {
        const requestNock = nock('http://localhost:8080')
            .delete('/book')
            .reply(400, {message:'error deleting the book'});
        chai
          .request('http://localhost:8080')
          .delete('/book')
          .end(function(err, res) {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal("error deleting the book");
            done(); // <= Call done to signal callback end
          });
      });
    });
  });
});
    
