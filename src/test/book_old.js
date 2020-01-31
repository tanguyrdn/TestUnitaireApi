import chai, {expect} from 'chai';
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
describe('test unitaire', function () {
	
	
	describe('GET result', function () {
		
		it('response status should be 200', function () {
		
		});
		
		it('key books should be an array and empty', function () {
		
		});
		
		it('key books should be ‘error fetching books’ ', function () {
		
		});
		
		it('response status should be 400',()=> {
            let nockV =nock('http://localhost:8080').get('/book').reply(400);
            
		});
	});
	
	describe('POST result', function () {
		
		it('response status should be 200', function () {
		
		});
		
		it('key books should be ‘book successfully added’ ', function () {
		
		});
		it('response status should be 400', function () {
		
		});
		it('key books should be ‘error adding the book’  ', function () {
		
		});
	});
	
	describe('PUT result', function () {
		
		it('response status should be 200', function () {
		
		});
		
		it('key books should be ‘book successfully updated’  ', function () {
		
		});
		
		it('key books should be ‘error updating the book’  ', function () {
		
		});
		
		it('response status should be 400', function () {
		
		});
	});
	
	
	describe('DELETE result', function () {
		
		it('response status should be 200', function () {
		
		});
		
		it('key books should be ‘book successfully deleted’ ', function () {
		
		});
		
		it('key books should be ‘error deleting the book’  ', function () {
		
		});
		
		it('response status should be 400', function () {
		
		});
	});
	
});