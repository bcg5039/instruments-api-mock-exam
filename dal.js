const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
const buildPrimaryKey = require('./lib/build-primary-key')
const instrumentPKGenerator = buildPrimaryKey('instrument_')
const { pathOr, assoc } = require('ramda')
const HTTPError = require('node-http-error')
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)
//////////////////////
//      TEST
//////////////////////
const test = callback => {
  callback(null, 'dal is ok.')
}
///CREATE////////////
//sample data
// {
//   _id: 'instrument_cello_cello_platinum',
//   name: 'Cello Platinum',
//   type: 'instrument',
//   category: 'cello',
//   group: 'strings',
//   retailPrice: 600,
//   manufacturer: 'Strings, Inc.'
// }
function createInstrument(instrument, callback) {
  const category = pathOr('', ['category'], instrument)
  const name = pathOr('', ['name'], instrument)
  const pk = instrumentPKGenerator(`${category} ${name}`)
  //console.log(pk) //examine primary key value
  instrument = assoc('_id', pk, instrument)
  instrument = assoc('type', 'instrument', instrument)
  createDoc(instrument, callback)
}

function createDoc(doc, callback) {
  console.log('here is what your about to create: ', doc)
  db.put(doc).then(res => callback(null, res)).catch(err => callback(err))
}
/////////////////////////

///////////////////READ////////////////////
function getInstrument(instrumentId, callback) {
  db.get(instrumentId, function(err, doc) {
    if (err) return callback(err)
    if (doc.type === 'instrument') {
      callback(null, doc)
    } else {
      callback(new HTTPError(400, 'id is not an instrument'))
    }
  })
}
///////////////////////////////////////

///////////////UPDATE////////////
function updateInstrument(instrument, callback) {
  instrument = assoc('type', 'instrument', instrument)
  createDoc(instrument, callback)
}
////////////////////////////////

////////////DELETE///////////////

function deleteInstrument(instrumentId, callback) {
  db
    .get(instrumentId)
    .then(function(doc) {
      return db.remove(doc)
    })
    .then(function(result) {
      callback(null, result)
    })
    .catch(function(err) {
      callback(err)
    })
}

////////////////////////////////

//////////////LIST////////////
function listInstruments(limit, callback) {
  find({ selector: { type: 'instrument' }, limit }, function(err, data) {
    if (err) return callback(err)
    callback(null, data.docs)
  })
}

////////////////////////////

function find(query, cb) {
  console.log('query', JSON.stringify(query, null, 2))
  query ? db.find(query, cb) : cb(null, [])
}
const dal = {
  test,
  createInstrument,
  createDoc,
  getInstrument,
  updateInstrument,
  deleteInstrument,
  listInstruments
}

module.exports = dal
