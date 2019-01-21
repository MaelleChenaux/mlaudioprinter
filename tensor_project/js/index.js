let recognizer;
const NUM_FRAMES = 4;
let examples = [];

var PAGE_IP_ADDRESS = "10.192.164.21:2000";  //ECALEVENT
//var PAGE_IP_ADDRESS = "172.20.10.12:2000";  //HOTSPOT

var counterLabel = 0;

function sendData(jsonData){
  let data_to_send = jsonData;

  $.post(
    "https://" + PAGE_IP_ADDRESS + "/basic_post_action/",
    data_to_send,
    post_done
  );


  function post_done(data, status) {
    console.log(data);
    console.log(status);
  }
}


function collect(label) {
  if (label == null) {
    return recognizer.stopListening();
  }
  recognizer.listen(
    async ({ spectrogram: { frameSize, data } }) => {
      let vals = normalize(data.subarray(-frameSize * NUM_FRAMES));
      examples.push({
        vals,
        label
      });
      document.querySelector("#console").textContent = `${
        examples.length
      } examples collected`;
    },
    {
      overlapFactor: 0.999,
      includeSpectrogram: true,
      invokeCallbackOnNoiseAndUnknown: true
    }
  );
}
/////
/////
function normalize(x) {
  const mean = -100;
  const std = 10;
  return x.map(x => (x - mean) / std);
}

function predictWord() {
  // Array of words that the recognizer is trained to recognize.
  const words = recognizer.wordLabels();
  recognizer.listen(
    ({ scores }) => {
      // Turn scores into a list of (score,word) pairs.
      scores = Array.from(scores).map((s, i) => ({
        score: s,
        word: words[i]
      }));
      // Find the most probable word.
      scores.sort((s1, s2) => s2.score - s1.score);
      document.querySelector("#console").textContent = scores[0].word;
    },
    {
      probabilityThreshold: 0.75
    }
  );
}

const INPUT_SHAPE = [NUM_FRAMES, 232, 1];
let model;

async function train() {
  toggleButtons(false);
  const ys = tf.oneHot(examples.map(e => e.label), 4);
  const xsShape = [examples.length, ...INPUT_SHAPE];
  const xs = tf.tensor(flatten(examples.map(e => e.vals)), xsShape);

  await model.fit(xs, ys, {
    batchSize: 16,
    epochs: 10,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        document.querySelector("#console").textContent = `Accuracy: ${(
          logs.acc * 100
        ).toFixed(1)}% Epoch: ${epoch + 1}`;
      }
    }
  });
  tf.dispose([xs, ys]);
  toggleButtons(true);
}

function buildModel() {
  model = tf.sequential();
  model.add(
    tf.layers.depthwiseConv2d({
      depthMultiplier: 8,
      kernelSize: [NUM_FRAMES, 4],
      activation: "relu",
      inputShape: INPUT_SHAPE
    })
  );
  model.add(
    tf.layers.maxPooling2d({
      poolSize: [1, 2],
      strides: [2, 2]
    })
  );
  model.add(tf.layers.flatten());
  model.add(
    tf.layers.dense({
      units: 4,
      activation: "softmax"
    })
  );
  const optimizer = tf.train.adam(0.01);
  model.compile({
    optimizer,
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"]
  });
}

function toggleButtons(enable) {
  document.querySelectorAll("button").forEach(b => (b.disabled = !enable));
}

function flatten(tensors) {
  const size = tensors[0].length;
  const result = new Float32Array(tensors.length * size);
  tensors.forEach((arr, i) => result.set(arr, i * size));
  return result;
}

async function app() {
  recognizer = speechCommands.create("BROWSER_FFT");
  await recognizer.ensureModelLoaded();

  buildModel();
}
app();

//////DETECTION CLASSE AND GET
var prevLabel = 1;
var alreadySent = [false, false, false];
async function moveSlider(labelTensor) {
  const label = (await labelTensor.data())[0];
  console.log("label " + label)
  document.getElementById("console").textContent = label;
  if (label != prevLabel) {
    counterLabel = 0;
    // console.log("send label")
    console.log("label is " + label);
  }

  if (label === prevLabel) {
    counterLabel++;
    //console.log("counterlabel " + counterLabel)

    if (counterLabel > 50 && label != 3 && !alreadySent[label]) {
      console.log("Sending data label " + label);
      sendData({'label': label});
      counterLabel = 0;
      alreadySent[label] = true;
    }
  }

  if (label == 0 && prevLabel != 0) {
  }

  if (label == 1 && prevLabel != 1) {
  }

  if (label == 2 && prevLabel != 2) {
  }

  if (label == 3&& prevLabel != 3) {
  }

  let delta = 0.1;
  const prevValue = + document.getElementById("output").value;
  document.getElementById("output").value =
    prevValue + (label === 0 ? -delta : delta);
  prevLabel = label;
}
///////

function listen() {
  if (recognizer.isListening()) {
    recognizer.stopListening();
    toggleButtons(true);
    document.getElementById("listen").textContent = "Listen";
    return;
  }
  toggleButtons(false);
  document.getElementById("listen").textContent = "Stop";
  document.getElementById("listen").disabled = false;

  recognizer.listen(
    async ({ spectrogram: { frameSize, data } }) => {
      const vals = normalize(data.subarray(-frameSize * NUM_FRAMES));
      const input = tf.tensor(vals, [1, ...INPUT_SHAPE]);
      const probs = model.predict(input);
      const predLabel = probs.argMax(1);
      await moveSlider(predLabel);
      tf.dispose([input, probs, predLabel]);
    },
    {
      overlapFactor: 0.999,
      includeSpectrogram: true,
      invokeCallbackOnNoiseAndUnknown: true
    }
  );
}
