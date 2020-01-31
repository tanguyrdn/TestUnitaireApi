import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiNock from 'chai-nock';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';
import nock from 'nock';

import server from '../server';
import resetDatabase from '../utils/resetDatabase';

chai.use(chaiHttp);
chai.use(chaiNock);
chai.use(chaiAsPromised);

// tout les packages et fonction nescessaire au test sont importé ici, bon courage

// fait les Tests d'integration en premier
describe('integration', function() {
    beforeEach(function() {
        resetDatabase(path.join(__dirname, '../data/books.json'), {
                books: []
            }
        )
    });

    it('database should be empty', function(done) {
        chai.request(server)
        .get('/book')
        .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body.books).to.be.empty;
            done(); // <= Call done to signal callback end
        });
    });

    describe('GET /book', function() {
        it('response body should be an object', function(done) {
            chai.request(server)
            .get('/book')
            .end(function(err, res) {
                expect(res.body).to.be.an('object');
                done(); // <= Call done to signal callback end
            });
        });

        it('response status should be 200', function(done) {
            chai.request(server)
            .get('/book')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done(); // <= Call done to signal callback end
            });
        });

        it('key books should be an array and empty', function(done) {
            chai.request(server)
            .get('/book')
            .end(function(err, res) {
                expect(res.body.books).to.be.an('array');
                expect(res.body.books).to.be.empty;
                done(); // <= Call done to signal callback end
            });
        });
    });

    describe('POST /book', function() {
        it('response status should be 200', function(done) {
            chai.request(server)
            .post('/book')
            .send({ title: 'Coco raconte Channel 2', years: 1990, pages: 400 })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done(); // <= Call done to signal callback end
            });
        });

        it('key books should be contain "book successfully added"', function(done) {
            chai.request(server)
            .post('/book')
            .send({ title: 'Coco raconte Channel 2', years: 1990, pages: 400 })
            .end(function(err, res) {
                expect(res.body.message).to.equal('book successfully added');
                done(); // <= Call done to signal callback end
            });
        });
    });
  });