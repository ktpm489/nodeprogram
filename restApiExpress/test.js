/*
 * 
 * We’ll use Mocha, Expect.js, and Super Agent libraries to write functional tests that 
 * make HTTP requests to our soon-to-be-created REST API server.
 * 
 * We'll have six suites:
 *      Creating a new object
 *      Retrieving an object by its ID
 *      Retrieving the whole collection
 *      Updating an object by its ID
 *      Checking an updated object by its ID
 *      Removing an object by its ID 
 * To keep this tutorial focused on the REST API with Express.js 4 and MongoDB, and not
 * on Mocha, we won’t go into the details of test suits.
 * 
 * NOTE: Looking into Mocha, Super Agent, & Expect
 * 
 * To run the tests, we can use the $ mocha test.js command (if you have Mocha globally)
 * or $ ./node_modules/mocha/bin/mocha test.js.
 * 
 * 
*/

var superagent = require('superagent')
var expect = require('expect.js')

describe('express rest api server', function(){
  var id
  // posts an object
  it('posts an object', function(done){
    superagent.post('http://localhost:3000/collections/test')
      .send({ name: 'John'
        , email: 'john@rpjs.co'
      })
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.length).to.eql(1)
        expect(res.body[0]._id.length).to.eql(24)
        id = res.body[0]._id
        done()
      })
  })
  // retrieves an object
  it('retrieves an object', function(done){
    superagent.get('http://localhost:3000/collections/test/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)
        expect(res.body._id).to.eql(id)
        done()
      })
  })
  // retrieves a collection
  it('retrieves a collection', function(done){
    superagent.get('http://localhost:3000/collections/test')
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.length).to.be.above(0)
        expect(res.body.map(function (item){return item._id})).to.contain(id)
        done()
      })
  })
  // updates an object
  it('updates an object', function(done){
    superagent.put('http://localhost:3000/collections/test/'+id)
      .send({name: 'Peter'
        , email: 'peter@yahoo.com'})
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.msg).to.eql('success')
        done()
      })
  })
  // checks an updated object
  it('checks an updated object', function(done){
    superagent.get('http://localhost:3000/collections/test/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)
        expect(res.body._id).to.eql(id)
        expect(res.body.name).to.eql('Peter')
        done()
      })
  })
  // removes an object
  it('removes an object', function(done){
    superagent.del('http://localhost:3000/collections/test/'+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.msg).to.eql('success')
        done()
      })
  })
})
