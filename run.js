'use strict';

const pbjs = require('protobufjs');

pbjs.load("types.proto", function(err, root) {
  if (err) throw err;

  console.log("Top level message types:");
  for (var i = 0; i < root.nestedArray.length; i++) {
    var type = root.nestedArray[i];
    console.log("\t", type.name, "-", type.comment);
  }

  console.log();
  console.log("Nested messages in Msg1:");
  var Msg1 = root.lookupType("Msg1");
  for (var i = 0; i < Msg1.nestedArray.length; i++) {
    var type = Msg1.nestedArray[i];
    console.log("\t", type.name, "-", type.comment);
  }

  console.log();
  console.log("Fields in Msg1:");
  for (var i = 0; i < Msg1.fieldsArray.length; i++) {
    var field = Msg1.fieldsArray[i];
    console.log("\t", field.name, ":", field.type, "-", field.comment);
  }


  // Create an instance of Msg1

  var payload = {
    i32: 32767,
    flag: [true, false, true, false, true],
    sub: {
      str: "abced"
    }
  };


  var msg = Msg1.create(payload);

  // Encode a message to an Uint8Array (browser) or Buffer (node)
  var buffer = Msg1.encode(msg).finish();

  console.log();
  console.log('buffer:', buffer);
});
