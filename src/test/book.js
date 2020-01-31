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
        resetDatabase()
    });

    it('database should be empty', function() {
        
    });

    describe('GET /book', function() {
        it('response should be an object', function() {
        
        });

        it('response status should be 200', function() {
            
        });

        it('key books should be an array and empty', function() {
            
        });
    });

  });