const express = require('express');
const { Pool, Client } = require('pg');
const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');

let connectionString = 'postgres://postgres:postgres@localhost:5438/products';

const client = new Client(connectionString);

client.connect((err, success) => {
  if (success) {
    console.log('connected to the db');
  }
});

let pool = new Pool();

pool.connect(function(err, c, done) {
  let stream = client.query(
    copyFrom(
      "COPY product_info(id, name, slogan, description, category, default_price) FROM STDIN WITH (FORMAT csv)"
    )
  );

  let fileStream = fs.createReadStream('./product.csv');

  fileStream.on('error', (error) => {
    console.error(error)
    done()
  });
  stream.on('error', (error) => {
    console.error(error)
    done()
  });
  stream.on('finish', () => {
    console.log('done')
    done()
  });
  fileStream.pipe(stream);
});

pool.connect(function(err, c, done) {
  let stream = client.query(
    copyFrom(
      "COPY product_styles(id, product_id, name, sale_price, original_price, default_style) FROM STDIN WITH (FORMAT csv)"
    )
  );

  let fileStream = fs.createReadStream('./styles.csv');

  fileStream.on('error', (error) => {
    console.error(error)
    done()
  });
  stream.on('error', (error) => {
    console.error(error)
    done()
  });
  stream.on('finish', () => {
    console.log('done')
    done()
  });
  fileStream.pipe(stream);
});

pool.connect(function(err, c, done) {
  let stream = client.query(
    copyFrom(
      "COPY style_skus(id, style_id, size, quantity) FROM STDIN WITH (FORMAT csv)"
    )
  );

  let fileStream = fs.createReadStream('./skus.csv');

  fileStream.on('error', (error) => {
    console.error(error)
    done()
  });
  stream.on('error', (error) => {
    console.error(error)
    done()
  });
 stream.on('finish', () => {
  console.log('done')
  done()
});
  fileStream.pipe(stream);
});

pool.connect(function(err, c, done) {
  let stream = client.query(
    copyFrom(
      "COPY style_photos(id, style_id, url, thumbnail_url) FROM STDIN WITH (FORMAT csv)"
    )
  );

  let fileStream = fs.createReadStream('./photos.csv');

  fileStream.on('error', (error) => {
    console.error(error)
    done()
  });
  stream.on('error', (error) => {
    console.error(error)
    done()
  });
  stream.on('finish', () => {
    console.log('done')
    done()
  });
  fileStream.pipe(stream);
});

pool.connect(function(err, c, done) {
  let stream = client.query(
    copyFrom(
      "COPY related_products(id, related_id, product_id) FROM STDIN WITH (FORMAT csv)"
    )
  );

  let fileStream = fs.createReadStream('./related.csv');

  fileStream.on('error', (error) => {
    console.error(error)
    done()
  });
  stream.on('error', (error) => {
    console.error(error)
    done()
  });
  stream.on('finish', () => {
    console.log('done')
    done()
  });
  fileStream.pipe(stream);
});

pool.connect(function(err, c, done) {
  let stream = client.query(
    copyFrom(
      "COPY product_features(id, product_id, feature, value) FROM STDIN WITH (FORMAT csv)"
    )
  );

  let fileStream = fs.createReadStream('./features.csv');

  fileStream.on('error', (error) => {
    console.error(error)
    done()
  });
  stream.on('error', (error) => {
    console.error(error)
    done()
  });
 stream.on('finish', () => {
  console.log('done')
  done()
});
  fileStream.pipe(stream);
});