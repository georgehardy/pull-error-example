const pull = require("pull-stream");
const buffer = require("@turf/buffer");
const data = require("./data");

const example = () => {
  try {
    const bufferGeometry = pull.map((feat) => {
      try {
        const bufferedGeometry = buffer(feat.geometry, 0, {
          units: "kilometers",
        });
        feat.geometry = bufferedGeometry;
        feat.properties.modified = true;
      } catch (err) {
        console.log("ERR FUNC TRY CATCH", err);
      }
    });

    pull(
      pull.values(data),
      bufferGeometry,
      pull.drain(null, () => {
        console.log("DONE");
        data.map((d) => {
          console.log(d.properties.id, "modified?", d.properties.modified);
        });
      })
    );
  } catch (err) {
    console.log("ERR TRY CATCH", err);
  }
};

example();
